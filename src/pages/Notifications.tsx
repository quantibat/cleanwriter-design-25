
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useNotifications, NotificationType } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, ClockIcon, InfoIcon, MailIcon, AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, Trash2Icon, ListTodoIcon, BellIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    getFilteredNotifications,
    toggleEmailNotifications,
    toggleNotificationType,
    notificationSettings
  } = useNotifications();
  const [activeTab, setActiveTab] = useState<"all" | "settings">("all");
  const [filter, setFilter] = useState<NotificationType | "all">("all");

  // Obtenir les notifications filtrées
  const filteredNotifications = filter === "all" ? notifications : getFilteredNotifications(filter as NotificationType);

  // Obtenir l'icône pour un type de notification
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangleIcon className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertCircleIcon className="h-5 w-5 text-red-500" />;
      case 'task':
        return <ListTodoIcon className="h-5 w-5 text-blue-500" />;
      case 'auth':
        return <CheckIcon className="h-5 w-5 text-purple-500" />;
      case 'deadline':
        return <ClockIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <InfoIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  // Obtenir le titre pour un type de notification
  const getNotificationTypeTitle = (type: NotificationType | "all") => {
    switch (type) {
      case 'info':
        return 'Informations';
      case 'success':
        return 'Succès';
      case 'warning':
        return 'Avertissements';
      case 'error':
        return 'Erreurs';
      case 'task':
        return 'Tâches';
      case 'auth':
        return 'Authentification';
      case 'deadline':
        return 'Échéances';
      case 'all':
        return 'Toutes';
      default:
        return type;
    }
  };

  return (
    <DashboardLayout 
      activeTab="notifications" 
      breadcrumbs={[{ label: 'Notifications' }]}
    >
      <div className="w-full max-w-full flex flex-col space-y-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-semibold">Centre de notifications</h1>
          <div className="flex gap-2">
            {activeTab === "all" && notifications.length > 0 && (
              <>
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Marquer tout comme lu
                </Button>
                <Button variant="outline" size="sm" onClick={clearAllNotifications}>
                  <Trash2Icon className="h-4 w-4 mr-2" />
                  Effacer tout
                </Button>
              </>
            )}
          </div>
        </div>
        
        <Tabs 
          defaultValue="all" 
          onValueChange={v => setActiveTab(v as "all" | "settings")} 
          className="w-full space-y-4"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="all">Notifications</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
                  <CardTitle>Vos notifications</CardTitle>
                  <div className="overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                    <ToggleGroup type="single" value={filter} onValueChange={value => setFilter(value as NotificationType | "all")} className="flex flex-nowrap">
                      <ToggleGroupItem value="all" aria-label="Toutes" title="Toutes">
                        <BellIcon className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="info" aria-label="Informations" title="Informations">
                        <InfoIcon className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="success" aria-label="Succès" title="Succès">
                        <CheckCircleIcon className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="warning" aria-label="Avertissements" title="Avertissements">
                        <AlertTriangleIcon className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="error" aria-label="Erreurs" title="Erreurs">
                        <AlertCircleIcon className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="task" aria-label="Tâches" title="Tâches">
                        <ListTodoIcon className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="deadline" aria-label="Échéances" title="Échéances">
                        <ClockIcon className="h-4 w-4" />
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
                <CardDescription>
                  {filteredNotifications.length === 0 
                    ? "Vous n'avez aucune notification."
                    : `Affichage de ${getNotificationTypeTitle(filter)} les notifications (${filteredNotifications.length})`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 w-full">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground w-full">
                      <BellIcon className="mx-auto h-12 w-12 mb-4 opacity-20" />
                      <p>Aucune notification à afficher.</p>
                    </div>
                  ) : (
                    filteredNotifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "p-4 border rounded-lg transition-colors w-full",
                          !notification.read ? "bg-primary/5" : "bg-card"
                        )}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-4">
                          <div className="flex gap-3">
                            {getNotificationIcon(notification.type)}
                            <div className="w-full">
                              <div className="font-medium">{notification.title}</div>
                              <p className="text-sm text-muted-foreground">
                                {notification.message}
                              </p>
                              <div className="text-xs text-muted-foreground mt-1">
                                {format(new Date(notification.createdAt), 'PPP à HH:mm', {
                                  locale: fr
                                })}
                              </div>
                              {notification.link && (
                                <Link 
                                  to={notification.link} 
                                  className="text-xs text-primary hover:underline mt-2 inline-block"
                                >
                                  Voir les détails
                                </Link>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1 sm:self-start">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => markAsRead(notification.id)} 
                                title="Marquer comme lu"
                              >
                                <CheckIcon className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => deleteNotification(notification.id)} 
                              title="Supprimer"
                            >
                              <Trash2Icon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Paramètres de notifications</CardTitle>
                <CardDescription>
                  Personnalisez la façon dont vous recevez les notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 w-full">
                <div className="space-y-4 w-full">
                  <h3 className="text-lg font-medium">Canaux de notification</h3>
                  <div className="space-y-2 w-full">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="email-notifications" 
                        checked={notificationSettings.email} 
                        onCheckedChange={checked => toggleEmailNotifications(checked === true)} 
                      />
                      <Label htmlFor="email-notifications" className="flex items-center">
                        <MailIcon className="h-4 w-4 mr-2" />
                        Notifications par email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="push-notifications" 
                        checked={notificationSettings.push} 
                        onCheckedChange={checked => {
                          // Simuler le changement
                          console.log('Toggle push notifications:', checked);
                        }} 
                        disabled 
                      />
                      <Label htmlFor="push-notifications" className="flex items-center text-muted-foreground">
                        <BellIcon className="h-4 w-4 mr-2" />
                        Notifications push (bientôt disponible)
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 w-full">
                  <h3 className="text-lg font-medium">Types de notifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="type-info" 
                        checked={notificationSettings.types.info} 
                        onCheckedChange={checked => toggleNotificationType('info', checked === true)} 
                      />
                      <Label htmlFor="type-info" className="flex items-center">
                        <InfoIcon className="h-4 w-4 mr-2 text-blue-500" />
                        Informations
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="type-success" 
                        checked={notificationSettings.types.success} 
                        onCheckedChange={checked => toggleNotificationType('success', checked === true)} 
                      />
                      <Label htmlFor="type-success" className="flex items-center">
                        <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                        Succès
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="type-warning" 
                        checked={notificationSettings.types.warning} 
                        onCheckedChange={checked => toggleNotificationType('warning', checked === true)} 
                      />
                      <Label htmlFor="type-warning" className="flex items-center">
                        <AlertTriangleIcon className="h-4 w-4 mr-2 text-amber-500" />
                        Avertissements
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="type-error" 
                        checked={notificationSettings.types.error} 
                        onCheckedChange={checked => toggleNotificationType('error', checked === true)} 
                      />
                      <Label htmlFor="type-error" className="flex items-center">
                        <AlertCircleIcon className="h-4 w-4 mr-2 text-red-500" />
                        Erreurs
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="type-task" 
                        checked={notificationSettings.types.task} 
                        onCheckedChange={checked => toggleNotificationType('task', checked === true)} 
                      />
                      <Label htmlFor="type-task" className="flex items-center">
                        <ListTodoIcon className="h-4 w-4 mr-2 text-blue-500" />
                        Tâches et actions
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="type-deadline" 
                        checked={notificationSettings.types.deadline} 
                        onCheckedChange={checked => toggleNotificationType('deadline', checked === true)} 
                      />
                      <Label htmlFor="type-deadline" className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2 text-orange-500" />
                        Échéances
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="type-auth" 
                        checked={notificationSettings.types.auth} 
                        onCheckedChange={checked => toggleNotificationType('auth', checked === true)} 
                      />
                      <Label htmlFor="type-auth" className="flex items-center">
                        <CheckIcon className="h-4 w-4 mr-2 text-purple-500" />
                        Authentification
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Les paramètres sont sauvegardés automatiquement
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
