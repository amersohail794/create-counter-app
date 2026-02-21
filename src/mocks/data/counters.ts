import type { Counter, CounterSimple, Profile } from '@/types';

export const mockCountersSimple: CounterSimple[] = [
  { id: 1, name: 'Counter 1' },
  { id: 2, name: 'Counter 2' },
  { id: 3, name: 'Counter 3' },
  { id: 4, name: 'Counter 4' },
];

export const mockCounters: Counter[] = [
  { id: 1, name: 'Counter 1', staff: 'Current',      status: 'active'   },
  { id: 2, name: 'Counter 2', staff: 'Sarah Ahmed',  status: 'active'   },
  { id: 3, name: 'Counter 3', staff: 'Mohammed Ali', status: 'active'   },
  { id: 4, name: 'Counter 4', staff: 'Not Active',   status: 'inactive' },
];

export const mockProfiles: Profile[] = [
  { id: 1, name: 'All Services'        },
  { id: 2, name: 'VIP Customers'       },
  { id: 3, name: 'Regular Customers'   },
  { id: 4, name: 'Appointments Only'   },
];
