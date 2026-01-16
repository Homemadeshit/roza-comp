# AccountView Data Sources & Integration Documentation

This document outlines the external data structures we have identified from the AccountView system and how they map to our Collections Dashboard.

## 1. OPENITEM (Open Items Extension)

**Source Table:** `OPENITEM` (or equivalent extension table)
**Context:** Enriches standard invoice data with payment and dunning details.
**Integration Target:** `Invoice` Entity

### Mapped Fields

| Source Column | Target Field (Invoice) | Type | Description |
| :--- | :--- | :--- | :--- |
| `AG_PAYREF` | `paymentReference` | String | **Payment Reference (Betalingskenmerk)**. Critical for matching bank payments. Example: `3000 0000 0002 4057`. |
| `AREM_BLK` | `reminderBlock` | Boolean | **Reminder Block**. Indicates if this invoice should be excluded from reminder batches (`true` = Do Not Remind). |
| `ACREM_STAT` | `reminderStatus` | String | **Reminder Status**. The current dunning level/status code. Example: `0`, `1`, `2`. |
| `OPENITEM_Id` | *(Internal Link)* | Integer | Foreign key linkage to the main Invoice/OpenItem table. |

### Relevance to Dashboard
*   **Payment Matching**: `paymentReference` is displayed on the Invoice Detail view to assist finance teams in reconciling payments.
*   **Dispute/Block Logic**: Invoices with `reminderBlock = true` are visually flagged (e.g., "Do Not Contact") and excluded from automated reminder workflows.
*   **Workflow Status**: `reminderStatus` provides visibility into the dunning lifecycle of an invoice directly on the dashboard.

---

## 2. TAX_MSG (Electronic VAT Return History)

**Source Table:** `TAX_MSG` (Electronic Return Message)
**Context:** Audit log of VAT returns (Omzetbelasting) sent to the Belastingdienst. **Not currently imported** into the Collections Dashboard as it relates to tax compliance, not collections.

### Available Data Structure

| Field | Description | Example |
| :--- | :--- | :--- |
| `REC_ID` | Record ID | `0000000001` |
| `ADM_CODE` | Administration/Company Code | `TOPSY2007` |
| `RET_DESC` | Period Description | `OB november 2007` |
| `SND_STAT` | Send Status | `2` (Failed), `3` (Sent) |
| `XML_MSG` | XML Payload | Contains turnover and VAT amounts. |
| `COMM_LOG` | Transmission Log | SMTP/Server connection logs. |

### Decision
*   **Status**: **Ignored** for now.
*   **Reasoning**: This data is for Tax Compliance monitoring. If a "CFO / Compliance" module is added later, this table will be the primary source.
