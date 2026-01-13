import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Customer } from './entities/Customer.entity';
import { Invoice } from './entities/Invoice.entity';
import { PaymentPlan } from './entities/PaymentPlan.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: 'pp_flowers_ar',
  synchronize: true, // Note: In production, use migrations instead of synchronize: true
  logging: false,
  entities: [Customer, Invoice, PaymentPlan],
});
