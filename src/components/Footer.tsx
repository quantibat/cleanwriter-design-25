const Footer = () => {
  return (
    <footer className="bg-card/50 pt-20 pb-10 px-6 border-t border-white/5 w-full relative">
      <div className="w-[85%] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/c6620e4e-76f1-43fd-85a6-0a5d37ca796e.png" 
                alt="DCE Manager Logo"
                className="w-28 h-auto"
              />
            </div>
            <p className="text-blue-100/70 mb-4">
              La solution complète pour la gestion de vos dossiers de consultation des entreprises.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Produit</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-blue-100/70 hover:text-blue-400 transition-colors">Fonctionnalités</a></li>
              <li><a href="#pricing" className="text-blue-100/70 hover:text-blue-400 transition-colors">Tarifs</a></li>
              <li><a href="#" className="text-blue-100/70 hover:text-blue-400 transition-colors">Témoignages</a></li>
              <li><a href="#" className="text-blue-100/70 hover:text-blue-400 transition-colors">Guide d'utilisation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Entreprise</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-100/70 hover:text-blue-400 transition-colors">À propos</a></li>
              <li><a href="#" className="text-blue-100/70 hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-blue-100/70 hover:text-blue-400 transition-colors">Carrières</a></li>
              <li><a href="#" className="text-blue-100/70 hover:text-blue-400 transition-colors">Contactez-nous</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Légal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-100/70 hover:text-blue-400 transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="text-blue-100/70 hover:text-blue-400 transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-blue-100/70 hover:text-blue-400 transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 mt-8 text-center">
          <p className="text-blue-100/50 text-sm">
            © {new Date().getFullYear()} DCE Manager. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
