// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { BriefcaseBusiness, Building, Home, Info, User } from "lucide-react";
// import { Link } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/components/ui/use-toast";

// const steps = [
//   "Type d'entreprise",
//   "Informations entreprise",
//   "Appels d'offres",
//   "Création du compte",
// ];

// const expertiseOptions = ["Bardage", "Étanchéité", "Gros Œuvre", "Second Œuvre"];
// const chantierTypes = ["Bâtiments Industriels", "Bâtiments Agricoles"];
// const chantierNatures = ["Construction", "Rénovation", "Extension"];

// export default function OnboardingDCEManager() {
//   const [step, setStep] = useState(0);
//   const [formData, setFormData] = useState({
//     type_entreprise: "",
//     nom_entreprise: "",
//     numero_siret: "",
//     adresse_siege_social: "",
//     ville: "",
//     zone_chalandise: "",
//     domaines_expertises: [],
//     type_chantiers: [],
//     natures_chantiers: [],
//     nombre_ao_mensuels: "",
//     // interest: "",
//     budget_conditions_financieres: "",
//     nom_prenom_contact: "",
//     email: "",
//     password: ""
//   });

//   const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
//   const back = () => setStep((prev) => Math.max(prev - 1, 0));
//   const { toast } = useToast();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleMultiSelect = (key, value) => {
//     const updated = formData[key].includes(value)
//       ? formData[key].filter((v) => v !== value)
//       : [...formData[key], value];
//     setFormData({ ...formData, [key]: updated });
//   };

//   const handleCardSelect = (key, value) => {
//     setFormData({ ...formData, [key]: value });
//     next();
//   };

//   const handleSubmit = async () => {
//     try {
//       // Insérer l'entreprise dans la table "entreprises"
//       const { data: entrepriseData, error: entrepriseError } = await supabase
//         .from('entreprises')
//         .insert([
//           {
//             type_entreprise: formData.type_entreprise,
//             nom_entreprise: formData.nom_entreprise,
//             numero_siret: formData.numero_siret,
//             adresse_siege_social: formData.adresse_siege_social,
//             ville: formData.ville,
//             zone_chalandise: formData.zone_chalandise,
//             nombre_ao_mensuels: formData.nombre_ao_mensuels,
//             budget_conditions_financieres: formData.budget_conditions_financieres,
//             nom_prenom_contact: formData.nom_prenom_contact,
//             email: formData.email,
//             password: formData.password,
//           },
//         ])
//         .single(); // Utilise .single() pour obtenir une seule ligne insérée.
  
//       if (entrepriseError) throw entrepriseError;
  
//       console.log('Entreprise insérée avec succès:', entrepriseData);
  
//       // Récupérer les ID des domaines d'expertise, types de chantiers, natures de chantiers
//       const { data: domainesData, error: domainesError } = await supabase
//         .from('domaines_expertises')
//         .select('id')
//         .in('nom', formData.domaines_expertises);
  
//       if (domainesError) throw domainesError;
  
//       const { data: typesData, error: typesError } = await supabase
//         .from('types_chantiers')
//         .select('id')
//         .in('nom', formData.type_chantiers);
  
//       if (typesError) throw typesError;
  
//       const { data: naturesData, error: naturesError } = await supabase
//         .from('natures_chantiers')
//         .select('id')
//         .in('nom', formData.natures_chantiers);
  
//       if (naturesError) throw naturesError;
  
//       // Insérer les relations dans les tables de jointure
//       const entrepriseId = entrepriseData?.id; // ID de l'entreprise insérée
  
//       const domainesInsert = domainesData.map((domaine) => ({
//         entreprise_id: entrepriseId,
//         domaine_id: domaine.id,
//       }));
//       const typesInsert = typesData.map((type) => ({
//         entreprise_id: entrepriseId,
//         type_id: type.id,
//       }));
//       const naturesInsert = naturesData.map((nature) => ({
//         entreprise_id: entrepriseId,
//         nature_id: nature.id,
//       }));
  
