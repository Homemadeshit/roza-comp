
import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { DictionaryTable } from '../entities/DictionaryTable.entity';
import { DictionaryField } from '../entities/DictionaryField.entity';
import { Like } from 'typeorm';

export class DictionaryController {
    private tableRepo = AppDataSource.getRepository(DictionaryTable);
    private fieldRepo = AppDataSource.getRepository(DictionaryField);

    async getTables(req: Request, res: Response) {
        try {
            const { search } = req.query;
            let where = {};

            if (search) {
                where = [
                    { description: Like(`%${search}%`) },
                    { objectName: Like(`%${search}%`) },
                    { tableName: Like(`%${search}%`) }
                ];
            }

            const tables = await this.tableRepo.find({
                where,
                order: { description: 'ASC' }
            });

            return res.json(tables);
        } catch (error) {
            console.error('Error fetching dictionary tables:', error);
            return res.status(500).json({ error: 'Failed to fetch dictionary tables' });
        }
    }

    async getFields(req: Request, res: Response) {
        try {
            const fields = await this.fieldRepo.find({
                order: { description: 'ASC' }
            });
            return res.json(fields);
        } catch (error) {
            console.error('Error fetching dictionary fields:', error);
            return res.status(500).json({ error: 'Failed to fetch dictionary fields' });
        }
    }
}
