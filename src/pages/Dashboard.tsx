
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Users, FileText, ArrowRight, Clock, LogOut } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Activity {
  id: number;
  date: string;
  time: string;
  device: string;
  location: string;
}

interface SignupData {
  name: string;
  count: number;
}

const Dashboard = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [timeFrame, setTimeFrame] = useState<"1year" | "2years">("1year");
  const [signupData, setSignupData] = useState<SignupData[]>([]);
  
  useEffect(() => {
    // Simulating fetching user's recent login activities
    const mockActivities: Activity[] = [
      {
        id: 1,
        date: "11 juin 2023",
        time: "14:25",
        device: "Chrome sur Windows",
        location: "Paris, France"
      },
      {
        id: 2,
        date: "10 juin 2023",
        time: "09:12",
        device: "Safari sur iPhone",
        location: "Paris, France"
      },
      {
        id: 3,
        date: "8 juin 2023",
        time: "18:47",
        device: "Chrome sur MacOS",
        location: "Lyon, France"
      }
    ];
    
    setActivities(mockActivities);

    // Generate mock signup data
    generateSignupData(timeFrame);
    
    // Create floating particles for the background effect
    const createParticles = () => {
      const container = document.querySelector('.particles-container');
      if (!container) return;
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('star');
        
        // Random size
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
      }
    };
    
    createParticles();
  }, [timeFrame]);

  const generateSignupData = (period: "1year" | "2years") => {
    const data: SignupData[] = [];
    const weeksCount = period === "1year" ? 52 : 104;
    const baselineUsers = 10;
    
    for (let i = 0; i < weeksCount; i++) {
      // Generate random signup counts with an upward trend
      const weekNumber = i + 1;
      const trendFactor = Math.min(1.8, 1 + (i / weeksCount)); // Linear growth factor
      const randomVariation = Math.random() * 10 - 5; // Random fluctuation
      const count = Math.max(0, Math.round(baselineUsers * trendFactor + randomVariation));
      
      data.push({
        name: `S${weekNumber}`,
        count,
      });
    }
    
    setSignupData(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="particles-container fixed inset-0 z-0 pointer-events-none"></div>
      
      {/* Dashboard Header */}
      <header className="bg-background/20 backdrop-blur-md border-b border-white/5 py-6 px-6 md:px-10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-foreground flex items-center">
              <span className="text-blue-400">AI</span>Writer
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              Bonjour, Jean Dupont
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="hover-button border-white/10 bg-white/5 hover:bg-white/10"
              asChild
            >
              <Link to="/account">
                <Users className="h-4 w-4 mr-2" />
                Mon compte
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hover-button border-white/10 bg-white/5 hover:bg-white/10"
              asChild
            >
              <Link to="/">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-12 px-6 md:px-10">
        <h1 className="text-3xl font-bold mb-8 fade-up visible">Tableau de bord</h1>
        
        {/* Welcome Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="cosmic-card md:col-span-2 fade-up visible">
            <CardHeader>
              <CardTitle>Bienvenue, Jean Dupont</CardTitle>
              <CardDescription>
                Voici un aperçu de votre activité sur AI Writer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                <Calendar className="h-4 w-4" />
                <AlertTitle>Abonnement Premium</AlertTitle>
                <AlertDescription>
                  Votre abonnement est actif jusqu'au 15 juillet 2023.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center">
                    <div className="bg-blue-500/20 p-2 rounded-md mr-3">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Documents</p>
                      <p className="text-xl font-bold">24</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center">
                    <div className="bg-blue-500/20 p-2 rounded-md mr-3">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Collaborateurs</p>
                      <p className="text-xl font-bold">3</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center">
                    <div className="bg-blue-500/20 p-2 rounded-md mr-3">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Minutes gagnées</p>
                      <p className="text-xl font-bold">356</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cosmic-card bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/20 fade-up visible">
            <CardHeader>
              <CardTitle className="text-blue-400">Créez du contenu</CardTitle>
              <CardDescription>
                Utilisez AI Writer pour générer du contenu de qualité rapidement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full hover-button bg-blue-500 hover:bg-blue-600 text-white font-medium mt-4">
                Nouveau document <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Signup Chart */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 fade-up visible">Inscriptions hebdomadaires</h2>
          <Card className="cosmic-card fade-up visible">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Évolution des inscriptions</CardTitle>
                <CardDescription>Nombre d'utilisateurs inscrits par semaine</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={timeFrame === "1year" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFrame("1year")}
                  className={timeFrame === "1year" ? "bg-blue-500 hover:bg-blue-600" : ""}
                >
                  1 an
                </Button>
                <Button
                  variant={timeFrame === "2years" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFrame("2years")}
                  className={timeFrame === "2years" ? "bg-blue-500 hover:bg-blue-600" : ""}
                >
                  2 ans
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={{
                    inscriptions: {
                      label: "Inscriptions",
                      theme: {
                        light: "#3b82f6",
                        dark: "#60a5fa"
                      }
                    }
                  }}
                >
                  <BarChart data={signupData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: "#94a3b8" }}
                      tickFormatter={(value) => {
                        // Show fewer ticks for readability
                        const weekNum = parseInt(value.substring(1));
                        return weekNum % (timeFrame === "1year" ? 4 : 8) === 0 ? value : "";
                      }}
                    />
                    <YAxis tick={{ fill: "#94a3b8" }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background/90 backdrop-blur-sm border border-white/10 p-2 rounded shadow-md">
                              <p className="font-medium">Semaine {payload[0].payload.name.substring(1)}</p>
                              <p className="text-blue-400">
                                {payload[0].value} inscriptions
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      name="Inscriptions" 
                      fill="var(--color-inscriptions)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Logins */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 fade-up visible">Connexions récentes</h2>
          <Card className="cosmic-card fade-up visible">
            <CardContent className="p-6">
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-white/5 rounded-lg bg-white/5"
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                          <Clock className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.device}</p>
                          <p className="text-xs text-muted-foreground">{activity.location}</p>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <p className="text-sm">{activity.date}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">Aucune activité récente.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
