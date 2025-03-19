
import React, { useState } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { BellIcon, BellDotIcon, CheckIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-amber-500';
      case 'deadline': return 'bg-orange-500';
      case 'task': return 'bg-blue-500';
      case 'auth': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-sidebar-accent/30"
        >
          {unreadCount > 0 ? (
            <>
              <BellDotIcon className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center translate-x-1 -translate-y-1">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </>
          ) : (
            <BellIcon className="h-5 w-5" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-[80vh] overflow-auto">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-6"
              onClick={() => markAllAsRead()}
            >
              Tout marquer comme lu
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications.length === 0 ? (
            <div className="py-4 px-2 text-center text-muted-foreground">
              Aucune notification
            </div>
          ) : (
            notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className={cn(
                  "flex flex-col items-start p-3 cursor-pointer", 
                  !notification.read && "bg-primary/5"
                )}
                onClick={() => {
                  markAsRead(notification.id);
                  setOpen(false);
                  if (notification.link) {
                    // La navigation sera gérée par le Link à l'intérieur
                  }
                }}
              >
                <div className="flex w-full justify-between gap-2">
                  <div className="flex gap-3 items-start">
                    <div className={cn("w-2 h-2 rounded-full mt-2", getNotificationColor(notification.type))} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{notification.title}</div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(notification.createdAt), { 
                          addSuffix: true,
                          locale: fr
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => handleMarkAsRead(notification.id, e)}
                      >
                        <CheckIcon className="h-3 w-3" />
                        <span className="sr-only">Marquer comme lu</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => handleDelete(notification.id, e)}
                    >
                      <Trash2Icon className="h-3 w-3" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </div>
                </div>
                {notification.link && (
                  <Link 
                    to={notification.link}
                    className="mt-2 text-xs text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Voir les détails
                  </Link>
                )}
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="justify-center">
              <Link 
                to="/notifications" 
                className="text-primary text-sm hover:text-primary/80"
                onClick={() => setOpen(false)}
              >
                Voir toutes les notifications
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
