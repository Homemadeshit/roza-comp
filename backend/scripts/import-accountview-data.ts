import { AppDataSource } from '../db';
import { Customer } from '../entities/Customer.entity';
import { Contact } from '../entities/Contact.entity';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importAccountViewData() {
    await AppDataSource.initialize();
    console.log('Database connected');

    try {
        const dataPath = path.join(__dirname, 'data', 'accountview-data.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const parsedData = JSON.parse(rawData);

        const contactsData = parsedData.CONTACT;
        const apContData = parsedData.AP_CONT || []; // Contact person details, default to empty if missing

        console.log(`Found ${contactsData.length} customers to import.`);

        for (const contact of contactsData) {
            const accountViewId = contact.SUB_NR;

            let customer = await AppDataSource.getRepository(Customer).findOne({ where: { accountViewId } });

            if (!customer) {
                customer = new Customer();
                customer.accountViewId = accountViewId;
                console.log(`Creating new customer: ${contact.LONG_NAME}`);
            } else {
                console.log(`Updating existing customer: ${contact.LONG_NAME}`);
            }

            // Map AccountView fields to Customer entity
            customer.companyName = contact.LONG_NAME || contact.INV_ADDRES?.split('\n')[0] || 'Unknown Company';
            // Try multiple fields for email
            customer.email = contact.EMAIL || contact.MAIL_BUS || contact.CHN_MAIL || `missing-${accountViewId}@placeholder.com`;
            customer.whatsappPhone = contact.TEL_MOB || contact.TEL_BUS || '';
            customer.website = contact.WWW_URL || '';
            // Clear the "Auto-created" note if present, as we now have full data. 
            // Map COMMENT1 if available, otherwise default to empty string.
            customer.notes = contact.COMMENT1 || '';

            // Address
            customer.street = contact.ADDRESS1 || '';
            customer.zipCode = contact.POST_CODE || '';
            customer.city = contact.CITY || '';
            customer.country = contact.COUNTRY || 'NL';
            // houseNumber is often part of ADDRESS1 or ADDRESS2 in AV, simple mapping here

            // Financials
            customer.iban = contact.IBAN_NR || '';
            customer.vatNumber = contact.VAT_NR || '';
            customer.cocNumber = contact.COC_CODE || '';
            customer.creditLimit = contact.CRED_LIM || 0;
            customer.directDebit = contact.DD_ACT || false;
            customer.currentBalance = contact.ACCT_BAL || 0;

            await AppDataSource.getRepository(Customer).save(customer);

            // --- Process Contact Persons (AP_CONT) ---
            // Filter AP_CONT for those matching this customer (via SUB_NR)
            const relatedContacts = apContData.filter((c: any) => c.SUB_NR === accountViewId);

            for (const apCont of relatedContacts) {
                let contactEntity = await AppDataSource.getRepository(Contact).findOne({ where: { externalId: apCont.AP_CONTID } });

                if (!contactEntity) {
                    contactEntity = new Contact();
                    contactEntity.externalId = apCont.AP_CONTID || `mock-${Date.now()}`;
                }

                contactEntity.customer = customer;
                // The mock data doesn't have names in AP_CONT, but real data might. 
                // For now, we link them. 
                // In a real scenario, we'd map FST_NAME, LST_NAME, EMAIL, etc. from AP_CONT if available.

                await AppDataSource.getRepository(Contact).save(contactEntity);
            }
        }

        console.log('Import completed successfully.');
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        await AppDataSource.destroy();
    }
}

importAccountViewData();
