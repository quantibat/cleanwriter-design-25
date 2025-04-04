import React from "react";

const DetailItem = ({ label, value, isMultiline }) => (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium text-gray-100">{label}</dt>
      <dd className={`mt-1 text-sm text-gray-100 sm:col-span-2 sm:mt-0 ${isMultiline ? '' : 'truncate'}`}>
        {value}
      </dd>
    </div>
);

const TenderDetail = ({ tender }) => {
  console.log(tender);
  return (
    <div className="flex flex-col gap-2">
    <div className="flex flex-col">
    <div className="py-1">
      <h2 className="text-3xl font-bold text-white">{tender.title}</h2>
    </div>
  </div>
    <div className="bg-[#384454] shadow rounded-lg p-6">
      <div className="mt-6 border-t border-gray-300">
        <dl className="divide-y divide-gray-300">
          <DetailItem label="Entreprise sous traitante" value={tender.company} isMultiline={false}/>
          <DetailItem label="Localisation" value={tender.location} isMultiline={false} />
          <DetailItem label="Type de contrat" value={tender.contractType} isMultiline={false} />
          <DetailItem label="Date de publication" value={tender.date} isMultiline={false} />
          <DetailItem label="Description" value={tender.description} isMultiline />
          {tender.attachments && tender.attachments.length > 0 && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">Pièces jointes</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  {tender.attachments.map((file, index) => (
                    <li key={index} className="flex items-center justify-between py-4 pr-5 pl-4 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <svg className="size-5 shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">{file.name}</span>
                          <span className="shrink-0 text-gray-400">{file.size}</span>
                        </div>
                      </div>
                      <div className="ml-4 shrink-0">
                        <a href={file.url} className="font-medium text-indigo-600 hover:text-indigo-500" download>
                          Télécharger
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
    </div>
  );
};


export default  TenderDetail;
