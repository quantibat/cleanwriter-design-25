import React, { useState } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { BellIcon, BellDotIcon, CheckIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
const NotificationBell = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();
  const [open, setOpen] = useState(false);

  // Gestionnaire pour marquer une notification comme lue
  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    markAsRead(id);
  };

  // Gestionnaire pour supprimer une notification
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotification(id);
  };

  // Obtenir une couleur en fonction du type de notification
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-amber-500';
      case 'deadline':
        return 'bg-orange-500';
      case 'task':
        return 'bg-blue-500';
      case 'auth':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };
  return <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        
      </DropdownMenuTrigger>
      
    </DropdownMenu>;
};
export default NotificationBell;