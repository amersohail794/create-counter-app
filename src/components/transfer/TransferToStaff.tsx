import type { StaffMember } from '../../types';

const TransferToStaff: React.FC<{
    staff: StaffMember[];
    onBack: () => void;
    onTransfer: () => void;
}> = ({ staff, onBack, onTransfer }) => (
    <>
        <div className="p-6 border-b border-gray-200">
            <button onClick={onBack} className="text-blue-600 hover:text-blue-700 mb-2 text-sm font-medium">← Back</button>
            <h2 className="text-xl font-bold text-gray-800">Transfer to Staff</h2>
            <p className="text-sm text-gray-500 mt-1">Select a staff member to transfer the customer</p>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
                {staff.map(member => {
                    const isCurrent = member.status === 'current';
                    const initials = member.name.split(' ').map(n => n[0]).join('');
                    return (
                        <button
                            key={member.id}
                            disabled={isCurrent}
                            onClick={onTransfer}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                                isCurrent ? 'bg-blue-50 border-blue-300 cursor-not-allowed' : 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${isCurrent ? 'bg-blue-500' : 'bg-gray-400'}`}>
                                    {initials}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-800">{member.name}</div>
                                    <div className="text-sm text-gray-500">{member.counter}</div>
                                </div>
                            </div>
                            {isCurrent && <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">You</span>}
                        </button>
                    );
                })}
            </div>
        </div>
        <div className="p-6 border-t border-gray-200">
            <button onClick={onBack} className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium">Cancel</button>
        </div>
    </>
);

export default TransferToStaff;
