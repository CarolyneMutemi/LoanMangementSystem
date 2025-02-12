import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepaymentScheduleComponent } from './loan-repayment-schedule.component';

describe('LoanRepaymentScheduleComponent', () => {
  let component: LoanRepaymentScheduleComponent;
  let fixture: ComponentFixture<LoanRepaymentScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanRepaymentScheduleComponent]
    });
    fixture = TestBed.createComponent(LoanRepaymentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
