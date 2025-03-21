
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

const FAQContact = () => {
  const faqItems = [
    {
      question: "Comment fonctionne DCE Manager ?",
      answer: "DCE Manager est une plateforme en ligne qui vous permet de créer, organiser et partager vos dossiers de consultation des entreprises. Vous pouvez télécharger vos documents, les classer par projet, les partager avec vos collaborateurs et suivre leur évolution en temps réel."
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer: "Absolument. La sécurité est notre priorité. Toutes les données sont chiffrées, stockées sur des serveurs sécurisés en France, et conformes au RGPD. Nous effectuons des sauvegardes régulières et proposons une authentification à deux facteurs pour protéger vos comptes."
    },
    {
      question: "Puis-je annuler mon abonnement à tout moment ?",
      answer: "Oui, vous pouvez annuler votre abonnement à tout moment. Aucun engagement de durée n'est requis. Vous conserverez l'accès jusqu'à la fin de la période facturée."
    },
    {
      question: "Combien d'utilisateurs puis-je ajouter à mon compte ?",
      answer: "Le nombre d'utilisateurs dépend de votre forfait. Le plan Gratuit permet 2 utilisateurs, le plan Pro jusqu'à 10 utilisateurs, et le plan Entreprise offre un nombre illimité d'utilisateurs."
    },
    {
      question: "Proposez-vous une formation pour utiliser l'outil ?",
      answer: "Oui, nous proposons des webinaires gratuits d'initiation chaque semaine. Les forfaits Pro et Entreprise incluent également des sessions de formation personnalisées. Notre centre d'aide contient par ailleurs de nombreux tutoriels et guides d'utilisation."
    }
  ];

  return (
    <section id="faq-contact" className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-950/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* FAQ Section */}
          <div className="fade-up">
            <h2 className="text-3xl font-bold mb-8 text-white">Questions fréquentes</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-white/10 rounded-lg overflow-hidden bg-white/5 px-6"
                >
                  <AccordionTrigger className="py-5 text-white hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-blue-100/80 pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          {/* Contact Form */}
          <div className="fade-up">
            <h2 className="text-3xl font-bold mb-8 text-white">Contactez-nous</h2>
            
            <div className="cosmic-card p-8">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nom</Label>
                  <Input 
                    id="name" 
                    placeholder="Votre nom"
                    className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="votre@email.com"
                    className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <textarea 
                    id="message" 
                    rows={5}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full rounded-md bg-white/5 border border-white/10 p-3 text-white focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQContact;
