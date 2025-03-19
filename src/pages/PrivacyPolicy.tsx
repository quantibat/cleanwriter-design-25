import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const PrivacyPolicy = () => {
  return <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 px-6 py-[130px]">
        <div className="max-w-4xl mx-auto prose prose-invert prose-blue">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Politique de Confidentialité</h1>
          
          <p className="text-muted-foreground mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Chez DCEManager, nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique de confidentialité vous explique comment nous collectons, utilisons, partageons et protégeons vos informations lorsque vous utilisez notre site web et nos services.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Données que nous collectons</h2>
            <p>
              Nous pouvons collecter les types d'informations suivants :
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Informations d'identification personnelle (nom, adresse e-mail, numéro de téléphone)</li>
              <li>Informations professionnelles (entreprise, poste)</li>
              <li>Informations techniques (adresse IP, type d'appareil, navigateur)</li>
              <li>Données d'utilisation (pages consultées, temps passé sur le site)</li>
              <li>Informations de facturation (détails de paiement, historique des transactions)</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Comment nous utilisons vos données</h2>
            <p>
              Nous utilisons vos données personnelles aux fins suivantes :
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Fournir, exploiter et maintenir nos services</li>
              <li>Améliorer, personnaliser et développer nos services</li>
              <li>Comprendre et analyser comment vous utilisez nos services</li>
              <li>Communiquer avec vous, y compris pour le service client</li>
              <li>Vous envoyer des mises à jour, des promotions et des informations marketing</li>
              <li>Prévenir la fraude et renforcer la sécurité</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Partage des données</h2>
            <p>
              Nous ne vendons pas vos données personnelles à des tiers. Cependant, nous pouvons partager vos informations dans les situations suivantes :
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Avec nos fournisseurs de services qui nous aident à exploiter notre plateforme</li>
              <li>Pour se conformer aux obligations légales</li>
              <li>En cas de fusion, acquisition ou vente d'actifs</li>
              <li>Avec votre consentement ou selon vos instructions</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Conservation des données</h2>
            <p>
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services ou pour d'autres fins essentielles, telles que le respect de nos obligations légales, la résolution des litiges et l'application de nos politiques.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
            <p>
              Selon votre lieu de résidence, vous pouvez avoir certains droits concernant vos données personnelles, notamment :
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification des informations inexactes</li>
              <li>Droit à l'effacement de vos données</li>
              <li>Droit d'opposition au traitement de vos données</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit de retirer votre consentement</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l'abus, l'accès non autorisé, la divulgation ou la modification.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement important en publiant la nouvelle politique sur notre site web et en vous informant par e-mail.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Nous contacter</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité ou nos pratiques en matière de données, veuillez nous contacter à :
            </p>
            <p className="mt-2">
              Email: <a href="mailto:privacy@dcemanager.com" className="text-blue-400 hover:text-blue-300">privacy@dcemanager.com</a>
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default PrivacyPolicy;