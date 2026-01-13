import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Customer } from './Customer.entity';

export enum PlanStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED', // If they miss a payment
  CANCELLED = 'CANCELLED'
}

@Entity('payment_plans')
export class PaymentPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  weeklyAmount: number; // e.g., 200.00 per week

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date; // Estimated end date

  @Column({ type: 'date' })
  nextCheckDate: Date; // When the system should check if the payment arrived

  @Column({
    type: 'enum',
    enum: PlanStatus,
    default: PlanStatus.ACTIVE
  })
  status: PlanStatus;

  @Column({ default: true })
  allowOrdering: boolean; // If true, we tell FreshPortal to UNBLOCK even if balance is high

  @ManyToOne(() => Customer, (customer) => customer.paymentPlans)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ nullable: true, type: 'text' })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}