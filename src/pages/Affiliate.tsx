
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, TrendingUp, Users, Link, ListChecks, Receipt, Settings } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from '@/contexts/AuthContext';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Affiliate = () => {
  const [references, setReferences] = useState(7);
  const monthlyEarnings = Math.round(references * 37 * 0.4);
  const monthlyBonus = Math.round(monthlyEarnings * 0.08);
  const { user, isPremiumUser, isAffiliate, registerAsAffiliate } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    password: '',
    agreeTerms: false
  });
  const navigate = useNavigate();
  
  // Affiliate dashboard data
  const [activeTab, setActiveTab] = useState('overview');
  const [affiliateStats, setAffiliateStats] = useState({
    totalEarnings: 0,
    pendingPayment: 0,
    totalReferrals: 0,
    activeReferrals: 0,
    clicksThisMonth: 0,
    conversionsThisMonth: 0,
    conversionRate: 0
  });
  
  const [generatedLinks, setGeneratedLinks] = useState([
    { id: 1, name: 'Lien principal', url: 'https://dcemanager.com/?ref=123abc', clicks: 24, conversions: 3 },
    { id: 2, name: 'Facebook', url: 'https://dcemanager.com/?ref=123abc&utm_source=facebook', clicks: 12, conversions: 1 },
  ]);
  
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'WELCOME10', discount: '10%', status: 'active', uses: 5 },
    { id: 2, code: 'SUMMER20', discount: '20%', status: 'inactive', uses: 0 },
  ]);
  
  const [payments, setPayments] = useState([
    { id: 1, date: '2023-10-15', amount: '€148.00', status: 'Payé', method: 'PayPal' },
    { id: 2, date: '2023-09-15', amount: '€92.50', status: 'Payé', method: 'PayPal' },
  ]);
  
  useEffect(() => {
    if (isPremiumUser && isAffiliate) {
      // Fetch affiliate data if the user is already an affiliate
      // This would normally be an API call to get the latest stats
      setAffiliateStats({
        totalEarnings: 240.50,
        pendingPayment: 86.00,
        totalReferrals: 12,
        activeReferrals: 8,
        clicksThisMonth: 78,
        conversionsThisMonth: 3,
        conversionRate: 3.85
      });
    }
  }, [isPremiumUser, isAffiliate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (checked) => {
    setFormData({
      ...formData,
      agreeTerms: checked
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      toast({
        title: "Acceptation requise",
        description: "Veuillez accepter les conditions d'utilisation pour continuer",
        variant: "destructive"
      });
      return;
    }
    
    setIsRegistering(true);
    
    try {
      // In a real implementation, this would be an API call to register the user as an affiliate
      await registerAsAffiliate(formData);
      
      toast({
        title: "Inscription réussie !",
        description: "Vous êtes maintenant un affilié DCEManager",
        variant: "default"
      });
      
      // Refresh the page to show the dashboard
      window.location.reload();
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
        variant: "destructive"
      });
    } finally {
      setIsRegistering(false);
    }
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Lien copié !",
          description: "Le lien d'affiliation a été copié dans le presse-papier",
          variant: "default"
        });
      },
      () => {
        toast({
          title: "Échec de la copie",
          description: "Impossible de copier le lien. Veuillez réessayer",
          variant: "destructive"
        });
      }
    );
  };
  
  const toggleCouponStatus = (id) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === id 
        ? { ...coupon, status: coupon.status === 'active' ? 'inactive' : 'active' }
        : coupon
    ));
    
    toast({
      title: "Statut mis à jour",
      description: "Le statut du coupon a été modifié avec succès",
      variant: "default"
    });
  };
  
  // If the user is not premium, show a premium required message
  if (!isPremiumUser) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Accès Premium Requis</CardTitle>
              <CardDescription>
                Le programme d'affiliation est disponible uniquement pour les utilisateurs premium.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-500" 
                onClick={() => navigate('/upgrade-plan')}
              >
                Passer au Premium
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If the user is premium but not an affiliate yet, show the registration form
  if (isPremiumUser && !isAffiliate) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold mb-4">Rejoignez notre Programme d'Affiliation</h1>
              <p className="text-muted-foreground">
                Gagnez jusqu'à 40% de commission sur chaque abonnement que vous recommandez
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Créer votre compte affilié</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Nom complet</Label>
                      <Input 
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input 
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <label
                        htmlFor="agreeTerms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        J'accepte les <RouterLink to="/terms-of-service" className="text-blue-500 hover:underline">conditions d'utilisation</RouterLink>
                      </label>
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-500" 
                      type="submit"
                      disabled={isRegistering}
                    >
                      {isRegistering ? 'Inscription en cours...' : 'Créer un compte affilié'}
                    </Button>
                  </div>
                </form>
              </Card>
              
              <div>
                <Card className="p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">Pourquoi devenir affilié ?</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Commissions de 40% récurrentes à vie</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Paiements mensuels rapides et fiables</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Outils marketing et support dédiés</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Tableau de bord intuitif pour suivre vos performances</span>
                    </li>
                  </ul>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Estimez vos revenus</h3>
                  <div className="mb-4">
                    <label htmlFor="references" className="block text-sm font-medium mb-2">
                      Nombre de références
                    </label>
                    <div className="flex items-center">
                      <Input 
                        id="references" 
                        type="number" 
                        value={references} 
                        onChange={e => setReferences(parseInt(e.target.value) || 0)} 
                        className="w-full rounded-r-none"
                        min="0"
                      />
                      <Button className="rounded-l-none bg-blue-500">
                        =
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      {monthlyEarnings} €
                      <span className="text-sm font-normal text-muted-foreground ml-2">/ mois</span>
                    </div>
                    <div className="text-blue-400 font-medium mb-4">
                      + {monthlyBonus} € <span className="text-sm font-normal">bonus mensuel</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      *résultat sur l'abonnement mensuel de 37€ (taux de commission de 40%)
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If the user is premium and already an affiliate, show the affiliate dashboard
  return (
    <DashboardLayout breadcrumbs={[{label: 'Affiliation'}]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard d'Affiliation</h1>
          <p className="text-muted-foreground">
            Gérez vos liens d'affiliation, suivez vos performances et accédez à vos paiements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total des Gains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliateStats.totalEarnings.toFixed(2)} €</div>
              <p className="text-xs text-muted-foreground">
                En attente: {affiliateStats.pendingPayment.toFixed(2)} €
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Références</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliateStats.totalReferrals}</div>
              <p className="text-xs text-muted-foreground">
                {affiliateStats.activeReferrals} actifs
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Clics ce mois</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliateStats.clicksThisMonth}</div>
              <p className="text-xs text-muted-foreground">
                {affiliateStats.conversionsThisMonth} conversions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{affiliateStats.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">
                Ce mois-ci
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Aperçu
            </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center">
              <Link className="h-4 w-4 mr-2" />
              Liens
            </TabsTrigger>
            <TabsTrigger value="coupons" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Coupons
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center">
              <Receipt className="h-4 w-4 mr-2" />
              Paiements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Votre lien d'affiliation principal</CardTitle>
                <CardDescription>
                  Partagez ce lien pour gagner des commissions sur chaque nouvelle inscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Input value="https://dcemanager.com/?ref=123abc" readOnly className="flex-1" />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => copyToClipboard("https://dcemanager.com/?ref=123abc")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance récente</CardTitle>
                <CardDescription>
                  Vue d'ensemble de vos statistiques d'affiliation des 30 derniers jours
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Graphique de performance à venir</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="links" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vos liens d'affiliation</CardTitle>
                  <CardDescription>
                    Gérez et suivez vos liens d'affiliation personnalisés
                  </CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500">
                  Nouveau lien
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-5">Nom</div>
                    <div className="col-span-3 text-center">Clics</div>
                    <div className="col-span-3 text-center">Conversions</div>
                    <div className="col-span-1 text-right">Action</div>
                  </div>
                  {generatedLinks.map((link) => (
                    <div key={link.id} className="grid grid-cols-12 p-4 border-b last:border-b-0">
                      <div className="col-span-5">
                        <div className="font-medium">{link.name}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-xs">{link.url}</div>
                      </div>
                      <div className="col-span-3 text-center">{link.clicks}</div>
                      <div className="col-span-3 text-center">{link.conversions}</div>
                      <div className="col-span-1 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => copyToClipboard(link.url)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="coupons" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vos codes de réduction</CardTitle>
                  <CardDescription>
                    Créez et gérez des codes de réduction pour vos affiliés
                  </CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500">
                  Nouveau code
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-4">Code</div>
                    <div className="col-span-3">Réduction</div>
                    <div className="col-span-2 text-center">Utilisations</div>
                    <div className="col-span-2 text-center">Statut</div>
                    <div className="col-span-1 text-right">Action</div>
                  </div>
                  {coupons.map((coupon) => (
                    <div key={coupon.id} className="grid grid-cols-12 p-4 border-b last:border-b-0">
                      <div className="col-span-4 font-medium">{coupon.code}</div>
                      <div className="col-span-3">{coupon.discount}</div>
                      <div className="col-span-2 text-center">{coupon.uses}</div>
                      <div className="col-span-2 text-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          coupon.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}>
                          {coupon.status === 'active' ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                      <div className="col-span-1 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleCouponStatus(coupon.id)}
                        >
                          {coupon.status === 'active' ? 'Désactiver' : 'Activer'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique des paiements</CardTitle>
                <CardDescription>
                  Suivi des commissions qui vous ont été versées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-3">Date</div>
                    <div className="col-span-3">Montant</div>
                    <div className="col-span-3">Méthode</div>
                    <div className="col-span-3">Statut</div>
                  </div>
                  {payments.map((payment) => (
                    <div key={payment.id} className="grid grid-cols-12 p-4 border-b last:border-b-0">
                      <div className="col-span-3">{payment.date}</div>
                      <div className="col-span-3 font-medium">{payment.amount}</div>
                      <div className="col-span-3">{payment.method}</div>
                      <div className="col-span-3">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Affiliate;