//       // Insertion dans les tables de jointure
//       const { error: insertDomainesError } = await supabase
//         .from('entreprises_domaines_expertises')
//         .upsert(domainesInsert);
  
//       if (insertDomainesError) throw insertDomainesError;
  
//       const { error: insertTypesError } = await supabase
//         .from('entreprises_types_chantiers')
//         .upsert(typesInsert);
  
//       if (insertTypesError) throw insertTypesError;
  
//       const { error: insertNaturesError } = await supabase
//         .from('entreprises_natures_chantiers')
//         .upsert(naturesInsert);
  
//       if (insertNaturesError) throw insertNaturesError;
  
//       console.log('Relations ajoutées avec succès.');
  
//       // Réinitialiser les champs ou rediriger l'utilisateur si nécessaire
  
//     } catch (error) {
//       console.error('Erreur lors de l\'insertion dans Supabase:', error);
//     }
//   };
  
//   const validateForm = () => {
//     for (const key in formData) {
//       if (formData[key] === "" || (Array.isArray(formData[key]) && formData[key].length === 0)) {
       
//         return false;
//       }
//     }
//     return true;
//   };

//   return (
//     <div className="h-auto my-16 text-white flex flex-col items-center justify-center w-full my-10">
//       <div className="text-center mb-8">
//           <Link to="/" className="inline-block">
//             <h2 className="text-2xl font-bold text-white flex items-center justify-center">
//               <span className="text-blue-400">DCE</span>Manager
//             </h2>
//           </Link>
//           <p className="mt-2 text-white/60">Inscrivez-vous pour recevoir des appel d'offres à jour recueillies depuis le boamp</p>
//       </div>
//       <div className="mx-auto w-[85%] animated-border-glow cosmic-card bg-[#1E2532]/80 backdrop-blur-md rounded-lg border border-white/5 space-y-16 p-6 ">
//       <div className="flex space-x-4 h-24 w-full justify-center">
//         {steps.map((s, i) => (
//           <div key={i} className="flex items-center space-x-2">
//             <div
//               className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
//                 i === step ? "bg-neon-blue text-white border-neon-blue" : "border-gray-500"
//               }`}
//             >
//               {i + 1}
//             </div>
//             {i < steps.length - 1 && <div className="w-24 h-0.5 bg-gray-500" />}
//           </div>
//         ))}
//       </div>

//       <div className="mt-8 flex flex-col w-full min-h-[500px] justify-center">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={step}
//             initial={{ x: 100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: -100, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="w-full"
//           >
//             {step === 0 && (
//               <div>
//                 <div className="flex flex-col mb-4 border-1 border p-2">
//                   <h2 className="text-xl font-semibold mb-1 flex gap-4">
//                     <Building />
//                     <p>Type de l'entreprise </p>
//                   </h2>
//                   <p className="text-sm text-gray-400 ">
//                     Merci d'indiquer le type d'entreprise que vous représentez. Cela nous aidera à vous fournir des offres adaptées à vos besoins.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <button
//                     onClick={() => handleCardSelect("type_entreprise", "TPE")}
//                     className="p-6 border border-gray-600 rounded-lg hover:border-neon-blue flex flex-col items-center justify-center"
//                   >
//                     <Home className="text-3xl mb-2" />
//                     <div className="font-bold mb-2">TPE</div>
//                     <div className="text-sm">Moins de 10 salariés</div>
//                   </button>
//                   <button
//                     onClick={() => handleCardSelect("type_entreprise", "PME")}
//                     className="p-6 border border-gray-600 rounded-lg hover:border-neon-blue flex flex-col items-center justify-center"
//                   >
//                     <BriefcaseBusiness className="text-3xl mb-2" />
//                     <div className="font-bold mb-2">PME</div>
//                     <div className="text-sm">De 10 à 250 salariés</div>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {step === 1 && (
//               <div>
//                 <div className="flex flex-col mb-4 border-1 border p-2">
//                   <h2 className="text-xl font-semibold mb-1 flex gap-4">
//                     <Info />
//                     <p>Informations sur l'entreprise</p>
//                   </h2>
//                   <p className="text-sm text-gray-400">
//                     Merci de renseigner les informations de base sur votre entreprise, ainsi que vos domaines d'expertise et types de chantiers.
//                   </p>
//                 </div>
//                 <fieldset className="grid grid-cols-2 gap-4">
//                   {[
//                     ["nom_entreprise", "Nom de l'entreprise"],
//                     ["numero_siret", "Numéro SIRET"],
//                     ["adresse_siege_social", "Adresse du siège social"],
//                     ["ville", "Ville"],
//                     ["zone_chalandise", "Zone de chalandise"],
//                   ].map(([name, label]) => (
//                     <div key={name}>
//                       <label htmlFor={name} className="block text-sm mb-2">{label}</label>
//                       <input
//                         id={name}
//                         name={name}
//                         value={formData[name]}
//                         onChange={handleChange}
//                         className="w-full p-3 rounded bg-gray-800 border border-gray-700"
//                       />
//                     </div>
//                   ))}

