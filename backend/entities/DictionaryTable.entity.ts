import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dictionary_table')
export class DictionaryTable {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'varchar' })
    objectName: string;

    @Column({ type: 'varchar' })
    tableName: string;

    @Column({ type: 'varchar', nullable: true })
    reference1: string;

    @Column({ type: 'varchar', nullable: true })
    parentTable: string;

    @Column({ type: 'varchar', nullable: true })
    childTable: string;

    @Column({ type: 'varchar' })
    category: string;

    @Column({ type: 'boolean' })
    isCustom: boolean;
}
