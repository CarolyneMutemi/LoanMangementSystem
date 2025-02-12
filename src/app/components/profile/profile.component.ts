// profile.component.ts
import { Component, OnInit } from '@angular/core';

interface AdminProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'Super Admin' | 'Manager';
  dateJoined: Date;
  profilePicture?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: AdminProfile;
  showEditModal: boolean = false;
  showPasswordModal: boolean = false;
  editedProfile: Partial<AdminProfile> = {};
  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  selectedFile: File | null = null;

  constructor() {
    // Mock data - replace with actual API call
    this.profile = {
      id: 'ADM001',
      fullName: 'John Doe',
      email: 'admin@example.com',
      phone: '+1234567890',
      role: 'Super Admin',
      dateJoined: new Date('2024-01-10'),
      profilePicture: 'src/assets/default-profile.png'
    };
  }

  ngOnInit(): void {}

  openEditModal(): void {
    this.editedProfile = { ...this.profile };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editedProfile = {};
    this.selectedFile = null;
  }

  openPasswordModal(): void {
    this.showPasswordModal = true;
  }

  closePasswordModal(): void {
    this.showPasswordModal = false;
    this.passwordForm = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editedProfile.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile(): void {
    // Validate form
    if (!this.editedProfile.fullName || !this.editedProfile.email || !this.editedProfile.phone) {
      return;
    }

    // In real application, make API call here
    // Include file upload handling if selectedFile exists
    this.profile = { ...this.profile, ...this.editedProfile };
    this.closeEditModal();
  }

  changePassword(): void {
    // Validate password form
    if (!this.validatePasswordForm()) {
      return;
    }

    // In real application, make API call here
    console.log('Password changed');
    this.closePasswordModal();
  }

  validatePasswordForm(): boolean {
    return !!(
      this.passwordForm.currentPassword &&
      this.passwordForm.newPassword &&
      this.passwordForm.confirmPassword &&
      this.passwordForm.newPassword === this.passwordForm.confirmPassword &&
      this.passwordForm.newPassword.length >= 8
    );
  }
}