import { ArrowRight, User, X } from 'lucide-react';
import type { Queue } from '../types';
import AppHeader from '../components/AppHeader';
import QueueSidebar from '../components/QueueSidebar';

const CounterScreen: React.FC<{
    counterName: string | null;
    branchName: string | null;
    queues: Queue[];
    onCallNext: () => void;
    onWalkIn: () => void;
    onCloseCounter: () => void;
    onChangeSettings: () => void;
}> = ({ counterName, branchName, queues, onCallNext, onWalkIn, onCloseCounter, onChangeSettings }) => (
    <div className="min-h-screen bg-gray-50">
        <AppHeader counterName={counterName} branchName={branchName} onChangeSettings={onChangeSettings} />
        <div className="flex h-[calc(100vh-73px)]">
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <div className="bg-white rounded-3xl shadow-lg p-12 mb-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
                            <User className="w-12 h-12 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Serve</h2>
                        <p className="text-gray-500 mb-8">Click the button below to call the next customer</p>
                        <button onClick={onCallNext}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-5 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <div className="flex items-center justify-center gap-3">
                                <span>Call Next Customer</span>
                                <ArrowRight className="w-6 h-6" />
                            </div>
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={onWalkIn} className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm border border-gray-200">
                            <div className="flex items-center justify-center gap-2"><User className="w-4 h-4" /><span>Walk In</span></div>
                        </button>
                        <button onClick={onCloseCounter} className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm border border-gray-200">
                            <div className="flex items-center justify-center gap-2"><X className="w-4 h-4" /><span>Close Counter</span></div>
                        </button>
                    </div>
                </div>
            </div>
            <QueueSidebar queues={queues} />
        </div>
    </div>
);

export default CounterScreen;
