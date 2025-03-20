import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  yearlyPrice?: string;
  description: string;
  features: string[];
  credits?: string;
  popular?: boolean;
}
const PricingCard = ({
  title,
  price,
  period,
  yearlyPrice,
  description,
  features,
  credits,
  popular = false
}: PricingCardProps) => {
  return <div className={`cosmic-card p-8 flex flex-col h-full ${popular ? 'border-blue-400/30' : 'border-white/5'}`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-blue-100/70">/{period}</span>
        {yearlyPrice && <div className="text-sm text-muted-foreground mt-1">
            {yearlyPrice} billed yearly
          </div>}
      </div>
      <p className="text-blue-100/70 mb-4">{description}</p>
      
      {credits && <div className="mb-4 p-2 bg-blue-500/10 rounded-md text-center">
          <span className="text-blue-400">{credits}</span>
        </div>}
      
      <Button className={`w-full mb-6 ${popular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 hover:bg-white/20'}`}>
        Start Free Trial
      </Button>
      
      <ul className="space-y-3 flex-grow">
        {features.map((feature, index) => <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>)}
      </ul>
    </div>;
};
const CustomPricing = () => {
  const [faqOpen, setFaqOpen] = useState("item-1");
  const handleFaqChange = (value: string) => {
    setFaqOpen(value);
  };
  return <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="px-6 relative pt-[130px]">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Plans & Pricing</h1>
            <p className="text-xl text-blue-100/80">Start Your Free Trial To Get Started!</p>
          </div>
          
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-20">
            <PricingCard title="Discover" price="$0" period="mo" yearlyPrice="(then $144 billed yearly)" description="7-Day Free Trial" features={["Generate contents in seconds", "AI-powered content generation", "Multilingual support", "Dedicated customer support", "Access to new features"]} />
            
            <PricingCard title="Premium" price="$29" period="mo" yearlyPrice="$348 billed yearly" description="Generate 100+ pieces of content per month (on average)" credits="250,000 credits" features={["Better Results with GPT4", "Generate contents in seconds", "AI-powered content generation", "Multilingual support", "Dedicated customer support", "Access to new features"]} popular />
            
            <PricingCard title="Pro" price="$79" period="mo" yearlyPrice="$948 billed yearly" description="Generate 400+ pieces of content per month (on average)" credits="1,000,000 credits" features={["Better Results with GPT4", "Generate contents in seconds", "AI-powered content generation", "Multilingual support", "Dedicated customer support", "Access to new features"]} />
          </div>
          
          <div className="cosmic-card p-12 max-w-4xl mx-auto text-center mb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Create Your FREE Account And Join 42,000+ Entrepreneurs, Marketers and Copywriters:
              </h2>
              
              <div className="mb-6">
                <Button className="bg-blue-500 hover:bg-blue-600 px-6 h-auto py-[10px] text-base">
                  Start Free Trial
                </Button>
                
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="border border-white/10 rounded-lg px-4 py-2 flex items-center">
                  <span className="text-sm">Featured on Product Hunt</span>
                </div>
                <div className="border border-white/10 rounded-lg px-4 py-2 flex items-center">
                  <span className="text-sm">FUTUREPEDIA</span>
                </div>
                <div className="border border-white/10 rounded-lg px-4 py-2 flex items-center">
                  <span className="text-sm">Product of the Day</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions 👍
            </h2>
            
            <Accordion type="single" collapsible value={faqOpen} onValueChange={handleFaqChange}>
              <AccordionItem value="item-1" className="border-white/10">
                <AccordionTrigger className="text-left">Can I cancel at any time?</AccordionTrigger>
                <AccordionContent>
                  You can cancel your subscription at any time and you will no longer be charged. After canceling, you will be able to continue generating content and have access to your account until the end of your billing cycle.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-white/10">
                <AccordionTrigger className="text-left">Can I change my plan later on?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can change your plan at any time by clicking on "Account Settings" then clicking on "Plan & Billing".
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border-white/10">
                <AccordionTrigger className="text-left">What are credits?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Credits are like gas in a car, without them, you can't use DCEManager to generate content.</p>
                  <p className="mb-2">One credit corresponds to ~4 characters of text for common English text.</p>
                  <p className="mb-2">This translates to roughly 1/4 of a word (so 100 tokens ~= 75 words).</p>
                  <p className="mb-2">However, be aware that credit consumption on DCEManager is also based on the number of credits it takes to generate content. So if you generate a 200-word email, it will not only count 200 credits, but more because of our system.</p>
                  <p>For example, for a publicity newsletter, the average is 2000 credits per email.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border-white/10">
                <AccordionTrigger className="text-left">Where can I upgrade my account?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">To do that, you must first create an account.</p>
                  <p className="mb-2">Once you've done that, simply click on "Upgrade" in your upper account, and select your preferred plan.</p>
                  <p>Either yearly (to save 20%) or monthly.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default CustomPricing;