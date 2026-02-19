import { User } from 'lucide-react';
import type { Counter } from '../../types';

const TransferToCounter: React.FC<{
    counters: Counter[];
    onBack: () => void;
    onTransfer: () => void;
}> = ({ counters, onBack, onTransfer }) => (
    <>
        <div className="p-6 border-b border-gray-200">
            <button onClick={onBack} className="text-blue-600 hover:text-blue-700 mb-2 text-sm font-medium">← Back</button>
            <h2 className="text-xl font-bold text-gray-800">Transfer to Counter</h2>
            <p className="text-sm text-gray-500 mt-1">Select an active counter to transfer the customer</p>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 gap-4">
                {counters.map(counter => {
                    const isCurrent = counter.staff === 'Current';
                    const isInactive = counter.status === 'inactive';
                    return (
                        <button
                            key={counter.id}
                            disabled={isInactive || isCurrent}
                            onClick={onTransfer}
                            className={`p-5 rounded-xl border-2 transition-all text-left ${
                                isCurrent ? 'bg-blue-50 border-blue-300 cursor-not-allowed'
                                    : isInactive ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                                        : 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="text-lg font-bold text-gray-800">{counter.name}</div>
                                {isCurrent && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">Current</span>}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User className="w-4 h-4" />
                                <span>{counter.staff}</span>
                            </div>
                            {isInactive && <div className="mt-2 text-xs text-gray-500">Not Active</div>}
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

export default TransferToCounter;
