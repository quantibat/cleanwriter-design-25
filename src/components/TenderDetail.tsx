import React from "react";
import ScoreCircle from "./ui/score";
import LinearProgressBar from "./ui/linearprogress";
import { Button } from "./ui/button";

export const DetailItem = ({ label, value }) => (
  <div className="mb-6 flex-col justify-center items-center gap-4 bg-transparent w-auto">
    <dt className="text-sm font-semibold text-neon-blue px-2 py-1 rounded-full border border-neon-blue shadow-neon mb-4">
      {label}
    </dt>
    <dd className="text-xs text-gray-300 drop-shadow-neon">
      {value}
    </dd>
  </div>
)

const TenderDetail = ({ tender }) => {
  return (
    <div className="flex-col gap-4">
    <div className="flex gap-4 w-full ">
        <div className="py-1">       
          <h2 className="text-3xl font-bold text-white mb-4"> {tender && tender.appel_offre.metadata?.Objet_Appel_Offre} </h2>
        </div>
    </div>
    <div className="flex flex-col gap-4">
      <div className=" w-full bg-[#0f172a]/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#384454] ">
        <dl className=" gap-4 md:grid md:grid-cols-4 sm:grid sm:grid-cols-2 sm:gap-4">
          <div className="flex items-center w-full">
            <DetailItem label="Acheteur" value={"ESSAI"} />
          </div>
          <div className="flex items-center w-full">
            <DetailItem label="Localisation" value={tender && tender.appel_offre.metadata?.Code_Postal}/>
          </div>
          <div className="flex items-center w-full">
            <DetailItem label="Type de contrat" value={tender && tender.appel_offre.metadata?.Type_Projet}/>
          </div>
          <div className="flex items-center w-full">
            <DetailItem label="A remettre au plus tard" value={tender && tender.appel_offre.metadata?.EndDate}/>
          </div>
        </dl>
      </div>

      <div className="w-full bg-[#0f172a]/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#384454]">
        <div className="flex mb-4">
          <h3 className="font-semibold text-2xl">Correspondance</h3>
          <div className="flex justify-self-end items-center ml-auto absolute right-0 top-0 pr-4 pt-4">
          <ScoreCircle score={tender && tender.score_final} size={120} taille={"text-2xl"}/>
        </div>
        </div>
        <p className="text-sm text-gray-300 mb-4 max-w-[70%] ">
            Ce marché public correspond parfaitement à votre profil, tant par les compétences recherchées que par les exigences techniques du projet. Votre expérience, vos réalisations passées et votre savoir-faire spécifique vous placent comme un candidat idéal pour répondre aux besoins exprimés dans ce cahier des charges. C’est une opportunité en adéquation avec votre expertise et vos objectifs professionnels.
        </p>
        <div className="gap-4 md:grid md:grid-cols-2 sm:grid sm:grid-cols-1 sm:gap-4 items-center max-w-[100%]">
          {tender && tender.Scoring.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              <b className="text-sm text-gray-300">{item.Critère}</b>
              <LinearProgressBar score={item.Note}/>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-[#0f172a]/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg h-auto  flex flex-col justify-between mb-20">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
          <p className="text-sm text-gray-300 whitespace-pre-line">{tender && tender.appel_offre.content}</p>
        </div>
        <div className="mt-6">
            <ul className="space-y-3">
            <li className="flex justify-between items-center bg-[#1e293b]/70 p-3 rounded-lg text-sm text-white border border-[#384454]">
                  <span className="truncate">{"Document"}</span>
                  <Button
                  variant="outline"
                  className="text-xs border-neon-blue bg-transparent-200 hover:border-none hover:bg-gray-300 hover:text-gray-900 py-0"
                  onClick={() => window.open(tender && tender.url_ao, "_blank")} 
                >
                  <span>Voir le document</span>  
                </Button>
                </li>
            </ul>
          </div>
      </div>
    </div>
    </div>
  );
};

export default TenderDetail;

