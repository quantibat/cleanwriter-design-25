
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BugIcon, MessageSquareText, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

interface FormValues {
  feedback: string;
}

const ContributeForm = () => {
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      feedback: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Feedback submitted:', data);
    toast({
      title: "Merci pour votre contribution!",
      description: "Nous avons bien reçu votre feedback et l'examinerons attentivement.",
    });
    setSubmitted(true);
    
    // Reset the form after a delay
    setTimeout(() => {
      form.reset();
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 w-full">
      <Card className="cosmic-card border-white/10 w-full">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <span className="text-blue-400">Nous avons besoin de votre aide pour améliorer DCEManager</span>
          </CardTitle>
          <CardDescription className="text-lg">
            (Et nous sommes prêts à vous payer pour ça)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-semibold">1</span>
              </div>
              <div>
                <p className="text-lg">
                  Trouvez un bug, quelque chose que vous n'aimez pas, ou une fonctionnalité que vous aimeriez que nous ajoutions à DCEManager
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-semibold">2</span>
              </div>
              <div>
                <p className="text-lg">
                  Envoyez votre feedback via ce formulaire (en anglais ou en français); (cela prend en moyenne 2 minutes)
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-semibold">3</span>
              </div>
              <div>
                <p className="text-lg">
                  Si votre feedback nous a été utile, nous mettrons à niveau votre compte vers la version premium GRATUITEMENT (valeur de 27 $)
                </p>
              </div>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Votre feedback</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Partagez vos idées, suggestions ou rapports de bug ici..."
                        className="min-h-[150px] border-white/10 bg-white/5 focus:border-blue-400"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Soyez aussi détaillé que possible pour nous aider à mieux comprendre.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600"
                disabled={submitted}
              >
                {submitted ? (
                  "Merci pour votre contribution!"
                ) : (
                  <>
                    <SendIcon className="mr-2 h-4 w-4" />
                    Envoyer un feedback
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContributeForm;
