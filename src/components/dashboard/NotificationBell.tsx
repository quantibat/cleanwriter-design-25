
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

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative bg-transparent hover:bg-transparent">
          {unreadCount > 0 ? (
            <>
              <BellDotIcon className="h-5 w-5 text-orange-500" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </>
          ) : (
            <BellIcon className="h-5 w-5 text-gray-400" />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80 max-h-[70vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 hover:bg-accent rounded-md"
              onClick={() => markAllAsRead()}
            >
              Tout marquer comme lu
            </Button>
          )}
        </div>
        
        <div className="py-2">
          {notifications.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <BellIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
              <p>Pas de notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="px-4 py-3 focus:bg-accent cursor-default">
                <div 
                  className="w-full flex items-start gap-3 relative"
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className={cn("w-2 h-2 rounded-full mt-1.5", getNotificationColor(notification.type))} />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className={cn("text-sm line-clamp-2 font-medium", !notification.read && "text-foreground")}>
                        {notification.title}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(notification.date), { 
                          addSuffix: true,
                          locale: fr
                        })}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex gap-2 mt-2">
                      {!notification.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs rounded-md"
                          onClick={(e) => handleMarkAsRead(notification.id, e)}
                        >
                          <CheckIcon className="h-3 w-3 mr-1" />
                          Marquer comme lu
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs rounded-md"
                        onClick={(e) => handleDelete(notification.id, e)}
                      >
                        <Trash2Icon className="h-3 w-3 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2 text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="text-xs w-full justify-center"
              >
                <Link to="/notifications">
                  Voir toutes les notifications
                </Link>
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
