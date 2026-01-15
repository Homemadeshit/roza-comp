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
    PAY_DAYS: 'BET_TERM',   // Payment Term (Days)
    AUTO_CONFIRM: 'DD_ACT' // Direct Debit / Auto Collect Status
  },
  OPEN_ITEM: {
    OBJ: 'OPI', // Openstaande Posten (Open Items)
    CUS_ID: 'SUB_NR',      // Customer Number linkage
    INV_NUM: 'FACTUURNR',  // Invoice Number
    AMOUNT: 'BEDRAG_VV',   // Original Amount (Foreign Currency usually, or BEDRAG for Base)
    PAID: 'BETAALD_VV',    // Paid Amount
    REMAINING: 'ITEM_PAID', // Remaining Open Amount (User identified this)
    DATE: 'DATUM',         // Issue Date
    DUE_DATE: 'VERVALDAT',  // Due Date
    DESCRIPTION: 'TRN_DESC', // Invoice Description
    OVERDUE_DAYS: 'ITEM_EXPDS' // Days Overdue calculation from AV
  }
};

export class AccountViewService {
  private api: AxiosInstance;
  private customerRepo: Repository<Customer>;
  private invoiceRepo: Repository<Invoice>;
  private baseUrl: string;

  // Static token storage for simple persistence in this demo
  private static accessToken: string | null = null;
  private static expiration: Date | null = null;

  constructor(dataSource: DataSource) {
    this.customerRepo = dataSource.getRepository(Customer);
    this.invoiceRepo = dataSource.getRepository(Invoice);
    // Hardcoding temporarily to ensure we are hitting the new domain
    this.baseUrl = 'https://accountview.net';

    this.api = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });

    // Apply token if we have one stored
    if (AccountViewService.accessToken) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${AccountViewService.accessToken}`;
    }
  }

  // --- OAuth Authorization Code Flow Support ---

  /**
   * Generates the URL to redirect the user to for logging in to AccountView.
   */
  public getAuthorizationUrl(): string {
    const params = new URLSearchParams();
    params.append('client_id', process.env.ACCOUNTVIEW_CLIENT_ID || '');
    params.append('response_type', 'code');
    // IMPORTANT: This URL must match exactly what is registered in the AccountView App settings
    const redirectUri = process.env.ACCOUNTVIEW_REDIRECT_URI || 'http://localhost:3001/oauth/callback';
    params.append('redirect_uri', redirectUri);
    params.append('scope', process.env.ACCOUNTVIEW_SCOPE || 'financial_data'); // Adjust scope as needed

    // Note: The auth endpoint might differ slightly depending on version, usually /oauth/authorize
    return `${this.baseUrl}/oauth/authorize?${params.toString()}`;
  }

  /**
   * Exchanges the temporary authorization code for a persistent Access Token.
   */
  public async exchangeCodeForToken(code: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('client_id', process.env.ACCOUNTVIEW_CLIENT_ID || '');
    params.append('client_secret', process.env.ACCOUNTVIEW_CLIENT_SECRET || '');
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    // IMPORTANT: This must match the redirect_uri used in getAuthorizationUrl
    const redirectUri = process.env.ACCOUNTVIEW_REDIRECT_URI || 'http://localhost:3001/oauth/callback';
    params.append('redirect_uri', redirectUri);

    console.log('🔄 Exchanging OAuth code for token... (Real Mode)');

    try {
      const response = await axios.post(`${this.baseUrl}/api/v3/Token`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const accessToken = response.data.access_token;

      // Set the token for future requests in this instance AND static storage
      AccountViewService.accessToken = accessToken;
      this.api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      console.log('✅ Token Exchange Successful');
      return response.data;
    } catch (error) {
      console.error('❌ Token Exchange Failed:', error?.response?.data || error.message);
      // Re-throwing so the caller knows it failed
      throw error;
    }
  }

  /**
   * 1. Authentication (Client Credentials Fallback)
   * Uses OAuth2 /api/v3/Token endpoint as specified
   */
  private async authenticate(): Promise<void> {
    // If we already have a token (e.g. from OAuth flow), skip this
    if (this.api.defaults.headers.common['Authorization']) return;

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

      console.log('✅ Connected to AccountView API v3 (Client Credentials)');
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
   * Generic method to call api/v3/av/AccountViewBusinessObjects
   * Requested by user based on documentation.
   */
  public async getBusinessObjects(businessObject: string, bookDate?: string): Promise<any> {
    await this.authenticate();

    try {
      console.log(`🔍 Querying AccountViewData for ${businessObject}...`);
      const response = await this.api.get('/api/v3/AccountViewData', {
        params: {
          BusinessObject: businessObject,
          PageSize: 5
        }
      });
      return response.data;
    } catch (error) {
      console.error(`❌ getBusinessObjects failed:`, error?.response?.data || error.message);
      throw error;
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
      AV_FIELDS.DEBTOR.PAY_DAYS,
      AV_FIELDS.DEBTOR.AUTO_CONFIRM
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

      // Map Direct Debit (boolean or truthy check)
      // Assuming DD_ACT returns true/false or 1/0
      customer.directDebit = !!row[AV_FIELDS.DEBTOR.AUTO_CONFIRM];

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
      AV_FIELDS.OPEN_ITEM.REMAINING,
      AV_FIELDS.OPEN_ITEM.DATE,
      AV_FIELDS.OPEN_ITEM.DUE_DATE,
      AV_FIELDS.OPEN_ITEM.DESCRIPTION,
      AV_FIELDS.OPEN_ITEM.OVERDUE_DAYS
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

      // Parse amounts
      invoice.amount = parseFloat(row[AV_FIELDS.OPEN_ITEM.AMOUNT]) || 0;
      invoice.paidAmount = parseFloat(row[AV_FIELDS.OPEN_ITEM.PAID]) || 0;
      invoice.openAmount = parseFloat(row[AV_FIELDS.OPEN_ITEM.REMAINING]) || (invoice.amount - invoice.paidAmount); // Fallback if 0

      // Details
      invoice.description = row[AV_FIELDS.OPEN_ITEM.DESCRIPTION] || '';
      invoice.daysOverdue = parseInt(row[AV_FIELDS.OPEN_ITEM.OVERDUE_DAYS]) || 0;

      // Parse Dates
      invoice.issueDate = new Date(row[AV_FIELDS.OPEN_ITEM.DATE]);
      invoice.dueDate = new Date(row[AV_FIELDS.OPEN_ITEM.DUE_DATE]);

      // Calculate Status based on User Logic: ITEM_EXPDS > 0 -> overdue
      if (invoice.daysOverdue > 0) {
        invoice.status = InvoiceStatus.OVERDUE;
      } else if (invoice.openAmount <= 0.01) {
        invoice.status = InvoiceStatus.PAID;
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
