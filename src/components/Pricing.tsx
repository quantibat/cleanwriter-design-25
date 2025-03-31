
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  projectsCount?: string;
  revisionsCount?: string;
}

const PricingCard = ({
  title,
  price,
  originalPrice,
  period,
  description,
  features,
  popular = false,
  projectsCount,
  revisionsCount
}: PricingCardProps) => (
  <div className={`relative rounded-xl p-8 flex flex-col h-full border ${popular ? 'border-blue-400/30' : 'border-white/5'} bg-[#0d0d17] overflow-hidden`}>
    {popular && (
      <div className="absolute top-0 right-0 bg-blue-500 text-xs font-medium text-white px-3 py-1">
        Most Pick
      </div>
    )}
    
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    
    <div className="mb-6">
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-white">{price}</span>
        {originalPrice && <span className="text-lg text-blue-100/50 line-through ml-2">{originalPrice}</span>}
      </div>
      <div className="text-blue-100/70 text-sm">/{period}</div>
    </div>
    
    <p className="text-blue-100/70 mb-6 text-sm">{description}</p>
    
    {(projectsCount || revisionsCount) && (
      <div className="flex gap-4 mb-6">
        {projectsCount && (
          <div className="bg-blue-500/10 rounded-lg px-3 py-2 text-center flex-1">
            <div className="text-lg font-bold text-white">{projectsCount}</div>
            <div className="text-xs text-blue-100/70">Projects</div>
          </div>
        )}
        {revisionsCount && (
          <div className="bg-blue-500/10 rounded-lg px-3 py-2 text-center flex-1">
            <div className="text-lg font-bold text-white">{revisionsCount}</div>
            <div className="text-xs text-blue-100/70">Revisions</div>
          </div>
        )}
      </div>
    )}
    
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start text-blue-100/90">
          <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
    
    <div className="mt-auto">
      <Button variant={popular ? "default" : "outline"} 
        className={`w-full ${popular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
        Book an Appointment
      </Button>
    </div>
  </div>
);

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Basic",
      price: "$99",
      originalPrice: "$450",
      period: "Month",
      description: "Our basic pricing plan is designed to offer great value while providing the essential features you need to get started.",
      projectsCount: "100+",
      revisionsCount: "75+",
      features: [
        "All templates unlocked",
        "Unlimited Licenses",
        "Lifetime Updates",
        "Email support",
        "30-Days Money-back Guarantee"
      ]
    },
    {
      title: "Premium",
      price: "$2,599",
      period: "Month",
      description: "Our pro pricing plan is designed for businesses looking for advanced features and premium support.",
      projectsCount: "650+",
      revisionsCount: "250+",
      features: [
        "All templates unlocked",
        "Unlimited Licenses",
        "Lifetime Updates",
        "Email support",
        "30-Days Money-back Guarantee"
      ],
      popular: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      period: "Quote",
      description: "Tailored solutions for organizations with specific needs and requirements for large-scale implementations.",
      features: [
        "All premium features included",
        "Dedicated account manager",
        "Custom integrations",
        "Priority support 24/7",
        "Training and onboarding",
        "Custom SLA agreements"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-[#06071b]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Plans for all businesses, Suitable for Personal, Agencies, Startups.</h2>
          <p className="text-blue-100/80 max-w-2xl mx-auto">
            Our pricing plans are designed to make getting started as effortless as possible. With flexible options tailored to suit a variety of needs and budgets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <PricingCard {...plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
