import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, BarChart3, FileText, Users, TrendingUp, Activity, Gauge, LineChart, PercentCircle, Award, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Container } from "@/components/ui/container";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Features from "@/components/Features";

const Index = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const textArray = ["Générez et gérez vos DCE en toute simplicité", "Solution révolutionnaire pour les marchés publics"];
  const currentText = textArray[loopNum % textArray.length];
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const typingDelay = isDeleting ? 50 : 100;
    if (!isDeleting && textIndex === currentText.length) {
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    } else if (isDeleting && textIndex === 0) {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      return;
    }
    const timer = setTimeout(() => {
      setTextIndex(prevTextIndex => {
        const newIndex = isDeleting ? prevTextIndex - 1 : prevTextIndex + 1;
        setDisplayText(currentText.substring(0, newIndex));
        return newIndex;
      });
    }, typingDelay);
    return () => clearTimeout(timer);
  }, [textIndex, isDeleting, loopNum, currentText]);

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
      const heroImage = document.querySelector('.hero-image') as HTMLElement | null;
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
      
      if (videoRef.current) {
        const videoRect = videoRef.current.getBoundingClientRect();
        const videoCenter = {
          x: videoRect.left + videoRect.width / 2,
          y: videoRect.top + videoRect.height / 2
        };
        
        const viewportCenter = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        };
        
        const rotateX = Math.min(Math.max(-(videoCenter.y - viewportCenter.y) / 50, -10), 10);
        const rotateY = Math.min(Math.max((videoCenter.x - viewportCenter.x) / 50, -10), 10);
        
        videoRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      
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

  const faqItems = [{
    question: "What do I need to get started?",
    answer: "To get started, simply share your project details and goals with us. We'll guide you through the process and provide the tools and support needed to bring your vision to life."
  }, {
    question: "What kind of customization is available?",
    answer: "DCE Manager offers comprehensive customization options for all documents. You can create custom templates, modify existing ones, add your branding elements, and configure workflows to match your organization's processes."
  }, {
    question: "How easy is it to edit for beginners?",
    answer: "Very easy! Our interface is designed to be intuitive even for users with no technical background. We offer guided walkthroughs, tooltips, and a comprehensive help center to get you started. Most users can create their first document within minutes of signing up."
  }, {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card is required to start your trial, and you can upgrade to a paid plan at any time if you decide DCE Manager is right for you."
  }, {
    question: "How secure is my data on your platform?",
    answer: "Security is our top priority. All data is encrypted both in transit and at rest using enterprise-grade encryption. We use secure data centers in France, implement regular security audits, and are fully GDPR compliant to ensure your data remains protected."
  }];

  return <div className=" min-h-screen w-full relative">
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full"></div>
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 blur-[120px] rounded-full"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 blur-[150px] rounded-full"></div>
    
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full"></div>
    </div>
    <section className="relative py-32" id='hero'>
      <div className="absolute inset-0 z-0"></div>
      
      <Container className="relative z-10 mx-auto w-[85%]">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 items-center justify-center">
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-center ">
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-6">
              Solution SaaS pour les marchés publics
            </span>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight min-h-[3.5rem] md:min-h-[4rem] xl:min-h-[5rem]">
              {displayText}
              <span className="animate-pulse">|</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/80 mb-8 w-full mx-auto lg:mx-0">
              Un SaaS complet pour automatiser la création, la gestion et l'export de vos Dossiers de Consultation des Entreprises
            </p>
            
            <div className="flex flex-wrap justify-center  gap-x-8 gap-y-3">
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
            <div className='pt-8'>
                <video 
                  ref={videoRef} 
                  className="w-full rounded-lg transition-transform duration-300 hover:scale-[1.02]" 
                  style={{ transformStyle: 'preserve-3d' }}
                  controls
                >
                  <source src="https://flowbite.com/docs/components/video/" type=""/>
                </video>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
    
    <Features />
    
    <section className="py-16 px-6 ">
      <Container className='mx-auto w-[85%]'>
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
          <h2 className="text-5xl md:text-5xl font-bold text-white mb-4">
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
    
    <section className="py-24 px-6" id="testimonials">
      <Container className='mx-auto w-[85%]'>
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
          <h2 className="text-3xl font-bold text-white mb-6 md:text-5xl">
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
    
    <section className="py-24 px-6  relative" id='cta'>
      <div className="absolute"></div>
      <Container className="relative mx-auto w-[85%]">
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
          <h2 className="text-3xl font-bold text-white mb-6 md:text-5xl">
            Prêt à transformer votre gestion des DCE ?
          </h2>
          <p className="text-blue-100/80 max-w-2xl mx-auto text-lg">
            Rejoignez des centaines d'entreprises qui font confiance à DCE Manager pour simplifier leurs processus d'appels d'offres.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/dashboard">
              <Button className="h-14 bg-blue-600 hover:bg-blue-700 rounded-full text-lg px-[33px] py-0">
                Essayer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              
            </Link>
          </div>
          
          <p className="text-blue-100/50 text-sm pt-4">
            Essai gratuit de 14 jours · Aucune carte de crédit requise
          </p>
        </motion.div>
      </Container>
    </section>

    <Pricing />
    
    <FAQ items={faqItems} />
    
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

        /* Feature card neon effect */
        .feature-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 0 5px rgba(59, 130, 246, 0.1);
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: inherit;
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.1);
        }

        .feature-card:hover::before {
          opacity: 1;
          animation: animateGradient 2s linear infinite;
        }

        @keyframes animateGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        video.w-full {
          transition: transform 0.6s cubic-bezier(0.17, 0.67, 0.83, 0.67);
          transform-style: preserve-3d;
          transform-origin: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        @media (prefers-reduced-motion: reduce) {
          video.w-full {
            transition: none;
            transform: none !important;
          }
        }
      `
    }} />
  </div>;
};

export default Index;