//                   <div className="col-span-2 mt-4">
//                     <label className="block text-sm mb-2">Domaines d’expertise</label>
//                     <div className="flex flex-wrap gap-2">
//                       {expertiseOptions.map((option) => (
//                         <button
//                           key={option}
//                           type="button"
//                           onClick={() => handleMultiSelect("domaines_expertises", option)}
//                           className={`px-3 py-1 border rounded-full text-sm ${
//                             formData.domaines_expertises.includes(option)
//                               ? "bg-neon-blue border-neon-blue"
//                               : "border-gray-600"
//                           }`}
//                         >
//                           {option}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {["type_chantiers", "natures_chantiers"].map((key) => (
//                     <div key={key} className="col-span-1 mt-4">
//                       <label className="block text-sm mb-2">
//                         {key === "type_chantiers" ? "Types de chantiers" : "Natures de chantiers"}
//                       </label>
//                       <div className="flex flex-wrap gap-2 text-sm">
//                         {(key === "type_chantiers" ? chantierTypes : chantierNatures).map((option) => (
//                           <button
//                             key={option}
//                             type="button"
//                             onClick={() => handleMultiSelect(key, option)}
//                             className={`px-3 py-1 border rounded-full text-sm ${
//                               formData[key].includes(option)
//                                 ? "bg-neon-blue border-neon-blue"
//                                 : "border-gray-600"
//                             }`}
//                           >
//                             {option}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </fieldset>
//                 <div className="flex justify-between mt-6">
//                   <button onClick={back} className="text-sm text-gray-400">Retour</button>
//                   <button onClick={next} className="bg-neon-blue px-4 py-2 rounded-full text-white">Suivant</button>
//                 </div>
//               </div>
//             )}

//             {step === 2 && (
//               <div>
//                 <div className="flex flex-col mb-4 border-1 border p-2">
//                   <h2 className="text-xl font-semibold mb-1 flex gap-4">
//                     <BriefcaseBusiness />
//                     <p>Appels d'offres souhaités</p>
//                   </h2>
//                   <p className="text-sm text-gray-400">
//                     Indiquez votre volume d'appels d'offres, vos préférences (public/privé), ainsi que vos conditions financières.
//                   </p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm mb-2">Nombre d'appels d'offres mensuels</label>
//                     <input
//                       name="nombre_ao_mensuels"
//                       value={formData.nombre_ao_mensuels}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded bg-gray-800 border border-gray-700"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm mb-2">Intérêt</label>
//                     <select
//                       name="interest"
//                       value={formData.interest}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-sm"
//                     >
//                       <option value="">Choisissez</option>
//                       <option value="Privés">Privés</option>
//                       <option value="Publics">Publics</option>
//                       <option value="Les deux">Les deux</option>
//                     </select>
//                   </div>
//                   <div className="col-span-2">
//                     <label className="block text-sm mb-2">Budget et conditions financières</label>
//                     <textarea
//                       name="budget_conditions_financieres"
//                       value={formData.budget_conditions_financieres}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded bg-gray-800 border border-gray-700"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-between mt-6">
//                   <button onClick={back} className="text-sm text-gray-400">Retour</button>
//                   <button onClick={next} className="bg-neon-blue px-4 py-2 rounded-full text-white">Suivant</button>
//                 </div>
//               </div>
//             )}

