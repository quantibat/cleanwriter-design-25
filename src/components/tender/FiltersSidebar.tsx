
import React from 'react';
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, SlidersHorizontal } from "lucide-react";

interface FiltersProps {
  scoreMin: number;
  setScoreMin: (value: number) => void;
  onReset: () => void;
}

export const FiltersSidebar: React.FC<FiltersProps> = ({
  scoreMin,
  setScoreMin,
  onReset
}) => {
  return (
    <div className="w-[280px] flex-shrink-0 mr-6">
      <Card className="p-4 bg-gray-800 border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            <h3 className="font-semibold">Filtres</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onReset}
            className="h-8 px-2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Score minimum</Label>
            <div className="pt-2">
              <Slider
                value={[scoreMin]}
                onValueChange={(value) => setScoreMin(value[0])}
                max={100}
                step={1}
                className="[&_[role=slider]]:bg-blue-500"
              />
            </div>
            <div className="text-sm text-gray-400">
              {scoreMin}% de compatibilité minimum
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
