
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'task' | 'auth' | 'deadline';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  userId: string | null;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read' | 'userId'>) => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  getFilteredNotifications: (type?: NotificationType) => Notification[];
  toggleEmailNotifications: (enabled: boolean) => void;
  toggleNotificationType: (type: NotificationType, enabled: boolean) => void;
  notificationSettings: NotificationSettings;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  types: {
    [key in NotificationType]: boolean;
  };
}

const defaultSettings: NotificationSettings = {
  email: true,
  push: false,
  types: {
    info: true,
    success: true,
    warning: true,
    error: true,
    task: true,
    auth: true,
    deadline: true
  }
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultSettings);
  const { user } = useAuth();

  // Calcul du nombre de notifications non lues
  const unreadCount = notifications.filter(notif => !notif.read).length;

  // Simuler le chargement des notifications depuis Supabase
  useEffect(() => {
    if (user) {
      // Simulons quelques notifications pour l'utilisateur connecté
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Bienvenue!',
          message: 'Bienvenue sur DCEManager. Commencez à créer vos premiers DCE.',
          type: 'info',
          read: false,
          createdAt: new Date(Date.now() - 3600000),
          userId: user.id
        },
        {
          id: '2',
          title: 'Nouveau DCE',
          message: 'Un nouveau DCE a été créé: Rénovation du bâtiment A',
          type: 'task',
          read: false,
          createdAt: new Date(Date.now() - 7200000),
          userId: user.id,
          link: '/view-dce/1'
        },
        {
          id: '3',
          title: 'Échéance proche',
          message: 'Le DCE "Travaux de plomberie" arrive à échéance dans 3 jours',
          type: 'deadline',
          read: false,
          createdAt: new Date(Date.now() - 86400000),
          userId: user.id,
          link: '/view-dce/2'
        }
      ];
      
      setNotifications(mockNotifications);
      
      // Simulons le chargement des préférences utilisateur
      const savedSettings = localStorage.getItem(`notification_settings_${user.id}`);
      if (savedSettings) {
        setNotificationSettings(JSON.parse(savedSettings));
      }
    }
  }, [user]);

  // Sauvegarder les paramètres dans le localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`notification_settings_${user.id}`, JSON.stringify(notificationSettings));
    }
  }, [notificationSettings, user]);

  // Ajouter une nouvelle notification
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read' | 'userId'>) => {
    if (!user) return;
    
    // Vérifier si ce type de notification est activé
    if (!notificationSettings.types[notification.type]) return;
    
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
      read: false,
      userId: user.id
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Afficher un toast pour la notification
    toast({
      title: newNotification.title,
      description: newNotification.message,
      variant: notification.type === 'error' ? 'destructive' : 'default',
    });
    
    // Envoyer un email si les notifications par email sont activées
    if (notificationSettings.email) {
      console.log(`Envoi d'un email pour la notification: ${newNotification.title}`);
      // Logique pour envoyer un email
    }
  };

  // Marquer une notification comme lue
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Supprimer une notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Effacer toutes les notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Obtenir les notifications filtrées par type
  const getFilteredNotifications = (type?: NotificationType) => {
    if (!type) return notifications;
    return notifications.filter(notif => notif.type === type);
  };

  // Activer/désactiver les notifications par email
  const toggleEmailNotifications = (enabled: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      email: enabled
    }));
  };

  // Activer/désactiver un type de notification
  const toggleNotificationType = (type: NotificationType, enabled: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      types: {
        ...prev.types,
        [type]: enabled
      }
    }));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        deleteNotification,
        clearAllNotifications,
        getFilteredNotifications,
        toggleEmailNotifications,
        toggleNotificationType,
        notificationSettings
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
