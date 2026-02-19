import { AlertCircle, ArrowRight, Check, Clock, RefreshCw, Send, User, UserCheck, UserPlus, X, Pause } from 'lucide-react';
import type { Queue, Ticket, LinkedCustomer } from '../types';
import AppHeader from '../components/AppHeader';
import CustomerDialog from '../components/CustomerDialog';
import QueueSidebar from '../components/QueueSidebar';
import { useState } from 'react';

const ServingScreen: React.FC<{
    counterName: string | null;
    branchName: string | null;
    queues: Queue[];
    currentTicket: Ticket;
    onFinishService: () => void;
    onCallNext: () => void;
    onTransfer: () => void;
    onChangeSettings: () => void;
}> = ({ counterName, branchName, queues, currentTicket, onFinishService, onCallNext, onTransfer, onChangeSettings }) => {
    const [showCustomerDialog, setShowCustomerDialog] = useState(false);
    const [linkedCustomer, setLinkedCustomer] = useState<LinkedCustomer | null>(null);

    const handleFinish = () => {
        setLinkedCustomer(null);
        onFinishService();
    };

    const noop = () => {};

    interface ActionButton { icon: React.ReactNode; label: string; onClick: () => void; disabled?: boolean }
    const actionButtons: ActionButton[] = [
        { icon: <RefreshCw className="w-5 h-5 text-blue-600" />, label: 'Recall',   onClick: noop, disabled: true },
        { icon: <RefreshCw className="w-5 h-5 text-blue-600" />, label: 'Recycle',  onClick: noop, disabled: true },
        { icon: <ArrowRight className="w-5 h-5 text-blue-600" />, label: 'Transfer', onClick: onTransfer },
        { icon: <Pause       className="w-5 h-5 text-blue-600" />, label: 'Park',    onClick: noop, disabled: true },
        { icon: <Send        className="w-5 h-5 text-blue-600" />, label: 'Send SMS', onClick: noop, disabled: true },
        { icon: <X           className="w-5 h-5 text-blue-600" />, label: 'No Show', onClick: noop, disabled: true },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <CustomerDialog
                show={showCustomerDialog}
                initialData={linkedCustomer}
                onClose={() => setShowCustomerDialog(false)}
                onCustomerLinked={(c) => setLinkedCustomer(c)}
            />
            <AppHeader counterName={counterName} branchName={branchName} onChangeSettings={onChangeSettings} />
            <div className="flex h-[calc(100vh-73px)]">
                <div className="flex-1 p-8">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                            {/* Ticket header */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="text-5xl font-bold text-gray-800 mb-2">{currentTicket.number}</div>
                                    <div className="text-lg text-gray-600 font-medium">{currentTicket.service}</div>
                                </div>
                                <button
                                    onClick={() => setShowCustomerDialog(true)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                                        linkedCustomer ? 'bg-green-50 hover:bg-green-100 border border-green-200' : 'hover:bg-gray-100'
                                    }`}
                                    title={linkedCustomer ? 'Change customer' : 'Link customer'}
                                >
                                    {linkedCustomer ? (
                                        <><UserCheck className="w-5 h-5 text-green-600" /><span className="text-sm font-medium text-green-700">{linkedCustomer.firstName} {linkedCustomer.lastName}</span></>
                                    ) : (
                                        <UserPlus className="w-6 h-6 text-blue-600" />
                                    )}
                                </button>
                            </div>
                            {/* Timing */}
                            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-5 h-5" />
                                    <div><div className="text-xs text-gray-500">Waiting Time</div><div className="font-semibold">{currentTicket.waitTime}</div></div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <AlertCircle className="w-5 h-5" />
                                    <div><div className="text-xs text-gray-500">Transaction Time</div><div className="font-semibold">{currentTicket.transactionTime}</div></div>
                                </div>
                            </div>
                            {/* Additional Info */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Additional Info</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Custom 1', 'Custom 2', 'Custom 3', 'Custom 4'].map(label => (
                                        <div key={label}><div className="text-xs text-gray-500 mb-1">{label}</div><div className="text-sm font-medium text-gray-800">—</div></div>
                                    ))}
                                </div>
                            </div>
                            {/* Notes */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Add Notes</label>
                                <textarea rows={3} placeholder="Enter any notes for this customer..."
                                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                            </div>
                            {/* Action Buttons */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {actionButtons.map(({ icon, label, onClick, disabled }) => (
                                    <button key={label} onClick={onClick} disabled={disabled}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                                                disabled ? 'bg-gray-50 opacity-50 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-100'
                                            }`}>
                                        {icon}
                                        <span className="text-sm font-medium text-blue-600">{label}</span>
                                    </button>
                                ))}
                            </div>
                            {/* Finish Service */}
                            <button onClick={handleFinish}
                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg">
                                <div className="flex items-center justify-center gap-3"><Check className="w-6 h-6" /><span>Finish Service</span></div>
                            </button>
                        </div>
                        {/* Secondary Actions */}
                        <div className="flex gap-4">
                            <button onClick={noop} disabled className="flex-1 bg-white text-gray-400 px-6 py-3 rounded-lg font-medium shadow-sm border border-gray-200 cursor-not-allowed opacity-60">
                                <div className="flex items-center justify-center gap-2"><User className="w-4 h-4" /><span>Walk In</span></div>
                            </button>
                            <button onClick={onCallNext} className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm border border-gray-200">
                                <div className="flex items-center justify-center gap-2"><ArrowRight className="w-4 h-4" /><span>Call Next</span></div>
                            </button>
                            <button onClick={noop} disabled className="flex-1 bg-white text-gray-400 px-6 py-3 rounded-lg font-medium shadow-sm border border-gray-200 cursor-not-allowed opacity-60">
                                <div className="flex items-center justify-center gap-2"><X className="w-4 h-4" /><span>Close Counter</span></div>
                            </button>
                        </div>
                    </div>
                </div>
                <QueueSidebar queues={queues} />
            </div>
        </div>
    );
};

export default ServingScreen;
