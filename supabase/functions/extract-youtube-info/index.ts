
// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.com/manual/getting_started/javascript

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const { youtubeLink } = await req.json();
    console.log('Extracting info for YouTube link:', youtubeLink);

    if (!youtubeLink) {
      return new Response(
        JSON.stringify({ error: 'YouTube link is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get video ID from YouTube URL
    const videoId = extractYoutubeId(youtubeLink);
    
    if (!videoId) {
      return new Response(
        JSON.stringify({ error: 'Invalid YouTube URL' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Fetch the video info using the YouTube API or by scraping (this is a simplified example)
    // In a real app, you would use the YouTube API with API keys
    const videoInfo = await fetchVideoInfo(videoId);
    
    return new Response(
      JSON.stringify(videoInfo),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to process the request' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

function extractYoutubeId(url: string): string | null {
  // Handle common YouTube URL formats
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  
  return match ? match[1] : null;
}

async function fetchVideoInfo(videoId: string) {
  try {
    // Simple fetch to get video page
    const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const html = await response.text();
    
    // Extract title using a basic regex (in a real app, use a proper HTML parser)
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace(' - YouTube', '') : 'Unknown Title';
    
    // Since we're not using the YouTube API, we'll return a mock data object
    return {
      videoId,
      title,
      channel: 'Channel Name', // This would require more parsing
      views: '10K+',  // Mock data
      duration: '10:30',  // Mock data
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      description: 'Video description would be here'  // Would require more parsing
    };
  } catch (error) {
    console.error('Error fetching video info:', error);
    // Return mock data in case of error
    return {
      videoId,
      title: 'Video Title',
      channel: 'Channel Name',
      views: 'N/A',
      duration: '0:00',
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      description: 'Unable to fetch video description'
    };
  }
}
