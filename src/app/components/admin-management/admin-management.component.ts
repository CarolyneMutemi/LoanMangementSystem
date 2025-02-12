// admin-management.component.ts
import { Component, OnInit } from '@angular/core';

interface Admin {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'Super Admin' | 'Manager';
}

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css']
})
export class AdminManagementComponent implements OnInit {
  admins: Admin[] = [];
  filteredAdmins: Admin[] = [];
  searchTerm: string = '';
  showAddModal: boolean = false;
  showDeleteModal: boolean = false;
  selectedAdmin: Admin | null = null;

  // Form fields
  newAdmin = {
    fullName: '',
    email: '',
    phone: '',
    role: 'Manager' as const
  };

  constructor() {
    // Mock data - replace with actual API call
    this.admins = [
      {
        id: 'ADM001',
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        role: 'Super Admin'
      },
      {
        id: 'ADM002',
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+0987654321',
        role: 'Manager'
      }
    ];
    this.filteredAdmins = [...this.admins];
  }

  ngOnInit(): void {}

  filterAdmins(): void {
    if (!this.searchTerm) {
      this.filteredAdmins = [...this.admins];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredAdmins = this.admins.filter(admin =>
      admin.fullName.toLowerCase().includes(searchLower) ||
      admin.email.toLowerCase().includes(searchLower) ||
      admin.id.toLowerCase().includes(searchLower)
    );
  }

  openAddModal(): void {
    this.showAddModal = true;
    this.resetForm();
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newAdmin = {
      fullName: '',
      email: '',
      phone: '',
      role: 'Manager'
    };
  }

  addAdmin(): void {
    // Add validation here
    if (!this.validateForm()) {
      return;
    }

    // In real application, make API call here
    const newAdmin: Admin = {
      id: `ADM${String(this.admins.length + 1).padStart(3, '0')}`,
      ...this.newAdmin
    };

    this.admins.push(newAdmin);
    this.filterAdmins();
    this.closeAddModal();
  }

  validateForm(): boolean {
    return !!(this.newAdmin.fullName && 
              this.newAdmin.email && 
              this.newAdmin.phone && 
              this.newAdmin.role);
  }

  openDeleteModal(admin: Admin): void {
    this.selectedAdmin = admin;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedAdmin = null;
  }

  deleteAdmin(): void {
    if (!this.selectedAdmin) return;

    // In real application, make API call here
    this.admins = this.admins.filter(admin => admin.id !== this.selectedAdmin?.id);
    this.filterAdmins();
    this.closeDeleteModal();
  }

  editAdmin(admin: Admin): void {
    // Implement edit functionality
    console.log('Edit admin:', admin);
  }
}