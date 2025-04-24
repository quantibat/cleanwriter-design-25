import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const OFFRES_PAR_PAGE = 10;

export const useAppelsOffres = (currentPage = 1, refreshTrigger = 0) => {
  const [appelsOffres, setAppelsOffres] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppels = async () => {
      setLoading(true);

      const from = (currentPage - 1) * OFFRES_PAR_PAGE;
      const to = from + OFFRES_PAR_PAGE - 1;

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Erreur utilisateur :", userError);
        setLoading(false);
        return;
      }

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

      const { data: scoringData, error: scoringError } = await supabase
        .from("AO_Public_Scoring")
        .select("*")
        .eq("id_entreprise", idEntreprise);

      if (scoringError) {
        console.error("Erreur récupération des AO scorés :", scoringError);
        setLoading(false);
        return;
      }

      const aoIds = scoringData.map((item) => item.ao_id);

      if (aoIds.length === 0) {
        setAppelsOffres([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("appel_offre")
        .select("*")
        .in("metadata->>idweb", aoIds)
        .order("id", { ascending: false });

      if (error) {
        console.error("Erreur chargement des appels d'offres :", error);
        setLoading(false);
        return;
      }

      const appelsAvecScoring = scoringData.map((scoringItem) => {
        const aoCorrespondant = data.find(
          (ao) => ao.metadata?.idweb === scoringItem.ao_id
        );

        return {
          ...scoringItem,
          appel_offre: aoCorrespondant || null,
        };
      });

      const paginatedAppels = appelsAvecScoring.slice(from, to);

      setAppelsOffres(paginatedAppels);
      setTotalPages(Math.ceil(appelsAvecScoring.length / OFFRES_PAR_PAGE));
      setLoading(false);
    };

    fetchAppels();
  }, [currentPage, refreshTrigger]); // 🆕 refreshTrigger ajouté ici

  return { appelsOffres, totalPages, loading };
};
