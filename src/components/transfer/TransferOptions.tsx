import { AlertCircle, ChevronRight, User } from 'lucide-react';

const TransferOptions: React.FC<{
    ticketNumber?: string;
    onSelectQueue: () => void;
    onSelectCounter: () => void;
    onSelectStaff: () => void;
    onCancel: () => void;
}> = ({ ticketNumber, onSelectQueue, onSelectCounter, onSelectStaff, onCancel }) => {
    const options = [
        { icon: <User className="w-6 h-6 text-blue-600" />, label: 'Transfer to Queue', description: 'Move to a different service queue', onClick: onSelectQueue },
        { icon: <AlertCircle className="w-6 h-6 text-blue-600" />, label: 'Transfer to Counter', description: 'Send to a specific service counter', onClick: onSelectCounter },
        { icon: <User className="w-6 h-6 text-blue-600" />, label: 'Transfer to Staff', description: 'Assign to a specific staff member', onClick: onSelectStaff },
    ];

    return (
        <>
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Transfer Customer</h2>
                <p className="text-sm text-gray-500 mt-1">Choose how you want to transfer {ticketNumber}</p>
            </div>
            <div className="p-6 space-y-3 flex-1">
                {options.map(({ icon, label, description, onClick }) => (
                    <button
                        key={label}
                        onClick={onClick}
                        className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                {icon}
                            </div>
                            <div className="text-left">
                                <div className="font-semibold text-gray-800">{label}</div>
                                <div className="text-sm text-gray-500">{description}</div>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </button>
                ))}
            </div>
            <div className="p-6 border-t border-gray-200">
                <button onClick={onCancel} className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium">
                    Cancel
                </button>
            </div>
        </>
    );
};

export default TransferOptions;
