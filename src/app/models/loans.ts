export interface Loan {
    id: string;
    customerId: string;
    customerName: string;
    principalAmount: number;
    interestRate: number;
    totalPayable: number;
    repaymentPeriod: number;
    repaymentFrequency: 'Weekly' | 'Monthly' | 'Yearly';
    nextDueDate: string;
    amountPerInstallment: number;
    paidAmount: number;
    outstandingBalance: number;
    status: 'Active' | 'Paid' | 'Overdue';
  }