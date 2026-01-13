import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Customer } from './Customer.entity';

export enum InvoiceStatus {
  OPEN = 'OPEN',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE'
}

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  invoiceNumber: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  paidAmount: number;

  @Column({ type: 'date' })
  issueDate: Date;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.OPEN
  })
  status: InvoiceStatus;

  @Column({ default: false })
  isDisputed: boolean; // If true, this invoice might be excluded from blocking logic

  @ManyToOne(() => Customer, (customer) => customer.invoices)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @CreateDateColumn()
  syncedAt: Date;
}