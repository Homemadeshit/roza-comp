
import { AppDataSource } from '../db';
import { Customer } from '../entities/Customer.entity';
import { Invoice, InvoiceStatus } from '../entities/Invoice.entity';

const MOCK_DATA = [
    {
        companyName: 'Grote Klant B.V. (Demo)',
        accountViewId: '13002',
        email: 'finance@groteklant.nl',
        creditLimit: 10000,
        maxPaymentDays: 30,
        invoices: [
            { invoiceNumber: '2023-001', amount: 5041.67, paidAmount: 0, issueDate: '2023-01-01', dueDate: '2023-02-01', status: 'OVERDUE' }
        ]
    },
    {
        companyName: 'Credit Balance Trader',
        accountViewId: '15000',
        email: 'info@trader.com',
        creditLimit: 5000,
        maxPaymentDays: 45,
        invoices: [
            { invoiceNumber: '2023-055', amount: 1000, paidAmount: 1639, issueDate: '2023-03-01', dueDate: '2023-04-01', status: 'PAID' }
        ]
    },
    {
        companyName: 'MEMO FLOWERS SRL',
        accountViewId: '10000034',
        email: 'memo@flowers.it',
        creditLimit: 15000,
        maxPaymentDays: 14,
        invoices: [
            { invoiceNumber: '2023-088', amount: 3732.17, paidAmount: 0, issueDate: '2023-05-01', dueDate: '2023-06-01', status: 'OVERDUE' }
        ]
    },
    {
        companyName: 'Fresh Flowers Volendam',
        accountViewId: '04',
        email: 'orders@freshflowers.nl',
        creditLimit: 5000,
        maxPaymentDays: 30,
        invoices: []
    },
    {
        companyName: 'Services 16001',
        accountViewId: '16001',
        email: 'service@company.com',
        creditLimit: 1000,
        maxPaymentDays: 30,
        invoices: [
            { invoiceNumber: '2023-100', amount: 500, paidAmount: 933.79, issueDate: '2023-06-01', dueDate: '2023-07-01', status: 'PAID' }
        ]
    }
];

async function seed() {
    await AppDataSource.initialize();
    console.log('Database connected for seeding...');

    const customerRepo = AppDataSource.getRepository(Customer);
    const invoiceRepo = AppDataSource.getRepository(Invoice);

    for (const data of MOCK_DATA) {
        const existing = await customerRepo.findOne({ where: { accountViewId: data.accountViewId } });
        if (existing) {
            console.log(`Skipping ${data.companyName}, already exists.`);
            continue;
        }

        const customer = new Customer();
        customer.companyName = data.companyName;
        customer.accountViewId = data.accountViewId;
        customer.email = data.email;
        customer.creditLimit = data.creditLimit;
        customer.maxPaymentDays = data.maxPaymentDays || 30;

        // Calculate Balance
        let balance = 0;

        // Create Invoices
        const invoices = [];
        for (const invData of data.invoices) {
            const inv = new Invoice();
            inv.invoiceNumber = invData.invoiceNumber;
            inv.amount = invData.amount;
            inv.paidAmount = invData.paidAmount;
            inv.openAmount = invData.amount - invData.paidAmount;
            inv.issueDate = new Date(invData.issueDate);
            inv.dueDate = new Date(invData.dueDate);
            inv.status = inv.openAmount <= 0 ? InvoiceStatus.PAID : InvoiceStatus.OVERDUE;

            balance += inv.openAmount;
            invoices.push(inv);
        }

        customer.currentBalance = balance;

        const savedCustomer = await customerRepo.save(customer);

        for (const inv of invoices) {
            inv.customer = savedCustomer;
            await invoiceRepo.save(inv);
        }

        console.log(`Created ${data.companyName} with ${invoices.length} invoices.`);
    }

    process.exit(0);
}

seed();
