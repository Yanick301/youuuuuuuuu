'use server';

import nodemailer from 'nodemailer';
import { z } from 'zod';

const SendReceiptInput = z.object({
  orderId: z.string(),
  receiptDataUrl: z.string(),
  orderDetailsHtml: z.string(),
  userEmail: z.string().email(),
});

type SendReceiptInput = z.infer<typeof SendReceiptInput>;

export async function sendReceiptEmail(input: SendReceiptInput) {
  const { orderId, receiptDataUrl, orderDetailsHtml, userEmail } = SendReceiptInput.parse(input);

  const {
    EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT,
    EMAIL_TO,
  } = process.env;

  if (
    !EMAIL_SERVER_USER ||
    !EMAIL_SERVER_PASSWORD ||
    !EMAIL_SERVER_HOST ||
    !EMAIL_SERVER_PORT ||
    !EMAIL_TO
  ) {
    console.error('Missing environment variables for email configuration.');
    return { success: false, error: 'Email server is not configured.' };
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_SERVER_HOST,
    port: parseInt(EMAIL_SERVER_PORT),
    secure: true,
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    const mailOptions = {
      from: `"EZCENTIALS" <${EMAIL_SERVER_USER}>`,
      to: EMAIL_TO,
      subject: `Nouveau reçu pour la commande ${orderId}`,
      html: `
        <h1>Nouveau reçu de paiement</h1>
        <p><strong>Commande ID:</strong> ${orderId}</p>
        <p><strong>Email du client:</strong> ${userEmail}</p>
        <h2>Détails de la commande:</h2>
        ${orderDetailsHtml}
        <p>Le reçu est attaché à cet e-mail.</p>
      `,
      attachments: [
        {
          filename: `recu-${orderId}.jpg`, // Default to jpg, nodemailer will handle content type
          path: receiptDataUrl,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send receipt email.' };
  }
}
