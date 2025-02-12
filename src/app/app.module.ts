import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomersComponent } from './components/customers/customers.component';
import { LoanComponent } from './components/loan/loan.component';
import { LoanRepaymentScheduleComponent } from './components/loan-repayment-schedule/loan-repayment-schedule.component';
import { AdminManagementComponent } from './components/admin-management/admin-management.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RepaymentComponent } from './components/repayment/repayment.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    CustomersComponent,
    LoanComponent,
    LoanRepaymentScheduleComponent,
    AdminManagementComponent,
    ProfileComponent,
    LoginComponent,
    RepaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
