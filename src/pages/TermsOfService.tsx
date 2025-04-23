import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const TermsOfService = () => {
  return <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 px-6 pt-[130px]">
        <div className="max-w-4xl mx-auto prose prose-invert prose-blue">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Conditions d'Utilisation</h1>
          
          <p className="text-muted-foreground mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptation des Conditions</h2>
            <p>
              En accédant à DCEManager et en utilisant nos services, vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. Description du Service</h2>
            <p>
              DCEManager est une plateforme qui permet aux utilisateurs de créer, gérer et collaborer sur des dossiers de consultation des entreprises (DCE). Notre service comprend des outils de gestion de documents, de collaboration et d'analyse.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">3. Comptes Utilisateurs</h2>
            <p>
              Pour accéder à certaines fonctionnalités de DCEManager, vous devez créer un compte. Vous êtes responsable de maintenir la confidentialité de vos informations de compte et de toutes les activités qui se produisent sous votre compte.
            </p>
            <p className="mt-2">
              Vous devez :
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Fournir des informations exactes, à jour et complètes lors de la création de votre compte</li>
              <li>Mettre à jour rapidement vos informations pour qu'elles restent exactes</li>
              <li>Protéger votre mot de passe et ne pas le partager</li>
              <li>Nous informer immédiatement de toute utilisation non autorisée de votre compte</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Abonnements et Paiements</h2>
            <p>
              DCEManager propose différents plans d'abonnement. En souscrivant à un abonnement payant :
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Vous acceptez de payer tous les frais associés à votre plan</li>
              <li>Les paiements sont non remboursables, sauf indication contraire</li>
              <li>Nous pouvons modifier les tarifs avec un préavis de 30 jours</li>
              <li>Les abonnements se renouvellent automatiquement, sauf si vous les annulez</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Propriété intellectuelle</h2>
            <p>
              DCEManager et son contenu original, fonctionnalités et fonctionnalités sont et resteront la propriété exclusive de notre entreprise. Notre service est protégé par le droit d'auteur, les marques de commerce et d'autres lois.
            </p>
            <p className="mt-2">
              En utilisant notre service, vous vous engagez à ne pas :
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Copier, modifier ou créer des œuvres dérivées de notre contenu</li>
              <li>Utiliser notre contenu à des fins commerciales sans autorisation</li>
              <li>Tenter de décompiler ou désassembler notre plateforme</li>
              <li>Supprimer les avis de copyright ou autres mentions de propriété</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">6. Contenu utilisateur</h2>
            <p>
              En téléchargeant ou en créant du contenu sur DCEManager :
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Vous conservez tous les droits de propriété sur votre contenu</li>
              <li>Vous nous accordez une licence mondiale pour utiliser, stocker et afficher votre contenu</li>
              <li>Vous déclarez avoir le droit de partager ce contenu</li>
              <li>Vous êtes responsable de la sauvegarde de votre contenu</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">7. Utilisation Interdite</h2>
            <p>
              Vous ne devez pas utiliser DCEManager pour :
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Violer des lois ou réglementations</li>
              <li>Enfreindre les droits de propriété intellectuelle d'autrui</li>
              <li>Transmettre des logiciels malveillants ou des virus</li>
              <li>Collecter des informations d'utilisateurs sans consentement</li>
              <li>Harceler, abuser ou nuire à d'autres utilisateurs</li>
              <li>Interférer avec le bon fonctionnement du service</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">8. Limitation de Responsabilité</h2>
            <p>
              Dans la mesure maximale permise par la loi, DCEManager ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, ou de toute perte de profits ou de revenus.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">9. Modifications des Conditions</h2>
            <p>
              Nous nous réservons le droit de modifier ces conditions à tout moment. Nous vous informerons des changements significatifs par e-mail ou par une notification sur notre site.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
            <p>
              Si vous avez des questions concernant ces Conditions d'Utilisation, veuillez nous contacter à :
            </p>
            <p className="mt-2">
              Email: <a href="mailto:terms@dcemanager.com" className="text-blue-400 hover:text-blue-300">terms@dcemanager.com</a>
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default TermsOfService;