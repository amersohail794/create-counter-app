import type { Queue } from '../types';
import { Clock, User } from 'lucide-react';

const QueueSidebar: React.FC<{ queues: Queue[] }> = ({ queues }) => (
    <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">My Queues</h3>
                <p className="text-sm text-gray-500">Active queues for your profile</p>
            </div>
            <div className="space-y-3">
                {queues.map(queue => (
                    <div key={queue.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-800 text-sm">{queue.name}</h4>
                            {queue.customers > 0 && queue.waitTime > 0 && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                  <Clock className="w-3 h-3" />
                                    {queue.waitTime} min
                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{queue.customers} customer{queue.customers !== 1 ? 's' : ''} waiting</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default QueueSidebar;
