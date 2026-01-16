# AccountView Data Sources & Integration Documentation

This document tracks the analysis of AccountView database tables and their relevance to the Collections Dashboard.

## 1. OPENITEM (Open Items Extension)

**Source Table:** `OPENITEM`
**Context:** Enriches standard invoice data with payment and dunning details.
**Integration Target:** `Invoice` Entity

### Mapped Fields

| Source Column | Target Field (Invoice) | Type | Description |
| :--- | :--- | :--- | :--- |
| `AG_PAYREF` | `paymentReference` | String | **Payment Reference (Betalingskenmerk)**. Critical for matching bank payments. |
| `AREM_BLK` | `reminderBlock` | Boolean | **Reminder Block**. Indicates if this invoice should be excluded from reminder batches (`true` = Do Not Remind). |
| `ACREM_STAT` | `reminderStatus` | String | **Reminder Status**. The current dunning level/status code. |

---

## 2. TAX_MSG (Electronic VAT Return History)

**Source Table:** `TAX_MSG`
**Context:** History of VAT returns sent to tax authorities.
**Decision:** **Ignored**.

---

## 3. SYS_TREE (System Navigator Tree)

**Source Table:** `SYS_TREE`
**Context:** Configuration for the Windows Client navigation.
**Decision:** **Ignored**.

---

## 4. AUSR_APP (User Applications)

**Source Table:** `AUSR_APP`
**Context:** Registry of third-party apps.
**Decision:** **Ignored**.

---

## 5. AV_APP (System Applications)

**Source Table:** `AV_APP`
**Context:** Registry of system-wide applications.
**Decision:** **Ignored**.

---

## 6. FA_LINE (Fixed Assets History)

**Source Table:** `FA_LINE`
**Context:** Depreciation history for fixed assets.
**Decision:** **Ignored**.

---

## 7. L5_KENGT (Key Figures / Administratiemonitor)

**Source Table:** `L5_KENGT`
**Context:** Formulas for internal KPIs.
**Decision:** **Ignored**.

---

## 8. ANR_GRP (Number Groups)

**Source Table:** `ANR_GRP`
**Context:** Configuration for Number Series.
**Decision:** **Ignored**.

---

## 9. ADM_PRF (Administration Settings)

**Source Tables:** `ADM_PRF`, `ADM_PRF2`, `L5_ADMIN`
**Context:** Global configuration for the Company Identity and Financial Settings.
**Integration Target:** `Company` Entity

### Mapped Fields

| Source Column | Target Field (Company) | Description |
| :--- | :--- | :--- |
| `ADM_PRF.ACCT_NAME` | `name` | Company Name |
| `ADM_PRF2.COMP_ID` | `externalId` | **Unique Company ID** |
| `ADM_PRF.VAT_NR` | `vatNumber` | VAT Number |
| `L5_ADMIN.COC_CODE` | `cocNumber` | Chamber of Commerce (KvK) |
| `ADM_PRF2.ADM_EMAIL` | `email` | General Email |
| `ADM_PRF2.ACCT_DEB` | `defaultDebtorGlAccount` | Default AR G/L |
| `ADM_PRF2.ACCT_CRED` | `defaultCreditorGlAccount` | Default AP G/L |

---

## 10. ADM_LIST (Administration List)

**Source Table:** `ADM_LIST`
**Context:** Master registry of all available Administrations.
**Integration Target:** **High Potential**

---

## 11. ASC_PP (Contact Persons)

**Source Table:** `ASC_PP`
**Context:** Specific contact individuals within a Debtor/Creditor organization.
**Integration Target:** **High Potential** (Future `Contact` Entity)

### Relevance
*   **CRM**: Knowing *specifically* who to email improves payment speed.
*   **Display**: Show a "Contacts" dropdown in the dashboard.

---

## 12. USR_LINK (Documents / Koppelingen)

**Source Table:** `USR_LINK`
**Context:** Links database records to external files (PDFs) or contains Base64 file data.
**Integration Target:** **High Potential** (Future "View Invoice" Feature)

### Relevance
*   **Evidence**: Fetching the original PDF invoice.

---

## 13. PAY_COND (Payment Conditions)

**Source Table:** `PAY_COND`
**Context:** Master data for payment terms (e.g., "Net 30 days", "Auto Incasso").
**Integration Target:** **Critical**

### Relevance
*   **Segmentation**: Distinguishes **Direct Debit** vs **Manual Transfer** customers.
*   **Logic**: Critical for "Do Not Chase" logic on auto-collect customers.

---

## 14. OPEN_DC (Direct Debit Batches)

**Source Table:** `OPEN_DC`
**Context:** History of Direct Debit batches.
**Integration Target:** **High Potential**

### Relevance
*   **Bounce Detection**: Used to identify failed dunning attempts.

---

## 15. ADM_EML (Email Exclusions)

**Source Table:** `ADM_EML`
**Context:** List of entities excluded from email.
**Integration Target:** **Medium Potential**

### Relevance
*   **Compliance**: "Do Not Contact" list.

---

## 16. L5_IBAN (IBAN/BIC Registry)

**Source Table:** `L5_IBAN`
**Context:** Links legacy bank account numbers to IBAN and BIC codes.
**Integration Target:** **Medium/High Potential**

### Relevance
*   **Validation**: Essential for validating customer banking details for **Direct Debit** (Incasso) batches.
*   **Payment Routing**: Ensures payments are directed to/from the correct accounts.

---

## 17. L5_CODOI (Open Items Complete)

**Source Table:** `L5_CODOI`
**Context:** A consolidated view of *all* open items (both Debtors and Creditors).
**Integration Target:** **Alternative Source**

### Relevance
*   **Redundancy**: Provides a flattened view of the `OPENITEM` data, potentially easier to query for simple lists.
*   **Scope**: Contains both *Accounts Payable* (Te betalen) and *Accounts Receivable* (Te ontvangen). The dashboard primarily focuses on the Receivable part.

---

## 18. SOI_HDR / SOI_LINE (Sales Invoices / Verkoopfacturen)

**Source Tables:** `SOI_HDR` (Header), `SOI_LINE` (Lines)
**Context:** The historical record of generated sales invoices, including specific product lines.
**Integration Target:** **High Potential** (Invoice Details)

### Relevance
*   **Line Items**: unlike `OPENITEM` (which only shows the total debt), these tables allow showing exactly *what* was sold (e.g., "5 hours Consulting", "10 Widgets") on the dashboard.
*   **History**: Retains data even after the invoice is fully paid and archived from `OPENITEM`.

---

## 19. L5_DMS... (Scanbooks / Scanboeken)

**Source Tables:** `L5_DMSA`, `L5_DMSB`, `L5_DMSC`, `L5_DMSAD`
**Context:** Metadata for the scanning module. `L5_DMSAD` specifically links Administrations to Tax IDs and Dates.
**Integration Target:** **Medium Potential** (Backend for `USR_LINK`)

### Relevance
*   **Linkage**: Backend system for recognizing and creating invoices from scans.

---

## 20. ADM_USR / ADM_GRP (Users & Groups)
**Decision:** **Ignored**.

---

## 21. CHK_DESC / TRN_CHK (Cost Centers)
**Decision:** **Ignored**.

---

## 22. DEP_HDR / DEP_LINE (Depreciation)
**Decision:** **Ignored**.

---

## 23. AP_ASBL (Assemblies)
**Decision:** **Ignored**.
