import React, { useEffect, useReducer } from 'react';
import {
     ChevronRight,Search,
    CreditCard, UserCheck,
} from 'lucide-react';
import type { Customer, LinkedCustomer } from '../types';
import {MONTHS, MOCK_CUSTOMERS} from "../constants/mockData.ts";
import SectionDivider from './SectionDivider';

interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dobYear: string;
    dobMonth: string;
    dobDay: string;
    cardNumber: string;
    searchTerm: string;
    touchedFirstName: boolean;
    touchedLastName: boolean;
}

type FormAction =
    | { type: 'SET_FIELD'; field: keyof Omit<FormState, 'touchedFirstName' | 'touchedLastName'>; value: string }
    | { type: 'TOUCH'; field: 'firstName' | 'lastName' }
    | { type: 'RESET'; payload?: LinkedCustomer };

const EMPTY_FORM: FormState = {
    firstName: '', lastName: '', email: '', phone: '',
    dobYear: '', dobMonth: '', dobDay: '', cardNumber: '',
    searchTerm: '', touchedFirstName: false, touchedLastName: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case 'SET_FIELD': return { ...state, [action.field]: action.value };
        case 'TOUCH':
            return action.field === 'firstName'
                ? { ...state, touchedFirstName: true }
                : { ...state, touchedLastName: true };
        case 'RESET':
            if (!action.payload) return { ...EMPTY_FORM };
            return {
                ...EMPTY_FORM,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                phone: action.payload.phone,
                dobYear: action.payload.dobYear,
                dobMonth: action.payload.dobMonth,
                dobDay: action.payload.dobDay,
                cardNumber: action.payload.cardNumber,
            };
        default: return state;
    }
}

