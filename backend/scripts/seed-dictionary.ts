
import * as fs from 'fs';
import * as path from 'path';
import { AppDataSource } from '../db';
import { DictionaryTable } from '../entities/DictionaryTable.entity';
import { DictionaryField } from '../entities/DictionaryField.entity';

async function seed() {
    await AppDataSource.initialize();

    const filePath = 'backend/scripts/dictionary-data.txt';
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');

    const tableRepo = AppDataSource.getRepository(DictionaryTable);
    const fieldRepo = AppDataSource.getRepository(DictionaryField);

    // Clear existing data? Maybe. The user said "make some database", assuming fresh or append.
    // I will clear to avoid duplicates if run multiple times.
    await tableRepo.clear();
    await fieldRepo.clear();

    let tableCount = 0;
    let fieldCount = 0;

    for (const line of lines) {
        if (!line.trim()) continue;

        const cols = line.split('\t').map(c => c.trim());

        // Check if it's a table or field
        // Tables have > 5 cols or contain "Systeemtabel"/"Administratietabel"/"Programmatabel" in col 6 or 7
        // Fields have Datatype like "String", "Date/Time", "Integer" in col 3 or 4

        // Let's refine based on the known structure
        // Table Structure: 
        // 0: Description
        // 1: ObjectName
        // 2: TableName
        // 3: Ref1
        // 4: Ref2
        // 5: Ref3
        // 6: Type
        // 7: Custom (false/true)

        // Field Structure:
        // 0: Description
        // 1: FieldCode
        // 2: Length
        // 3: DataType
        // 4: Custom (false/true)

        // Heuristics:
        // If col[3] is "String" or "Date/Time" or "Integer" -> Field
        // If col[6] exists and is "Systeemtabel" etc -> Table

        const lastCol = cols[cols.length - 1];
        const isCustom = lastCol === 'true';

        if (cols.length >= 7) {
            // Table
            const table = new DictionaryTable();
            table.description = cols[0];
            table.objectName = cols[1];
            table.tableName = cols[2];
            table.reference1 = cols[3] || null;
            table.parentTable = cols[4] || null;
            table.childTable = cols[5] || null;
            table.category = cols[6];
            table.isCustom = isCustom;
            await tableRepo.save(table);
            tableCount++;
        } else {
            // Field
            // Wait, Check if col[3] or col[2] is a DataType known?
            // Field line: Invoerdatum	INP_DATE	8	Date/Time	false
            // cols[2] is 8 (Length), cols[3] is Date/Time

            const field = new DictionaryField();
            field.description = cols[0];
            field.fieldCode = cols[1];
            field.length = parseInt(cols[2]) || null;
            field.dataType = cols[3];
            field.isCustom = isCustom;
            await fieldRepo.save(field);
            fieldCount++;
        }
    }

    console.log(`Seeding complete. Inserted ${tableCount} tables and ${fieldCount} fields.`);
    await AppDataSource.destroy();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
