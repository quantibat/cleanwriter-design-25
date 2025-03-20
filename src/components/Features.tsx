import React from 'react';
import { FolderArchive, Share2, FileSearch, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
}
const FeatureCard = ({
  title,
  description,
  icon,
  image,
  alt,
  reverse = false
}: FeatureCardProps) => <div className="w-full flex flex-col md:flex-row items-stretch gap-8">
    {/* Image section - 50% width on desktop */}
    <div className={`w-full md:w-1/2 order-1 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
      <div className="h-full animated-border-white">
        <Card className="overflow-hidden border-white/10 hover:border-blue-500/30 transition-all duration-300 shadow-xl h-full">
          <div className="h-full overflow-hidden">
            <img src={image} alt={alt} className="w-full h-full object-cover object-center" />
          </div>
        </Card>
      </div>
    </div>
    
    {/* Text content section - 50% width on desktop */}
    <div className={`w-full md:w-1/2 order-2 ${reverse ? 'md:order-1' : 'md:order-2'} h-full`}>
      <div className="h-full animated-border-white">
        <Card className="cosmic-card overflow-hidden border-white/10 hover:border-blue-500/30 transition-all duration-300 bg-card/60 h-full">
          <CardContent className="p-10 h-full flex flex-col justify-center">
            <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
              <div className="text-blue-400">{icon}</div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
            <p className="text-blue-100/70">{description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>;
const Features = () => {
  // Feature images
  const featureImages = ["/lovable-uploads/c51301c4-6875-4882-86b5-a9cd9cd773cd.png", "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", "https://images.unsplash.com/photo-1518770660439-4636190af475", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"];
  return;
};
export default Features;