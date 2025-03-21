
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, PlaySquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  youtubeUrl: z.string().url("Veuillez entrer une URL valide").refine(
    (url) => {
      return url.includes('youtube.com/') || url.includes('youtu.be/');
    },
    {
      message: "L'URL doit être un lien YouTube valide",
    }
  ),
});

type FormValues = z.infer<typeof formSchema>;

interface YoutubeFormProps {
  onBack: () => void;
  onSubmit: (videoId: string, videoTitle: string) => void;
}

const extractVideoId = (url: string): string => {
  let videoId = '';
  
  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  const watchRegex = /youtube\.com\/watch\?v=([^&]+)/;
  // Format: https://youtu.be/VIDEO_ID
  const shortRegex = /youtu\.be\/([^?&]+)/;
  // Format: https://www.youtube.com/embed/VIDEO_ID
  const embedRegex = /youtube\.com\/embed\/([^?&]+)/;
  
  const watchMatch = url.match(watchRegex);
  const shortMatch = url.match(shortRegex);
  const embedMatch = url.match(embedRegex);
  
  if (watchMatch && watchMatch[1]) {
    videoId = watchMatch[1];
  } else if (shortMatch && shortMatch[1]) {
    videoId = shortMatch[1];
  } else if (embedMatch && embedMatch[1]) {
    videoId = embedMatch[1];
  }
  
  return videoId;
};

const YoutubeForm: React.FC<YoutubeFormProps> = ({ onBack, onSubmit }) => {
  const [videoId, setVideoId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const { userCredits } = useAuth();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      youtubeUrl: '',
    },
  });

  const youtubeUrl = watch('youtubeUrl');
  
  useEffect(() => {
    if (youtubeUrl) {
      const id = extractVideoId(youtubeUrl);
      setVideoId(id);
    } else {
      setVideoId('');
    }
  }, [youtubeUrl]);
  
  const fetchVideoTitle = async (id: string): Promise<string> => {
    // Simulation d'appel API pour récupérer le titre
    // Dans une application réelle, ce serait un appel à l'API YouTube
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Vidéo YouTube - ' + id);
      }, 1000);
    });
  };
  
  const onFormSubmit = async (data: FormValues) => {
    if (userCredits <= 0) {
      toast({
        title: "Crédits insuffisants",
        description: "Vous n'avez plus de crédits disponibles. Veuillez recharger votre compte.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const id = extractVideoId(data.youtubeUrl);
      if (!id) {
        throw new Error("Impossible d'extraire l'ID de la vidéo");
      }
      
      const title = await fetchVideoTitle(id);
      setVideoTitle(title);
      
      onSubmit(id, title);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'analyse de l'URL YouTube",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2" 
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">Générer du contenu à partir d'une vidéo YouTube</h2>
      </div>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="youtubeUrl">Lien YouTube</Label>
          <Input
            id="youtubeUrl"
            placeholder="https://www.youtube.com/watch?v=..."
            className="bg-[#141B2A] border-white/10 text-white transition-all hover:border-blue-400 focus-visible:border-blue-500"
            {...register('youtubeUrl')}
          />
          {errors.youtubeUrl && (
            <p className="text-sm text-red-500">{errors.youtubeUrl.message}</p>
          )}
        </div>
        
        {videoId && (
          <div className="aspect-video rounded-md overflow-hidden bg-black/20 border border-white/10">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        
        {!videoId && (
          <div className="aspect-video flex items-center justify-center rounded-md border border-dashed border-white/10 bg-black/20">
            <div className="text-center">
              <PlaySquare className="h-10 w-10 text-white/20 mx-auto mb-2" />
              <p className="text-white/40">Entrez un lien YouTube valide pour prévisualiser la vidéo</p>
            </div>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          disabled={!videoId || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            "Générer du contenu"
          )}
        </Button>
      </form>
    </div>
  );
};

export default YoutubeForm;
