import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: true })
    externalId: string; // The AccountView Administration ID/Code (REC_ID from ADM_PRF usually '0000000001' or similar)

    @Column({ type: 'varchar' })
    name: string; // ACCT_NAME

    @Column({ type: 'varchar', nullable: true })
    vatNumber: string; // VAT_NR

    @Column({ type: 'varchar', nullable: true })
    cocNumber: string; // COC_CODE (KvK)

    @Column({ type: 'varchar', nullable: true })
    email: string; // ADM_EMAIL

    // Financial Settings
    @Column({ type: 'varchar', nullable: true })
    defaultDebtorGlAccount: string; // ACCT_DEB (e.g., "1300")

    @Column({ type: 'varchar', nullable: true })
    defaultCreditorGlAccount: string; // ACCT_CRED (e.g., "1600")

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
