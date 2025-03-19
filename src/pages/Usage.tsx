
import React from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for usage stats
const mockUsageData = [
  { date: '01/05', value: 10 },
  { date: '02/05', value: 25 },
  { date: '03/05', value: 15 },
  { date: '04/05', value: 40 },
  { date: '05/05', value: 30 },
  { date: '06/05', value: 55 },
  { date: '07/05', value: 45 },
];

const FEATURE_LIMITS = {
  'projects': { max: 10, used: 3, label: 'Projets' },
  'storage': { max: 500, used: 125, label: 'Stockage (Mo)' },
  'exports': { max: 50, used: 20, label: 'Exports' },
  'api_calls': { max: 1000, used: 450, label: 'Appels API' }
};

const Usage = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout activeTab="usage" breadcrumbs={[{ label: 'Utilisation' }]}>
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-6">Utilisation</h1>
        
        <Tabs defaultValue="overview" className="mb-6 w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="daily">Utilisation quotidienne</TabsTrigger>
            <TabsTrigger value="features">Par fonctionnalité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="w-full">
            <Card className="mb-6 w-full">
              <CardHeader>
                <CardTitle>Utilisation globale</CardTitle>
                <CardDescription>
                  Résumé de votre utilisation sur la période actuelle
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="w-full">
                    <h3 className="font-medium mb-4">Limites par fonctionnalité</h3>
                    <div className="space-y-4 w-full">
                      {Object.entries(FEATURE_LIMITS).map(([key, feature]) => (
                        <div key={key} className="w-full">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{feature.label}</span>
                            <span className="text-sm font-medium">{feature.used}/{feature.max}</span>
                          </div>
                          <Progress value={(feature.used / feature.max) * 100} className="h-2 w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="w-full">
                    <h3 className="font-medium mb-4">Tendance d'utilisation</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockUsageData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="daily" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Utilisation quotidienne</CardTitle>
                <CardDescription>
                  Analyse détaillée de votre consommation de ressources par jour
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockUsageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {Object.entries(FEATURE_LIMITS).map(([key, feature]) => (
                <Card key={key} className="w-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{feature.label}</CardTitle>
                    <CardDescription>
                      {feature.used}/{feature.max} utilisés
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="w-full">
                    <Progress value={(feature.used / feature.max) * 100} className="h-2 mb-4 w-full" />
                    <p className="text-sm text-muted-foreground">
                      {feature.max - feature.used} {feature.label.toLowerCase()} restants dans votre plan actuel
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Usage;
