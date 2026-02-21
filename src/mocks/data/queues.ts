import type { Queue } from '@/types';

export const mockQueues: Queue[] = [
  { id: 1, name: 'Blood Bank',                        customers: 1, waitTime: 22 },
  { id: 2, name: 'Blood Bank - Appointment Queue',    customers: 0, waitTime: 0  },
  { id: 3, name: 'Consultation',                      customers: 2, waitTime: 22 },
  { id: 4, name: 'Consultation - Appointment Queue',  customers: 0, waitTime: 0  },
  { id: 5, name: 'Lab Tests',                         customers: 0, waitTime: 0  },
  { id: 6, name: 'Lab Tests - Appointment Queue',     customers: 0, waitTime: 0  },
];
