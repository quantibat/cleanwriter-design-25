import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export const useAppelOffreById = (idweb) => {
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTender = async () => {
      if (!idweb) return;

      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("User data:", user);

      if (userError) {
        console.error("Erreur utilisateur :", userError);
        setLoading(false);
        return;
      }

      // Étape 2 : Récupérer l'entreprise
      const { data: entreprise, error: entrepriseError } = await supabase
        .from("entreprises")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (entrepriseError) {
        console.error("Erreur récupération entreprise :", entrepriseError);
        setLoading(false);
        return;
      }

      const idEntreprise = entreprise.id;

      // Étape 3 : Récupérer tous les scorings de cet AO
      const { data: scoringData, error: scoringError } = await supabase
        .from("AO_Public_Scoring")
        .select("*")
        .eq("ao_id", idweb);

      if (scoringError || !scoringData || scoringData.length === 0) {
        console.error("Erreur récupération du scoring :", scoringError);
        setLoading(false);
        return;
      }

      // Prendre uniquement les scorings valides (avec score défini)
      const filteredScoring = scoringData.filter((s) => s.score !== null);

      // Prendre le meilleur score (ou remplacer par tri par date si besoin)
      const bestScoring = filteredScoring.sort((a, b) => b.score - a.score)[0];

      // Étape 4 : Récupérer les infos de l’appel d’offre
      const { data: aoData, error: aoError } = await supabase
        .from("appel_offre")
        .select("*")
        .eq("metadata->>idweb", idweb);

      if (aoError || !aoData || aoData.length === 0) {
        console.error("Erreur récupération AO :", aoError);
        setLoading(false);
        return;
      }

      setTender({
        ...bestScoring,
        appel_offre: aoData[0],
      });

      setLoading(false);
    };

    fetchTender();
  }, [idweb]);

  return { tender, loading };
};
