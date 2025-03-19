
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();
  
  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-white/5 p-4">
        <div className="container mx-auto flex justify-center">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl text-foreground">
              <span className="text-blue-400">DCE</span>Manager
            </span>
            <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">ENHANCED</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Apprenez à utiliser <span className="text-blue-400">DCEManager</span> à son maximum potentiel en regardant cette courte vidéo
          </h1>
          
          <div className="my-12 rounded-xl overflow-hidden shadow-2xl border border-white/10 relative aspect-video">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
              <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <img 
              src="/public/lovable-uploads/bcaccbea-e0b6-43d6-a3ec-861d78ba2443.png" 
              alt="Vidéo de démonstration" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="my-12">
            <Button 
              onClick={handleGoToDashboard}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg h-auto rounded-md"
            >
              Accéder à votre compte DCEManager
            </Button>
          </div>
          
          <div className="mt-16 text-center text-blue-100/80">
            <p className="mb-4">
              Si vous rencontrez des problèmes en utilisant DCEManager, veuillez nous contacter à <a href="mailto:hello@dcemanager.com" className="text-blue-400 hover:underline">hello@dcemanager.com</a>
            </p>
            <p>
              Notre équipe de support conviviale et compétente sera heureuse de vous aider.
            </p>
          </div>
          
          <div className="mt-16 flex justify-center space-x-6">
            <a href="#" className="text-blue-100/60 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-blue-100/60 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            <a href="#" className="text-blue-100/60 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
          
          <div className="mt-12 text-sm text-blue-100/60 flex flex-wrap justify-center gap-4">
            <Link to="/" className="hover:text-blue-400">Accueil</Link>
            <span>|</span>
            <Link to="/roadmap" className="hover:text-blue-400">Feuille de route</Link>
            <span>|</span>
            <Link to="/signin" className="hover:text-blue-400">Connexion</Link>
            <span>|</span>
            <Link to="/affiliate" className="hover:text-blue-400">Affiliation</Link>
          </div>
          
          <div className="mt-8 text-xs text-blue-100/40">
            <p>DCEManager - Premier outil venant du futur, pas du passé.</p>
            <p>© 2024 (parce que nous venons du futur) - Tous droits réservés.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
