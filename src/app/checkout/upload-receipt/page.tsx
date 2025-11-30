'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser';

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { UploadCloud, Loader2, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { TranslatedText } from '@/components/TranslatedText'
import { useLanguage } from '@/context/LanguageContext'

// -------------------- VALIDATION ---------------------

const uploadSchema = z.object({
  receipt: z
    .any()
    .refine((files) => files?.length === 1, 'File is required.')
    .refine((files) => files?.[0]?.size <= 5_000_000, 'Max file size is 5MB.')
    .refine(
      (files) => ['image/jpeg', 'image/png', 'application/pdf'].includes(files?.[0]?.type),
      'Only .jpg, .png or .pdf.'
    ),
})

type UploadFormValues = z.infer<typeof uploadSchema>

// ----------- convert file to Base64 (safe) --------------

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (err) => reject(err)
  })

// --------------------------------------------------------

function UploadReceiptForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  const { toast } = useToast()
  const { language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [fileName, setFileName] = useState('')

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
  })

  const onSubmit: SubmitHandler<UploadFormValues> = async (data) => {
    if (!orderId) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'ID de commande manquant.',
      })
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast({
        variant: 'destructive',
        title: 'Erreur de configuration EmailJS',
        description: 'Les clés de service EmailJS sont manquantes. Vérifiez vos variables d\'environnement.',
      })
      console.error('EmailJS: Missing environment vars')
      return
    }

    setIsSubmitting(true)

    try {
      const file = data.receipt[0]
      const base64file = await toBase64(file)

      const templateParams = {
        order_id: orderId,
        receipt_file: base64file,
        file_name: file.name,
      }

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

      // Update local orders
      const localOrders = JSON.parse(localStorage.getItem('localOrders') || '[]')

      const updated = localOrders.map((order: any) =>
        order.id === orderId ? { ...order, paymentStatus: 'processing' } : order
      )

      localStorage.setItem('localOrders', JSON.stringify(updated))

      setUploadSuccess(true)

      toast({
        title: 'Reçu envoyé',
        description: 'Votre paiement est en cours de vérification.',
      })

      setTimeout(() => {
        router.push('/account/orders')
      }, 2500)

    } catch (err) {
      console.error('EmailJS ERROR:', err)
      toast({
        variant: 'destructive',
        title: 'Échec',
        description: 'Erreur lors de l’envoi. Réessayez.',
      })
    }

    setIsSubmitting(false)
  }

  // ----------------------------------------------------------
  //                   UI WITH SUCCESS SCREEN
  // ----------------------------------------------------------

  if (!orderId)
    return (
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Erreur</CardTitle>
          <CardDescription>Aucun ID de commande détecté.</CardDescription>
        </CardHeader>
      </Card>
    )

  if (uploadSuccess)
    return (
      <Card className="max-w-lg w-full text-center">
        <CardContent className="p-10">
          <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
          <h2 className="text-2xl font-semibold mt-4">Téléversement réussi</h2>
          <p className="mt-2 text-muted-foreground">
            Votre reçu a été envoyé. Vous serez redirigé automatiquement.
          </p>
        </CardContent>
      </Card>
    )

  // ----------------------------------------------------------
  //                       MAIN FORM
  // ----------------------------------------------------------

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <UploadCloud className="h-6 w-6 text-primary" />
        </div>

        <CardTitle className="text-center">
          <TranslatedText fr="Finaliser la commande" en="Finalize Order">Bestellung abschließen</TranslatedText>
        </CardTitle>

        <CardDescription className="text-center">
          <TranslatedText fr={`Pour la commande n° ${orderId}`} en={`For order ID ${orderId}`}>
            {`Für Bestell-ID ${orderId}`}
          </TranslatedText>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              name="receipt"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <TranslatedText fr="Preuve de paiement" en="Proof of Payment">
                      Zahlungsnachweis
                    </TranslatedText>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => {
                          field.onChange(e.target.files)
                          setFileName(e.target.files?.[0]?.name || '')
                        }}
                      />

                      <div className="h-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center">
                        {fileName ? (
                          <p className="text-sm text-muted-foreground">{fileName}</p>
                        ) : (
                          <>
                            <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              <TranslatedText fr="Cliquer ou glisser-déposer" en="Click or drag & drop">
                                Klicken oder Drag & Drop
                              </TranslatedText>
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <TranslatedText fr="Envoi en cours..." en="Sending...">Wird gesendet...</TranslatedText>
                </>
              ) : (
                <TranslatedText fr="Envoyer le reçu" en="Send Receipt">Beleg senden</TranslatedText>
              )}
            </Button>

          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

// ----------------------------------------------------------

export default function UploadReceiptPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Suspense fallback={
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <TranslatedText fr="Chargement..." en="Loading...">Chargement...</TranslatedText>
        </div>
      }>
        <UploadReceiptForm />
      </Suspense>
    </div>
  )
}
