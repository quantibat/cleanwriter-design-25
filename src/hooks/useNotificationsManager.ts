
import { useNotifications } from '@/contexts/NotificationContext';
import { toast } from '@/hooks/use-toast';
import { NotificationType } from '@/contexts/NotificationContext';

export interface NotifyParams {
  title: string;
  message: string;
  type?: NotificationType;
  showToast?: boolean;
  link?: string;
}

export const useNotificationsManager = () => {
  const notifications = useNotifications();

  const notify = ({
    title,
    message,
    type = 'info',
    showToast = true,
    link
  }: NotifyParams) => {
    // Ajouter à la liste des notifications
    notifications.addNotification({
      title,
      message,
      type,
      link
    });

    // Afficher un toast si nécessaire
    if (showToast) {
      toast({
        title,
        description: message,
        variant: type === 'error' ? 'destructive' : 'default',
      });
    }
  };

  const notifySuccess = (title: string, message: string, showToast = true, link?: string) => {
    notify({ title, message, type: 'success', showToast, link });
  };

  const notifyError = (title: string, message: string, showToast = true, link?: string) => {
    notify({ title, message, type: 'error', showToast, link });
  };

  const notifyWarning = (title: string, message: string, showToast = true, link?: string) => {
    notify({ title, message, type: 'warning', showToast, link });
  };

  const notifyTask = (title: string, message: string, showToast = true, link?: string) => {
    notify({ title, message, type: 'task', showToast, link });
  };

  const notifyDeadline = (title: string, message: string, showToast = true, link?: string) => {
    notify({ title, message, type: 'deadline', showToast, link });
  };

  const notifyAuth = (title: string, message: string, showToast = true, link?: string) => {
    notify({ title, message, type: 'auth', showToast, link });
  };

  return {
    notify,
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyTask,
    notifyDeadline,
    notifyAuth,
    ...notifications
  };
};
