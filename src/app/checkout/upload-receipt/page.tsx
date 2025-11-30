
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

const uploadSchemaDE = z.object({
  receipt: z
    .any()
    .refine((files) => files?.length === 1, 'Eine Datei ist erforderlich.')
    .refine(
      (files) => files?.[0]?.size <= 5000 * 1024,
      'Die maximale Dateigröße beträgt 5 MB.'
    )
    .refine(
      (files) =>
        ['image/jpeg', 'image/png', 'application/pdf'].includes(
          files?.[0]?.type
        ),
      'Nur die Formate .jpg, .png oder .pdf werden akzeptiert.'
    ),
})

const uploadSchemaFR = z.object({
  receipt: z
    .any()
    .refine((files) => files?.length === 1, 'Un fichier est requis.')
    .refine(
      (files) => files?.[0]?.size <= 5000 * 1024,
      'La taille maximale du fichier est de 5 Mo.'
    )
    .refine(
      (files) =>
        ['image/jpeg', 'image/png', 'application/pdf'].includes(
          files?.[0]?.type
        ),
      'Seuls les formats .jpg, .png ou .pdf sont acceptés.'
    ),
})

const uploadSchemaEN = z.object({
  receipt: z
    .any()
    .refine((files) => files?.length === 1, 'A file is required.')
    .refine(
      (files) => files?.[0]?.size <= 5000 * 1024,
      'Maximum file size is 5MB.'
    )
    .refine(
      (files) =>
        ['image/jpeg', 'image/png', 'application/pdf'].includes(
          files?.[0]?.type
        ),
      'Only .jpg, .png, or .pdf formats are accepted.'
    ),
})

