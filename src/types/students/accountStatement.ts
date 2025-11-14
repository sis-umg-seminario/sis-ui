export interface TransactionItem {
  transactionId: number;
  date: string;
  document: string;
  description: string;
  type: "CARGO" | "ABONO";
  amount: number;
  paid: boolean;
  paymentDate: string | null;
  paymentType: string | null;
  dueDate: string | null;
  daysOverdue: number;
}

export interface Totals {
  totalCharges: number;
  totalPayments: number;
  balance: number;
  statementDate: string;
}

// La estructura de la API
export interface AccountStatementResponse {
  studentId: number;
  Name: string; 
  program: string;
  currency: string;
  period: {
    year: number;
    academicTerm: number;
    title: string;
  };
  status: "SOLVENTE" | "PENDIENTE";
  items: TransactionItem[];
  totals: Totals;
}