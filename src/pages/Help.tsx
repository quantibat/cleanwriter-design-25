
import React from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, Mail, FileText, ExternalLink } from 'lucide-react';

const Help = () => {
  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Centre d'aide</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat en direct
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Discutez avec notre équipe de support en temps réel.
              </p>
              <Button className="w-full">
                Démarrer une conversation
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Envoyez un email à notre équipe de support.
              </p>
              <Button variant="outline" className="w-full">
                support@dcemanager.com
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Consultez notre documentation détaillée.
              </p>
              <Button variant="outline" className="w-full">
                Voir la documentation
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mb-8">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Contactez-nous</CardTitle>
              <CardDescription>
                Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nom complet
                  </label>
                  <Input id="name" placeholder="Votre nom" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Votre email" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Sujet
                  </label>
                  <Input id="subject" placeholder="Sujet de votre demande" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Détaillez votre demande..."
                  />
                </div>
                <Button type="submit" className="w-full">
                  Envoyer
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Questions fréquentes</CardTitle>
              <CardDescription>
                Trouvez rapidement des réponses aux questions les plus courantes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Comment créer un nouveau projet ?</AccordionTrigger>
                  <AccordionContent>
                    Pour créer un nouveau projet, rendez-vous sur la page "Projets" et cliquez sur le bouton "Nouveau projet". Suivez ensuite les instructions pour configurer votre projet selon vos besoins.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Comment exporter un DCE ?</AccordionTrigger>
                  <AccordionContent>
                    Depuis la page de détail d'un DCE, cliquez sur le bouton "Exporter" en haut à droite. Vous pourrez choisir le format d'export souhaité (PDF, Word, Excel) et personnaliser les options d'export selon vos besoins.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Comment modifier mon abonnement ?</AccordionTrigger>
                  <AccordionContent>
                    Pour modifier votre abonnement, rendez-vous dans la section "Facturation" depuis votre menu de profil. Vous pourrez y voir les différentes options disponibles et choisir celle qui correspond le mieux à vos besoins.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Comment inviter des collaborateurs ?</AccordionTrigger>
                  <AccordionContent>
                    Depuis la page d'un projet, cliquez sur l'onglet "Équipe" puis sur "Inviter un collaborateur". Entrez l'adresse email de la personne que vous souhaitez inviter et définissez ses droits d'accès.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Comment réinitialiser mon mot de passe ?</AccordionTrigger>
                  <AccordionContent>
                    Sur la page de connexion, cliquez sur "Mot de passe oublié" et suivez les instructions. Un email contenant un lien de réinitialisation sera envoyé à l'adresse associée à votre compte.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full flex items-center justify-center">
                <span>Voir toutes les FAQ</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Help;
