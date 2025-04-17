import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export const useAppelOffreById = (idweb) => {
    const [tender, setTender] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchTender = async () => {
        if (!idweb) return;
  
        setLoading(true);
  
        // Étape 1 : Récupérer l'utilisateur
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
  
        if (userError) {
          console.error("Erreur utilisateur :", userError);
          setLoading(false);
          return;
        }
  
        // Étape 2 : Récupérer l'entreprise
        const { data: entreprise, error: entrepriseError } = await supabase
          .from('entreprises')
          .select('id')
          .eq('user_id', user.id)
          .single();
  
        if (entrepriseError) {
          console.error("Erreur récupération entreprise :", entrepriseError);
          setLoading(false);
          return;
        }
  
        const idEntreprise = entreprise.id;
  
        // Étape 3 : Récupérer le scoring pour ce ao_id spécifique
        const { data: scoringData, error: scoringError } = await supabase
          .from('AO_Public_Scoring')
          .select('*')
          .eq('id_entreprise', idEntreprise)
          .eq('ao_id', idweb)
          .single();
  
        if (scoringError || !scoringData) {
          console.error("Erreur récupération du scoring :", scoringError);
          setLoading(false);
          return;
        }
  
        // Étape 4 : Récupérer les infos de l’appel d’offre
        const { data: aoData, error: aoError } = await supabase
          .from('appel_offre')
          .select('*')
          .eq('metadata->>idweb', idweb)
          .single();
  
        if (aoError) {
          console.error("Erreur récupération AO :", aoError);
          setLoading(false);
          return;
        }
  
        setTender({
          ...scoringData,
          appel_offre: aoData,
        });
  
        setLoading(false);
      };
  
      fetchTender();
    }, [idweb]);
  
    return { tender, loading };
  };