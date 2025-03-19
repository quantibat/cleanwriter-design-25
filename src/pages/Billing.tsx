
import React from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock data for billing information
  const billing = {
    plan: 'Gratuit',
    isPaid: false,
    nextBillingDate: 'N/A',
    amount: '0 €',
    credits: 120,
    usedCredits: 10,
    invoices: []
  };

  const handleUpgradePlan = () => {
    navigate('/pricing');
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Facturation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                <div className="flex items-center">
                  <span>Plan actuel</span>
                  {billing.isPaid ? (
                    <Badge variant="default" className="ml-2 bg-blue-500">Premium</Badge>
                  ) : (
                    <Badge variant="outline" className="ml-2">Gratuit</Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">
                {billing.plan}
              </div>
              {billing.isPaid ? (
                <p className="text-sm text-muted-foreground">
                  Prochain paiement: {billing.nextBillingDate}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">
                  Passez à Premium pour plus de fonctionnalités
                </p>
              )}
              {!billing.isPaid && (
                <Button onClick={handleUpgradePlan} className="w-full mt-2">
                  Mettre à niveau
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Crédits disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Utilisés: {billing.usedCredits}</span>
                <span className="text-sm font-medium">{billing.usedCredits}/{billing.credits}</span>
              </div>
              <Progress value={(billing.usedCredits / billing.credits) * 100} className="h-2 mb-4" />
              <div className="text-3xl font-bold mb-4">
                {billing.credits - billing.usedCredits} crédits
              </div>
              <Button variant="outline" className="w-full">
                Acheter des crédits
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Méthode de paiement</CardTitle>
            </CardHeader>
            <CardContent>
              {billing.isPaid ? (
                <div className="flex items-start space-x-3">
                  <CreditCard className="h-5 w-5 mt-1" />
                  <div>
                    <p className="font-medium">Visa •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expire le 12/25</p>
                    <Button variant="link" className="px-0 h-auto text-sm">
                      Modifier
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-24">
                  <CreditCard className="h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Aucune méthode de paiement
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Historique des factures</CardTitle>
            <CardDescription>Vos factures des 12 derniers mois</CardDescription>
          </CardHeader>
          <CardContent>
            {billing.invoices && billing.invoices.length > 0 ? (
              <div className="space-y-4">
                {billing.invoices.map((invoice, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>Date de facture</div>
                    <div>Montant</div>
                    <Button variant="ghost" size="sm">
                      Télécharger
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">Aucune facture</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Aucune facture n'a été générée. Elles apparaîtront ici une fois que vous aurez souscrit à un plan.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
