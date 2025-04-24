import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const EmailConfirmation = () => {
  const { user } = useAuth();
  const email = user?.email || localStorage.getItem('pendingConfirmationEmail') || 'votre adresse email';

  return (
    <div className="min-h-screen bg-[#121824] flex items-center justify-center px-4 relative">
      <div className="particles-container fixed inset-0 z-0 pointer-events-none">
        {/* Les particules d'arrière-plan seront ajoutés ici avec du CSS */}
      </div>
      
      <div className="w-full max-w-md py-12 space-y-6 relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img 
              src="/lovable-uploads/87d822bd-dd26-494f-a6d1-9d7e353735ad.png" 
              alt="DCE Manager"
              className="h-16 mx-auto mb-4"
            />
          </Link>
          <p className="mt-2 text-white/60">Confirmation d'email</p>
        </div>
        
        <div className="animated-border-glow cosmic-card bg-[#1E2532]/80 backdrop-blur-md rounded-lg border border-white/5 p-8 shadow-xl">
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Vérifiez votre boîte de réception</h2>
            <p className="text-white/70 mb-6">
              Nous avons envoyé un lien de confirmation à <span className="text-blue-400 font-medium">{email}</span>.
              <br /><br />
              Veuillez cliquer sur ce lien pour activer votre compte et accéder à toutes les fonctionnalités.
            </p>
            
            <div className="bg-[#141B2A] border border-white/10 rounded-lg p-4 text-white/70 text-sm mb-6">
              <p>Si vous ne trouvez pas l'email dans votre boîte de réception principale, veuillez vérifier votre dossier spam ou vos promotions.</p>
            </div>
            
            <div className="space-y-4">
              <Button className="w-full blue-shimmer-button bg-blue-500 hover:bg-blue-600" asChild>
                <Link to="/signin">Se connecter</Link>
              </Button>
              
              <Button variant="outline" className="w-full bg-transparent border border-white/10 text-white hover:bg-white/5" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
