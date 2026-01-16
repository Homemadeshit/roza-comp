import { AppDataSource } from '../db';
import { Customer } from '../entities/Customer.entity';
import { Invoice, InvoiceStatus } from '../entities/Invoice.entity';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importInvoicesData() {
    await AppDataSource.initialize();
    console.log('Database connected');

    try {
        const dataPath = path.join(__dirname, 'data', 'invoices-data.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const parsedData = JSON.parse(rawData);

        const items = parsedData.OPENITEM ? parsedData.OPENITEM : parsedData;
        console.log(`Found ${items.length} invoices to import.`);

        for (const item of items) {
            // SUB_INV format: "04        24102" (Customer ID + spaces + Invoice ID)
            const parts = item.SUB_INV.trim().split(/\s+/);
            const accountViewId = parts[0];
            const invoiceNumber = item.INV_NR; // Use INV_NR directly if available, else derive

            let customer = await AppDataSource.getRepository(Customer).findOne({ where: { accountViewId } });

            if (!customer) {
                console.log(`⚠️ New Debtor found: ${accountViewId}. Creating shell customer record...`);
                customer = new Customer();
                customer.accountViewId = accountViewId;
                customer.companyName = `Debtor ${accountViewId}`; // Placeholder name
                customer.email = `unknown-${accountViewId}@placeholder.com`; // Satisfy NOT NULL constraint
                customer.notes = 'Auto-created from Invoice Import';
                await AppDataSource.getRepository(Customer).save(customer);
            }

            let invoice = await AppDataSource.getRepository(Invoice).findOne({ where: { invoiceNumber: invoiceNumber } });

            if (!invoice) {
                invoice = new Invoice();
                invoice.invoiceNumber = invoiceNumber;
                invoice.customer = customer;
                console.log(`Creating new invoice: ${invoiceNumber}`);
            }

            // Map AccountView fields to Invoice entity
            invoice.amount = item.DR_AMT || 0;
            invoice.openAmount = item.ITEM_REST || 0;

            // Infer Dates
            const today = new Date();

            // Issue Date: Today - ITEM_AGE (days)
            const issueDate = new Date();
            issueDate.setDate(today.getDate() - (item.ITEM_AGE || 0));
            invoice.issueDate = issueDate;

            // Due Date: Issue Date + CRED_DAYS
            const dueDate = new Date(issueDate);
            dueDate.setDate(dueDate.getDate() + (item.CRED_DAYS || 0));
            invoice.dueDate = dueDate;

            invoice.daysOverdue = item.ITEM_EXPDS || 0; // Use explicit overdue days if available

            // Status Logic
            // If explicit ITEM_REST is 0, it's paid. 
            // If DATE_PAID is present, it might be paid, but ITEM_REST is authoritative.
            if (invoice.openAmount <= 0.01 && invoice.openAmount >= -0.01) {
                invoice.status = InvoiceStatus.PAID;
                invoice.openAmount = 0; // Clean up small floating point diffs
            } else if (invoice.daysOverdue > 0) {
                invoice.status = InvoiceStatus.OVERDUE;
            } else {
                invoice.status = InvoiceStatus.OPEN;
            }

            await AppDataSource.getRepository(Invoice).save(invoice);
        }

        console.log('Import completed successfully.');
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        await AppDataSource.destroy();
    }
}

importInvoicesData();
