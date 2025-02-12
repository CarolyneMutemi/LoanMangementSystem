import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customers';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm = '';
  showFilterDropdown = false;
  showModal = false;
  showDeleteModal = false;
  editingCustomer: Customer | null = null;
  selectedCustomer: Customer | null = null;
  
  filters = {
    active: true,
    cleared: true
  };

  customerForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  ngOnInit() {
    // Sample data - replace with actual API call
    this.customers = [
      {
        id: 'C001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+254 712345678',
        totalLoans: 3,
        totalBorrowed: 50000,
        totalOutstanding: 15000,
        status: 'active'
      },
      // Add more sample customers
    ];
    this.applyFilters();
  }

  applyFilters() {
    this.filteredCustomers = this.customers.filter(customer => {
      const matchesSearch = 
        customer.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.phone.includes(this.searchTerm);

      const matchesStatus = 
        (customer.status === 'active' && this.filters.active) ||
        (customer.status === 'cleared' && this.filters.cleared);

      return matchesSearch && matchesStatus;
    });
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  openAddCustomerModal() {
    this.editingCustomer = null;
    this.customerForm = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
    this.showModal = true;
  }

  editCustomer(customer: Customer) {
    this.editingCustomer = customer;
    this.customerForm = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone
    };
    this.showModal = true;
  }

  confirmDelete(customer: Customer) {
    this.selectedCustomer = customer;
    this.showDeleteModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingCustomer = null;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedCustomer = null;
  }

  saveCustomer() {
    // Implement save logic
    this.closeModal();
  }

  deleteCustomer() {
    // Implement delete logic
    this.closeDeleteModal();
  }

  viewCustomer(customer: Customer) {
    // Implement view logic
  }
}
