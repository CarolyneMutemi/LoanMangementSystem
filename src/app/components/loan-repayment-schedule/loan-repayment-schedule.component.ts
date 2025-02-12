// loan-repayment-schedule.component.ts
import { Component, OnInit } from '@angular/core';

interface RepaymentSchedule {
  installmentId: string;
  loanId: string;
  customerName: string;
  installmentNo: string;
  dueDate: Date;
  amountDue: number;
  paidAmount: number;
  remainingBalance: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

@Component({
  selector: 'app-loan-repayment-schedule',
  templateUrl: './loan-repayment-schedule.component.html',
  styleUrls: ['./loan-repayment-schedule.component.css']
})
export class LoanRepaymentScheduleComponent implements OnInit {
  repaymentSchedules: RepaymentSchedule[] = [];
  filteredSchedules: RepaymentSchedule[] = [];
  searchTerm: string = '';
  showFilters: boolean = false;
  statusFilters: { [key: string]: boolean } = {
    Paid: false,
    Pending: false,
    Overdue: false
  };

  constructor() {
    // Mock data - replace with actual API call
    this.repaymentSchedules = [
      {
        installmentId: 'INS001',
        loanId: 'LOAN001',
        customerName: 'John Doe',
        installmentNo: '1/12',
        dueDate: new Date('2024-03-15'),
        amountDue: 1000,
        paidAmount: 1000,
        remainingBalance: 0,
        status: 'Paid'
      },
      // Add more mock data as needed
    ];
    this.filteredSchedules = [...this.repaymentSchedules];
  }

  ngOnInit(): void {}

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  applyFilters(): void {
    let filtered = [...this.repaymentSchedules];

    // Apply search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(schedule => 
        schedule.customerName.toLowerCase().includes(searchLower) ||
        schedule.loanId.toLowerCase().includes(searchLower) ||
        schedule.installmentId.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filters
    const activeStatusFilters = Object.entries(this.statusFilters)
      .filter(([_, isActive]) => isActive)
      .map(([status]) => status);

    if (activeStatusFilters.length > 0) {
      filtered = filtered.filter(schedule => 
        activeStatusFilters.includes(schedule.status)
      );
    }

    this.filteredSchedules = filtered;
  }

  clearFilters(): void {
    this.searchTerm = '';
    Object.keys(this.statusFilters).forEach(key => {
      this.statusFilters[key] = false;
    });
    this.applyFilters();
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Paid': 'paid',
      'Pending': 'active',
      'Overdue': 'overdue'
    };
    return statusMap[status] || '';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}