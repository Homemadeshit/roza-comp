import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Customer } from '../entities/Customer.entity';
import { AccountViewService } from '../services/AccountViewService';

export class CustomerController {
  private customerRepo = AppDataSource.getRepository(Customer);

  // GET /api/customers
  async getAll(req: any, res: any) {
    try {
      const customers = await this.customerRepo.find({
        order: { updatedAt: 'DESC' },
        relations: ['paymentPlans'], // Include plans to show status badges
      });
      return res.json(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // GET /api/customers/:id
  async getOne(req: any, res: any) {
    try {
      const { id } = req.params;
      const customer = await this.customerRepo.findOne({
        where: { id },
        relations: ['invoices', 'paymentPlans'],
      });

      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      return res.json(customer);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching customer details' });
    }
  }

  // POST /api/sync
  async triggerSync(req: any, res: any) {
    try {
      const avService = new AccountViewService(AppDataSource);
      
      console.log('🔄 Manual sync triggered via API...');
      
      // Run the sync logic
      await avService.syncCustomers();
      await avService.syncInvoices();

      return res.json({ message: 'Sync completed successfully' });
    } catch (error) {
      console.error('Sync failed:', error);
      return res.status(500).json({ error: 'Sync failed', details: error.message });
    }
  }
}