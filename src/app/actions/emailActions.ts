
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

  const confirmUrl = `${siteUrl}/order-status/confirm?orderId=${orderId}`;
  const rejectUrl = `${siteUrl}/order-status/reject?orderId=${orderId}`;
  
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
        <p>Veuillez confirmer ou rejeter cette commande en utilisant les boutons ci-dessous.</p>
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
