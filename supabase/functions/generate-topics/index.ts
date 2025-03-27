
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get request body
    const requestData = await req.json()
    const { youtubeLink, language, option, isSocialMediaOnly, title } = requestData

    // Check if we have required parameters
    if (!youtubeLink) {
      return new Response(
        JSON.stringify({ error: 'YouTube link is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // For demonstration, generate sample topics
    // In a real implementation, this would call an AI service
    const generatedTopics = generateSampleTopics()

    // Generate sample content for each topic
    const generatedContents = generatedTopics.map(topic => ({
      topicId: topic.id,
      subject: `Sujet sur ${topic.title}`,
      body: `Voici un exemple de contenu généré pour le sujet "${topic.title}".

Ce contenu serait normalement généré par une IA en se basant sur la vidéo YouTube et les préférences de l'utilisateur.

Le contenu inclut généralement:
- Une introduction engageante
- Des points clés sur le sujet
- Des exemples concrets
- Une conclusion pertinente

La longueur et le style dépendraient des paramètres fournis, comme la langue (${language || 'french'}) et le type de contenu (${option || 'newsletter'}).`
    }))

    // Response with generated topics
    return new Response(
      JSON.stringify({ 
        topics: generatedTopics,
        contents: generatedContents
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error processing request:', error)

    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

// Helper function to generate sample topics
function generateSampleTopics() {
  return [
    {
      id: '1',
      title: 'Les 4 compétences essentielles pour réussir sur YouTube',
      description: 'Une analyse des compétences fondamentales que tout créateur de contenu doit maîtriser pour se démarquer sur la plateforme.',
    },
    {
      id: '2',
      title: 'Comment le charisme influence l\'engagement de votre audience',
      description: 'Exploration de l\'impact du charisme sur la fidélisation des spectateurs et techniques pour développer cette qualité.',
    },
    {
      id: '3',
      title: 'L\'équilibre entre authenticité et performance dans la création de contenu',
      description: 'Réflexion sur l\'importance de rester authentique tout en offrant une performance de qualité à son audience.',
    },
    {
      id: '4',
      title: 'Stratégies pour développer un personal branding efficace',
      description: 'Conseils pratiques pour construire et maintenir une image de marque personnelle cohérente et mémorable.',
    },
    {
      id: '5',
      title: 'L\'impact des algorithmes sur la visibilité des créateurs',
      description: 'Analyse des mécanismes algorithmiques et comment les utiliser à son avantage.',
    }
  ]
}
