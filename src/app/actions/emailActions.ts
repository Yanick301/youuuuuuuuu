
'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const SendReceiptInput = z.object({
  orderId: z.string(),
  receiptDataUrl: z.string(),
  orderDetailsHtml: z.string(),
  userEmail: z.string().email(),
  siteUrl: z.string().url(),
});

type SendReceiptInput = z.infer<typeof SendReceiptInput>;

const sendEmailToCustomerInput = z.object({
  userEmail: z.string().email(),
  orderId: z.string(),
});

export async function sendReceiptEmail(input: SendReceiptInput) {
  const { orderId, receiptDataUrl, orderDetailsHtml, userEmail, siteUrl } = SendReceiptInput.parse(input);

  const {
    RESEND_API_KEY,
    EMAIL_FROM,
    EMAIL_TO,
  } = process.env;

  if (
    !RESEND_API_KEY ||
    !EMAIL_FROM ||
    !EMAIL_TO
  ) {
    console.error('Missing environment variables for Resend configuration.');
    return { success: false, error: 'Email server is not configured.' };
  }

  const resend = new Resend(RESEND_API_KEY);

  // Encode user email to pass it safely in the URL
  const encodedUserEmail = Buffer.from(userEmail).toString('base64');

  const confirmUrl = `${siteUrl}/order-status/customer-confirm?orderId=${orderId}&userEmail=${encodedUserEmail}`;
  const rejectUrl = `${siteUrl}/order-status/customer-reject?orderId=${orderId}&userEmail=${encodedUserEmail}`;
  
  // Extract base64 content from data URI
  const base64Content = receiptDataUrl.split(',')[1];
  if (!base64Content) {
    return { success: false, error: 'Invalid receipt data URI.' };
  }

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `Nouveau reçu pour la commande ${orderId}`,
      html: `
        <h1>Nouveau reçu de paiement pour la commande ${orderId}</h1>
        <p><strong>Email du client:</strong> ${userEmail}</p>
        
        <h2>Détails de la commande:</h2>
        ${orderDetailsHtml}

        <p>Le reçu est attaché à cet e-mail.</p>
        
        <hr>

        <h2>Actions de la commande :</h2>
        <p>Veuillez confirmer ou rejeter cette commande. Le client recevra une notification par e-mail.</p>
        <table width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <table cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" width="200" height="40" bgcolor="#28a745" style="border-radius: 5px; color: #ffffff; display: block;">
                    <a href="${confirmUrl}" target="_blank" style="font-size: 16px; font-weight: bold; font-family: sans-serif; text-decoration: none; line-height: 40px; width: 100%; display: inline-block;">
                      <span style="color: #ffffff;">Confirmer la commande</span>
                    </a>
                  </td>
                  <td width="20"></td>
                  <td align="center" width="200" height="40" bgcolor="#dc3545" style="border-radius: 5px; color: #ffffff; display: block;">
                     <a href="${rejectUrl}" target="_blank" style="font-size: 16px; font-weight: bold; font-family: sans-serif; text-decoration: none; line-height: 40px; width: 100%; display: inline-block;">
                      <span style="color: #ffffff;">Rejeter la commande</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="font-size: 12px; color: #666;">Si les boutons ne fonctionnent pas, copiez-collez les liens suivants :<br>
           Confirmer : ${confirmUrl}<br>
           Rejeter : ${rejectUrl}
        </p>
      `,
      attachments: [
        {
          filename: `recu-${orderId}.jpg`,
          content: base64Content,
        },
      ],
    });

    return { success: true };
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return { success: false, error: error.message || 'Failed to send receipt email.' };
  }
}


export async function sendCustomerConfirmationEmail(input: z.infer<typeof sendEmailToCustomerInput>) {
    const { userEmail, orderId } = sendEmailToCustomerInput.parse(input);
    const { RESEND_API_KEY, EMAIL_FROM } = process.env;

    if (!RESEND_API_KEY || !EMAIL_FROM) {
        throw new Error('Email server is not configured.');
    }

    const resend = new Resend(RESEND_API_KEY);

    try {
        await resend.emails.send({
            from: EMAIL_FROM,
            to: userEmail,
            subject: `Votre commande EZCENTIALS #${orderId} est confirmée !`,
            html: `
                <h1>Votre commande a été validée !</h1>
                <p>Bonjour,</p>
                <p>Bonne nouvelle ! Votre commande <strong>#${orderId}</strong> a été validée par notre équipe.</p>
                <p>Elle sera préparée et expédiée dans les plus brefs délais. Vous serez notifié(e) lorsque votre colis sera en route.</p>
                <p>Merci pour votre confiance.</p>
                <br>
                <p>Cordialement,</p>
                <p>L'équipe EZCENTIALS</p>
            `,
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to send confirmation email to customer:", error);
        return { success: false, error: 'Failed to send confirmation email.' };
    }
}


export async function sendCustomerRejectionEmail(input: z.infer<typeof sendEmailToCustomerInput>) {
    const { userEmail, orderId } = sendEmailToCustomerInput.parse(input);
    const { RESEND_API_KEY, EMAIL_FROM } = process.env;

    if (!RESEND_API_KEY || !EMAIL_FROM) {
        throw new Error('Email server is not configured.');
    }

    const resend = new Resend(RESEND_API_KEY);

    try {
        await resend.emails.send({
            from: EMAIL_FROM,
            to: userEmail,
            subject: `Information concernant votre commande EZCENTIALS #${orderId}`,
            html: `
                <h1>Un problème est survenu avec votre commande</h1>
                <p>Bonjour,</p>
                <p>Nous vous contactons concernant votre commande <strong>#${orderId}</strong>.</p>
                <p>Malheureusement, nous n'avons pas pu valider votre paiement et votre commande a été rejetée. Cela peut être dû à une erreur dans le reçu de paiement ou à un autre problème.</p>
                <p>Nous vous invitons à contacter notre support client à <a href="mailto:contact-support@ezcentials.com">contact-support@ezcentials.com</a> pour plus d'informations ou pour tenter de finaliser votre commande à nouveau.</p>
                <p>Nous nous excusons pour ce désagrément.</p>
                <br>
                <p>Cordialement,</p>
                <p>L'équipe EZCENTIALS</p>
            `,
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to send rejection email to customer:", error);
        return { success: false, error: 'Failed to send rejection email.' };
    }
}
