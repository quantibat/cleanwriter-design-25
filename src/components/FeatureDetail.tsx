import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Slider } from '@/components/ui/slider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FeatureData {
  title: string;
  description: string;
  icon: React.ReactNode;
  sections: {
    title: string;
    content: string;
    image?: string;
  }[];
  benefits: string[];
  testimonials?: {
    quote: string;
    author: string;
    position: string;
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
  stats?: {
    label: string;
    value: string;
  }[];
}

interface FeatureDetailProps {
  featureData: FeatureData | null;
}

const FeatureDetail: React.FC<FeatureDetailProps> = ({ featureData }) => {
  if (!featureData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Fonctionnalité non trouvée</h2>
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#06071b] min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-indigo-600/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        
        <Container className="relative z-10">
          <Link to="/#features" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux fonctionnalités
          </Link>
          
          <div className="flex items-center text-sm text-blue-300/70 mb-4">
            <Link to="/" className="hover:text-blue-300">Accueil</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <Link to="/#features" className="hover:text-blue-300">Fonctionnalités</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-blue-300">{featureData.title}</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{featureData.title}</h1>
            <p className="text-xl text-blue-100/80 mb-10 max-w-3xl">{featureData.description}</p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full">
                Essayer gratuitement
              </Button>
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-6 rounded-full">
                Voir une démo
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
      
      {/* Main Content */}
      <Container className="relative z-10">
        {/* Detailed Sections */}
        {featureData.sections.map((section, index) => (
          <motion.section 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className={`py-16 ${index !== 0 ? 'border-t border-white/5' : ''}`}
          >
            <div className={`grid grid-cols-1 ${index % 2 === 0 ? 'md:grid-cols-[1fr_1.2fr]' : 'md:grid-cols-[1.2fr_1fr]'} gap-12 items-center`}>
              <div className={`${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{section.title}</h2>
                <p className="text-blue-100/70 mb-8">{section.content}</p>
                
                <div className="mt-8">
                  <Slider 
                    defaultValue={[75]} 
                    max={100} 
                    step={1}
                    className="w-full mb-6"
                  />
                  <p className="text-sm text-blue-300/70 italic">
                    En moyenne, nos utilisateurs ont constaté une amélioration de 75% dans ce domaine
                  </p>
                </div>
              </div>
              
              <div className={`bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 h-[300px] flex items-center justify-center ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                {section.image ? (
                  <img src={section.image} alt={section.title} className="max-w-full max-h-full rounded object-cover" />
                ) : (
                  <div className="text-center text-blue-300/50">
                    <p>Illustration de la fonctionnalité</p>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        ))}
        
        {/* Benefits */}
        <section className="py-16 border-t border-white/5">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Principaux avantages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureData.benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex items-start gap-4 bg-white/5 rounded-xl p-6"
              >
                <div className="bg-blue-500/20 rounded-full p-2 text-blue-400 mt-1">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-blue-100/90">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Stats */}
        {featureData.stats && (
          <section className="py-16 border-t border-white/5">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Résultats obtenus</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featureData.stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center bg-white/5 rounded-xl p-6"
                >
                  <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</p>
                  <p className="text-blue-100/70">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        
        {/* Testimonials */}
        {featureData.testimonials && featureData.testimonials.length > 0 && (
          <section className="py-16 border-t border-white/5">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Ce qu'en disent nos clients</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featureData.testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-8"
                >
                  <div className="mb-6">
                    <svg className="h-8 w-8 text-blue-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-lg text-blue-100/90 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-blue-300/70 text-sm">{testimonial.position}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        
        {/* FAQ */}
        {featureData.faq && featureData.faq.length > 0 && (
          <section className="py-16 border-t border-white/5">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Questions fréquentes</h2>
            
            <div className="space-y-6 max-w-3xl mx-auto">
              {featureData.faq.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <h3 className="text-xl font-medium text-white mb-3">{item.question}</h3>
                  <p className="text-blue-100/70">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        
        {/* CTA */}
        <section className="py-16 border-t border-white/5">
          <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Prêt à essayer {featureData.title}?</h2>
            <p className="text-xl text-blue-100/80 mb-8 max-w-2xl mx-auto">
              Rejoignez des centaines d'entreprises qui font confiance à DCE Manager pour simplifier leurs processus d'appels d'offres.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full">
                Commencer gratuitement
              </Button>
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-6 rounded-full">
                Voir les tarifs
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default FeatureDetail;
