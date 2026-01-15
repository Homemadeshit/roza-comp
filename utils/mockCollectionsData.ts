// import { Customer } from '../types'; 

export const MOCK_COLLECTIONS_DATA = [
    {
        id: 'c_13002',
        accountViewId: '13002',
        companyName: 'Grote Klant B.V. (Demo)',
        email: 'finance@groteklant.nl',
        currentBalance: 5041.67,
        directDebit: false,
        creditLimit: 10000,
        maxPaymentDays: 30,
        risk: 'HIGH',
        isBlocked: false,
        notes: '',
        invoices: [
            { id: 'inv_2026001', invoiceNumber: '2026001', amount: 5041.67, paidAmount: 0, openAmount: 5041.67, issueDate: '2026-01-01', dueDate: '2026-01-31', daysOverdue: 0, status: 'OPEN', reminderCount: 0 }
        ]
    },
    {
        id: 'c_15000',
        accountViewId: '15000',
        companyName: 'Credit Balance Trader',
        email: 'info@trader.nl',
        currentBalance: -639.00,
        directDebit: false,
        creditLimit: 5000,
        maxPaymentDays: 30,
        risk: 'LOW',
        isBlocked: false,
        notes: 'Credit nota openstaand',
        invoices: [
            { id: 'inv_2025-11', invoiceNumber: '2025-11', amount: -639.00, paidAmount: 0, openAmount: -639.00, issueDate: '2025-11-01', dueDate: '2025-12-01', daysOverdue: 45, status: 'CREDIT', reminderCount: 0 }
        ]
    },
    {
        id: 'c_10000034',
        accountViewId: '10000034', // SUB_NR
        companyName: 'MEMO FLOWERS SRL',
        email: 'billing@memoflowers.ro',
        currentBalance: 3732.17, // Net calculation: 9697.17 - 5965.00
        directDebit: false,
        creditLimit: 15000,
        maxPaymentDays: 30,
        risk: 'HIGH',
        isBlocked: false,
        notes: 'Complex account: Credits and Debts mixed.',
        invoices: [
            {
                id: 'inv_23983',
                invoiceNumber: '23983',
                amount: 9857.49,
                paidAmount: 9857.49,
                openAmount: 0, // ITEM_REST: 0 (PAID)
                issueDate: '2025-11-26',
                dueDate: '2025-12-26',
                daysOverdue: 0,
                status: 'PAID',
                reminderCount: 0
            },
            {
                id: 'inv_24057',
                invoiceNumber: '24057',
                amount: 9697.17,
                paidAmount: 0,
                openAmount: 9697.17, // ITEM_REST
                issueDate: '2025-12-09',
                dueDate: '2026-01-09',
                daysOverdue: 6,
                status: 'OVERDUE',
                reminderCount: 0
            },
            {
                id: 'inv_overschot',
                invoiceNumber: 'OVERSCHOT',
                amount: -5965.00,
                paidAmount: 0,
                openAmount: -5965.00, // ITEM_REST (Credit)
                issueDate: '2025-12-16',
                dueDate: '2025-12-16',
                daysOverdue: 0,
                status: 'CREDIT',
                reminderCount: 0
            }
        ]
    },
    {
        id: 'c_04',
        accountViewId: '04',
        companyName: 'Fresh Flowers Volendam',
        email: 'finance@volendam-flowers.nl',
        currentBalance: 0.00, // All paid
        directDebit: false,
        creditLimit: 5000,
        maxPaymentDays: 30,
        risk: 'LOW',
        isBlocked: false,
        notes: 'Good payer. All updated.',
        invoices: [
            {
                id: 'inv_24102',
                invoiceNumber: '24102',
                amount: 1500.00,
                paidAmount: 1500.00,
                openAmount: 0, // ITEM_REST: 0 (Paid)
                issueDate: '2026-01-01',
                dueDate: '2026-01-15',
                daysOverdue: 0,
                status: 'PAID',
                reminderCount: 0
            },
            {
                id: 'inv_24103',
                invoiceNumber: '24103',
                amount: 200.00,
                paidAmount: 200.00,
                openAmount: 0, // Paid
                issueDate: '2026-01-01',
                dueDate: '2026-01-15',
                daysOverdue: 0,
                status: 'PAID',
                reminderCount: 0
            }
        ]
    },
    {
        id: 'c_16001',
        accountViewId: '16001',
        companyName: 'Services 16001',
        email: 'admin@services.nl',
        currentBalance: -433.79,
        directDebit: true,
        creditLimit: 1000,
        maxPaymentDays: 14,
        risk: 'LOW',
        isBlocked: false,
        notes: '',
        invoices: [
            {
                id: 'inv_202538495',
                invoiceNumber: '202538495',
                description: 'Service Correction',
                amount: -433.79,
                paidAmount: 0,
                openAmount: -433.79,
                issueDate: '2025-12-20',
                dueDate: '2026-01-06',
                daysOverdue: 9,
                status: 'CREDIT',
                reminderCount: 0
            }
        ]
    },
    {
        id: 'c_1',
        accountViewId: '1',
        companyName: 'Fresh Flowers Zaandam',
        email: 'info@zaandam-fresh.nl',
        currentBalance: 0.00,
        directDebit: true,
        creditLimit: 10000,
        maxPaymentDays: 30,
        risk: 'LOW',
        isBlocked: false,
        notes: '',
        invoices: [
            { id: 'inv_24093', invoiceNumber: '24093', amount: 4256.03, paidAmount: 4256.03, openAmount: 0, issueDate: '2026-01-02', dueDate: '2026-02-02', daysOverdue: 0, status: 'PAID', reminderCount: 0 },
            { id: 'inv_24094', invoiceNumber: '24094', amount: 177.95, paidAmount: 177.95, openAmount: 0, issueDate: '2026-01-03', dueDate: '2026-02-03', daysOverdue: 0, status: 'PAID', reminderCount: 0 }
        ]
    },
    {
        id: 'c_12',
        accountViewId: '12',
        companyName: 'InaFlora',
        email: 'ina@inaflora.com',
        currentBalance: 0.00,
        directDebit: true,
        creditLimit: 2000,
        maxPaymentDays: 14,
        risk: 'LOW',
        isBlocked: false,
        notes: '',
        invoices: [
            { id: 'inv_24092', invoiceNumber: '24092', amount: 598.67, paidAmount: 598.67, openAmount: 0, issueDate: '2026-01-08', dueDate: '2026-01-22', daysOverdue: 0, status: 'PAID', reminderCount: 0 }
        ]
    },
    {
        id: 'c_1177',
        accountViewId: '1177',
        companyName: 'Customer 1177', // Placeholder
        email: 'info@1177.nl',
        currentBalance: 670.90,
        directDebit: false,
        creditLimit: 2000,
        maxPaymentDays: 30,
        risk: 'MEDIUM',
        isBlocked: false,
        notes: '',
        invoices: [
            { id: 'inv_23986', invoiceNumber: '23986', amount: 670.90, paidAmount: 0, openAmount: 670.90, issueDate: '2025-11-30', dueDate: '2025-12-30', daysOverdue: 16, status: 'OVERDUE', reminderCount: 0 }
        ]
    },
    {
        id: 'c_10026',
        accountViewId: '10026',
        companyName: 'Customer 10026', // Placeholder
        email: 'info@10026.nl',
        currentBalance: -131.24,
        directDebit: false,
        creditLimit: 2000,
        maxPaymentDays: 30,
        risk: 'LOW',
        isBlocked: false,
        notes: '',
        invoices: [
            { id: 'inv_23552', invoiceNumber: '23552', amount: -131.24, paidAmount: 0, openAmount: -131.24, issueDate: '2025-10-07', dueDate: '2025-11-07', daysOverdue: 60, status: 'CREDIT', reminderCount: 0 }
        ]
    },
    {
        id: 'c_15001',
        accountViewId: '15001',
        companyName: 'Customer 15001', // Placeholder
        email: 'info@15001.nl',
        currentBalance: -1178.00, // -705 + -473
        directDebit: false,
        creditLimit: 5000,
        maxPaymentDays: 30,
        risk: 'LOW',
        isBlocked: false,
        notes: '',
        invoices: [
            { id: 'inv_20251110', invoiceNumber: '20251110', amount: -705.00, paidAmount: 0, openAmount: -705.00, issueDate: '2025-11-10', dueDate: '2025-12-01', daysOverdue: 0, status: 'CREDIT', reminderCount: 0 },
            { id: 'inv_20251120', invoiceNumber: '20251120', amount: -473.00, paidAmount: 0, openAmount: -473.00, issueDate: '2025-11-20', dueDate: '2026-01-01', daysOverdue: 0, status: 'CREDIT', reminderCount: 0 }
        ]
    },
    {
        id: 'c_16003',
        accountViewId: '16003',
        companyName: 'Customer 16003',
        email: 'info@16003.nl',
        currentBalance: -219.91,
        directDebit: false,
        creditLimit: 2000,
        maxPaymentDays: 30,
        risk: 'LOW',
        isBlocked: false,
        notes: '',
        invoices: [
            { id: 'inv_60741411', invoiceNumber: '60741411', amount: -219.91, paidAmount: 0, openAmount: -219.91, issueDate: '2025-04-30', dueDate: '2025-05-30', daysOverdue: 0, status: 'CREDIT', reminderCount: 0 }
        ]
    },
    {
        id: 'c_16008',
        accountViewId: '16008',
        companyName: 'Customer 16008',
        email: 'info@16008.nl',
        currentBalance: -179.79, // -60.48 + -119.31
        directDebit: false,
        creditLimit: 2000,
        maxPaymentDays: 30,
        risk: 'LOW',
        isBlocked: false,
        notes: '',
        invoices: [
            { id: 'inv_130088', invoiceNumber: '130088', amount: -60.48, paidAmount: 0, openAmount: -60.48, issueDate: '2025-02-21', dueDate: '2025-03-23', daysOverdue: 0, status: 'CREDIT', reminderCount: 0 },
            { id: 'inv_287502', invoiceNumber: '287502', amount: -119.31, paidAmount: 0, openAmount: -119.31, issueDate: '2025-02-21', dueDate: '2025-03-23', daysOverdue: 0, status: 'CREDIT', reminderCount: 0 }
        ]
    },
    {
        id: 'c_KB1600',
        accountViewId: '_KB1600',
        companyName: 'Unknown KB1600',
        email: 'unknown@kb.nl',
        currentBalance: 0.90,
        directDebit: false,
        creditLimit: 0,
        maxPaymentDays: 0,
        risk: 'LOW',
        isBlocked: false,
        notes: 'Legacy small balance',
        invoices: [
            { id: 'inv_KB1600', invoiceNumber: '_KB1600', amount: 0.90, paidAmount: 0, openAmount: 0.90, issueDate: '2021-12-31', dueDate: '2021-12-31', daysOverdue: 900, status: 'OPEN', reminderCount: 0 }
        ]
    },
    {
        // KEEPING TARGET DEMO FOR LINE ITEMS
        id: 'cust_003',
        accountViewId: 'AV003',
        companyName: 'Fresh Flowers Volendam (Target)',
        email: 'freshflowers@volendam.com',
        currentBalance: 1250.75,
        directDebit: false,
        creditLimit: 5000,
        maxPaymentDays: 30,
        risk: 'GOOD',
        isBlocked: false,
        notes: '',
        invoices: [
            {
                id: 'inv_005',
                invoiceNumber: '80',
                amount: 741.00,
                paidAmount: 0,
                openAmount: 741.00,
                issueDate: '2026-01-01T00:00:00.000Z',
                dueDate: '2026-01-15T00:00:00.000Z',
                daysOverdue: 0,
                status: 'OPEN',
                reminderCount: 0
            },
            {
                id: 'inv_006',
                invoiceNumber: '81',
                amount: 509.75,
                paidAmount: 0,
                openAmount: 509.75,
                issueDate: '2026-01-09T00:00:00.000Z',
                dueDate: '2026-01-23T00:00:00.000Z',
                daysOverdue: 0,
                status: 'OPEN',
                reminderCount: 0
            }
        ]
    }
];

