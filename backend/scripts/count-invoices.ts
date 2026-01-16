
import { AppDataSource } from '../db';
import { Invoice } from '../entities/Invoice.entity';

async function countInvoices() {
    await AppDataSource.initialize();
    const count = await AppDataSource.getRepository(Invoice).count();
    console.log(`Total Invoices in DB: ${count}`);
    await AppDataSource.destroy();
}

countInvoices();
