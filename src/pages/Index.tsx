
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Clock, 
  Shield, 
  FileText, 
  Upload, 
  LineChart, 
  Bell, 
  CheckCircle,
  ChevronRight,
  ThumbsUp,
  MessageSquare,
  HelpCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const fadeElements = document.querySelectorAll('.fade-up');
      
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (elementTop < triggerPoint) {
          element.classList.add('visible');
        }
      });
    };
    
    // Create floating particles
    const createParticles = () => {
      const container = document.querySelector('.particles-container');
      if (!container) return;
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('star');
        
        // Random size
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
      }
    };
    
    // Initial check
    handleScroll();
    createParticles();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="particles-container fixed inset-0 z-0 pointer-events-none"></div>
      <Navbar />
      
      {/* 1. Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                Gérez vos DCE facilement et rapidement
              </h1>
              <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl">
                Une plateforme intuitive pour créer, partager et gérer vos Dossiers de Consultation des Entreprises en toute sécurité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button 
                  onClick={handleCTAClick}
                  className="w-full sm:w-auto glowing-button bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 font-medium text-lg"
                >
                  Accéder à mes DCE
                </Button>
                <Button 
                  variant="outline" 
                  onClick={scrollToFeatures}
                  className="w-full sm:w-auto hover-button font-medium px-8 py-6 text-lg group border-white/10 bg-white/5 hover:bg-white/10"
                >
                  En savoir plus
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            <div className="relative animated-border-glow">
              <div className="rounded-xl overflow-hidden border border-white/10 bg-card shadow-2xl">
                <img 
                  src="/lovable-uploads/0012ad36-938f-49c5-99e9-142f99106b74.png" 
                  alt="Tableau de bord DCE Manager" 
                  className="w-full object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Choose Us Section */}
      <section id="why-us" className="py-20 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Pourquoi choisir notre plateforme ?
            </h2>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
              La solution complète pour simplifier la gestion de vos appels d'offres
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="h-10 w-10" />,
                title: "Rapidité",
                description: "Créez et partagez vos DCE en quelques clics, sans perte de temps."
              },
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Sécurité",
                description: "Stockage sécurisé et accès contrôlé à vos documents sensibles."
              },
              {
                icon: <ThumbsUp className="h-10 w-10" />,
                title: "Simplicité",
                description: "Interface intuitive, sans formation nécessaire pour votre équipe."
              }
            ].map((item, index) => (
              <div key={index} className="cosmic-card p-8 text-center fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="h-16 w-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-blue-400">{item.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-blue-100/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" ref={featuresRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Fonctionnalités clés
            </h2>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour gérer efficacement vos dossiers de consultation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1 space-y-6 fade-up">
              <p className="text-lg text-blue-100/80">
                Notre plateforme vous permet de créer, organiser et suivre vos dossiers de consultation des entreprises de manière centralisée. Fini les échanges d'emails et les documents éparpillés.
              </p>
              
              <ul className="space-y-4">
                {[
                  {
                    icon: <FileText className="h-5 w-5" />,
                    text: "Création de DCE en ligne avec formulaires personnalisables"
                  },
                  {
                    icon: <Upload className="h-5 w-5" />,
                    text: "Partage sécurisé avec les entreprises et contrôle des accès"
                  },
                  {
                    icon: <LineChart className="h-5 w-5" />,
                    text: "Suivi en temps réel des réponses et tableau de bord analytique"
                  },
                  {
                    icon: <Bell className="h-5 w-5" />,
                    text: "Automatisation des relances et des notifications"
                  }
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 h-6 w-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="text-blue-400">{item.icon}</div>
                    </div>
                    <span className="text-blue-100/90">{item.text}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={handleCTAClick}
                className="mt-4 hover-button bg-blue-500 hover:bg-blue-600 text-white"
              >
                Découvrir toutes les fonctionnalités
              </Button>
            </div>
            
            <div className="order-1 md:order-2 animated-border-white fade-up">
              <Card className="overflow-hidden border-white/10 hover:border-blue-500/30 transition-all duration-300 bg-card/60">
                <img 
                  src="/lovable-uploads/c51301c4-6875-4882-86b5-a9cd9cd773cd.png" 
                  alt="Interface DCE Manager" 
                  className="w-full object-cover"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Ce que nos clients disent
            </h2>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
              Découvrez les retours de nos utilisateurs satisfaits
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie Martin",
                position: "Directrice des achats",
                company: "BTP Conseil",
                quote: "DCEManager a révolutionné notre processus d'appels d'offres. Nous avons gagné un temps considérable dans la préparation et le suivi de nos consultations."
              },
              {
                name: "Thomas Dubois",
                position: "Responsable marchés publics",
                company: "Ville de Nantes",
                quote: "Un outil indispensable pour notre service. La centralisation des documents et le suivi en temps réel nous ont permis d'améliorer notre efficacité de 40%."
              },
              {
                name: "Claire Lefort",
                position: "Chef de projet",
                company: "Constructa",
                quote: "L'interface intuitive nous a permis de prendre en main l'outil très rapidement. Le support client est également très réactif et à l'écoute."
              }
            ].map((testimonial, index) => (
              <div key={index} className="cosmic-card p-8 fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-blue-400 to-violet-400 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-blue-100/70 text-sm">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-blue-100/80 italic">"{testimonial.quote}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Nos offres tarifaires
            </h2>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
              Des formules adaptées à tous les besoins
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Gratuit",
                price: "0€",
                period: "/mois",
                description: "Pour découvrir la plateforme",
                features: [
                  "3 DCE actifs maximum",
                  "Stockage limité à 100 Mo",
                  "1 utilisateur",
                  "Support par email"
                ],
                buttonText: "Commencer gratuitement",
                popular: false
              },
              {
                title: "Pro",
                price: "49€",
                period: "/mois",
                description: "Pour les professionnels",
                features: [
                  "DCE illimités",
                  "Stockage de 10 Go",
                  "Jusqu'à 5 utilisateurs",
                  "Automatisation des relances",
                  "Support prioritaire"
                ],
                buttonText: "Choisir ce plan",
                popular: true
              },
              {
                title: "Entreprise",
                price: "199€",
                period: "/mois",
                description: "Pour les grandes organisations",
                features: [
                  "DCE illimités",
                  "Stockage illimité",
                  "Utilisateurs illimités",
                  "API d'intégration",
                  "Personnalisation avancée",
                  "Support dédié 24/7"
                ],
                buttonText: "Contacter les ventes",
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`cosmic-card p-8 flex flex-col h-full relative ${plan.popular ? 'popular-plan' : ''} fade-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Le plus populaire
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2 text-white">{plan.title}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-blue-100/70">{plan.period}</span>
                </div>
                <p className="text-blue-100/70 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-blue-100/90">
                      <CheckCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={handleCTAClick}
                  variant={plan.popular ? "blue" : "outline"} 
                  className={`w-full hover-button ${!plan.popular && 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ and Contact Section */}
      <section id="contact" className="py-20 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              FAQ et Contact
            </h2>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
              Des réponses à vos questions et une équipe à votre écoute
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* FAQ Section */}
            <div className="space-y-6 fade-up">
              <h3 className="text-2xl font-semibold mb-4 text-white">Questions fréquentes</h3>
              
              <div className="space-y-6">
                {[
                  {
                    question: "Comment créer mon premier DCE ?",
                    answer: "Après connexion, cliquez sur 'Nouveau DCE' dans votre tableau de bord, remplissez les informations requises, importez vos documents, et publiez. Un guide détaillé est disponible dans la section aide."
                  },
                  {
                    question: "La plateforme est-elle conforme au RGPD ?",
                    answer: "Oui, DCEManager est entièrement conforme au RGPD. Vos données sont stockées en France et nous avons mis en place toutes les mesures nécessaires pour garantir leur sécurité."
                  },
                  {
                    question: "Comment les entreprises accèdent-elles à mes DCE ?",
                    answer: "Vous pouvez soit leur envoyer un lien d'invitation sécurisé, soit leur donner un code d'accès. Vous contrôlez qui peut voir et télécharger vos documents."
                  },
                  {
                    question: "Puis-je exporter mes données ?",
                    answer: "Oui, vous pouvez exporter l'ensemble de vos données et documents à tout moment dans différents formats (PDF, Excel, ZIP)."
                  }
                ].map((item, index) => (
                  <div key={index} className="cosmic-card p-6">
                    <div className="flex items-start">
                      <div className="mr-3 h-6 w-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <HelpCircle className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">{item.question}</h4>
                        <p className="text-blue-100/70">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="fade-up">
              <h3 className="text-2xl font-semibold mb-4 text-white">Contactez-nous</h3>
              
              <div className="cosmic-card p-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-100/90 mb-1">
                      Nom complet
                    </label>
                    <Input id="name" placeholder="Votre nom" className="bg-white/5 border-white/10" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-blue-100/90 mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="votre@email.com" className="bg-white/5 border-white/10" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-blue-100/90 mb-1">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Comment pouvons-nous vous aider ?" className="bg-white/5 border-white/10 min-h-[120px]" />
                  </div>
                  
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Envoyer le message
                  </Button>
                  
                  <p className="text-xs text-blue-100/50 text-center mt-2">
                    En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
