
import { NotificationContextType } from '../contexts/NotificationContext';

declare global {
  interface Window {
    _getNotificationContext?: () => any;
  }
}

export {};
