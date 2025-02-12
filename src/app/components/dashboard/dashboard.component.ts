import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalLoans = 0;
  activeCustomers = 0;
  totalDisbursed = 0;
  repaymentRate = 0;

  ngOnInit() {
    // Initialize charts
    this.initLoanChart();
    this.initPieChart();
    // Fetch dashboard data from your service
  }

  initLoanChart() {
    const ctx = document.getElementById("loanChart") as HTMLCanvasElement;
    console.log(ctx);
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Loans Disbursed',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: '#6B46C1',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Loans Disbursed Over Time',
              color: '#CBD5E0'
            },
            legend: {
              labels: {
                color: '#CBD5E0'
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: '#4A5568'
              },
              ticks: {
                color: '#CBD5E0'
              }
            },
            y: {
              grid: {
                color: '#4A5568'
              },
              ticks: {
                color: '#CBD5E0'
              }
            }
          }
        }
      });
    }
  }

  initPieChart() {
    const ctx = document.getElementById("pieChart") as HTMLCanvasElement;
    console.log(ctx);
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Paid', 'Unpaid'],
          datasets: [{
            data: [70, 30],
            backgroundColor: ['#6B46C1', '#E9D8FD']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Loan Payment Status',
              color: '#CBD5E0'
            },
            legend: {
              labels: {
                color: '#CBD5E0'
              }
            }
          }
        }
      });
    }
  }
}