type UploadFormValues = z.infer<typeof uploadSchemaEN>

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

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (err) => reject(err)
  })

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

  const currentSchema =
    language === 'fr'
      ? uploadSchemaFR
      : language === 'en'
        ? uploadSchemaEN
        : uploadSchemaDE

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(currentSchema),
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
        const localOrders: LocalOrder[] = JSON.parse(
          localStorage.getItem('localOrders') || '[]'
        )
        const currentOrder = localOrders.find((o) => o.id === orderId)
        if (currentOrder) {
          setOrder(currentOrder)
        } else {
          toast({
            variant: 'destructive',
            title: (
              <TranslatedText fr="Erreur" en="Error">
                Fehler
              </TranslatedText>
            ),
            description: (
              <TranslatedText fr="Commande non trouvée." en="Order not found.">
                Bestellung nicht gefunden.
              </TranslatedText>
            ),
          })
          router.push('/account/orders')
        }
      } catch (error) {
        console.error('Could not load order from local storage', error)
        toast({
          variant: 'destructive',
          title: (
            <TranslatedText fr="Erreur" en="Error">
              Fehler
            </TranslatedText>
          ),
          description: (
            <TranslatedText
              fr="Impossible de charger les détails de la commande."
              en="Could not load order details."
            >
              Bestelldetails konnten nicht geladen werden.
            </TranslatedText>
          ),
        })
      }
    }
  }, [EMAILJS_PUBLIC_KEY, orderId, router, toast])

  const onSubmit: SubmitHandler<UploadFormValues> = async (data) => {
    if (!orderId || !order) {
      toast({
        variant: 'destructive',
        title: <TranslatedText fr="Erreur" en="Error">Fehler</TranslatedText>,
        description: (
          <TranslatedText
            fr="ID de commande manquant ou détails introuvables."
            en="Missing order ID or details not found."
          >
            Fehlende Bestell-ID oder Details nicht gefunden.
          </TranslatedText>
        ),
      })
      return
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      toast({
        variant: 'destructive',
        title: (
          <TranslatedText
            fr="Erreur de configuration EmailJS"
            en="EmailJS Config Error"
          >
            EmailJS-Konfigurationsfehler
          </TranslatedText>
        ),
        description: (
          <TranslatedText
            fr="Les clés de service EmailJS sont manquantes. Vérifiez vos variables d'environnement."
            en="EmailJS service keys are missing. Check your environment variables."
          >
            EmailJS-Dienstschlüssel fehlen. Überprüfen Sie Ihre
            Umgebungsvariablen.
          </TranslatedText>
        ),
      })
      console.error('EmailJS: Missing environment vars')
      return
    }

    setIsSubmitting(true)

    try {
      const file = data.receipt[0]
      const base64file = await toBase64(file)

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

      const YOUR_BASE_URL = 'https://ezcentials.vercel.app'

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

      const localOrders: LocalOrder[] = JSON.parse(
        localStorage.getItem('localOrders') || '[]'
      )
      const updatedOrders = localOrders.map((o: any) =>
        o.id === orderId ? { ...o, paymentStatus: 'processing' } : o
      )
      localStorage.setItem('localOrders', JSON.stringify(updatedOrders))

      setUploadSuccess(true)

      toast({
        title: (
          <TranslatedText fr="Reçu envoyé" en="Receipt Sent">
            Beleg gesendet
          </TranslatedText>
        ),
        description: (
          <TranslatedText
            fr="Votre paiement est en cours de vérification."
            en="Your payment is under review."
          >
            Ihre Zahlung wird überprüft.
          </TranslatedText>
        ),
      })

      setTimeout(() => {
        router.push('/account/orders')
      }, 2500)
    } catch (err) {
      console.error('EmailJS Error:', err)
      toast({
        variant: 'destructive',
        title: <TranslatedText fr="Échec" en="Failed">Fehlgeschlagen</TranslatedText>,
        description: (
          <TranslatedText
            fr="Erreur lors de l’envoi. Réessayez."
            en="Error sending. Please try again."
          >
            Fehler beim Senden. Bitte versuchen Sie es erneut.
          </TranslatedText>
        ),
      })
    }

    setIsSubmitting(false)
  }

  if (!orderId)
    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>
            <TranslatedText fr="Erreur" en="Error">
              Fehler
            </TranslatedText>
          </CardTitle>
          <CardDescription>
            <TranslatedText
              fr="Aucun ID de commande détecté."
              en="No order ID detected."
            >
              Keine Bestell-ID erkannt.
            </TranslatedText>
          </CardDescription>
        </CardHeader>
      </Card>
    )

  if (uploadSuccess)
    return (
      <Card className="w-full max-w-lg text-center">
        <CardContent className="p-10">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-2xl font-semibold">
            <TranslatedText fr="Téléversement réussi" en="Upload Successful">
              Upload erfolgreich
            </TranslatedText>
          </h2>
          <p className="mt-2 text-muted-foreground">
            <TranslatedText
              fr="Votre reçu a été envoyé. Vous serez redirigé automatiquement."
              en="Your receipt has been sent. You will be redirected automatically."
            >
              Ihr Beleg wurde gesendet. Sie werden automatisch weitergeleitet.
            </TranslatedText>
          </p>
        </CardContent>
      </Card>
    )

  return (
    <Card className="w-full max-w-2xl">
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
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-md border p-4">
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                <TranslatedText fr="Résumé de la commande" en="Order Summary">
                  Bestellübersicht
                </TranslatedText>
              </h4>
              <ul className="divide-y text-sm">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between py-2">
                    <span>
                      {item.quantity} x{' '}
                      <TranslatedText fr={item.name_fr} en={item.name_en}>
                        {item.name}
                      </TranslatedText>
                    </span>
                    <span>€{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-2" />
              <div className="space-y-1 text-sm">
                 <div className="flex justify-between">
                    <span className='text-muted-foreground'><TranslatedText fr="Sous-total" en="Subtotal">Zwischensumme</TranslatedText></span>
                    <span>€{order.subtotal.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className='text-muted-foreground'><TranslatedText fr="Livraison" en="Shipping">Versand</TranslatedText></span>
                    <span>€{order.shipping.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className='text-muted-foreground'><TranslatedText fr="Taxes" en="Taxes">Steuern</TranslatedText> ({(order.taxes / order.subtotal * 100).toFixed(0)}%)</span>
                    <span>€{order.taxes.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>€{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <div className='rounded-md border p-4'>
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                    <TranslatedText fr="Adresse de livraison" en="Shipping Address">
                        Lieferadresse
                    </TranslatedText>
                </h4>
                <address className="text-sm not-italic text-muted-foreground">
                    {order.shippingInfo.name}<br />
                    {order.shippingInfo.address}<br />
                    {order.shippingInfo.zip} {order.shippingInfo.city}<br />
                    {order.shippingInfo.country}
                </address>
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
                          <p className="px-4 text-center text-sm text-muted-foreground">
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
                      fr="Fichiers acceptés : JPG, PNG, PDF. Taille max : 5 Mo."
                      en="Accepted files: JPG, PNG, PDF. Max size: 5MB."
                    >
                      Akzeptierte Dateien: JPG, PNG, PDF. Max. Größe: 5 MB.
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
                <TranslatedText
                  fr="Envoyer le reçu et finaliser"
                  en="Send Receipt and Finalize"
                >
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
