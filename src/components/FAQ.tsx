
import React from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ items }) => {
  return (
    <section className="relative py-24 px-6 overflow-hidden" id="faq">
      {/* Background neon effects */}
      <div className="absolute inset-0 bg-[#06071b]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 via-indigo-600/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      
      {/* Neon glows */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column - Heading and intro */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/3"
          >
            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 inline-block mb-6">
              <span className="text-white text-sm font-medium">FAQ</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Frequently<br />Asked Questions
            </h2>
            
            <p className="text-blue-100/70 mb-8">
              Have questions? Our FAQ section has you covered with
              quick answers to the most common inquiries.
            </p>
          </motion.div>
          
          {/* Right Column - Accordion */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-2/3"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {items.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-0"
                >
                  <AccordionTrigger className="bg-[#0d0d17] hover:bg-[#0f0f1a] border border-white/10 rounded-xl px-6 py-5 text-white hover:no-underline group">
                    <span>{item.question}</span>
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-transparent relative">
                      <Plus className="h-5 w-5 text-blue-400 absolute group-data-[state=open]:opacity-0 transition-opacity" />
                      <X className="h-5 w-5 text-blue-400 absolute opacity-0 group-data-[state=open]:opacity-100 transition-opacity" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#0d0d17] mt-1 px-6 py-5 text-blue-100/80 border border-white/10 rounded-xl">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