//             {step === 3 && (
//               <div>
//                 <div className="flex flex-col mb-4 border-1 border p-2">
//                   <h2 className="text-xl font-semibold mb-1 flex gap-4">
//                     <User />
//                     Vos informations personnelles
//                   </h2>
//                   <p className="text-sm text-gray-400">
//                     Veuillez entrer vos coordonnées pour finaliser la création du compte.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm mb-2">Nom et prénom</label>
//                     <input
//                       name="nom_prenom_contact"
//                       value={formData.nom_prenom_contact}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded bg-gray-800 border border-gray-700"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm mb-2">Email professionnel</label>
//                     <input
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded bg-gray-800 border border-gray-700"
//                     />
//                   </div>
//                   <div className="col-span-2">
//                     <label className="block text-sm mb-2">Mot de passe</label>
//                     <input
//                       name="password"
//                       type="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded bg-gray-800 border border-gray-700"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-between mt-6">
//                   <button onClick={back} className="text-sm text-gray-400">Retour</button>
//                   <button onClick={handleSubmit} className="bg-neon-blue px-4 py-2 rounded-full text-white">Enregistrer</button>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, Building, Home, Info, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"; 
import { useForm } from "react-hook-form"; 
import { supabase } from "@/integrations/supabase/client";

const steps = [
  "Type d'entreprise",
  "Informations entreprise",
  "Appels d'offres",
  "Création du compte",
];

const expertiseOptions = ["Bardage", "Étanchéité", "Gros Œuvre", "Second Œuvre"];
const chantierTypes = ["Bâtiments Industriels", "Bâtiments Agricoles"];
const chantierNatures = ["Construction", "Rénovation", "Extension"];

