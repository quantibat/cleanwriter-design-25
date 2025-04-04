
import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FavoritableCard = ({ title, description, onAddToFavorites, isFavorite, icon, isComing, url }) => {
  const toggleFavorite = () => {
    onAddToFavorites({ title, description, icon, isFavorite, isComing, url });
  };

  return (
    <Card
      className="h-[16rem] group relative pb-2 flex flex-col justify-center rounded-2xl bg-gray-200 pl-3 pr-3 shadow-sm ring-0 ring-gray-200 transition-all duration-150 hover:shadow-lg hover:ring-2 hover:ring-white focus:shadow-xl focus:ring-gray-600 dark:bg-gray-700 dark:hover:ring-gray-300 dark:focus:ring-gray-400 bg-[#384454]"
    >
      <CardHeader className="pb-3 relative pt-0">
        <div className='flex flex-row items-center justify-between mb-3'>
          <div className="flex h-12 w-12 bg-neon-blue/20 rounded-lg items-center justify-center group-hover:bg-neon-blue/30 transition-colors">
            <div className="text-neon-blue">
              {icon}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isComing && (
              <Badge variant="coming">A venir</Badge>
            )}
            <button 
              className="flex justify-center text-gray-400  hover:text-yellow-500" 
              title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                toggleFavorite();
              }}
            >
              <Star 
                size={20} 
                fill={isFavorite ? "currentColor" : "none"} 
              />
            </button>
          </div>
        </div>
        <CardTitle className="text-lg"><a className='cursor-pointer' href={url}>{title}</a></CardTitle>
      </CardHeader>
      <CardContent className='text-gray-300 pb-0'>
        <p className="line-clamp-3 flex-1 text-gray-400 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}

export default FavoritableCard;
