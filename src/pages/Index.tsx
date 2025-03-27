
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Shield, BarChart3, FileText, Users, TrendingUp, Activity, Gauge, LineChart, PercentCircle, Award } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Container } from "@/components/ui/container";

const Index = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Inscription réussie",
        description: "Vous allez recevoir un email de confirmation"
      });
      navigate('/signup', {
        state: {
          email
        }
      });
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Apply parallax effect to hero image
      const heroImage = document.querySelector('.hero-image') as HTMLElement | null;
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
      }

      // Animate elements on scroll
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.85) {
          element.classList.add('animate-fadeIn');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div className="bg-[#06071b] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden neon-grid-background">
        {/* Grid overlay */}
        <div className="absolute inset-0 neon-grid z-0"></div>
        
        {/* Neon glow effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 blur-[150px] rounded-full"></div>
        
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-6">
                Solution SaaS pour les marchés publics
              </span>
              
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Générez et gérez vos DCE en toute simplicité
              </h1>
              
              <p className="text-lg md:text-xl text-blue-100/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Un SaaS complet pour automatiser la création, la gestion et l'export de vos Dossiers de Consultation des Entreprises
              </p>
              
              {/* Quick Sign-up Form */}
              <form onSubmit={handleSubmit} className="mb-8 max-w-md mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    
                    {!isEmailValid}
                  </div>
                  
                </div>
              </form>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span className="text-white">+15,000 utilisateurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Conforme RGPD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Support 7j/7</span>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column - App Screenshot */}
            
          </div>
        </Container>
      </section>
      
      {/* Social Proof Section */}
      <section className="py-16 px-6 bg-[#070823]">
        <Container>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="text-center mb-12 animate-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Déjà utilisé par des centaines d'entreprises pour simplifier leurs DCE
            </h2>
            <p className="text-blue-100/70 max-w-3xl mx-auto">
              Rejoignez les professionnels des marchés publics qui optimisent leur processus de gestion des appels d'offres
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            <div className="flex flex-col items-center p-4">
              <div className="icon-container relative mb-2">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-[8px] scale-110"></div>
                <TrendingUp className="h-12 w-12 text-blue-400 relative z-10 transition-transform duration-300 hover:scale-125" />
              </div>
              <span className="text-white font-medium text-sm text-center">+30% de productivité</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="icon-container relative mb-2">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-[8px] scale-110"></div>
                <Activity className="h-12 w-12 text-blue-400 relative z-10 transition-transform duration-300 hover:scale-125" />
              </div>
              <span className="text-white font-medium text-sm text-center">Performance accrue</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="icon-container relative mb-2">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-[8px] scale-110"></div>
                <Gauge className="h-12 w-12 text-blue-400 relative z-10 transition-transform duration-300 hover:scale-125" />
              </div>
              <span className="text-white font-medium text-sm text-center">Optimisation du temps</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="icon-container relative mb-2">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-[8px] scale-110"></div>
                <LineChart className="h-12 w-12 text-blue-400 relative z-10 transition-transform duration-300 hover:scale-125" />
              </div>
              <span className="text-white font-medium text-sm text-center">Croissance des résultats</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="icon-container relative mb-2">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-[8px] scale-110"></div>
                <PercentCircle className="h-12 w-12 text-blue-400 relative z-10 transition-transform duration-300 hover:scale-125" />
              </div>
              <span className="text-white font-medium text-sm text-center">95% de satisfaction</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="icon-container relative mb-2">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-[8px] scale-110"></div>
                <Award className="h-12 w-12 text-blue-400 relative z-10 transition-transform duration-300 hover:scale-125" />
              </div>
              <span className="text-white font-medium text-sm text-center">Qualité certifiée</span>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Features Section */}
      <section className="py-24 px-6 bg-[#06071b]">
        <Container>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="text-center mb-16 animate-on-scroll">
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-4">
              Fonctionnalités
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Tout ce dont vous avez besoin pour vos DCE
            </h2>
            <p className="text-blue-100/70 max-w-3xl mx-auto text-lg">Une suite complète d'outils pour créer, gérer et optimiser vos dossiers de consultation des entreprises</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            icon: <FileText className="h-8 w-8 text-blue-400" />,
            title: "Génération automatisée",
            description: "Créez des documents standardisés et personnalisables en quelques clics, en respectant la réglementation en vigueur."
          }, {
            icon: <Users className="h-8 w-8 text-blue-400" />,
            title: "Collaboration simplifiée",
            description: "Partagez facilement vos DCE avec votre équipe et vos partenaires, avec un contrôle précis des accès."
          }, {
            icon: <BarChart3 className="h-8 w-8 text-blue-400" />,
            title: "Analyses et suivi",
            description: "Suivez l'avancement de vos projets et générez des rapports détaillés pour prendre les meilleures décisions."
          }, {
            icon: <Shield className="h-8 w-8 text-blue-400" />,
            title: "Sécurité renforcée",
            description: "Protégez vos données sensibles avec un chiffrement de bout en bout et des sauvegardes automatiques."
          }, {
            icon: <CheckCircle className="h-8 w-8 text-blue-400" />,
            title: "Conformité garantie",
            description: "Assurez-vous que vos DCE respectent toutes les exigences légales et réglementaires actuelles."
          }, {
            icon: <ArrowRight className="h-8 w-8 text-blue-400" />,
            title: "Export multi-format",
            description: "Exportez vos documents dans différents formats (PDF, Word, Excel) pour faciliter le partage et l'archivage."
          }].map((feature, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/8 transition-all duration-300 animate-on-scroll">
                <div className="h-14 w-14 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-blue-100/70">{feature.description}</p>
              </motion.div>)}
          </div>
        </Container>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-[#070823]">
        <Container>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="text-center mb-16 animate-on-scroll">
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-4">
              Témoignages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ce que disent nos clients
            </h2>
            <p className="text-blue-100/70 max-w-3xl mx-auto">
              Découvrez l'impact de notre solution sur les professionnels des marchés publics
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{
            quote: "DCE Manager a complètement transformé notre processus de création et de gestion des appels d'offres. Nous avons gagné un temps précieux et réduit considérablement les erreurs.",
            name: "Marie Dupont",
            position: "Directrice des Achats, Mairie de Lyon"
          }, {
            quote: "La facilité d'utilisation combinée à des fonctionnalités puissantes font de DCE Manager un outil indispensable pour notre cabinet d'architecture.",
            name: "Thomas Martin",
            position: "Architecte Principal, Espace Design"
          }].map((testimonial, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: index * 0.2
          }} className="bg-white/5 border border-white/10 rounded-xl p-8 animate-on-scroll">
                <div className="mb-8">
                  <svg className="h-8 w-8 text-blue-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-lg text-blue-100/90 mb-8 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 mr-4"></div>
                  <div>
                    <h4 className="text-white font-medium">{testimonial.name}</h4>
                    <p className="text-blue-100/70 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#06071b] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-20"></div>
        <Container className="relative">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="text-center space-y-8 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à transformer votre gestion des DCE ?
            </h2>
            <p className="text-blue-100/80 max-w-2xl mx-auto text-lg">
              Rejoignez des centaines d'entreprises qui font confiance à DCE Manager pour simplifier leurs processus d'appels d'offres.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/dashboard">
                <Button className="h-14 px-8 bg-blue-600 hover:bg-blue-700 rounded-full text-lg">
                  Essayer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="h-14 px-8 border-white/10 bg-white/5 hover:bg-white/10 rounded-full text-lg">
                  Voir les tarifs
                </Button>
              </Link>
            </div>
            
            <p className="text-blue-100/50 text-sm pt-4">
              Essai gratuit de 14 jours · Aucune carte de crédit requise
            </p>
          </motion.div>
        </Container>
      </section>
      
      {/* Using a style tag correctly without the invalid jsx attribute */}
      <style dangerouslySetInnerHTML={{
      __html: `
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-fadeIn {
          opacity: 1;
          transform: translateY(0);
        }

        .icon-container:hover .blur-[8px] {
          background-color: rgba(59, 130, 246, 0.5);
          filter: blur(12px);
        }
        
        /* Neon grid styling */
        .neon-grid-background {
          background-color: #06071b;
          position: relative;
          overflow: hidden;
        }
        
        .neon-grid {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          width: 100%;
          height: 100%;
          opacity: 0.6;
          z-index: 0;
        }
        
        .neon-grid::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .neon-grid::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(0deg, rgba(6, 7, 27, 1) 0%, rgba(6, 7, 27, 0) 20%, rgba(6, 7, 27, 0) 80%, rgba(6, 7, 27, 1) 100%);
          pointer-events: none;
        }
        `
    }} />
    </div>;
};

export default Index;
