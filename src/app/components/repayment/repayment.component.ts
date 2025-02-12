// repayment.component.ts
import { Component, OnInit } from '@angular/core';

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Loan {
  id: string;
  reference: string;
  customer_id: string;
  total_amount: number;
  remaining_balance: number;
  customerName?: string; // Added to store customer name
}

interface Repayment {
  id: string;
  loan_id: string;
  customer_id: string;
  amount_paid: number;
  payment_date: Date;
  payment_method: 'Bank' | 'Mobile Money' | 'Cash';
  remaining_balance: number;
  customerName?: string;
  loanReference?: string;
}

@Component({
  selector: 'app-repayment',
  templateUrl: './repayment.component.html',
  styleUrls: ['./repayment.component.css']
})
export class RepaymentComponent implements OnInit {
  repayments: Repayment[] = [];
  filteredRepayments: Repayment[] = [];
  searchTerm: string = '';
  showAddModal: boolean = false;
  showFilters: boolean = false;
  selectedCustomer: Customer | null = null;
  selectedLoan: Loan | null = null;
  
  customerSearchTerm: string = '';
  loanSearchTerm: string = '';
  filteredCustomers: Customer[] = [];
  filteredLoans: Loan[] = [];
  showCustomerDropdown: boolean = false;
  showLoanDropdown: boolean = false;

  dateFilters = {
    startDate: '',
    endDate: ''
  };

  methodFilters: { [key: string]: boolean } = {
    'Bank': false,
    'Mobile Money': false,
    'Cash': false
  };

  newRepayment = {
    customer_id: '',
    loan_id: '',
    amount_paid: 0,
    payment_method: 'Bank' as const,
    payment_date: new Date().toISOString().split('T')[0]
  };

  // Enhanced mock data
  private customers: Customer[] = [
    { id: 'CUST001', name: 'John Doe', email: 'john@example.com' },
    { id: 'CUST002', name: 'Jane Smith', email: 'jane@example.com' },
    { id: 'CUST003', name: 'Bob Johnson', email: 'bob@example.com' }
  ];

  private loans: Loan[] = [
    { 
      id: 'LOAN001', 
      reference: 'L2024001', 
      customer_id: 'CUST001', 
      total_amount: 10000, 
      remaining_balance: 5000,
      customerName: 'John Doe'
    },
    { 
      id: 'LOAN002', 
      reference: 'L2024002', 
      customer_id: 'CUST001', 
      total_amount: 15000, 
      remaining_balance: 10000,
      customerName: 'John Doe'
    },
    { 
      id: 'LOAN003', 
      reference: 'L2024003', 
      customer_id: 'CUST002', 
      total_amount: 20000, 
      remaining_balance: 15000,
      customerName: 'Jane Smith'
    }
  ];

  constructor() {
    this.repayments = [
      {
        id: 'REP001',
        loan_id: 'LOAN001',
        customer_id: 'CUST001',
        amount_paid: 1000,
        payment_date: new Date('2024-02-01'),
        payment_method: 'Bank',
        remaining_balance: 5000,
        customerName: 'John Doe',
        loanReference: 'L2024001'
      }
    ];
    this.filteredRepayments = [...this.repayments];
  }

  ngOnInit(): void {}

