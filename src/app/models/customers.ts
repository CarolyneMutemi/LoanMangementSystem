export interface Customer{
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    totalLoans: number,
    totalBorrowed: number,
    totalOutstanding: number,
    status: string
  }

export interface CustomerSearch{
  id: string,
  name: string
}
