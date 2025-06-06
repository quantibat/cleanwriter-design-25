import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, LayoutDashboard } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface UserDropdownMenuProps {
  onSignOut: () => void;
  showUserInfo?: boolean;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({
  onSignOut,
  showUserInfo = false
}) => {
  const { user } = useAuth();

  const { data: newTendersCount = 0 } = useQuery({
    queryKey: ['newTendersCount'],
    queryFn: async () => {
      // Get the user's last sign in date
      const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
      if (userError) throw userError;
      
      const currentUser = users.find(u => u.id === user?.id);
      const lastSignIn = currentUser?.last_sign_in_at;
      
      if (!lastSignIn) return 0;

      // Get tenders added since last sign in
      const { data: tenders, error: tendersError } = await supabase
        .from('appel_offre')
        .select('metadata')
        .gte('metadata->>startDate', lastSignIn);

      if (tendersError) throw tendersError;
      
      return tenders?.length || 0;
    },
    enabled: !!user
  });

  // Get avatar URL from user metadata
  const getAvatarUrl = () => {
    if (user?.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url;
    } else if (user?.app_metadata?.provider === 'google' && user?.user_metadata?.picture) {
      return user.user_metadata.picture;
    }
    return null;
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name[0].toUpperCase();
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={getAvatarUrl()} />
              <AvatarFallback className="bg-blue-500 text-white">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[240px] p-2 bg-gray-700 border border-gray-700">
          <div className="mb-4">
            <p className="text-base font-medium mb-0.5">{user?.user_metadata?.full_name || 'Utilisateur'}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent cursor-pointer">
            <div className="bg-indigo-500/10 p-2 rounded-md">
              <LayoutDashboard className="h-4 w-4 text-indigo-500" />
            </div>
            <div>
              <p className="font-medium">Tableau de Bord</p>
            </div>
          </Link>
          
          <Link to="/account" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent cursor-pointer">
            <div className="bg-blue-500/10 p-2 rounded-md">
              <User className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">Mon Compte</p>
            </div>
          </Link>

          <Link to="/offres" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent cursor-pointer">
            <div className="bg-blue-500/10 p-2 rounded-md">
              <LayoutDashboard className="h-4 w-4 text-blue-500" />
            </div>
            <div className="flex items-center gap-2">
              <p className="font-medium">Nouveaux AO</p>
              <Badge variant="secondary" className="bg-blue-500 text-white">
                {newTendersCount}
              </Badge>
            </div>
          </Link>

          <div className="mt-4 pt-4 border-t">
            <button onClick={onSignOut} className="w-full text-left text-sm text-red-500 hover:text-red-600 px-3 py-2 rounded-md hover:bg-red-50/10">
              Déconnexion
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropdownMenu;