const CustomerDialog: React.FC<{
    show: boolean;
    initialData: LinkedCustomer | null;
    onClose: () => void;
    onCustomerLinked: (customer: LinkedCustomer) => void;
}> = ({ show, initialData, onClose, onCustomerLinked }) => {
    const [form, dispatch] = useReducer(formReducer, EMPTY_FORM);

    useEffect(() => {
        if (show) dispatch({ type: 'RESET', payload: initialData ?? undefined });
    }, [show, initialData]);

    if (!show) return null;

    const filteredCustomers = form.searchTerm.trim().length > 0
        ? MOCK_CUSTOMERS.filter(c => {
            const q = form.searchTerm.toLowerCase();
            return `${c.firstName} ${c.lastName}`.toLowerCase().includes(q)
                || c.email.toLowerCase().includes(q)
                || c.phone.includes(q);
        })
        : [];

    const canSave = form.firstName.trim().length > 0 && form.lastName.trim().length > 0;

    const handleSelectExisting = (customer: Customer) => {
        const [dobYear, dobMonth, dobDay] = customer.dob.split('-');
        onCustomerLinked({
            firstName: customer.firstName, lastName: customer.lastName,
            email: customer.email, phone: customer.phone,
            dobYear: dobYear ?? '', dobMonth: dobMonth ?? '', dobDay: dobDay ?? '',
            cardNumber: customer.cardNumber,
        });
        onClose();
    };

    const handleSaveNew = () => {
        if (!canSave) {
            dispatch({ type: 'TOUCH', field: 'firstName' });
            dispatch({ type: 'TOUCH', field: 'lastName' });
            return;
        }
        onCustomerLinked({
            firstName: form.firstName.trim(), lastName: form.lastName.trim(),
            email: form.email.trim(), phone: form.phone.trim(),
            dobYear: form.dobYear.trim(), dobMonth: form.dobMonth, dobDay: form.dobDay.trim(),
            cardNumber: form.cardNumber.trim(),
        });
        onClose();
    };

    const field = (name: keyof Omit<FormState, 'touchedFirstName' | 'touchedLastName'>) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
            dispatch({ type: 'SET_FIELD', field: name, value: e.target.value });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200 flex items-center gap-3">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Close dialog">
                        <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">{initialData ? 'Edit Customer' : 'Add Customer'}</h2>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {/* Link Existing */}
                    <div className="px-6 pt-6">
                        <SectionDivider label="Link Existing Customer" />
                        <div className="mt-4 relative">
                            <input
                                type="text"
                                placeholder="Search by name, email or phone number"
                                value={form.searchTerm}
                                onChange={field('searchTerm')}
                                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 pointer-events-none" />
                        </div>
                        {filteredCustomers.length > 0 && (
                            <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden">
                                {filteredCustomers.map((customer, idx) => (
                                    <button
                                        key={customer.id}
                                        onClick={() => handleSelectExisting(customer)}
                                        className={`w-full flex items-center gap-4 px-4 py-3 hover:bg-blue-50 transition-colors text-left ${idx !== 0 ? 'border-t border-gray-100' : ''}`}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">
                                            {customer.firstName[0]}{customer.lastName[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-gray-800 text-sm">{customer.firstName} {customer.lastName}</div>
                                            <div className="text-xs text-gray-500 truncate">{customer.email} · {customer.phone}</div>
                                        </div>
                                        <UserCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                    </button>
                                ))}
                            </div>
                        )}
                        {form.searchTerm.trim().length > 0 && filteredCustomers.length === 0 && (
                            <div className="mt-2 py-4 text-center text-sm text-gray-400">No customers found for "{form.searchTerm}"</div>
                        )}
                    </div>

                    {/* Add New */}
                    <div className="px-6 pt-6 pb-6">
                        <SectionDivider label="Or Add New Customer" />
                        <div className="mt-6 space-y-4">
                            {/* First & Last Name */}
                            <div className="grid grid-cols-2 gap-4">
                                {(['firstName', 'lastName'] as const).map((fieldName) => {
                                    const label = fieldName === 'firstName' ? 'First name' : 'Last name';
                                    const isTouched = fieldName === 'firstName' ? form.touchedFirstName : form.touchedLastName;
                                    const value = form[fieldName];
                                    const hasError = isTouched && !value.trim();
                                    return (
                                        <div key={fieldName}>
                                            <div className="flex items-center justify-between mb-1">
                                                <label className="text-sm text-gray-700">{label}</label>
                                                <span className="text-xs text-blue-500">required</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={field(fieldName)}
                                                onBlur={() => dispatch({ type: 'TOUCH', field: fieldName })}
                                                className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                    hasError ? 'border-red-400 bg-red-50' : 'border-gray-300'
                                                }`}
                                            />
                                            {hasError && <p className="mt-1 text-xs text-red-500">{label} is required</p>}
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Email */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Email address</label>
                                <input type="email" value={form.email} onChange={field('email')}
                                       className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                            {/* Phone */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Phone number</label>
                                <input type="tel" value={form.phone} onChange={field('phone')}
                                       className="w-1/2 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                            {/* Date of Birth */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">Date of birth</label>
                                <div className="flex items-end gap-3">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Year (YYYY)</div>
                                        <input type="text" placeholder="YYYY" maxLength={4} value={form.dobYear}
                                               onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'dobYear', value: e.target.value.replace(/\D/g, '') })}
                                               className="w-20 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Month</div>
                                        <div className="relative">
                                            <select value={form.dobMonth} onChange={field('dobMonth')}
                                                    className="appearance-none pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                                                <option value="">Month</option>
                                                {MONTHS.map((m, i) => (
                                                    <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                                                ))}
                                            </select>
                                            <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Day (DD)</div>
                                        <input type="text" placeholder="DD" maxLength={2} value={form.dobDay}
                                               onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'dobDay', value: e.target.value.replace(/\D/g, '') })}
                                               className="w-16 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center" />
                                    </div>
                                </div>
                            </div>
                            {/* Card Number */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Card number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="text" value={form.cardNumber} onChange={field('cardNumber')}
                                           className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSaveNew} disabled={!canSave}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                                canSave ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}>
                        {initialData ? 'Save Changes' : 'Save & Add'}
                    </button>
                </div>
            </div>
        </div>
    );
};
 export default CustomerDialog;
