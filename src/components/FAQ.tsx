import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
interface FAQItem {
  question: string;
  answer: string;
}
interface FAQProps {
  items: FAQItem[];
}
const FAQ: React.FC<FAQProps> = ({
  items
}) => {
  return <section id="faq" className="relative py-24 px-6 overflow-hidden from-blue-600/20 to-indigo-600/20 bg-[brand-blue-dark] bg-slate-950">
      <div className="w-[85%] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column - Heading and intro */}
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
        }} className="md:w-1/3">
            
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Questions<br />fréquentes
            </h2>
            
            <p className="text-blue-100/70 mb-8">
              Découvrez les réponses aux questions les plus courantes sur notre plateforme et nos services.
            </p>
          </motion.div>
          
          {/* Right Column - Accordion */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="md:w-2/3">
            <Accordion type="single" collapsible className="space-y-4">
              {items.map((item, index) => <AccordionItem key={index} value={`item-${index}`} className="border-0">
                  <AccordionTrigger className="border border-white/10 rounded-xl px-6 py-5 text-white hover:no-underline text-left bg-transparent box-shadow">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#0d0d17] mt-1 px-6 py-5 text-blue-100/80 border border-white/10 rounded-xl">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default FAQ;