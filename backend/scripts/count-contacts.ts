
import { AppDataSource } from '../db';
import { Contact } from '../entities/Contact.entity';

async function countContacts() {
    await AppDataSource.initialize();
    const count = await AppDataSource.getRepository(Contact).count();
    console.log(`Total Contacts in DB: ${count}`);
    await AppDataSource.destroy();
}

countContacts();
