import axios, { AxiosInstance } from 'axios';
import { DataSource, Repository } from 'typeorm';
import { Customer } from '../entities/Customer.entity';
import { Invoice, InvoiceStatus } from '../entities/Invoice.entity';

// AccountView Internal Field Codes (Standard Dutch configurations)
// You may need to verify these against your specific AccountView Data Dictionary
const AV_FIELDS = {
  DEBTOR: {
    OBJ: 'DEB',
    ID: 'SUB_NR',          // Customer Number
    NAME: 'NAAM',          // Company Name
    EMAIL: 'E_MAIL',       // Email Address
    LIMIT: 'KREDIETLIM',   // Credit Limit
    PAY_DAYS: 'BET_TERM'   // Payment Term (Days)
  },
  OPEN_ITEM: {
    OBJ: 'OPI', // Openstaande Posten (Open Items)
    CUS_ID: 'SUB_NR',      // Customer Number linkage
    INV_NUM: 'FACTUURNR',  // Invoice Number
    AMOUNT: 'BEDRAG_VV',   // Original Amount (Foreign Currency usually, or BEDRAG for Base)
    PAID: 'BETAALD_VV',    // Paid Amount
    DATE: 'DATUM',         // Issue Date
    DUE_DATE: 'VERVALDAT'  // Due Date
  }
};

export class AccountViewService {
  private api: AxiosInstance;
  private customerRepo: Repository<Customer>;
  private invoiceRepo: Repository<Invoice>;
  private baseUrl: string;

  constructor(dataSource: DataSource) {
    this.customerRepo = dataSource.getRepository(Customer);
    this.invoiceRepo = dataSource.getRepository(Invoice);
    this.baseUrl = process.env.ACCOUNTVIEW_API_URL || 'https://api.accountview.net';

    this.api = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
  }

