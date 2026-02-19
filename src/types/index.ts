// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

interface Ticket {
    number: string;
    service: string;
    waitTime: string;
    transactionTime: string;
}

interface Queue {
    id: number;
    name: string;
    customers: number;
    waitTime: number;
}

interface Branch {
    id: number;
    name: string;
}

interface Counter {
    id: number;
    name: string;
    staff: string;
    status: 'active' | 'inactive';
}

interface CounterSimple {
    id: number;
    name: string;
}

interface Profile {
    id: number;
    name: string;
}

interface StaffMember {
    id: number;
    name: string;
    counter: string;
    status: 'current' | 'active';
}

interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    cardNumber: string;
}

interface LinkedCustomer {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dobYear: string;
    dobMonth: string;
    dobDay: string;
    cardNumber: string;
}

type Screen = 'selection' | 'counter' | 'serving';
type TransferStep = 'options' | 'queue' | 'counter' | 'staff';

export type { Ticket, Queue, Branch, Counter, CounterSimple, Profile, StaffMember, Customer, LinkedCustomer, Screen, TransferStep };
