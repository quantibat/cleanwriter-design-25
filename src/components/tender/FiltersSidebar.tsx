import React from 'react';
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface FiltersProps {
  scoreMin: number;
  setScoreMin: (value: number) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  dateLimit: Date | undefined;
  setDateLimit: (date: Date | undefined) => void;
  workType: string;
  setWorkType: (type: string) => void;
  cities: string[];
  workTypes: string[];
  onReset: () => void;
}

export const FiltersSidebar: React.FC<FiltersProps> = ({
  scoreMin,
  setScoreMin,
  selectedCity,
  setSelectedCity,
  dateLimit,
  setDateLimit,
  workType,
  setWorkType,
  cities,
  workTypes,
  onReset
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "lg:w-[280px] w-full flex-shrink-0",
      isMobile ? "px-4" : "mr-6"
    )}>
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
                max={5}
                step={0.1}
                className="[&_[role=slider]]:bg-blue-500"
              />
            </div>
            <div className="text-sm text-gray-400">
              {scoreMin.toFixed(1)}/5 minimum
            </div>
          </div>

          <div className="space-y-4">
            <Label>Ville</Label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les villes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_cities">Toutes les villes</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Date limite avant le</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateLimit && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateLimit ? (
                    format(dateLimit, "d MMMM yyyy", { locale: fr })
                  ) : (
                    <span>Sélectionner une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateLimit}
                  onSelect={setDateLimit}
                  initialFocus
                  locale={fr}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-4">
            <Label>Type de travaux</Label>
            <Select value={workType} onValueChange={setWorkType}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_types">Tous les types</SelectItem>
                {workTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );
};
