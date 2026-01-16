import twilio from 'twilio';

export class TwilioService {
    private client: twilio.Twilio | null = null;
    private fromNumber: string;

    constructor() {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        this.fromNumber = process.env.TWILIO_FROM_NUMBER || 'whatsapp:+14155238886';

        if (accountSid && authToken && !accountSid.includes('YOUR_SID')) {
            this.client = twilio(accountSid, authToken);
        } else {
            console.warn('⚠️ Twilio Credentials missing or default. WhatsApp messages will be MOCKED.');
        }
    }

    async sendWhatsAppReminder(to: string, customerName: string, invoiceNum: string, amount: number, paymentLink: string) {
        if (!this.client) {
            console.log(`[MOCK TWILIO] Sending WhatsApp to ${to}: "Hi ${customerName}, Invoice ${invoiceNum} (€${amount}) is pending. Pay: ${paymentLink}"`);
            return { sid: 'mock-sid-' + Date.now(), status: 'queued (mock)' };
        }

        try {
            // Twilio WhatsApp requires 'whatsapp:' prefix
            // We assume 'to' might be just '+316...'
            const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

            const message = await this.client.messages.create({
                body: `Hello ${customerName},\n\nThis is a friendly reminder that invoice *${invoiceNum}* for *€${amount.toFixed(2)}* is overdue.\n\nPlease pay securely via this link: ${paymentLink}\n\nThank you,\nFinance Team`,
                from: this.fromNumber,
                to: formattedTo
            });

            console.log(`✅ WhatsApp sent to ${to}, SID: ${message.sid}`);
            return message;
        } catch (error) {
            console.error('❌ Failed to send WhatsApp:', error);
            throw error;
        }
    }

    async sendOverdueSummary(to: string, customerName: string, count: number, totalAmount: number, paymentLink: string) {
        if (!this.client) {
            console.log(`[MOCK TWILIO] Sending Summary WhatsApp to ${to}: "Hi ${customerName}, you have ${count} overdue invoices totaling €${totalAmount.toFixed(2)}. Pay: ${paymentLink}"`);
            return { sid: 'mock-summary-sid-' + Date.now(), status: 'queued (mock)' };
        }

        try {
            const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

            const message = await this.client.messages.create({
                body: `Hello ${customerName},\n\nThis is a reminder that you have *${count} overdue invoices* totaling *€${totalAmount.toFixed(2)}*.\n\nPlease check your account and arrange payment: ${paymentLink}\n\nThank you,\nFinance Team`,
                from: this.fromNumber,
                to: formattedTo
            });

            console.log(`✅ WhatsApp Summary sent to ${to}, SID: ${message.sid}`);
            return message;
        } catch (error) {
            console.error('❌ Failed to send WhatsApp Summary:', error);
            throw error;
        }
    }


    async sendWhatsAppTemplate(to: string, templateSid: string, variables: Record<string, string>) {
        if (!this.client) {
            console.log(`[MOCK TWILIO] Sending Template ${templateSid} to ${to} with vars:`, variables);
            return { sid: 'mock-template-sid-' + Date.now(), status: 'queued (mock)' };
        }

        try {
            const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

            const message = await this.client.messages.create({
                contentSid: templateSid,
                contentVariables: JSON.stringify(variables),
                from: this.fromNumber,
                to: formattedTo
            });

            console.log(`✅ WhatsApp Template sent to ${to}, SID: ${message.sid}`);
            return message;
        } catch (error: any) {
            console.error('❌ Failed to send WhatsApp Template:', error?.message || error);
            throw error;
        }
    }
}
