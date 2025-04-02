import React from 'react';
import { ClipboardCheck, Star, StarOff,  } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import exp from 'constants';

const FavoritableCard =({ title, description,  onAddToFavorites, isFavorite, icon, isComing }) => {
  
    const toggleFavorite = ({ title, description, icon, isFavorite, isComing }) => {
      onAddToFavorites({ title, description, icon, isFavorite, isComing });
    };
  
    return (
      <Card
        className="cursor-pointer h-[16rem] group relative pb-6 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454]"
      >
        <CardHeader className="pb-3 relative">
          <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg items-center justify-center mb-3 group-hover:bg-neon-blue/30 transition-colors">
            <div className="text-neon-blue">
              {icon}
            </div>
          </div>
          <>
          {
                isComing && ( <Badge className="absolute top-4 right-0 mr-3 mt-6 bg-red-500 text-white">A venir</Badge>)
            
            }
            <button  className="ml-2 text-gray-300 hover:text-gray-300 absolute top-0 right-0">
              {isFavorite ? <Star size={20} /> : <StarOff size={20} />}
            </button>
          </>

          <CardTitle className="text-lg flex justify-between items-center">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">{description}</p>
        </CardContent>
      </Card>
    );
  }

  export default FavoritableCard;