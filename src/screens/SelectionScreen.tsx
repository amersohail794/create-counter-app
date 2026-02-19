import { User } from 'lucide-react';
import {MOCK_BRANCHES, MOCK_COUNTERS_SIMPLE, MOCK_PROFILES} from "../constants/mockData.ts";

const SelectionScreen: React.FC<{
    selectedBranch: string | null;
    selectedCounter: string | null;
    selectedProfile: string | null;
    onBranchChange: (v: string) => void;
    onCounterChange: (v: string) => void;
    onProfileChange: (v: string) => void;
    onApply: () => void;
    onCancel: () => void;
}> = ({ selectedBranch, selectedCounter, selectedProfile, onBranchChange, onCounterChange, onProfileChange, onApply, onCancel }) => {
    const isReady = Boolean(selectedBranch && selectedCounter && selectedProfile);
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Select Your Profile Settings</h1>
                    <p className="text-gray-500 text-sm">Choose your working location and preferences</p>
                </div>
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                        <select value={selectedBranch || ''} onChange={(e) => onBranchChange(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                            <option value="">Select a branch</option>
                            {MOCK_BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Counter</label>
                        <select value={selectedCounter || ''} onChange={(e) => onCounterChange(e.target.value)} disabled={!selectedBranch}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed">
                            <option value="">Select a counter</option>
                            {MOCK_COUNTERS_SIMPLE.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Work Profile</label>
                        <select value={selectedProfile || ''} onChange={(e) => onProfileChange(e.target.value)} disabled={!selectedCounter}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed">
                            <option value="">Select a profile</option>
                            {MOCK_PROFILES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex gap-3 mt-8">
                    <button onClick={onCancel} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
                    <button onClick={onApply} disabled={!isReady}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed">
                        Apply Settings
                    </button>
                </div>
            </div>
        </div>
    );
};
export default SelectionScreen;
