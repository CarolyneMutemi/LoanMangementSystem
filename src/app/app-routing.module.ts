import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoanComponent } from './components/loan/loan.component';
import { LoanRepaymentScheduleComponent } from './components/loan-repayment-schedule/loan-repayment-schedule.component';
import { AdminManagementComponent } from './components/admin-management/admin-management.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RepaymentComponent } from './components/repayment/repayment.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: 'customers', component: CustomersComponent},
  {path: 'loans', component: LoanComponent},
  {path: 'repayments-schedule', component: LoanRepaymentScheduleComponent},
  {path: 'repayments', component: RepaymentComponent},
  {path: 'admins', component: AdminManagementComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
