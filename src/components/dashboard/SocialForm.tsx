
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  description: z.string().min(10, "Veuillez fournir une description d'au moins 10 caractères"),
});

type FormValues = z.infer<typeof formSchema>;

interface SocialFormProps {
  onBack: () => void;
  onSubmit: (description: string) => void;
}

const SocialForm: React.FC<SocialFormProps> = ({ onBack, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userCredits } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });
  
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
      // Envoyer les données au composant parent
      setTimeout(() => {
        onSubmit(data.description);
        setIsLoading(false);
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la génération de contenu",
        variant: "destructive"
      });
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
        <h2 className="text-lg font-semibold">Générer du contenu pour les réseaux sociaux</h2>
      </div>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="description">Description du contenu souhaité</Label>
          <Textarea
            id="description"
            placeholder="Décrivez le contenu que vous souhaitez générer pour vos réseaux sociaux. Par exemple: Un post inspirant sur l'intelligence artificielle pour LinkedIn."
            className="min-h-[150px] bg-[#141B2A] border-white/10 text-white transition-all hover:border-blue-400 focus-visible:border-blue-500"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        
        <div className="p-4 rounded-md bg-[#141B2A]/50 border border-white/10">
          <h3 className="text-sm font-medium mb-2">Exemples de requêtes efficaces:</h3>
          <ul className="text-sm space-y-2 text-white/70">
            <li>• "Un thread Twitter sur les avantages de l'IA pour les entrepreneurs"</li>
            <li>• "Une publication LinkedIn sur les tendances technologiques de 2023"</li>
            <li>• "Une série de légendes Instagram pour une marque de vêtements éthiques"</li>
          </ul>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Génération en cours...
            </>
          ) : (
            "Générer du contenu"
          )}
        </Button>
      </form>
    </div>
  );
};

export default SocialForm;
