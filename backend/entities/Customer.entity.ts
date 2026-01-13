import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Invoice } from './Invoice.entity';
import { PaymentPlan } from './PaymentPlan.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // --- External Integrations ---
  
  @Column({ name: 'external_av_id', unique: true })
  accountViewId: string; // The ID used in AccountView (Finance)

  @Column({ name: 'external_fp_id', unique: true, nullable: true })
  freshPortalId: string; // The ID used in FreshPortal (Operations)

  // --- Contact Info ---

  @Column()
  companyName: string;

  @Column()
  email: string; // For sending Weekly Statements

  @Column({ nullable: true })
  whatsappPhone: string; // For WhatsApp Integration

  // --- Financial Rules ---

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  creditLimit: number;

  @Column({ default: 30 })
  maxPaymentDays: number; // e.g., Net 30

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  currentBalance: number; // Synced from AccountView

  // --- Status Flags ---

  @Column({ default: false })
  isBlockedLocally: boolean; // What our system thinks

  @Column({ default: false })
  isBlockedInFreshPortal: boolean; // Confirmation from FreshPortal API

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];

  @OneToMany(() => PaymentPlan, (plan) => plan.customer)
  paymentPlans: PaymentPlan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}