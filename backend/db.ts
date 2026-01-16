import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Customer } from './entities/Customer.entity';
import { Invoice } from './entities/Invoice.entity';
import { PaymentPlan } from './entities/PaymentPlan.entity';
import { DictionaryTable } from './entities/DictionaryTable.entity';
import { DictionaryField } from './entities/DictionaryField.entity';

import { Company } from './entities/Company.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true, // Note: In production, use migrations instead of synchronize: true
  logging: false,
  entities: [Customer, Invoice, PaymentPlan, DictionaryTable, DictionaryField, Company],
});
