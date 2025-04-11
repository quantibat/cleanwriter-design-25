declare global {
  interface Window {
    _getNotificationContext?: () => any;
    createChat?: (options: { webhookUrl: string }) => void;
  }
}

export {};