export const MOCK_EMAIL_TEMPLATES = [
    {
        id: '0000000002',
        name: 'Aanmaning HK',
        subject: 'Overzicht openstaande rekeningen',
        type: 'REMINDER', // derived from OBJ_CODE: "RE1"
        contentBase64: 'VmlhIGRlemUgZW1haWwgd2lsbGVuIHdpaiB1IGF0dGVuZGVyZW4gb3AgaGV0IGZlaXQgZGF0IGVyIG5vZyBlZW4gYWFudGFsIHJla2VuaW5nZW4gdmFuIHUgYmlqIG9ucyBvcGVuc3RhYW4uIFppZSBkYWFydG9lIGRlIGJpamxhZ2UgbWV0IGhldCBvdmVyemljaHQuIFdpaiB3aWxsZW4gdSB2cmFnZW4gb20gZWVuIHNwb2VkaWdlIGJldGFsaW5nLiBNZXQgdnJpZW5kZWxpamtlIGdyb2V0ZW4sIEFkbWluaXN0cmF0aWUga2FudG9vciBIZWluIEtvbmluZw==\nPGhlYWQ+Cjx0aXRsZT48L3RpdGxlPgo8YmFzZSBocmVmPSJodHRwOi8vIj4KPG1ldGEgaHR0cC1lcXVpdj0iQ29udGVudC1UeXBlIiBjb250ZW50PSJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLTgiPgo8bGluayBocmVmPSIiIHJlbD0ic3R5bGVzaGVldCIgdHlwZT0idGV4dC9jc3MiPgo8L2hlYWQ+Cjxib2R5PlZpYSBkZXplIGVtYWlsIHdpbGxlbiB3aWogdSBhdHRlbmRlcmVuIG9wIGhldCBmZWl0IGRhdCBlciBub2cgZWVuIGFhbnRhbCByZWtlbmluZ2VuIHZhbiB1IGJpaiBvbnMgb3BlbnN0YWFuLiBaaWUgZGFhcnRvZSBkZSBiaWpsYWdlIG1ldCBoZXQgb3ZlcnppY2h0LiBXaWogd2lsbGVuIHUgdnJhZ2VuIG9tIGVlbiBzcG9lZGlnZSBiZXRhbGluZy4gTWV0IHZyaWVuZGVsaWprZSBncm9ldGVuLCBBZG1pbmlzdHJhdGllIGthbnRvb3IgSGVpbiBLb25pbmc8L2JvZHk+'
    },
    {
        id: '0000000004',
        name: 'Factuur HK',
        subject: 'Uw factuur',
        type: 'INVOICE', // derived from OBJ_CODE: "SI1"
        contentBase64: 'PHN5c19leHBuLmFfZW1sX2RlYXI+DQoNCg0KDQpIaWVyYmlqIHRyZWZ0IHUgb256ZSBmYWN0dXVyIG1ldCBudW1tZXIgPHNvaV9oZHIuaW52X25yPiBhYW4uIA0KDQoNCg0KDQpJbmRpZW4gdSB2cmFnZW4gb2Ygb3BtZXJraW5nZW4gaGVlZnQgb210cmVudCBkZSBmYWN0dXVyIGt1bnQgdSBjb250YWN0IG1ldCBtaWogb3BuZW1lbiBvZiBlZW4gbWFpbCBzdHVyZW4gbmFhciB0b21AaGVpbmtvbmluZy5ubCANCg0KTWV0IHZyaWVuZGVsaWprZSBncm9ldCwNCg0KVG9tIEtvbmluZw0KDQoNCg0KKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiANCg0KQWRtaW5pc3RyYXRpZS0gZW4gYmVsYXN0aW5nYWR2aWVza2FudG9vciBIZWluIEtvbmluZyANCg0KSnVsaWFuYXdlZyAyMjRiIA0KDQoxMTMxIE5XICBWb2xlbmRhbSANCg0KdGVsZWZvb246IDAyOTktMzY1ODQ4IA0KDQpmYXg6IDAyOTktMzY3NTMxIA0KDQplLW1haWw6IHRvbSBAIGhlaW5rb25pbmcgLm5sIA0KDQppbnRlcm5ldDogd3d3LmhlaW5rb25pbmcubmwgDQoNCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogDQoNCg0KDQpESVNDTEFJTUVSIA0KRGUgaW5mb3JtYXRpZSBpbiBkaXQgYmVyaWNodCBpcyB2ZXJ0cm91d2VsaWprLiBIZXQgaXMgZGFhcm9tIG5pZXQgdG9lZ2VzdGFhbiBkYXQgdSBkZXplIGluZm9ybWF0aWUgb3BlbmJhYXIgbWFha3QsIHZlcm1lbmlndnVsZGlndCBvZiB2ZXJzcHJlaWR0LCB0ZW56aWogZGUgdmVyemVuZGVyIGFhbmdlZWZ0IGRhdCBkaXQgd2VsIGlzIHRvZWdlc3RhYW4uIA0KQWxzIGRpdCBlLW1haWxiZXJpY2h0IG5pZXQgdm9vciB1IGJlc3RlbWQgaXMsIHZyYWdlbiB3aWogdSB2cmllbmRlbGlqayBtYWFyIGRyaW5nZW5kIG9tIGhldCBiZXJpY2h0IGVuIGtvcGll624gZGFhcnZhbiB0ZSB2ZXJuaWV0aWdlbi4gRGl0IGJlcmljaHQgaXMgZ2Vjb250cm9sZWVyZCBvcCBiZWtlbmRlIHZpcnVzc2VuLiANCg0KSGVsYWFzIGt1bm5lbiB3aWogbmlldCBnYXJhbmRlcmVuIGRhdCBoZXQgYmVyaWNodCBkYXQgdSBvbnR2YW5ndCB2b2xsZWRpZyBlbiB0aWpkaWcgdmVyem9uZGVuIGlzLCBvZiB0aWpkaWcgb250dmFuZ2VuIHdvcmR0IGVuIHZyaWogaXMgdmFuIHZpcnVzc2VuIG9mIGFhbnRhc3RpbmcgZG9vciBkZXJkZW4uIA==\nPGhlYWQ+Cjx0aXRsZT48L3RpdGxlPgo8YmFzZSBocmVmPSJodHRwOi8vIj4KPG1ldGEgaHR0cC1lcXVpdj0iQ29udGVudC1UeXBlIiBjb250ZW50PSJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLTgiPgo8bGluayBocmVmPSIiIHJlbD0ic3R5bGVzaGVldCIgdHlwZT0idGV4dC9jc3MiPgo8L2hlYWQ+Cjxib2R5Pgo8cCBjbGFzcz0iTXNvTm9ybWFsIiBzdHlsZT0ibWFyZ2luOiAwY20gMGNtIDBwdDsiPjxmb250IGNvbG9yPSIjMDAwMDAwIiBmYWNlPSJDYWxpYnJpIj4mbHQ7c3lzX2V4cG4uYV9lbWxfZGVhciZndDs8YnI+PGJyPjwvZm9udD48L3A+PHAgY2xhc3M9Ik1zb05vcm1hbCIgc3R5bGU9Im1hcmdpbjogMGNtIDBjbSAwcHQ7Ij48Zm9udCBjb2xvcj0iIzAwMDAwMCIgZmFjZT0iQ2FsaWJyaSI+SGVyYmlqIHRyZWZ0IHUgb256ZSBmYWN0dXVyIG1ldCBudW1tZXIgJm5ic3A7Jmx0O3NvaV9oZHIuaW52X25yJmd0OyBhYW4uJm5ic3A7PC9mb250PjwvcD48cCBjbGFzcz0iTXNvTm9ybWFsIiBzdHlsZT0ibWFyZ2luOiAwY20gMGNtIDBwdDsiPjxmb250IGNvbG9yPSIjMDAwMDAwIj48YnI+PGZvbnQgZmFjZT0iQ2FsaWJyaSI+PC9mb250PjwvZm9udD48L3A+PHAgY2xhc3M9Ik1zb05vcm1hbCIgc3R5bGU9Im1hcmdpbjogMGNtIDBjbSAwcHQ7Ij48c3BhbiBzdHlsZT0nbXNvLWZhcmVhc3QtbGFuZ3VhZ2U6IE5MOyBtc28tZmFyZWFzdC1mb250LWZhbWlseTogIlRpbWVzIE5ldyBSb21hbiI7IG1zby1iaWRpLWZvbnQtZmFtaWx5OiAiVGltZXMgTmV3IFJvbWFuIjsnPjxmb250IGNvbG9yPSIjMDAwMDAwIiBmYWNlPSJDYWxpYnJpIj5JbmRpZW4gdSB2cmFnZW4gb2Ygb3BtZXJraW5nZW4gaGVlZnQgb210cmVudCBkZSBmYWN0dXVyIGt1bnQgdSBjb250YWN0IG1ldCBtaWogb3BuZW1lbiBvZiBlZW4gbWFpbCBzdHVyZW4gbmFhciA8L2ZvbnQ+PGEgaHJlZj0ibWFpbHRvOnRvbUBoZWlua29uaW5nLm5sIj48Zm9udCBjb2xvcj0iIzAwMDAwMCIgZmFjZT0iQ2FsaWJyaSI+dG9tQGhlaW5rb25pbmcubmw8L2ZvbnQ+PC9hPjxmb250IGNvbG9yPSIjMDAwMDAwIiBmYWNlPSJDYWxpYnJpIj4mbmJzcDs8YnI+PGJyPk1ldCB2cmllbmRlbGlqa2UgZ3JvZXQsPGJyPjxicj5Ub20gS29uaW5nPGJyPjwvZm9udD48L3NwYW4+PC9wPjxwIGNsYXNzPSJNc29Ob3JtYWwiIHN0eWxlPSJtYXJnaW46IDBjbSAwY20gMHB0OyI+PHNwYW4gc3R5bGU9Im1zby1mYXJlYXN0LWxhbmd1YWdlOiBOTDsiPjxicj48Zm9udCBjb2xvcj0iIzAwMDAwMCIgZmFjZT0iQ2FsaWJyaSI+KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiA8L2ZvbnQ+PC9zcGFuPjwvcD48Zm9udCBjb2xvcj0iIzAwMDAwMCIgZmFjZT0iQ2FsaWJyaSI+CjwvZm9udD48cCBjbGFzcz0iTXNvTm9ybWFsIiBzdHlsZT0ibWFyZ2luOiAwY20gMGNtIDBwdDsiPjxzcGFuIHN0eWxlPSJtc28tZmFyZWFzdC1sYW5ndWFnZTogTkw7Ij48Zm9udCBjb2xvcj0iIzAwMDAwMCIgZmFjZT0iQ2FsaWJyaSI+QWRtaW5pc3RyYXRpZS0gZW4gYmVsYXN0aW5nYWR2aWVza2FudG9vciBIZWluIEtvbmluZyA8L2ZvbnQ+PC9zcGFuPjwvcD48Zm9udCBjb2xvcj0iIzAwMDAwMCIgZmFjZT0iQ2FsaWJyaSI+CjwvZm9udD48cCBjbGFzcz0iTXNvTm9ybWFsIiBzdHlsZT0ibWFyZ2luOiAwY20gMGNtIDBwdDsiPjxzcGFuIHN0eWxlPSJtc28tZmFyZWFzdC1sYW5ndWFnZTogTkw7Ij48Zm9udCBjb2xvcj0iIzAwMDAwMCIgZmFjZT0iQ2FsaWJyaSI+SnVsaWFuYXdlZyAyMjRiIDwvZm9udD48L3NwYW4+PC9wPjxmb250IGNvbG9yPSIjMDAwMDAwIiBmYWNlPSJDYWxpYnJpIj4KPC9mb250PjxwIGNsYXNzPSJNc29Ob3JtYWwiIHN0eWxlPSJtYXJnaW46IDBjbSAwY20gMHB0OyI+PHNwYW4gc3R5bGU9Im1zby1mYXJlYXN0LWxhbmd1YWdlOiBOTDsiPjxmb250IGNvbG9yPSIjMDAwMDAwIiBmYWNlPSJDYWxpYnJpIj4xMTMxIE5XJm5ic3A7IFZvbGVuZGFtIDwvZm9udD48L3NwYW4+PC9wPjxmb250IGNvbG9yPSIjMDAwMDAwIiBmYWNlPSJDYWxpYnJpIj4KPC9mb250PjxwIGNsYXNzPSJNc29Ob3JtYWwiIHN0eWxlPSJtYXJnaW46IDBjbSAwY20gMHB0OyI+PHNwYW4gc3R5bGU9Im1zby1mYXJlYXN0LWxhbmd1YWdlOiBOTDsiPjxmb250IGNvbG9yPSIjMDAwMDAwIiBmYWNlPSJDYWxpYnJpIj50ZWxlZm9vbjogMDI5OS0zNjU4NDggPC9mb250Pjwvc3Bhbj48L3A+PGZvbnQgY29sb3I9IiMwMDAwMDAiIGZhY2U9IkNhbGlicmkiPgo8L2ZvbnQ+PHAgY2xhc3M9Ik1zb05vcm1hbCIgc3R5bGU9Im1hcmdpbjogMGNtIDBjbSAwcHQ7Ij48c3BhbiBsYW5nPSJFTi1VUyIgc3R5bGU9Im1zby1mYXJlYXN0LWxhbmd1YWdlOiBOTDsgbXNvLWFuc2ktbGFuZ3VhZ2U6IEVOLVVTOyI+PGZvbnQgY29sb3I9IiMwMDAwMDAiIGZhY2U9IkNhbGlicmkiPmZheDogMDI5OS0zNjc1MzEgPC9mb250Pjwvc3Bhbj48L3A+PGZvbnQgY29sb3I9IiMwMDAwMDAiIGZhY2U9IkNhbGlicmkiPgo8L2ZvbnQ+PHAgY2xhc3M9Ik1zb05vcm1hbCIgc3R5bGU9Im1hcmdpbjogMGNtIDBjbSAwcHQ7Ij48c3BhbiBsYW5nPSJFTi1VUyIgc3R5bGU9Im1zby1mYXJlYXN0LWxhbmd1YWdlOiBOTDsgbXNvLWFuc2ktbGFuZ3VhZ2U6IEVOLVVTOyI+PGZvbnQgY29sb3I9IiMwMDAwMDAiPjxmb250IGZhY2U9IkNhbGlicmkiPmUtbWFpbDogPHU+dG9tIDwvdT48L2ZvbnQ+PC9mb250PjxhIGhyZWY9Im1haWx0bzp0b21AaGVpbmtvbmluZy5ubCI+PGZvbnQgY29sb3I9IiMwMDAwMDAiIGZhY2U9IkNhbGlicmkiPkAgaGVpbmtvbmluZyAubmwgPC9mb250PjwvYT48L3NwYW4+PC9wPjxmb250IGNvbG9yPSIjMDAwMDAwIiBmYWNlPSJDYWxpYnJpIj4KPC9mb250PjxwIGNsYXNzPSJNc29Ob3JtYWwiIHN0eWxlPSJtYXJnaW46IDBjbSAwY20gMHB0OyI+PHNwYW4gc3R5bGU9Im1zby1mYXJlYXN0LWxhbmd1YWdlOiBOTDsiPjxmb250IGNvbG9yPSIjMDAwMDAwIiBmYWNlPSJDYWxpYnJpIj5pbnRlcm5ldDogPC9mb250PjxhIGhyZWY9Imh0dHA6Ly93d3cuaGVpbmtvbmluZy5ubC8iPjxmb250IGNvbG9yPSIjMDAwMDAwIiBmYWNlPSJDYWxpYnJpIj53d3cuaGVpbmtvbmluZy5ubCA8L2ZvbnQ+PC9hPjwvc3Bhbj48L3A+PGZvbnQgY29sb3I9IiMwMDAwMDAiIGZhY2U9IkNhbGlicmkiPgo8L2ZvbnQ+PHAgY2xhc3M9Ik1zb05vcm1hbCIgc3R5bGU9Im1hcmdpbjogMGNtIDBjbSAwcHQ7Ij48c3BhbiBzdHlsZT0ibXNvLWZhcmVhc3QtbGFuZ3VhZ2U6IE5MOyI+PGZvbnQgZmFjZT0iQ2FsaWJyaSI+PGZvbnQgY29sb3I9IiMwMDAwMDAiPioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKio8L2ZvbnQ+IDwvZm9udD48L3NwYW4+PC9wPgo8cCBjbGFzcz0iTXNvTm9ybWFsIiBzdHlsZT0ibWFyZ2luOiAwY20gMGNtIDBwdDsiPjxzcGFuIHN0eWxlPSJtc28tZmFyZWFzdC1sYW5ndWFnZTogTkw7Ij48YnI+PGJyPjwvc3Bhbj48Yj48c3BhbiBzdHlsZT0nZm9udC1mYW1pbHk6ICJBcmlhbCIsInNhbnMtc2VyaWYiOyBmb250LXNpemU6IDhwdDsgbXNvLWZhcmVhc3QtbGFuZ3VhZ2U6IE5MOyc+RElTQ0xBSU1FUiA8YnI+PC9zcGFuPjwvYj48aT48c3BhbiBzdHlsZT0nY29sb3I6IGJsYWNrOyBmb250LWZhbWlseTogIkFyaWFsIiwic2Fucy1zZXJpZiI7IGZvbnQtc2l6ZTogOHB0OyBtc28tZmFyZWFzdC1sYW5ndWFnZTogTkw7Jz5EZSBpbmZvcm1hdGllIGluIGRpdCBiZXJpY2h0IGlzIHZlcnRyb3V3ZWxpamsuIEhldCBpcyBkYWFyb20gbmlldCB0b2VnZXN0YWFuIGRhdCB1IGRlemUgaW5mb3JtYXRpZSBvcGVuYmFhciBtYWFrdCwgdmVybWVuaWd2dWxkaWd0IG9mIHZlcnNwcmVpZHQsIHRlbnppaiBkZSB2ZXJ6ZW5kZXIgYWFuZ2VlZnQgZGF0IGRpdCB3ZWwgaXMgdG9lZ2VzdGFhbi4gPGJyPkFscyBkaXQgZS1tYWlsYmVyaWNodCBuaWV0IHZvb3IgdSBiZXN0ZW1kIGlzLCB2cmFnZW4gd2lqIHUgdnJpZW5kZWxpamsgbWFhciBkcmluZ2VuZCBvbSBoZXQgYmVyaWNodCBlbiBrb3BpZetuIGRhYXJ2YW4gdGUgdmVybmlldGlnZW4uIERpdCBiZXJpY2h0IGlzIGdlY29udHJvbGVlcmQgb3AgYmVrZW5kZSB2aXJ1c3Nlbi4gPC9zcGFuPjwvaT48L3A+CjxwIGNsYXNzPSJNc29Ob3JtYWwiIHN0eWxlPSJtYXJnaW46IDBjbSAwY20gMHB0OyI+PGk+PHNwYW4gc3R5bGU9J2NvbG9yOiBibGFjazsgZm9udC1mYW1pbHk6ICJBcmlhbCIsInNhbnMtc2VyaWYiOyBmb250LXNpemU6IDhwdDsgbXNvLWZhcmVhc3QtbGFuZ3VhZ2U6IE5MOyc+SGVsYWFzIGt1bm5lbiB3aWogbmlldCBnYXJhbmRlcmVuIGRhdCBoZXQgYmVyaWNodCBkYXQgdSBvbnR2YW5ndCB2b2xsZWRpZyBlbiB0aWpkaWcgdmVyem9uZGVuIGlzLCBvZiB0aWpkaWcgb250dmFuZ2VuIHdvcmR0IGVuIHZyaWogaXMgdmFuIHZpcnVzc2VuIG9mIGFhbnRhc3RpbmcgZG9vciBkZXJkZW4uIDwvc3Bhbj48L2k+PC9wPgo8cCBzdHlsZT0ibWFyZ2luLXRvcDogMC4xcHQ7IG1hcmdpbi1ib3R0b206IDAuMXB0OyI+PC9wPjwvYm9keT4='
    }
];
