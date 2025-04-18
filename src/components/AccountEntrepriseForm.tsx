import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { BriefcaseBusiness } from 'lucide-react';

export const enterpriseSchema = z.object({
  type_entreprise: z.string().min(1, { message: "Le type d'entreprise est requis." }),
  nom_entreprise: z.string().min(1, { message: "Le nom de l'entreprise est requis." }),
  numero_siret: z.string().min(1, { message: "Le numéro SIRET est requis." }),
  adresse_siege_social: z.string().min(1, { message: "L'adresse du siège social est requise." }),
  ville: z.string().min(1, { message: "La ville est requise." }),
  zone_chalandise: z.string().min(1, { message: "La zone de chalandise est requise." }),
  domaines_expertises: z.array(z.string()).min(1, { message: "Au moins un domaine d'expertise est requis." }),
  type_chantiers: z.array(z.string()).min(1, { message: "Au moins un type de chantier est requis." }),
  natures_chantiers: z.array(z.string()).min(1, { message: "Au moins une nature de chantier est requise." }),
  nombre_ao_mensuels: z.string().min(1, { message: "Le nombre d'appels d'offres mensuels est requis." }),
  budget_conditions_financieres: z.string().min(1, { message: "Le budget ou les conditions financières sont requis." }),
  email: z.string().email({ message: "Email invalide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
  prenom: z.string().min(1, { message: "Le prénom est requis." }),
  nom: z.string().min(1, { message: "Le nom est requis." }),
  interest: z.string().min(1, { message: "Ce champ est requis." }),
  budget_cible: z.string().min(1, { message: "Le budget cible est requis." }),
  politique_tarifaire: z.string().min(1, { message: "La politique tarifaire est requise." }),
  conditions_paiement: z.string().min(1, { message: "Les conditions de paiement sont requises." }),
});

const EnterpriseForm = () => {
  const { user } = useAuth();

  console.log("user", user)
  const form = useForm({
    resolver: zodResolver(enterpriseSchema),
    defaultValues: {
      type_entreprise: '',
      nom_entreprise: '',
      numero_siret: '',
      adresse_siege_social: '',
      ville: '',
      zone_chalandise: '',
      domaines_expertises: [],
      type_chantiers: [],
      natures_chantiers: [],
      nombre_ao_mensuels: '',
      budget_conditions_financieres: '',
      email: '',
      password: '',
      prenom: '',
      nom: '',
      interest: '',
      budget_cible: '',
      politique_tarifaire: '',
      conditions_paiement: '',
    },
  });

  useEffect(() => {
    const fetchEnterpriseData = async () => {
      if (!user) return;
  
      const { data, error } = await supabase
        .from('entreprises')
        .select('*')
        .eq('user_id', user.id)
  
      if (error) {
        console.error('Erreur lors de la récupération :', error);
        return;
      }

      console.log("data", data)
  
      if (data && data.length === 1) {
        form.reset({
          ...data[0], 
          domaines_expertises: data[0].domaines_expertises || [],
          type_chantiers: data[0].type_chantiers || [],
          natures_chantiers: data[0].natures_chantiers || [],
        });
      } else if (data && data.length > 1) {
        console.error("Erreur : plusieurs enregistrements trouvés pour cet utilisateur.");
      } else {
        console.log("Aucune donnée trouvée pour cet utilisateur.");
      }
    };
  
    fetchEnterpriseData();
  }, [user, form]);
  

  const onSubmit = async (values) => {
    if (!user) return;

    const { error } = await supabase
      .from('entreprises')
      .update({ ...values })
      .eq('user_id', user.id);

    if (error) {
      console.error('Erreur lors de la mise à jour :', error);
    } else {
      console.log('Informations mises à jour avec succès !');
    }
  };

  return (
    <Card className="border border-gray/10 rounded-lg mb-8">
      <CardHeader className="flex flex-col gap-3 border-b border-gray/10 p-4">
        <CardTitle className="flex flex-row items-center gap-2">
          <BriefcaseBusiness size={30} className="border border-white/10 rounded-full p-1" />
          <CardTitle>Informations entreprise</CardTitle>
        </CardTitle>
        <CardDescription>Modifiez les informations de votre entreprise</CardDescription>
      </CardHeader>

      <CardContent>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[ 
          { name: 'type_entreprise', label: 'Type d\'entreprise', type: 'select', options: ['TPE', 'PME'] },
          { name: 'nom_entreprise', label: 'Nom de l\'entreprise', type: 'text' },
          { name: 'numero_siret', label: 'Numéro SIRET', type: 'text' },
          { name: 'adresse_siege_social', label: 'Adresse du siège social', type: 'text' },
          { name: 'ville', label: 'Ville', type: 'text' },
          { name: 'zone_chalandise', label: 'Zone de chalandise', type: 'text' },
          { name: 'nombre_ao_mensuels', label: 'Nombre d\'AO mensuels', type: 'text' },
          { name: 'budget_conditions_financieres', label: 'Budget et conditions financières', type: 'text' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'password', label: 'Mot de passe', type: 'password' },
          { name: 'prenom', label: 'Prénom', type: 'text' },
          { name: 'nom', label: 'Nom', type: 'text' },
          { name: 'interest', label: 'Intérêt', type: 'text' },
          { name: 'budget_cible', label: 'Budget cible', type: 'text' },
          { name: 'politique_tarifaire', label: 'Politique tarifaire', type: 'text' },
          { name: 'conditions_paiement', label: 'Conditions de paiement', type: 'text' },
        ].map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel className="font-medium text-sm text-gray-700">{field.label}</FormLabel>
                <FormControl>
                  {field.type === 'select' ? (
                    <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base">
                      <option value="">Sélectionner</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input {...field} type={field.type} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  </Form>
</CardContent>

    </Card>
  );
};

export default EnterpriseForm;
