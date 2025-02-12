import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/app/models/loans';
import { CustomerSearch } from 'src/app/models/customers';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  loans: Loan[] = [];
  filteredLoans: Loan[] = [];
  customers: CustomerSearch[] = [];
  filteredCustomers: CustomerSearch[] = [];
  
  searchTerm = '';
  customerSearch = '';
  showFilterDropdown = false;
  showLoanModal = false;
  showDeleteModal = false;
  showCustomerDropdown = false;
  
  editingLoan: Loan | null = null;
  selectedLoan: Loan | null = null;
  selectedCustomer: CustomerSearch | null = null;

  filters: { [key: string]: boolean } = {
    "active": true,
    "paid": true,
    "overdue": true
  };

  loanForm = {
    principalAmount: 0,
    interestRate: 0,
    repaymentPeriod: 0,
    repaymentFrequency: 'Monthly' as 'Monthly' | 'Weekly' | 'Yearly'
  };

  ngOnInit() {
    // Sample data - replace with actual API calls
    this.loadInitialData();
  }

  loadInitialData() {
    // Load customers and loans from API
    // This is sample data
    this.customers = [
      { id: 'CUST-001', name: 'John Doe' },
      { id: 'CUST-002', name: 'Jane Smith' }
    ];

    this.loans = [
      {
        id: 'LOAN-001',
        customerId: 'CUST-001',
        customerName: 'John Doe',
        principalAmount: 10000,
        interestRate: 10,
        totalPayable: 11000,
        repaymentPeriod: 12,
        repaymentFrequency: 'Monthly',
        nextDueDate: '2025-03-15',
        amountPerInstallment: 916.67,
        paidAmount: 5500,
        outstandingBalance: 5500,
        status: 'Active'
      }
    ];

    this.applyFilters();
  }

  applyFilters() {
    this.filteredLoans = this.loans.filter(loan => {
      const matchesSearch = 
        loan.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        loan.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        loan.customerId.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.filters[loan.status.toLowerCase() as keyof typeof this.filters];

      return matchesSearch && matchesStatus;
    });
  }

  searchCustomers() {
    if (this.customerSearch.length < 2) {
      this.showCustomerDropdown = false;
      return;
    }

    this.filteredCustomers = this.customers.filter(customer => 
      customer.name.toLowerCase().includes(this.customerSearch.toLowerCase()) ||
      customer.id.toLowerCase().includes(this.customerSearch.toLowerCase())
    );

    this.showCustomerDropdown = this.filteredCustomers.length > 0;
  }

  selectCustomer(customer: CustomerSearch) {
    this.selectedCustomer = customer;
    this.customerSearch = customer.name;
    this.showCustomerDropdown = false;
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  openAddLoanModal() {
    this.showLoanModal = true;
    this.editingLoan = null;
    this.selectedCustomer = null;
    this.loanForm = {
      principalAmount: 0,
      interestRate: 0,
      repaymentPeriod: 0,
      repaymentFrequency: 'Monthly'
    };
  }

  editLoan(loan: Loan) {
    this.showLoanModal = true;
    this.editingLoan = loan;
    this.selectedCustomer = this.customers.find(customer => customer.id === loan.customerId) || null;
    this.loanForm = {
      principalAmount: loan.principalAmount,
      interestRate: loan.interestRate,
      repaymentPeriod: loan.repaymentPeriod,
      repaymentFrequency: loan.repaymentFrequency
    };
  }

  viewLoan(loan: Loan) {
    this.selectedLoan = loan;
  }

  confirmDelete(loan: Loan) {
    this.selectedLoan = loan;
    this.showDeleteModal = true;
  }

  saveLoan() {
    if (this.editingLoan) {
      // Update loan
      this.loans = this.loans.map(loan => 
        loan.id === this.editingLoan!.id ? { ...loan, ...this.editingLoan, ...this.loanForm } : loan
      );
    } else {
      // Add new loan
      const totalPayable = this.loanForm.principalAmount + (this.loanForm.principalAmount * this.loanForm.interestRate / 100);
      this.loans.push({
        id: `LOAN-${this.loans.length + 1}`,
        customerId: this.selectedCustomer!.id,
        customerName: this.selectedCustomer!.name,
        status: 'Active',
        ...this.loanForm,
        totalPayable: totalPayable,
        nextDueDate: '2025-03-15',
        amountPerInstallment: totalPayable / this.loanForm.repaymentPeriod,
        paidAmount: 0,
        outstandingBalance: totalPayable
      });
    }

    this.applyFilters();
    this.closeLoanModal();
  }

  closeLoanModal() {
    this.showLoanModal = false;
    this.editingLoan = null;
    this.selectedCustomer = null;
    this.loanForm = {
      principalAmount: 0,
      interestRate: 0,
      repaymentPeriod: 0,
      repaymentFrequency: 'Monthly'
    };
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  deleteLoan() {
    if (this.selectedLoan) {
      this.loans = this.loans.filter(loan => loan.id !== this.selectedLoan!.id);
      this.applyFilters();
      this.closeDeleteModal();
    }
  }

  // ... Additional methods (openAddLoanModal, editLoan, etc.) to be implemented
}

