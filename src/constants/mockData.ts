import type { Branch, Counter, CounterSimple, Profile, StaffMember, Ticket, Queue, Customer } from '../types';
// ─────────────────────────────────────────────────────────────────
// CONSTANTS & MOCK DATA
// ─────────────────────────────────────────────────────────────────

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const MOCK_BRANCHES: Branch[] = [
    { id: 1, name: 'Qmatic Dubai Hospital' },
    { id: 2, name: 'Qmatic Abu Dhabi Center' },
    { id: 3, name: 'Qmatic Sharjah Clinic' },
];

const MOCK_COUNTERS_SIMPLE: CounterSimple[] = [
    { id: 1, name: 'Counter 1' },
    { id: 2, name: 'Counter 2' },
    { id: 3, name: 'Counter 3' },
    { id: 4, name: 'Counter 4' },
];

const MOCK_PROFILES: Profile[] = [
    { id: 1, name: 'All Services' },
    { id: 2, name: 'VIP Customers' },
    { id: 3, name: 'Regular Customers' },
    { id: 4, name: 'Appointments Only' },
];

const MOCK_QUEUES: Queue[] = [
    { id: 1, name: 'Blood Bank', customers: 1, waitTime: 22 },
    { id: 2, name: 'Blood Bank - Appointment Queue', customers: 0, waitTime: 0 },
    { id: 3, name: 'Consultation', customers: 2, waitTime: 22 },
    { id: 4, name: 'Consultation - Appointment Queue', customers: 0, waitTime: 0 },
    { id: 5, name: 'Lab Tests', customers: 0, waitTime: 0 },
    { id: 6, name: 'Lab Tests - Appointment Queue', customers: 0, waitTime: 0 },
];

const MOCK_COUNTERS: Counter[] = [
    { id: 1, name: 'Counter 1', staff: 'Current', status: 'active' },
    { id: 2, name: 'Counter 2', staff: 'Sarah Ahmed', status: 'active' },
    { id: 3, name: 'Counter 3', staff: 'Mohammed Ali', status: 'active' },
    { id: 4, name: 'Counter 4', staff: 'Not Active', status: 'inactive' },
];

const MOCK_STAFF: StaffMember[] = [
    { id: 1, name: 'Ahmed Hassan', counter: 'Counter 1', status: 'current' },
    { id: 2, name: 'Sarah Ahmed', counter: 'Counter 2', status: 'active' },
    { id: 3, name: 'Mohammed Ali', counter: 'Counter 3', status: 'active' },
    { id: 4, name: 'Fatima Khan', counter: 'Counter 5', status: 'active' },
    { id: 5, name: 'Omar Ibrahim', counter: 'Counter 6', status: 'active' },
];

const MOCK_CUSTOMERS: Customer[] = [
    { id: 1, firstName: 'Ali', lastName: 'Al Mansoori', email: 'ali.mansoori@email.com', phone: '+971501234567', dob: '1985-03-14', cardNumber: 'C-10021' },
    { id: 2, firstName: 'Noura', lastName: 'Al Hashimi', email: 'noura.hashimi@email.com', phone: '+971509876543', dob: '1990-07-22', cardNumber: 'C-10045' },
    { id: 3, firstName: 'Khalid', lastName: 'Al Rashidi', email: 'khalid.rashidi@email.com', phone: '+971551122334', dob: '1978-11-05', cardNumber: 'C-10078' },
    { id: 4, firstName: 'Sara', lastName: 'Al Zaabi', email: 'sara.zaabi@email.com', phone: '+971556677889', dob: '1995-01-30', cardNumber: 'C-10099' },
    { id: 5, firstName: 'Mohammed', lastName: 'Al Kindi', email: 'm.kindi@email.com', phone: '+971504455667', dob: '1982-09-18', cardNumber: 'C-10112' },
];

/** Mock ticket returned when "Call Next" is triggered */
const MOCK_NEXT_TICKET: Ticket = {
    number: 'T502',
    service: 'Blood Bank',
    waitTime: '00:22:51',
    transactionTime: '00:00:09',
};

export { MONTHS, MOCK_BRANCHES, MOCK_COUNTERS_SIMPLE, MOCK_PROFILES, MOCK_QUEUES, MOCK_COUNTERS, MOCK_STAFF, MOCK_CUSTOMERS, MOCK_NEXT_TICKET };
