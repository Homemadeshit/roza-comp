import { DataSource } from 'typeorm';
import { DictionaryTable } from '../entities/DictionaryTable.entity';
import { DictionaryField } from '../entities/DictionaryField.entity';

const ReadSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [DictionaryTable, DictionaryField],
    synchronize: false,
    logging: false
});

async function query() {
    await ReadSource.initialize();
    const repo = ReadSource.getRepository(DictionaryTable);
    const data = await repo.find({ take: 3 });
    console.log('Sample Tables:');
    data.forEach(t => console.log(`- ${t.description} (${t.tableName})`));

    const fieldRepo = ReadSource.getRepository(DictionaryField);
    const fields = await fieldRepo.find({ take: 3 });
    console.log('Sample Fields:');
    fields.forEach(f => console.log(`- ${f.description} (${f.fieldCode})`));

    await ReadSource.destroy();
}

query();
