import type { Customer, Ticket } from '@/types';

export const mockCustomers: Customer[] = [
  { id: 1, firstName: 'Ali',      lastName: 'Al Mansoori', email: 'ali.mansoori@email.com',  phone: '+971501234567', dob: '1985-03-14', cardNumber: 'C-10021' },
  { id: 2, firstName: 'Noura',    lastName: 'Al Hashimi',  email: 'noura.hashimi@email.com', phone: '+971509876543', dob: '1990-07-22', cardNumber: 'C-10045' },
  { id: 3, firstName: 'Khalid',   lastName: 'Al Rashidi',  email: 'khalid.rashidi@email.com',phone: '+971551122334', dob: '1978-11-05', cardNumber: 'C-10078' },
  { id: 4, firstName: 'Sara',     lastName: 'Al Zaabi',    email: 'sara.zaabi@email.com',    phone: '+971556677889', dob: '1995-01-30', cardNumber: 'C-10099' },
  { id: 5, firstName: 'Mohammed', lastName: 'Al Kindi',    email: 'm.kindi@email.com',        phone: '+971504455667', dob: '1982-09-18', cardNumber: 'C-10112' },
];

export const mockNextTicket: Ticket = {
  number:          'T502',
  service:         'Blood Bank',
  waitTime:        '00:22:51',
  transactionTime: '00:00:09',
};
