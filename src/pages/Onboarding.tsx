import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, Building, Home, Info, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"; 
import { Controller, useForm } from "react-hook-form"; 
import { supabase } from "@/integrations/supabase/client";
import {  MultiSelectDropdown } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

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
  
  // Initialisation de useForm
  const { register, handleSubmit, formState: { errors }, setValue, getValues, trigger, control } = useForm({
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
    }
  });

  const next = async () => {
    const isValid = await trigger()
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
    setStep((prev) => Math.min(prev + 1, steps.length - 1))
  };

  const onSubmit = async (data) => {
    try {
      // Étape 1 : Créer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      });
  
      if (authError) throw authError;
  
      const userId = authData?.user?.id;
  
      // Étape 2 : Enregistrer les infos de l'entreprise avec l'userId
      const { data: entrepriseData, error: entrepriseError } = await supabase
        .from("entreprises")
        .insert([
          {
            users_id: userId,
            type_entreprise: data.type_entreprise,
            nom_entreprise: data.nom_entreprise,
            numero_siret: data.numero_siret,
            adresse_siege_social: data.adresse_siege_social,
            ville: data.ville,
            zone_chalandise: data.zone_chalandise || " ",
            nombre_ao_mensuels: data.nombre_ao_mensuels,
            budget_conditions_financieres: data.budget_conditions_financieres,
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            interest: data.interest,
          },
        ])
        .single();
  
      if (entrepriseError) throw entrepriseError;
  
      console.log("Entreprise insérée avec succès:", entrepriseData);
  
      // Étape 3 : Récupération des IDs pour les jointures
      const { data: domainesData, error: domainesError } = await supabase
        .from("domaines_expertises")
        .select("id")
        .in("nom", data.domaines_expertises);
  
      if (domainesError) throw domainesError;
  
      const { data: typesData, error: typesError } = await supabase
        .from("types_chantiers")
        .select("id")
        .in("nom", data.type_chantiers);
  
      if (typesError) throw typesError;
  
      const { data: naturesData, error: naturesError } = await supabase
        .from("natures_chantiers")
        .select("id")
        .in("nom", data.natures_chantiers);
  
      if (naturesError) throw naturesError;
  
      const entrepriseId = entrepriseData?.id;
  
      const domainesInsert = domainesData.map((domaine) => ({
        entreprise_id: entrepriseId,
        domaine_id: domaine.id,
      }));
  
      const typesInsert = typesData.map((type) => ({
        entreprise_id: entrepriseId,
        type_id: type.id,
      }));
  
      const naturesInsert = naturesData.map((nature) => ({
        entreprise_id: entrepriseId,
        nature_id: nature.id,
      }));
  
      const { error: insertDomainesError } = await supabase
        .from("entreprises_domaines_expertises")
        .upsert(domainesInsert);
  
      if (insertDomainesError) throw insertDomainesError;
  
      const { error: insertTypesError } = await supabase
        .from("entreprises_types_chantiers")
        .upsert(typesInsert);
  
      if (insertTypesError) throw insertTypesError;
  
      const { error: insertNaturesError } = await supabase
        .from("entreprises_natures_chantiers")
        .upsert(naturesInsert);
  
      if (insertNaturesError) throw insertNaturesError;
  
      console.log("Relations ajoutées avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'insertion dans Supabase:", error);
    }
  
    setTimeout(() => {
      toast({
        title: "Inscription réussie",
        description:
          "Vous êtes maintenant inscrit et prêt à recevoir des appels d'offres.",
        duration: 500,
      });
      navigate("/dashboard");
    }, 1000);
  };
  

  const fetchTypesChantiers = async () => {
    try {
      const { data, error } = await supabase
        .from('types_chantiers')
        .select('*'); 
  
      if (error) throw error;
  
      console.log('Types de Chantiers:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des types de chantiers:', error);
    }
  };
  
  const fetchDomainesChantiers = async () => {
    try {
      const { data, error } = await supabase
        .from('domaines_expertises')
        .select('*'); 
  
      if (error) throw error;
  
      console.log('Domaines de Chantiers:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des domaines de chantiers:', error);
    }
  };

  const fetchNaturesChantiers = async () => {
    try {
      const { data, error } = await supabase
        .from('natures_chantiers')
        .select('*'); 
  
      if (error) throw error;
  
      console.log('Natures de Chantiers:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des natures de chantiers:', error);
    }
  };


  const [typesChantiers, setTypesChantiers] = useState([]);
  const [domainesChantiers, setDomainesChantiers] = useState([]);
  const [naturesChantiers, setNaturesChantiers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const types = await fetchTypesChantiers();
      setTypesChantiers(types);

      const domaines = await fetchDomainesChantiers();
      setDomainesChantiers(domaines);

      const natures = await fetchNaturesChantiers();
      setNaturesChantiers(natures);
    };

    loadData();
  }, []);

  const handleAdresseChange = async (query) => {
    if (!query) return setSuggestions([]);

    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=20`);
    const data = await response.json();
    setSuggestions(data.features || []);
  };

  const handleSelectAdresse = (suggestion) => {
    const fullAddress = suggestion.properties.label;
    const city = suggestion.properties.city;
    const postcode = suggestion.properties.postcode;

    setValue("adresse_siege_social", fullAddress);
    setValue("ville", city);
    setValue("code_postal", postcode);
    setSuggestions([]);
  };
  

  return (
    <div className="h-auto my-16 text-white flex flex-col items-center justify-center w-full my-10">
      <div className="text-center mb-8">
        <Link to="/" className="inline-block">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center">
            <span className="text-blue-400">DCE</span>Manager
          </h2>
        </Link>
        <p className="mt-2 text-white/60">Inscrivez-vous pour recevoir des appels d'offres à jour recueillis depuis le BOAMP</p>
      </div>
      
      <div className="mx-auto w-[85%] animated-border-glow cosmic-card bg-[#1E2532]/80 backdrop-blur-md rounded-lg border border-white/5 space-y-16 p-6">
        <div className="flex space-x-4 h-24 w-full justify-center">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${i === step ? "bg-neon-blue text-white border-neon-blue" : "border-gray-500"}`}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className="w-24 h-0.5 bg-gray-500" />}
            </div>
          ))}
        </div>
  
        <div className="mt-8 flex flex-col w-full min-h-[500px] justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {step === 0 && (
                <div>
                  <div className="flex flex-col mb-4 border-1 border p-2">
                    <h2 className="text-xl font-semibold mb-1 flex gap-4">
                      <Building />
                      <p>Type de l'entreprise</p>
                    </h2>
                    <p className="text-sm text-gray-400">
                      Merci d'indiquer le type d'entreprise que vous représentez. Cela nous aidera à vous fournir des offres adaptées à vos besoins.
                    </p>
                  </div>
  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleCardSelect("type_entreprise", "TPE")}
                      className="p-6 border border-gray-600 rounded-lg hover:border-neon-blue flex flex-col items-center justify-center"
                    >
                      <Home className="text-3xl mb-2" />
                      <div className="font-bold mb-2">TPE</div>
                      <div className="text-sm">Moins de 10 salariés</div>
                    </button>
                    <button
                      onClick={() => handleCardSelect("type_entreprise", "PME")}
                      className="p-6 border border-gray-600 rounded-lg hover:border-neon-blue flex flex-col items-center justify-center"
                    >
                      <BriefcaseBusiness className="text-3xl mb-2" />
                      <div className="font-bold mb-2">PME</div>
                      <div className="text-sm">De 10 à 250 salariés</div>
                    </button>
                  </div>
                </div>
              )}
  
              {step === 1 && (
                <div>
                  <div className="flex flex-col mb-4 border-1 border p-2">
                    <h2 className="text-xl font-semibold mb-1 flex gap-4">
                      <Info />
                      <p>Informations sur l'entreprise</p>
                    </h2>
                    <p className="text-sm text-gray-400">
                      Merci de renseigner les informations de base sur votre entreprise, ainsi que vos domaines d'expertise et types de chantiers.
                    </p>
                  </div>
                  <fieldset className="grid grid-cols-2 gap-4">
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
                          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                        />
                        {errors.nom_entreprise && (
                          <span className="text-red-500 text-sm">{errors.nom_entreprise.message}</span>
                        )}
                      </div>

                      {/* Numéro SIRET */}
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
                            maxLength={14}
                            {...register("numero_siret", {
                              required: "Ce champ est requis",
                              pattern: {
                                value: /^\d{14}$/,
                                message: "Le numéro SIRET doit contenir exactement 14 chiffres",
                              },
                            })}
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                            }}
                            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                          />

                        {errors.numero_siret && (
                          <span className="text-red-500 text-sm">{errors.numero_siret.message}</span>
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
                            onChange={(e) => handleAdresseChange(e.target.value)}
                            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
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
                                  onClick={() => handleSelectAdresse(s)}
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
                          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
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
                          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                        />
                        {/* {errors.zone_chalandise && (
                          <span className="text-red-500 text-sm">{errors.zone_chalandise.message}</span>
                        )} */}
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



                      {/* Types de chantiers */}
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

                      {/* Natures de chantiers */}
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
                    <button  onClick={back} className="text-sm text-gray-400">Retour</button>
                    <button onClick={next} className="bg-neon-blue px-4 py-2 rounded-full text-white">Suivant</button>
                  </div>
                </div>
              )}
  
              {step === 2 && (
                <div>
                  <div className="flex flex-col mb-4 border-1 border p-2">
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
                        className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                        type="number"
                        min={1}
                      />
                      {errors.nombre_ao_mensuels && <span className="text-red-500 text-sm">{errors.nombre_ao_mensuels.message}</span>}
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Intérêt</label>
                      <select
                        {...register("interest", { required: "Ce champ est requis" })}
                        className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-sm"
                      >
                        <option value="">Choisissez</option>
                        <option value="Privés">Privés</option>
                        <option value="Publics">Publics</option>
                        <option value="Les deux">Les deux</option>
                      </select>
                      {errors.interest && <span className="text-red-500 text-sm">{errors.interest.message}</span>}
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm mb-2">Budget et conditions financières</label>
                      <textarea
                        name="budget_conditions_financieres"
                        {...register("budget_conditions_financieres", { required: "Ce champ est requis" })}
                        className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                        
                      />
                      {errors.budget_conditions_financieres && <span className="text-red-500 text-sm">{errors.budget_conditions_financieres.message}</span>}
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button onClick={back} className="text-sm text-gray-400">Retour</button>
                    <button onClick={next} className="bg-neon-blue px-4 py-2 rounded-full text-white">Suivant</button>
                  </div>
                </div>
              )}
  
              {step === 3 && (
                <div>
                  <div className="flex flex-col mb-4 border-1 border p-2">
                    <h2 className="text-xl font-semibold mb-1 flex gap-4">
                      <User />
                      Vos informations personnelles
                    </h2>
                    <p className="text-sm text-gray-400">
                      Merci de renseigner vos coordonnées pour finaliser l'inscription.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Champ : Nom */}
                      <div>
                        <label htmlFor="nom" className="block text-sm mb-2">Nom</label>
                        <input
                          type="text"
                          {...register("nom", {
                            minLength: { value: 1, message: "Nom trop court" },
                          })}
                          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                        />
                        {errors.nom && <span className="text-red-500 text-sm">{errors.nom.message}</span>}
                      </div>

                      {/* Champ : Prénom */}
                      <div>
                        <label htmlFor="prenom" className="block text-sm mb-2">Prénom</label>
                        <input
                          id="prenom"
                          type="text"
                          {...register("prenom", {
                            required: "Prénom est requis",
                            minLength: { value: 1, message: "Prénom trop court" },
                          })}
                          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                        />
                        {errors.prenom && <span className="text-red-500 text-sm">{errors.prenom.message}</span>}
                      </div>

                      {/* Champ : Email professionnel */}
                      <div>
                        <label htmlFor="email" className="block text-sm mb-2">Email professionnel</label>
                        <input
                          id="email"
                          type="email"
                          {...register("email", {
                            required: "Email est requis",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Adresse email invalide",
                            },
                          })}
                          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                      </div>

                      {/* Champ : Mot de passe */}
                      <div>
                        <label htmlFor="password" className="block text-sm mb-2">Mot de passe</label>
                        <input
                          id="password"
                          type="password"
                          {...register("password", {
                            required: "Mot de passe requis",
                            minLength: { value: 6, message: "Minimum 6 caractères" },
                          })}
                          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
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