  // Enhanced customer search methods
  searchCustomers(event: Event): void {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.customerSearchTerm = term;
    this.showCustomerDropdown = true;
    
    if (term) {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term)
      );
    } else {
      this.filteredCustomers = [...this.customers];
    }
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.newRepayment.customer_id = customer.id;
    this.customerSearchTerm = customer.name;
    this.showCustomerDropdown = false;
    
    // Update available loans for selected customer
    this.updateAvailableLoans();
  }

  // Enhanced loan search methods
  searchLoans(event: Event): void {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.loanSearchTerm = term;
    this.showLoanDropdown = true;

    // Search in all loans if no customer is selected
    if (!this.selectedCustomer) {
      this.filteredLoans = this.loans.filter(loan =>
        loan.reference.toLowerCase().includes(term) ||
        loan.id.toLowerCase().includes(term)
      );
    } else {
      // Search only in customer's loans
      this.filteredLoans = this.loans.filter(loan =>
        loan.customer_id === this.selectedCustomer?.id &&
        (loan.reference.toLowerCase().includes(term) ||
         loan.id.toLowerCase().includes(term))
      );
    }
  }

  selectLoan(loan: Loan): void {
    this.selectedLoan = loan;
    this.newRepayment.loan_id = loan.id;
    this.loanSearchTerm = loan.reference;
    this.showLoanDropdown = false;

    // Auto-select customer if not already selected
    if (!this.selectedCustomer) {
      const customer = this.customers.find(c => c.id === loan.customer_id);
      if (customer) {
        this.selectCustomer(customer);
      }
    }
  }

  private updateAvailableLoans(): void {
    if (this.selectedCustomer) {
      this.filteredLoans = this.loans.filter(loan =>
        loan.customer_id === this.selectedCustomer?.id
      );
    } else {
      this.filteredLoans = [...this.loans];
    }
  }

  // Close dropdowns when clicking outside
  closeDropdowns(): void {
    setTimeout(() => {
      this.showCustomerDropdown = false;
      this.showLoanDropdown = false;
    }, 200); // Small delay to allow for selection
  }

  resetForm(): void {
    this.newRepayment = {
      customer_id: '',
      loan_id: '',
      amount_paid: 0,
      payment_method: 'Bank',
      payment_date: new Date().toISOString().split('T')[0]
    };
    this.selectedCustomer = null;
    this.selectedLoan = null;
    this.customerSearchTerm = '';
    this.loanSearchTerm = '';
  }

  // Keep other existing methods...

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.resetForm();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  applyFilters(): void {
    let filtered = [...this.repayments];

    // Apply search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(repayment => 
        repayment.customerName?.toLowerCase().includes(searchLower) ||
        repayment.loanReference?.toLowerCase().includes(searchLower) ||
        repayment.id.toLowerCase().includes(searchLower)
      );
    }

    // Apply date filters
    if (this.dateFilters.startDate) {
      filtered = filtered.filter(repayment => 
        repayment.payment_date >= new Date(this.dateFilters.startDate)
      );
    }
    if (this.dateFilters.endDate) {
      filtered = filtered.filter(repayment => 
        repayment.payment_date <= new Date(this.dateFilters.endDate)
      );
    }

    // Apply payment method filters
    const activeMethodFilters = Object.entries(this.methodFilters)
      .filter(([_, isActive]) => isActive)
      .map(([method]) => method);

    if (activeMethodFilters.length > 0) {
      filtered = filtered.filter(repayment => 
        activeMethodFilters.includes(repayment.payment_method)
      );
    }

    this.filteredRepayments = filtered;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.dateFilters = {
      startDate: '',
      endDate: ''
    };
    Object.keys(this.methodFilters).forEach(key => {
      this.methodFilters[key] = false;
    });
    this.applyFilters();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  addRepayment(): void {
    if (!this.validateForm()) {
      return;
    }

    // In real application, make API call here
    const newRepayment: Repayment = {
      id: `REP${String(this.repayments.length + 1).padStart(3, '0')}`,
      loan_id: this.newRepayment.loan_id,
      customer_id: this.newRepayment.customer_id,
      amount_paid: this.newRepayment.amount_paid,
      payment_date: new Date(this.newRepayment.payment_date),
      payment_method: this.newRepayment.payment_method,
      remaining_balance: 0, // This would be calculated by the backend
      customerName: this.selectedCustomer?.name,
      loanReference: this.selectedLoan?.reference
    };

    this.repayments.unshift(newRepayment);
    this.applyFilters();
    this.closeAddModal();
  }

  validateForm(): boolean {
    return !!(
      this.newRepayment.customer_id &&
      this.newRepayment.loan_id &&
      this.newRepayment.amount_paid > 0 &&
      this.newRepayment.payment_date &&
      this.newRepayment.payment_method
    );
  }
}