  /**
   * 1. Authentication
   * Uses OAuth2 /api/v3/Token endpoint as specified
   */
  private async authenticate(): Promise<void> {
    try {
      // Prepare the specific headers usually required by AV for identification if needed, 
      // otherwise standard OAuth params go in the body
      const params = new URLSearchParams();
      params.append('client_id', process.env.ACCOUNTVIEW_CLIENT_ID || '');
      params.append('client_secret', process.env.ACCOUNTVIEW_CLIENT_SECRET || '');
      params.append('grant_type', 'client_credentials');
      // 'scope' might be needed depending on AV configuration, usually blank or specific app scope
      // params.append('scope', 'financial_data'); 

      const response = await axios.post(`${this.baseUrl}/api/v3/Token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      this.api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      
      // Some AV setups require X-Company-Id header for every request
      if (process.env.ACCOUNTVIEW_COMPANY_ID) {
        this.api.defaults.headers.common['X-Company-Id'] = process.env.ACCOUNTVIEW_COMPANY_ID;
      }

      console.log('✅ Connected to AccountView API v3');
    } catch (error) {
      console.error('❌ AV Auth Failed:', error?.response?.data || error.message);
      throw new Error('Authentication Failed');
    }
  }

  /**
   * Helper to fetch data pages from the generic AccountViewData endpoint
   */
  private async fetchData(businessObject: string, fields: string[]): Promise<any[]> {
    try {
      // Ensure specific fields are requested to reduce payload
      const fieldStr = fields.join(',');
      const response = await this.api.get('/api/v3/AccountViewData', {
        params: {
          BusinessObject: businessObject,
          Fields: fieldStr,
          PageSize: 1000 // Fetch in batches
        }
      });
      
      // AccountView returns rows in a generic structure, often inside `data` or direct array
      // Adjust based on exact JSON response structure. Usually: response.data.Rows or response.data
      return Array.isArray(response.data) ? response.data : (response.data.Rows || []);
    } catch (error) {
      console.error(`❌ Failed to fetch ${businessObject}:`, error?.response?.data || error.message);
      return [];
    }
  }

  /**
   * 2. Sync Customers (BusinessObject: DEB)
   */
  public async syncCustomers(): Promise<void> {
    await this.authenticate();

    const fields = [
      AV_FIELDS.DEBTOR.ID, 
      AV_FIELDS.DEBTOR.NAME, 
      AV_FIELDS.DEBTOR.EMAIL, 
      AV_FIELDS.DEBTOR.LIMIT,
      AV_FIELDS.DEBTOR.PAY_DAYS
    ];

    console.log(`fetching customers via object ${AV_FIELDS.DEBTOR.OBJ}...`);
    const avCustomers = await this.fetchData(AV_FIELDS.DEBTOR.OBJ, fields);

    console.log(`Processing ${avCustomers.length} customers...`);

    for (const row of avCustomers) {
      // Map AV Fields to our Entity
      const avId = row[AV_FIELDS.DEBTOR.ID];
      if (!avId) continue;

      let customer = await this.customerRepo.findOne({ where: { accountViewId: avId } });

      if (!customer) {
        customer = new Customer();
        customer.accountViewId = avId;
      }

      customer.companyName = row[AV_FIELDS.DEBTOR.NAME] || 'Unknown';
      customer.email = row[AV_FIELDS.DEBTOR.EMAIL] || '';
      // Only update limit if it comes from AV (parse potential string to float)
      const limit = parseFloat(row[AV_FIELDS.DEBTOR.LIMIT]);
      if (!isNaN(limit)) customer.creditLimit = limit;
      
      const days = parseInt(row[AV_FIELDS.DEBTOR.PAY_DAYS]);
      if (!isNaN(days)) customer.maxPaymentDays = days;

      await this.customerRepo.save(customer);
    }
    console.log('✅ Customer Sync Complete');
  }

  /**
   * 3. Sync Invoices (BusinessObject: OPI)
   */
  public async syncInvoices(): Promise<void> {
    if (!this.api.defaults.headers.common['Authorization']) {
        await this.authenticate();
    }

    const fields = [
      AV_FIELDS.OPEN_ITEM.CUS_ID,
      AV_FIELDS.OPEN_ITEM.INV_NUM,
      AV_FIELDS.OPEN_ITEM.AMOUNT,
      AV_FIELDS.OPEN_ITEM.PAID,
      AV_FIELDS.OPEN_ITEM.DATE,
      AV_FIELDS.OPEN_ITEM.DUE_DATE
    ];

    console.log(`fetching invoices via object ${AV_FIELDS.OPEN_ITEM.OBJ}...`);
    const avInvoices = await this.fetchData(AV_FIELDS.OPEN_ITEM.OBJ, fields);

    console.log(`Processing ${avInvoices.length} open items...`);

    for (const row of avInvoices) {
      const customerId = row[AV_FIELDS.OPEN_ITEM.CUS_ID];
      const invNum = row[AV_FIELDS.OPEN_ITEM.INV_NUM];

      // Skip if essential data is missing
      if (!customerId || !invNum) continue;

      // Find local customer
      const customer = await this.customerRepo.findOne({ where: { accountViewId: customerId } });
      if (!customer) continue; // Or create a stub customer?

      let invoice = await this.invoiceRepo.findOne({ where: { invoiceNumber: invNum } });

      if (!invoice) {
        invoice = new Invoice();
        invoice.invoiceNumber = invNum;
        invoice.customer = customer;
      }

      // Parse amounts (AV might return European format "1.000,00" or standard float. Assuming standard here)
      invoice.amount = parseFloat(row[AV_FIELDS.OPEN_ITEM.AMOUNT]) || 0;
      invoice.paidAmount = parseFloat(row[AV_FIELDS.OPEN_ITEM.PAID]) || 0;
      
      // Parse Dates (AV usually returns YYYYMMDD or ISO)
      // If AV returns YYYYMMDD string, conversion is needed. Assuming ISO or standard date string for now.
      invoice.issueDate = new Date(row[AV_FIELDS.OPEN_ITEM.DATE]);
      invoice.dueDate = new Date(row[AV_FIELDS.OPEN_ITEM.DUE_DATE]);

      // Calculate Status
      const today = new Date();
      if ((invoice.amount - invoice.paidAmount) <= 0.01) {
         invoice.status = InvoiceStatus.PAID;
      } else if (invoice.dueDate < today) {
         invoice.status = InvoiceStatus.OVERDUE;
      } else {
         invoice.status = InvoiceStatus.OPEN;
      }

      await this.invoiceRepo.save(invoice);
    }

    await this.updateCustomerBalances();
    console.log('✅ Invoice Sync Complete');
  }

  private async updateCustomerBalances() {
    // Recalculate balances based on synced invoices
    const query = `
      UPDATE customers 
      SET "currentBalance" = (
        SELECT COALESCE(SUM(amount - "paidAmount"), 0)
        FROM invoices 
        WHERE invoices.customer_id = customers.id 
        AND invoices.status IN ('OPEN', 'OVERDUE')
      )
    `;
    await this.customerRepo.query(query);
    console.log('✅ Customer Balances Recalculated');
  }
}
