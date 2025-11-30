
'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser'

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { UploadCloud, Loader2, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { TranslatedText } from '@/components/TranslatedText'
import { useLanguage } from '@/context/LanguageContext'
import type { OrderItem } from '@/lib/types'
import { Separator } from '@/components/ui/separator'

// -------------------- VALIDATION ---------------------

const uploadSchema = z.object({
  receipt: z
    .any()
    .refine((files) => files?.length === 1, 'Un fichier est requis.')
    .refine(
      (files) => files?.[0]?.size <= 50 * 1024, // 50KB
      'La taille maximale du fichier est de 50 Ko.'
    )
    .refine(
      (files) =>
        ['image/jpeg', 'image/png', 'application/pdf'].includes(
          files?.[0]?.type
        ),
      'Seuls les formats .jpg, .png ou .pdf sont acceptés.'
    ),
})

type UploadFormValues = z.infer<typeof uploadSchema>

interface LocalOrder {
  id: string
  userId: string
  shippingInfo: {
    name: string
    email: string
    address: string
    city: string
    zip: string
    country: string
  }
  items: OrderItem[]
  subtotal: number
  shipping: number
  taxes: number
  totalAmount: number
  orderDate: string
  paymentStatus: 'pending' | 'processing' | 'completed' | 'rejected'
  receiptImageUrl: string | null
}

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
  const [order, setOrder] = useState<LocalOrder | null>(null)

  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
  })

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY)
    } else {
      console.error(
        'EmailJS Public Key is missing. Check your environment variables.'
      )
    }
    
    if (orderId) {
        try {
            const localOrders: LocalOrder[] = JSON.parse(localStorage.getItem('localOrders') || '[]')
            const currentOrder = localOrders.find(o => o.id === orderId);
            if (currentOrder) {
                setOrder(currentOrder);
            } else {
                toast({ variant: 'destructive', title: 'Erreur', description: 'Commande non trouvée.' });
                router.push('/account/orders');
            }
        } catch (error) {
            console.error("Could not load order from local storage", error);
            toast({ variant: 'destructive', title: 'Erreur', description: 'Impossible de charger les détails de la commande.' });
        }
    }
    
  }, [EMAILJS_PUBLIC_KEY, orderId, router, toast])

  const onSubmit: SubmitHandler<UploadFormValues> = async (data) => {
    if (!orderId || !order) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'ID de commande manquant ou détails introuvables.',
      })
      return
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      toast({
        variant: 'destructive',
        title: 'Erreur de configuration EmailJS',
        description:
          "Les clés de service EmailJS sont manquantes. Vérifiez vos variables d'environnement.",
      })
      console.error('EmailJS: Missing environment vars')
      return
    }

    setIsSubmitting(true)

    try {
      const file = data.receipt[0]
      const base64file = await toBase64(file)

      // Format order details into HTML
      const orderDetailsHtml = `
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${item.quantity} x ${item.name} - €${(
                  item.price * item.quantity
                ).toFixed(2)}</li>`
            )
            .join('')}
        </ul>
        <p><strong>Sous-total:</strong> €${order.subtotal.toFixed(2)}</p>
        <p><strong>Livraison:</strong> €${order.shipping.toFixed(2)}</p>
        <p><strong>Taxes:</strong> €${order.taxes.toFixed(2)}</p>
        <p><strong>Total: €${order.totalAmount.toFixed(2)}</strong></p>
      `

      const YOUR_BASE_URL = 'https://ezcentials.vercel.app' // !! IMPORTANT !! Remplacez par votre URL

      const confirmationLink = `${YOUR_BASE_URL}/confirm.html?orderId=${encodeURIComponent(
        orderId
      )}&userEmail=${encodeURIComponent(order.shippingInfo.email)}`
      const rejectionLink = `${YOUR_BASE_URL}/reject.html?orderId=${encodeURIComponent(
        orderId
      )}&userEmail=${encodeURIComponent(order.shippingInfo.email)}`

      const templateParams = {
        user_name: orderId,
        image_base64: base64file,
        order_details_html: orderDetailsHtml,
        confirmation_link: confirmationLink,
        rejection_link: rejectionLink,
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      )

      // Update local orders
      const localOrders: LocalOrder[] = JSON.parse(
        localStorage.getItem('localOrders') || '[]'
      )
      const updatedOrders = localOrders.map((o: any) =>
        o.id === orderId ? { ...o, paymentStatus: 'processing' } : o
      )
      localStorage.setItem('localOrders', JSON.stringify(updatedOrders))

      setUploadSuccess(true)

      toast({
        title: 'Reçu envoyé',
        description: 'Votre paiement est en cours de vérification.',
      })

      setTimeout(() => {
        router.push('/account/orders')
      }, 2500)
    } catch (err) {
      console.error('EmailJS Error:', err)
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
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Erreur</CardTitle>
          <CardDescription>Aucun ID de commande détecté.</CardDescription>
        </CardHeader>
      </Card>
    )

  if (uploadSuccess)
    return (
      <Card className="w-full max-w-lg text-center">
        <CardContent className="p-10">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-2xl font-semibold">Téléversement réussi</h2>
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
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="h-6 w-6 text-primary" />
        </div>

        <CardTitle className="text-center">
          <TranslatedText fr="Finaliser votre paiement" en="Finalize Your Payment">
            Zahlung abschließen
          </TranslatedText>
        </CardTitle>

        <CardDescription className="text-center">
          <TranslatedText
            fr={`Pour la commande n° ${orderId}`}
            en={`For order ID ${orderId}`}
          >
            {`Für Bestell-ID ${orderId}`}
          </TranslatedText>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {order && (
            <div className="mb-6 rounded-md border p-4">
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Résumé de la commande</h4>
                <ul className="divide-y text-sm">
                    {order.items.map(item => (
                        <li key={item.id} className="flex justify-between py-2">
                            <span>{item.quantity} x <TranslatedText fr={item.name_fr} en={item.name_en}>{item.name}</TranslatedText></span>
                            <span>€{(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <Separator className="my-2"/>
                <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>€{order.totalAmount.toFixed(2)}</span>
                </div>
            </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="receipt"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <TranslatedText
                      fr="Preuve de paiement"
                      en="Proof of Payment"
                    >
                      Zahlungsnachweis
                    </TranslatedText>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                        onChange={(e) => {
                          field.onChange(e.target.files)
                          setFileName(e.target.files?.[0]?.name || '')
                        }}
                        accept="image/jpeg,image/png,application/pdf"
                      />

                      <div className="flex h-24 flex-col items-center justify-center rounded-md border-2 border-dashed">
                        {fileName ? (
                          <p className="text-sm text-muted-foreground px-4 text-center">
                            {fileName}
                          </p>
                        ) : (
                          <>
                            <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              <TranslatedText
                                fr="Cliquer ou glisser-déposer"
                                en="Click or drag & drop"
                              >
                                Klicken oder Drag & Drop
                              </TranslatedText>
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <p className="pt-1 text-xs text-muted-foreground">
                    <TranslatedText
                      fr="Fichiers acceptés : JPG, PNG, PDF. Taille max : 50 Ko."
                      en="Accepted files: JPG, PNG, PDF. Max size: 50KB."
                    >
                      Akzeptierte Dateien: JPG, PNG, PDF. Max. Größe: 50 KB.
                    </TranslatedText>
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <TranslatedText fr="Envoi en cours..." en="Sending...">
                    Wird gesendet...
                  </TranslatedText>
                </>
              ) : (
                <TranslatedText fr="Envoyer le reçu et finaliser" en="Send Receipt and Finalize">
                  Beleg senden und abschließen
                </TranslatedText>
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Suspense
        fallback={
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <TranslatedText fr="Chargement..." en="Loading...">
              Laden...
            </TranslatedText>
          </div>
        }
      >
        <UploadReceiptForm />
      </Suspense>
    </div>
  )
}

    