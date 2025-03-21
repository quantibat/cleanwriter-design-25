
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CircleDollarSign, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface CreditDisplayProps {
  showButton?: boolean;
}

const CreditDisplay: React.FC<CreditDisplayProps> = ({ showButton = true }) => {
  const { userCredits } = useAuth();
  const navigate = useNavigate();
  
  // Détermine la classe de couleur en fonction du nombre de crédits
  const getProgressColor = () => {
    if (userCredits > 15000) return "bg-green-500";
    if (userCredits > 5000) return "bg-amber-500";
    return "bg-red-500";
  };
  
  // Calcule le pourcentage de crédits restants (sur une base de 30000)
  const creditPercentage = Math.min(Math.max((userCredits / 30000) * 100, 0), 100);

  return (
    <div className="bg-[#1E2532]/60 border border-white/5 rounded-lg p-4 flex flex-col hover:shadow-[0_0_15px_rgba(30,174,219,0.3)] transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="bg-blue-500/20 p-2 rounded-full mr-3">
            <Sparkles className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white/80">Crédits disponibles</h3>
            <p className="text-2xl font-bold text-white">{userCredits.toLocaleString()}</p>
          </div>
        </div>
        
        {showButton && (
          <Button 
            onClick={() => navigate('/upgrade-plan')} 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-[0_0_15px_rgba(30,174,219,0.5)] transition-all"
            size="sm"
          >
            <CircleDollarSign className="mr-1 h-4 w-4" />
            Recharger
          </Button>
        )}
      </div>
      
      <div className="w-full mt-1">
        <Progress 
          value={creditPercentage} 
          className="h-2 bg-white/10"
        />
        <div className="flex justify-between mt-1 text-xs text-white/60">
          <span>{creditPercentage.toFixed(0)}% restants</span>
          <span>30 000 max</span>
        </div>
      </div>
    </div>
  );
};

export default CreditDisplay;
