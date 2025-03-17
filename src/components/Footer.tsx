
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="text-xl font-bold text-foreground inline-block mb-4">
              <span className="text-brand-purple">AI</span>Writer
            </a>
            <p className="text-muted-foreground mb-4">
              Une solution d'IA pour créer du contenu de qualité en quelques secondes.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Produit</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-muted-foreground hover:text-brand-purple transition-colors">Fonctionnalités</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-brand-purple transition-colors">Tarifs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Témoignages</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Guide d'utilisation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">À propos</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Carrières</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Contactez-nous</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Légal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} AI Writer. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
