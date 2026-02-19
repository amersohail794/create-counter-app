import { useState } from 'react';
import TransferOptions from './TransferOptions';
import TransferToQueue from './TransferToQueue';
import TransferToCounter from './TransferToCounter';
import TransferToStaff from './TransferToStaff';
import type { Queue, Ticket, TransferStep } from '../../types';
import { MOCK_COUNTERS, MOCK_STAFF } from '../../constants/mockData';


const TransferDialog: React.FC<{
    show: boolean;
    currentTicket: Ticket | null;
    queues: Queue[];
    onClose: () => void;
}> = ({ show, currentTicket, queues, onClose }) => {
    const [step, setStep] = useState<TransferStep>('options');

    if (!show) return null;

    // Using a unique key based on visibility ensures the component is reset
    // when the dialog is closed and reopened
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" key={`dialog-${currentTicket?.number || 'default'}`}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                {step === 'options' && (
                    <TransferOptions
                        ticketNumber={currentTicket?.number}
                        onSelectQueue={() => setStep('queue')}
                        onSelectCounter={() => setStep('counter')}
                        onSelectStaff={() => setStep('staff')}
                        onCancel={onClose}
                    />
                )}
                {step === 'queue' && (
                    <TransferToQueue queues={queues} onBack={() => setStep('options')} onTransfer={onClose} />
                )}
                {step === 'counter' && (
                    <TransferToCounter counters={MOCK_COUNTERS} onBack={() => setStep('options')} onTransfer={onClose} />
                )}
                {step === 'staff' && (
                    <TransferToStaff staff={MOCK_STAFF} onBack={() => setStep('options')} onTransfer={onClose} />
                )}
            </div>
        </div>
    );
};

export default TransferDialog;
