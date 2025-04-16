import React from "react";
import ScoreCircle from "./ui/score";
import LinearProgressBar from "./ui/linearprogress";
import { Button } from "./ui/button";

const DetailItem = ({ label, value }) => (
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
          <h2 className="text-3xl font-bold text-white mb-4">{ tender && tender.metadata?.Objet_Appel_Offre}</h2>
        </div>
    </div>
    <div className="flex flex-col gap-4">
      <div className=" w-full bg-[#0f172a]/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#384454] ">
        <dl className=" gap-4 md:grid md:grid-cols-4 sm:grid sm:grid-cols-2 sm:gap-4">
          <div className="flex items-center w-full">
            <DetailItem label="Entreprise sous traitante" value={"ESSAI"} />
          </div>
          <div className="flex items-center w-full">
            <DetailItem label="Localisation" value={tender && tender.metadata?.Code_Postal}/>
          </div>
          <div className="flex items-center w-full">
            <DetailItem label="Type de contrat" value={tender && tender.metadata?.Type_Projet}/>
          </div>
          <div className="flex items-center w-full">
            <DetailItem label="A remettre au plus tard" value={tender && tender.metadata?.EndDate}/>
          </div>
        </dl>
      </div>

      <div className=" w-full bg-[#0f172a]/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#384454]">
        <div className="flex mb-4">
          <h3 className="font-semibold text-2xl">Correspondance</h3>
          <div className="flex justify-self-end items-center ml-auto absolute right-0 top-0 pr-4 pt-4">
          <ScoreCircle score={56} size={120}/>
        </div>
        </div>
        <p className="text-sm text-gray-300 mb-4 max-w-[70%] ">
            Ce marché public correspond parfaitement à votre profil, tant par les compétences recherchées que par les exigences techniques du projet. Votre expérience, vos réalisations passées et votre savoir-faire spécifique vous placent comme un candidat idéal pour répondre aux besoins exprimés dans ce cahier des charges. C’est une opportunité en adéquation avec votre expertise et vos objectifs professionnels.
        </p>
        <div className="gap-4 md:grid md:grid-cols-2 sm:grid sm:grid-cols-1 sm:gap-4 items-center max-w-[100%]">
          <div className="flex flex-col gap-1 ">
              <p className="text-sm text-gray-300">Secteur d'activité</p>
              <LinearProgressBar score={"90"} />
          </div>
          <div className="flex flex-col  gap-1">
              <p className="text-sm text-gray-300">Compétences techniques</p>
              <LinearProgressBar score={"80"} />
          </div>
          <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-300">Secteur d'activité</p>
              <LinearProgressBar score={"56"} />
          </div>
          <div className="flex flex-col  gap-1">
              <p className="text-sm text-gray-300">Secteur d'activité</p>
              <LinearProgressBar score={"67"} />
          </div>
          <div className="flex flex-col  gap-1">
              <p className="text-sm text-gray-300">Secteur d'activité</p>
              <LinearProgressBar score={"30"} />
          </div>
        </div>
      </div>
      <div className="w-full bg-[#0f172a]/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg h-auto  flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
          <p className="text-sm text-gray-300 whitespace-pre-line">{tender && tender.content}</p>
        </div>
        {tender.attachments?.length > 0 && (
          <div className="mt-6">
            <h4 className="text-md font-semibold text-white mb-2">Documents</h4>
            <ul className="space-y-3">
              {tender?.attachments.map((file, index) => (
                <li key={index} className="flex justify-between items-center bg-[#1e293b]/70 p-3 rounded-lg text-sm text-white border border-[#384454]">
                  <span className="truncate">{file.name}</span>
                  <Button
                  variant="outline"
                  className="text-xs border-neon-blue bg-transparent-200 hover:border-none hover:bg-gray-300 hover:text-gray-900 py-0"
                  onClick={() => window.open(file.url, "_blank")} 
                >
                  <span>Voir le document</span>  
                </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default TenderDetail;

