import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Customer } from '../entities/Customer.entity';
import { AccountViewService } from '../services/AccountViewService';

export class CustomerController {
  private get customerRepo() {
    return AppDataSource.getRepository(Customer);
  }

  // GET /api/customers
  async getAll(req: any, res: any) {
    try {
      const customers = await this.customerRepo.find({
        order: { updatedAt: 'DESC' },
        relations: ['paymentPlans', 'invoices'], // Include plans and invoices for status badges
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

  // POST /api/customers
  async create(req: any, res: any) {
    try {
      const { companyName, email, creditLimit, maxPaymentDays } = req.body;

      if (!companyName) {
        return res.status(400).json({ error: 'Company Name is required' });
      }

      const customer = new Customer();
      customer.companyName = companyName;
      customer.email = email || '';
      customer.creditLimit = creditLimit || 0;
      customer.maxPaymentDays = maxPaymentDays || 30;
      // Generate a temporary ID or handle this differently if syncing with AV immediately
      customer.accountViewId = `LOC-${Date.now()}`;

      await this.customerRepo.save(customer);

      return res.status(201).json(customer);
    } catch (error) {
      console.error('Error creating customer:', error);
      return res.status(500).json({ error: 'Failed to create customer' });
    }
  }
}