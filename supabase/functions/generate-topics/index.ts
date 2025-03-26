
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TopicRequest {
  youtubeLink: string;
  option: string;
  language: string;
  isSocialMediaOnly?: boolean;
  title?: string;
}

interface Topic {
  id: string;
  title: string;
  description: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { youtubeLink, option, language, isSocialMediaOnly, title } = await req.json() as TopicRequest;

    // Log the received request
    console.log('Request received:', { youtubeLink, option, language, isSocialMediaOnly, title });

    if (!youtubeLink) {
      throw new Error('YouTube link is required');
    }

    // Construct a prompt based on the inputs
    let systemPrompt = `You are an expert content creator who specializes in generating compelling topics for content repurposing.`;
    let userPrompt = `Based on this YouTube video link: ${youtubeLink}`;

    if (title) {
      userPrompt += ` with the title "${title}"`;
    }

    if (option) {
      userPrompt += `, I need topics for a ${option}`;
    }

    if (isSocialMediaOnly) {
      userPrompt += `. These topics should be optimized for social media platforms.`;
    } else {
      userPrompt += `.`;
    }

    userPrompt += ` Generate 3 compelling topics that capture the essence of the video content.`;
    userPrompt += ` The topics should be interesting, clickable, and based on what you think the video content would be about.`;
    userPrompt += ` Each topic should have a catchy title and a brief description explaining what it's about.`;
    userPrompt += ` Format the response as a valid JSON array with objects that have "id", "title", and "description" properties.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
    }

    const generatedContent = data.choices[0]?.message?.content;
    
    if (!generatedContent) {
      throw new Error('No content was generated');
    }

    // Try to extract JSON from the response
    let topics: Topic[] = [];
    try {
      // Find JSON array in the response
      const jsonMatch = generatedContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        topics = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not extract JSON from response');
      }
    } catch (parseError) {
      console.error('Error parsing topics:', parseError);
      
      // Fallback to create structured data
      topics = [
        {
          id: '1',
          title: 'Failed to parse topics',
          description: 'The AI generated a response but it was not in the expected format. Please try again.'
        }
      ];
    }

    // Ensure each topic has an id
    topics = topics.map((topic, index) => ({
      ...topic,
      id: topic.id || String(index + 1)
    }));

    return new Response(JSON.stringify({ topics }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-topics function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
