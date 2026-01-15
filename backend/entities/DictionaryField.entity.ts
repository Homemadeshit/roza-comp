import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dictionary_field')
export class DictionaryField {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'varchar' })
    fieldCode: string;

    @Column({ type: 'integer', nullable: true })
    length: number;

    @Column({ type: 'varchar' })
    dataType: string;

    @Column({ type: 'boolean' })
    isCustom: boolean;
}
