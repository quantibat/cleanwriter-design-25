import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, Building, Home, Info, User } from "lucide-react";

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
  const [formData, setFormData] = useState({
    type_entreprise: "",
    nom_entreprise: "",
    numero_siret: "",
    adresse_siege_social: "",
    ville: "",
    zone_chalandise: "",
    domaines_expertises: [],
    type_chantiers: [],
    Natures_Chantiers: [],
    nombre_ao_mensuels: "",
    interest: "",
    budget_conditions_financieres: "",
    nom_prenom_contact: "",
    email: "",
    password: ""
  });

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (key, value) => {
    const updated = formData[key].includes(value)
      ? formData[key].filter((v) => v !== value)
      : [...formData[key], value];
    setFormData({ ...formData, [key]: updated });
  };

  const handleCardSelect = (key, value) => {
    setFormData({ ...formData, [key]: value });
    next();
  };

  const handleSubmit = () => {
    console.log("Submitted data:", formData);
    // fetch('/api/onboarding', { method: 'POST', body: JSON.stringify(formData) })
  };

  return (
    <div className="h-screen my-auto text-white flex flex-col items-center justify-center p-6 w-[85%] mx-auto border border-gray-700 rounded-lg bg-gray-900 space-y-16 my-10">
      <div className="flex space-x-4 h-24 w-full justify-center">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                i === step ? "bg-neon-blue text-white border-neon-blue" : "border-gray-500"
              }`}
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
                    <p> Vous êtes une </p>
                  </h2>
                  <p className="text-sm text-gray-400 ">
                    Merci de renseigner les informations de base sur votre entreprise, ainsi que vos domaines d'expertise et types de chantiers.
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
                    <Building />
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
                        value={formData[name]}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                      />
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
                            formData.domaines_expertises.includes(option)
                              ? "bg-neon-blue border-neon-blue"
                              : "border-gray-600"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {["type_chantiers", "Natures_Chantiers"].map((key) => (
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
                              formData[key].includes(option)
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
                  <button onClick={back} className="text-sm text-gray-400">Retour</button>
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
                      value={formData.nombre_ao_mensuels}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Intérêt</label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-sm"
                    >
                      <option value="">Choisissez</option>
                      <option value="Privés">Privés</option>
                      <option value="Publics">Publics</option>
                      <option value="Les deux">Les deux</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm mb-2">Budget et conditions financières</label>
                    <textarea
                      name="budget_conditions_financieres"
                      value={formData.budget_conditions_financieres}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                    />
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
                    Veuillez entrer vos coordonnées pour finaliser la création du compte.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Nom et prénom</label>
                    <input
                      name="nom_prenom_contact"
                      value={formData.nom_prenom_contact}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Email professionnel</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm mb-2">Mot de passe</label>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-gray-800 border border-gray-700"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button onClick={back} className="text-sm text-gray-400">Retour</button>
                  <button onClick={handleSubmit} className="bg-neon-blue px-4 py-2 rounded-full text-white">Enregistrer</button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

