import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, Building, Home, Info, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Controller, useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { MultiSelectDropdown } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const steps = [
  "Type d'entreprise",
  "Informations entreprise",
  "Appels d'offres",
  "Création du compte",
];

export default function OnboardingDCEManager() {

  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [typesChantiers, setTypesChantiers] = useState([]);
  const [domainesChantiers, setDomainesChantiers] = useState([]);
  const [naturesChantiers, setNaturesChantiers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsZone, setSuggestionsZone] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    control,
  } = useForm({
    defaultValues: {
      type_entreprise: "",
      nom_entreprise: "",
      numero_siret: "",
      adresse_siege_social: "",
      ville: "",
      zone_chalandise: "",
      domaines_expertises: [],
      type_chantiers: [],
      natures_chantiers: [],
      nombre_ao_mensuels: "",
      budget_conditions_financieres: "",
      email: "",
      password: "",
      prenom: "",
      nom: "",
      interest: "",
      budget_cible: "",
      politique_tarifaire:"",
      conditions_paiement: ""
    },
  });

  const next = async () => {
    const isValid = await trigger();
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    } else {
      const errorFields = Object.keys(errors);
      errorFields.forEach((field) => {
        if (errors[field]) {
          console.log(`Erreur dans le champ ${field}: ${errors[field]?.message}`);
        }
      });
    }
  };

  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleCardSelect = (key, value) => {
    setValue(key, value);
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleSiretChange = async (e) => {
    const value = e.target.value;

    if (value.length === 14) {
      try {
        const res = await fetch("https://gdjfwuaevdfxegcyoirw.supabase.co/functions/v1/insee-siret", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ siret: value }),
        });
        const data = await res.json();

        setValue("nom_entreprise", data.etablissement.uniteLegale.denominationUniteLegale || "");
        setValue("ville", data.etablissement.adresseEtablissement.libelleCommuneEtablissement || "");
        setValue("numero_siret", value);
        const numeroVoie = data.etablissement.adresseEtablissement.numeroVoieEtablissement || '';
        const typeVoie = data.etablissement.adresseEtablissement.typeVoieEtablissement || '';
        const libelleVoie = data.etablissement.adresseEtablissement.libelleVoieEtablissement || '';
        const adresseComplete = `${numeroVoie} ${typeVoie} ${libelleVoie}`.trim();

        setValue("adresse_siege_social", adresseComplete);

        toast({
          title: "Informations récupérées",
          description: "Les informations de l'entreprise ont été automatiquement remplies.",
          duration: 3000,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des informations SIRET:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la récupération des informations.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      data.nom = data.nom.toUpperCase();
      data.prenom = data.prenom.toUpperCase();

      const { error: emailCheckError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (!emailCheckError) {
        toast({
          title: "Email déjà utilisé",
          description: "Un compte existe déjà avec cet email.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: `${data.prenom} ${data.nom}`.trim(),
          },
        },
      });

      if (authError) {
        if (authError.message.includes("password")) {
          toast({
            title: "Erreur de mot de passe",
            description: "Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre",
            variant: "destructive",
            duration: 5000,
          });
        } else {
          toast({
            title: "Erreur d'inscription",
            description: authError.message,
            variant: "destructive",
            duration: 3000,
          });
        }
        return;
      }

      const userId = authData?.user?.id;
      if (!userId) throw new Error("User ID not found");

      const { data: entrepriseData, error: entrepriseError } = await supabase
        .from("entreprises")
        .insert([
          {
            user_id: userId,
            type_entreprise: data.type_entreprise,
            nom_entreprise: data.nom_entreprise,
            numero_siret: data.numero_siret,
            adresse_siege_social: data.adresse_siege_social,
            ville: data.ville,
            zone_chalandise: data.zone_chalandise || "",
            nombre_ao_mensuels: data.nombre_ao_mensuels,
            budget_conditions_financieres: { budget_cible: data.budget_cible, 
              politique_tarifaire: data.politique_tarifaire, 
              conditions_paiement: data.conditions_paiement },
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            interest: data.interest,

          },
        ])
        .select();

      if (entrepriseError) throw entrepriseError;

      const entrepriseId = entrepriseData?.[0]?.id;

      if (entrepriseData?.[0]?.domaines_expertises?.length > 0) {
        const { error: domainesError } = await supabase
          .from("entreprises_domaines_expertises")
          .insert(
            entrepriseData?.[0]?.domaines_expertises.map((domaine) => ({
              entreprise_id: entrepriseId,
              domaine_id: domaine.id,
            }))
          );
        if (domainesError) throw domainesError;
      }

      if (entrepriseData?.[0]?.type_chantiers?.length > 0) {
        const { error: typesError } = await supabase
          .from("entreprises_types_chantiers")
          .insert(
            entrepriseData?.[0]?.type_chantiers.map((type) => ({
              entreprise_id: entrepriseId,
              type_id: type.id,
            }))
          );
        if (typesError) throw typesError;
      }

      if (entrepriseData?.[0]?.natures_chantiers?.length > 0) {
        const { error: naturesError } = await supabase
          .from("entreprises_natures_chantiers")
          .insert(
            entrepriseData?.[0]?.natures_chantiers.map((nature) => ({
              entreprise_id: entrepriseId,
              nature_id: nature.id,
            }))
          );
        if (naturesError) throw naturesError;
      }

      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé. Un email de confirmation vous a été envoyé.",
        duration: 5000,
      });

      setTimeout(() => {
        navigate("/email-confirmation");
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast({
        title: "Erreur lors de l'inscription",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const passwordValidation = {
    minLength: {
      value: 6,
      message: "Le mot de passe doit contenir au moins 6 caractères",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      message: "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
    },
  };

  const handleAdresseChange= async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=10`);
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Erreur zone chalandise:", error);
      setSuggestions([]);
    }
  };

  const handleZoneChalandiseChange = async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=10`);
      const data = await response.json();
      setSuggestionsZone(data.features || []);
    } catch (error) {
      console.error("Erreur zone chalandise:", error);
      setSuggestionsZone([]);
    }
  };

  const fetchTypesChantiers = async () => {
    try {
      const { data, error } = await supabase.from("types_chantiers").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des types de chantiers:", error);
      return [];
    }
  };

  const fetchDomainesChantiers = async () => {
    try {
      const { data, error } = await supabase.from("domaines_expertises").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des domaines de chantiers:", error);
      return [];
    }
  };

  const fetchNaturesChantiers = async () => {
    try {
      const { data, error } = await supabase.from("natures_chantiers").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des natures de chantiers:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const types = await fetchTypesChantiers();
      setTypesChantiers(types || []);

      const domaines = await fetchDomainesChantiers();
      setDomainesChantiers(domaines || []);

      const natures = await fetchNaturesChantiers();
      setNaturesChantiers(natures || []);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#121824]text-white flex flex-col items-center justify-center w-full py-8 px-4">
      <div className="text-center mb-8">
        <Link to="/" className="inline-block">
          <img 
            src="/lovable-uploads/87d822bd-dd26-494f-a6d1-9d7e353735ad.png" 
            alt="DCE Manager"
            className="h-16 mx-auto mb-4"
          />
        </Link>
        <p className="mt-2 text-gray-400">Inscrivez-vous pour recevoir des appels d'offres à jour recueillis depuis le BOAMP</p>
      </div>

      <div className="w-full max-w-4xl animated-border-glow bg-gradient-to-b from-gray-700 to-gray-800 border-[#384454] border backdrop-blur-md rounded-xl border border-[#384454] space-y-8 p-8">
        <div className="flex items-center justify-center space-x-4 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${i === step ? 'bg-blue-600 text-white scale-110' : 'bg-gray-600 text-gray-400'}
                  ${i < step ? 'bg-blue-600 text-white' : ''}
                `}
              >
                {i < step ? '✓' : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${i < step ? 'bg-blue-600' : 'bg-gray-500'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {step === 0 && (
                <div className="space-y-6">
                  <div className="p-4 border border-[#384454] rounded-lg ">
                    <h2 className="text-xl font-semibold flex items-center gap-3 mb-2">
                      <Building className="text-blue-500" />
                      Type de l'entreprise
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Merci d'indiquer le type d'entreprise que vous représentez.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        type: "TPE",
                        desc: "Moins de 10 salariés",
                        icon: Home
                      },
                      {
                        type: "PME",
                        desc: "De 10 à 250 salariés",
                        icon: BriefcaseBusiness
                      },
                      {
                        type: "GE",
                        desc: "Plus de 250 salariés",
                        icon: Building
                      }
                    ].map((item) => (
                      <button
                        key={item.type}
                        onClick={() => handleCardSelect("type_entreprise", item.type)}
                        className={`
                          p-6 rounded-lg transition-all duration-300
                          border border-[#384454] hover:border-blue-500
                          
                          flex flex-col items-center justify-center gap-3
                        `}
                      >
                        <item.icon className="w-8 h-8 text-blue-500" />
                        <div className="font-bold text-lg">{item.type}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex flex-col mb-4 border border-gray-500 rounded-lg mb-4  p-2">
                    <h2 className="text-xl font-semibold mb-1 flex gap-4">
                      <Info />
                      <p>Informations sur l'entreprise</p>
                    </h2>
                    <p className="text-sm text-gray-400">
                      Merci de renseigner les informations de base sur votre entreprise, ainsi que vos domaines d'expertise et types de chantiers.
                    </p>
                  </div>
                  <fieldset className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="numero_siret" className="block text-sm mb-2">
                          Numéro SIRET
                        </label>
                        <input
                            placeholder="Ex: 12345678901234"
                            id="numero_siret"
                            name="numero_siret"
                            type="text"
                            inputMode="numeric"
                            onChange={handleSiretChange}
                            maxLength={14}
                            {...register("numero_siret", {
                              required: "Ce champ est requis",
                              pattern: {
                                value: /^\d{14}$/,
                                message: "Le numéro SIRET doit contenir exactement 14 chiffres",
                              },
                              onChange: (e) => {
                                e.target.value = e.target.value.replace(/\D/g, "");
                                handleSiretChange(e);
                              },
                            })}
                            className="w-full p-3 rounded bg-transparent border border-gray-600"
                          />

                        {errors.numero_siret && (
                          <span className="text-red-500 text-sm">{errors.numero_siret.message}</span>
                        )}
                      </div>
                      {/* Nom de l'entreprise */}
                      <div>
                        <label htmlFor="nom_entreprise" className="block text-sm mb-2">
                          Nom de l'entreprise
                        </label>
                        <input
                          id="nom_entreprise"
                          name="nom_entreprise"
                          type="text"
                          {...register("nom_entreprise", { required: "Ce champ est requis" })}
                          className="w-full p-3 rounded bg-transparent border border-gray-600"
                        />
                        {errors.nom_entreprise && (
                          <span className="text-red-500 text-sm">{errors.nom_entreprise.message}</span>
                        )}
                      </div>

                      {/* Adresse du siège social */}
                      <div>
                        <label htmlFor="adresse_siege_social" className="block text-sm mb-2">
                          Adresse du siège social
                        </label>
                        <input
                            id="adresse_siege_social"
                            type="text"
                            {...register("adresse_siege_social", { required: "Ce champ est requis" })}
                            onChange={(e) => handleAdresseChange(e.target.value) }
                            className="w-full p-3 rounded bg-transparent border border-gray-600"
                            autoComplete="off"
                          />
                          {errors.adresse_siege_social && (
                            <span className="text-red-500 text-sm">{errors.adresse_siege_social.message}</span>
                          )}

                          {/* Suggestions */}
                          {suggestions.length > 0 && (
                            <ul className="absolute z-10 bg-white text-black w-full border mt-1 rounded shadow">
                              {suggestions.map((s, index) => (
                                <li
                                  key={index}
                                  onClick={() => handleAdresseChange(s)}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                >
                                  {s.properties.label}
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>

                      {/* Ville */}
                      <div>
                        <label htmlFor="ville" className="block text-sm mb-2">
                          Ville
                        </label>
                        <input
                          id="ville"
                          name="ville"
                          type="text"
                          {...register("ville", { required: "Ce champ est requis" })}
                          className="w-full p-3 rounded bg-transparent border border-gray-600"
                        />
                        {errors.ville && (
                          <span className="text-red-500 text-sm">{errors.ville.message}</span>
                        )}
                      </div>

                      {/* Zone de chalandise */}
                      <div>
                        <label htmlFor="zone_chalandise" className="block text-sm mb-2">
                          Zone de chalandise
                        </label>
                        <input
                          id="zone_chalandise"
                          name="zone_chalandise"
                          type="text"
                          {...register("zone_chalandise", { required: "Ce champ est requis" })}
                          className="w-full p-3 rounded bg-transparent border border-gray-600"
                        />
                        {errors.zone_chalandise && (
                          <span className="text-red-500 text-sm">{errors.zone_chalandise.message}</span>
                        )}
                        {/* Suggestions */}
                        {suggestionsZone.length > 0 && (
                            <ul className="absolute z-10 bg-white text-black w-full border mt-1 rounded shadow">
                              {suggestionsZone.map((s, index) => (
                                <li
                                  key={index}
                                  onClick={() => handleZoneChalandiseChange(s)}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                >
                                  {s.properties.label}
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>

                      {/* Domaines d’expertise */}
                      <div className="col-span-2 mt-4">
                        <Controller
                          control={control}
                          name="domaines_expertises"
                          rules={{ required: "Ce champ est requis" }}
                          render={({ field }) => (
                            <MultiSelectDropdown
                              label="Domaines d’expertise"
                              options={ domainesChantiers && domainesChantiers.map(d => ({ value: d.nom, label: d.nom }))}
                              value={field.value || []}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.domaines_expertises && (
                          <span className="text-red-500 text-sm">{errors.domaines_expertises.message}</span>
                        )}
                      </div>
                    <div className="col-span-1 mt-4">
                      <Controller
                        control={control}
                        name="type_chantiers"
                        rules={{ required: "Ce champ est requis" }}
                        render={({ field }) => (
                          <MultiSelectDropdown
                            label="Types de chantiers"
                            options={ typesChantiers && typesChantiers.map(d => ({ value: d.nom, label: d.nom }))}
                            value={field.value || []}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.type_chantiers && (
                        <span className="text-red-500 text-sm">{errors.type_chantiers.message}</span>
                      )}
                    </div>
                    <div className="col-span-1 mt-4">
                      <Controller
                        control={control}
                        name="natures_chantiers"
                        rules={{ required: "Ce champ est requis" }}
                        render={({ field }) => (
                          <MultiSelectDropdown
                            label="Natures de chantiers"
                            options={ naturesChantiers && naturesChantiers.map(d => ({ value: d.nom, label: d.nom }))}
                            value={field.value || []}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.natures_chantiers && (
                        <span className="text-red-500 text-sm">{errors.natures_chantiers.message}</span>
                      )}
                    </div>
                  </fieldset>
                  <div className="flex justify-between mt-6">
                    <button onClick={back} className="text-sm text-gray-400">Retour</button>
                    <button onClick={next} className="bg-neon-blue px-4 py-2 rounded-full text-white text-sm">Suivant</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex flex-col mb-4 border border-gray-500 rounded-lg mb-4 p-2">
                    <h2 className="text-xl font-semibold mb-1 flex gap-4">
                      <BriefcaseBusiness />
                      <p>Appels d'offres souhaités</p>
                    </h2>
                    <p className="text-sm text-gray-400">
                      Indiquez votre volume d'appels d'offres, vos préférences (public/privé), ainsi que vos conditions financières.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Nombre d'appels d'offres mensuels</label>
                      <input
                        name="nombre_ao_mensuels"
                        {...register("nombre_ao_mensuels", { required: "Ce champ est requis" })}
                        className="w-full p-3 rounded bg-transparent border border-gray-600"
                        type="number"
                        min={1}
                      />
                      {errors.nombre_ao_mensuels && <span className="text-red-500 text-sm">{errors.nombre_ao_mensuels.message}</span>}
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Intérêt</label>
                      <select
                        {...register("interest", { required: "Ce champ est requis" })}
                        className="w-full p-3 rounded bg-transparent border border-gray-600 text-sm"
                      >
                        <option value="">Choisissez</option>
                        <option value="Privés">Privés</option>
                        <option value="Publics">Publics</option>
                        <option value="Les deux">Les deux</option>
                      </select>
                      {errors.interest && <span className="text-red-500 text-sm">{errors.interest.message}</span>}
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Politique tarifaire</label>
                      <input
                        name="politique_tarifaire"
                        {...register("politique_tarifaire", { required: "Ce champ est requis" })}
                        className="w-full p-3 rounded bg-transparent border border-gray-600"
                        type="text"
                      />
                      {errors.politique_tarifaire && <span className="text-red-500 text-sm">{errors.politique_tarifaire.message}</span>}
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Budget cible</label>
                      <select
                        {...register("budget_cible", { required: "Ce champ est requis" })}
                        className="w-full p-3 rounded bg-transparent border border-gray-600 text-sm"
                      >
                        <option value="">Choisissez</option>
                        <option value="5000 £ -10000 £">5000 £ -10000 £</option>
                        <option value="10000 £ -20000 £">10000 £ -20000 £</option>
                        <option value="30000 £ -50000 £">30000 £ -50000 £</option>
                      </select>
                      {errors.budget_cible && <span className="text-red-500 text-sm">{errors.budget_cible.message}</span>}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm mb-2">Condition de paiement</label>
                      <textarea
                        name="conditions_paiement"
                        {...register("conditions_paiement", { required: "Ce champ est requis" })}
                        className="w-full p-3 rounded bg-transparent border border-gray-600"
                      />
                      {errors.conditions_paiement && <span className="text-red-500 text-sm">{errors.conditions_paiement.message}</span>}
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button onClick={back} className="text-sm text-gray-400">Retour</button>
                    <button onClick={next} className="bg-neon-blue px-4 py-2 rounded-full text-white text-sm">Suivant</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex flex-col mb-4 border border-gray-500 rounded-lg mb-4 p-2">
                    <h2 className="text-xl font-semibold mb-1 flex gap-4">
                      <User />
                      Vos informations personnelles
                    </h2>
                    <p className="text-sm text-gray-400">
                      Merci de renseigner vos coordonnées pour finaliser l'inscription.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nom" className="block text-sm mb-2">Nom</label>
                      <Input
                        type="text"
                        {...register("nom", {
                          minLength: { value: 2, message: "Nom trop court" },
                        })}
                        className="w-full p-3 rounded bg-transparent border border-gray-600"
                      />
                      {errors.nom && <span className="text-red-500 text-sm">{errors.nom.message}</span>}
                    </div>
                    <div>
                      <label htmlFor="prenom" className="block text-sm mb-2">Prénom</label>
                      <Input
                        id="prenom"
                        type="text"
                        {...register("prenom", {
                          required: "Prénom est requis",
                          minLength: { value: 2, message: "Prénom trop court" },
                        })}
                        className="w-full p-3 rounded bg-transparent border border-gray-600"
                      />
                      {errors.prenom && <span className="text-red-500 text-sm">{errors.prenom.message}</span>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2">Email professionnel</label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: "Email est requis",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Adresse email invalide",
                          },
                        })}
                        className="w-full p-3 rounded bg-transparent border border-gray-600"
                      />
                      {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm mb-2">Mot de passe</label>
                      <Input
                        id="password"
                        type="password"
                        {...register("password", {
                          required: "Mot de passe est requis",
                          ...passwordValidation,
                        })}
                        className="w-full p-3 rounded bg-transparent border border-gray-600"
                      />
                      {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button onClick={back} className="text-sm text-gray-400">Retour</button>
                    <button type="submit" onClick={handleSubmit(onSubmit)} className="bg-neon-blue px-4 py-2 rounded-full text-white">S'inscrire</button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
