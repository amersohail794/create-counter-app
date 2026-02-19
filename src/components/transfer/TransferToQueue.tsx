import { ChevronsLeft, ChevronsRight, Calendar, Clock, Search, User } from 'lucide-react';
import type { Queue } from '../../types';
import { useState } from 'react';

const TransferToQueue: React.FC<{
    queues: Queue[];
    onBack: () => void;
    onTransfer: () => void;
}> = ({ queues, onBack, onTransfer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filtered = queues.filter(q => q.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <div className="p-6 border-b border-gray-200">
                <button onClick={onBack} className="text-blue-600 hover:text-blue-700 mb-2 text-sm font-medium">← Back</button>
                <h2 className="text-xl font-bold text-gray-800">Transfer to Queue</h2>
                <p className="text-sm text-gray-500 mt-1">Select a queue and transfer position</p>
            </div>
            <div className="p-6 border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search queues..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                    {filtered.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">No queues found matching "{searchTerm}"</div>
                    ) : (
                        filtered.map(queue => (
                            <div key={queue.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800 mb-1">{queue.name}</h4>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1"><User className="w-4 h-4" />{queue.customers} waiting</span>
                                            {queue.waitTime > 0 && (
                                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{queue.waitTime} min</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <button onClick={onTransfer} title="Transfer to Front" className="p-2 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors group">
                                            <ChevronsLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                                        </button>
                                        <button onClick={onTransfer} title="Transfer to Back" className="p-2 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors group">
                                            <ChevronsRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                                        </button>
                                        <button onClick={onTransfer} title="Transfer by Visit Time" className="p-2 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors group">
                                            <Calendar className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="p-6 border-t border-gray-200">
                <button onClick={onBack} className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium">Cancel</button>
            </div>
        </>
    );
};

export default TransferToQueue;
