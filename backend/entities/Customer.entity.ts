import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Invoice } from './Invoice.entity';
import { PaymentPlan } from './PaymentPlan.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // --- External Integrations ---

  @Column({ type: 'varchar', name: 'external_av_id', unique: true })
  accountViewId: string; // The ID used in AccountView (Finance)

  // --- Contact Info ---

  @Column({ type: 'varchar' })
  companyName: string;

  @Column({ type: 'varchar' })
  email: string; // For sending Weekly Statements

  @Column({ type: 'varchar', nullable: true })
  whatsappPhone: string; // For WhatsApp Integration

  @Column({ type: 'varchar', nullable: true })
  website: string;

  // --- Address ---

  @Column({ type: 'varchar', nullable: true })
  street: string;

  @Column({ type: 'varchar', nullable: true })
  houseNumber: string;

  @Column({ type: 'varchar', nullable: true })
  zipCode: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  country: string;

  // --- Financial Identities ---

  @Column({ type: 'varchar', nullable: true })
  iban: string;

  @Column({ type: 'varchar', nullable: true })
  vatNumber: string; // BTW-nummer

  @Column({ type: 'varchar', nullable: true })
  cocNumber: string; // KvK-nummer

  // --- Financial Rules ---

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  creditLimit: number;

  @Column({ type: 'integer', default: 30 })
  maxPaymentDays: number; // e.g., Net 30

  @Column({ type: 'boolean', default: false })
  directDebit: boolean; // Derived from DD_ACT

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  currentBalance: number; // Synced from AccountView

  // --- Status Flags ---

  @Column({ type: 'boolean', default: false })
  isBlockedLocally: boolean; // Internal Finance Block

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];

  @OneToMany(() => PaymentPlan, (plan) => plan.customer)
  paymentPlans: PaymentPlan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
