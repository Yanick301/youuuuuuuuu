
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/components/TranslatedText';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { CheckCircle, Upload, Loader2, AlertTriangle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';

function ConfirmPaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    const { firestore, user } = useFirebase();

    const orderId = searchParams.get('orderId');
    const [receiptImage, setReceiptImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    if (!orderId) {
        return (
            <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
                <AlertTriangle className="h-12 w-12 text-destructive" />
                <p className='mt-4 text-destructive font-semibold'>ID de commande manquant.</p>
                <Button onClick={() => router.push('/account/orders')} className="mt-4">
                    Retourner à mes commandes
                </Button>
            </div>
        );
    }
    
    const bankDetails = {
        'Bénéficiaire': 'EZCENTIALS GmbH',
        'IBAN': 'DE89 3704 0044 0532 0130 00',
        'BIC': 'COBADEFFXXX',
        'Banque': 'Commerzbank',
        'Motif de virement': `Commande ${orderId}`
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: 'Copié !',
            description: `${text} a été copié dans le presse-papiers.`
        })
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return;
        
        const file = event.target.files[0];
        if (file.size > 1 * 1024 * 1024) { // 1MB limit
             toast({
                variant: "destructive",
                title: "Fichier trop volumineux",
                description: "La taille de l'image doit être inférieure à 1 Mo.",
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => setReceiptImage(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        if (!receiptImage || !firestore || !user) return;
        setIsUploading(true);
        try {
            const orderRef = doc(firestore, 'orders', orderId);
            await updateDoc(orderRef, {
                receiptImageUrl: receiptImage,
                paymentStatus: 'processing',
            });
            toast({
                title: "Reçu téléversé !",
                description: "Votre preuve de paiement est en cours de vérification."
            });
            router.push('/account/orders');

        } catch (error) {
            console.error("Error uploading receipt: ", error);
            toast({
                variant: 'destructive',
                title: 'Erreur de téléversement',
                description: "Impossible de téléverser le reçu. Veuillez réessayer."
            })
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
             <div className="text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
                <h1 className="mt-4 font-headline text-4xl">
                <TranslatedText fr="Presque terminé !" en="Almost Done!">Fast geschafft!</TranslatedText>
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                <TranslatedText fr="Finalisez votre commande en effectuant le virement bancaire." en="Finalize your order by making the bank transfer.">Schließen Sie Ihre Bestellung ab, indem Sie die Banküberweisung tätigen.</TranslatedText>
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle><TranslatedText fr="Détails pour le virement" en="Bank Transfer Details">Details für die Überweisung</TranslatedText></CardTitle>
                        <CardDescription><TranslatedText fr="Utilisez ces informations pour payer votre commande." en="Use this information to pay for your order.">Verwenden Sie diese Informationen, um Ihre Bestellung zu bezahlen.</TranslatedText></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {Object.entries(bankDetails).map(([key, value]) => (
                            <div key={key}>
                                <h4 className="text-sm font-semibold text-muted-foreground">{key}</h4>
                                <div className="flex items-center justify-between">
                                    <p className="font-mono text-sm">{value}</p>
                                    <Button variant="ghost" size="icon" onClick={() => handleCopy(value)}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                       ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle><TranslatedText fr="Téléverser la preuve de paiement" en="Upload Proof of Payment">Zahlungsnachweis hochladen</TranslatedText></CardTitle>
                        <CardDescription><TranslatedText fr="Une fois le virement effectué, téléversez une capture d'écran ou une photo du reçu." en="Once the transfer is made, upload a screenshot or photo of the receipt.">Sobald die Überweisung erfolgt ist, laden Sie einen Screenshot oder ein Foto des Belegs hoch.</TranslatedText></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-center">
                        <input type="file" id="receipt" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={handleFileSelect} />
                        {receiptImage ? (
                           <div className='relative mx-auto w-fit'>
                             <img src={receiptImage} alt="Aperçu du reçu" className="max-h-48 w-auto rounded-md border" />
                              <Button variant="destructive" size="sm" className="absolute -top-2 -right-2 rounded-full" onClick={() => setReceiptImage(null)}>X</Button>
                           </div>
                        ) : (
                            <label htmlFor="receipt" className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 hover:bg-muted/50">
                                <Upload className="h-10 w-10 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground"><TranslatedText fr="Cliquez pour choisir un fichier" en="Click to choose a file">Klicken Sie, um eine Datei auszuwählen</TranslatedText></p>
                            </label>
                        )}
                        <Button className="w-full" onClick={handleUpload} disabled={!receiptImage || isUploading}>
                            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                            <TranslatedText fr="Confirmer le paiement" en="Confirm Payment">Zahlung bestätigen</TranslatedText>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


export default function ConfirmPaymentPage() {
    return (
        <Suspense fallback={
             <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
             </div>
        }>
            <ConfirmPaymentContent />
        </Suspense>
    )
}