export default function OnboardingDCEManager() {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  
  // Initialisation de useForm
  const { register, handleSubmit, formState: { errors }, setValue, getValues, trigger } = useForm({
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
      nom_prenom_contact: "",
      email: "",
      password: "",
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

  const handleMultiSelect = (key, value) => {
    const updated = getValues(key).includes(value)
      ? getValues(key).filter((v) => v !== value)
      : [...getValues(key), value];
    setValue(key, updated);
  };

  const handleCardSelect = (key, value) => {
    setValue(key, value);
    setStep((prev) => Math.min(prev + 1, steps.length - 1))
  };

  const onSubmit = async (data) => {
    console.log("Form Data Submitted: ", data);
    try {
      const { data: entrepriseData, error: entrepriseError } = await supabase
        .from('entreprises')
        .insert([
          {
            type_entreprise: data.type_entreprise,
            nom_entreprise: data.nom_entreprise,
            numero_siret: data.numero_siret,
            adresse_siege_social: data.adresse_siege_social,
            ville: data.ville,
            zone_chalandise: data.zone_chalandise,
            nombre_ao_mensuels: data.nombre_ao_mensuels,
            budget_conditions_financieres: data.budget_conditions_financieres,
            nom_prenom_contact: data.nom_prenom_contact,
            email: data.email,
            password: data.password,
          },
        ])
        .single(); // Utilise .single() pour obtenir une seule ligne insérée.
  
      if (entrepriseError) throw entrepriseError;
  
      console.log('Entreprise insérée avec succès:', entrepriseData);
  
      // Récupérer les ID des domaines d'expertise, types de chantiers, natures de chantiers
      const { data: domainesData, error: domainesError } = await supabase
        .from('domaines_expertises')
        .select('id')
        .in('nom', data.domaines_expertises);
  
      if (domainesError) throw domainesError;
  
      const { data: typesData, error: typesError } = await supabase
        .from('types_chantiers')
        .select('id')
        .in('nom', data.type_chantiers);
  
      if (typesError) throw typesError;
  
      const { data: naturesData, error: naturesError } = await supabase
        .from('natures_chantiers')
        .select('id')
        .in('nom', data.natures_chantiers);
  
      if (naturesError) throw naturesError;
  
      // Insérer les relations dans les tables de jointure
      const entrepriseId = entrepriseData?.id; // ID de l'entreprise insérée
  
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
  
      // Insertion dans les tables de jointure
      const { error: insertDomainesError } = await supabase
        .from('entreprises_domaines_expertises')
        .upsert(domainesInsert);
  
      if (insertDomainesError) throw insertDomainesError;
  
      const { error: insertTypesError } = await supabase
        .from('entreprises_types_chantiers')
        .upsert(typesInsert);
  
      if (insertTypesError) throw insertTypesError;
  
      const { error: insertNaturesError } = await supabase
        .from('entreprises_natures_chantiers')
        .upsert(naturesInsert);
  
      if (insertNaturesError) throw insertNaturesError;
  
      console.log('Relations ajoutées avec succès.');
  
      // Réinitialiser les champs ou rediriger l'utilisateur si nécessaire
  
    } catch (error) {
      console.error('Erreur lors de l\'insertion dans Supabase:', error);
    }
    toast({ title: "Formulaire envoyé", description: "Vos informations ont été envoyées avec succès." });
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
                    {[
                      ["nom_entreprise", "Nom de l'entreprise"],
                      ["numero_siret", "Numéro SIRET"],
                      ["adresse_siege_social", "Adresse du siège social"],
                      ["ville", "Ville"],
                      ["zone_chalandise", "Zone de chalandise"],
                    ].map(([name, label]) => (
                      <div key={name}>
                        <label htmlFor={name} className="block text-sm mb-2">{label}</label>
                        <input
                          id={name}
                          name={name}
                          {...register(name, { required: "Ce champ est requis" })}
                          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                        />
                        {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
                      </div>
                    ))}
  
                    <div className="col-span-2 mt-4">
                      <label className="block text-sm mb-2">Domaines d’expertise</label>
                      <div className="flex flex-wrap gap-2">
                        {expertiseOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleMultiSelect("domaines_expertises", option)}
                            className={`px-3 py-1 border rounded-full text-sm ${
                              getValues("domaines_expertises").includes(option)
                                ? "bg-neon-blue border-neon-blue"
                                : "border-gray-600"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {["type_chantiers", "natures_chantiers"].map((key) => (
                      <div key={key} className="col-span-1 mt-4">
                        <label className="block text-sm mb-2">
                          {key === "type_chantiers" ? "Types de chantiers" : "Natures de chantiers"}
                        </label>
                        <div className="flex flex-wrap gap-2 text-sm">
                          {(key === "type_chantiers" ? chantierTypes : chantierNatures).map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleMultiSelect(key, option)}
                              className={`px-3 py-1 border rounded-full text-sm ${
                                getValues("type_chantiers").includes(option)
                                  ? "bg-neon-blue border-neon-blue"
                                  : "border-gray-600"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
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
                    {[
                      ["nom", "Nom"],
                      ["prenom", "Prénom"],
                      ["email", "Email professionnel"],
                    ].map(([name, label]) => (
                      <div key={name}>
                        <label htmlFor={name} className="block text-sm mb-2">{label}</label>
                        <input
                          id={name}
                          name={name}
                          {...register(name, { required: `${label} est requis` })}
                          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                        />
                        {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
                      </div>
                    ))}
                    <div>
                      <label htmlFor="password" className="block text-sm mb-2">Mot de passe</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        {...register("password", { required: "Mot de passe requis" })}
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
