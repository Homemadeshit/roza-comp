import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './Customer.entity';

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true })
    externalId: string; // AP_CONTID

    @Column({ type: 'varchar', nullable: true })
    firstName: string;

    @Column({ type: 'varchar', nullable: true })
    lastName: string;

    @Column({ type: 'varchar', nullable: true })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    phone: string; // TEL_MOB or similar

    @Column({ type: 'varchar', nullable: true })
    role: string; // Job type or similar

    @ManyToOne(() => Customer, (customer) => customer.contacts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @Column({ type: 'uuid', nullable: true })
    customerId: string;
}
