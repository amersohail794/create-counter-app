import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { apiClient } from '@/services/apiClient';
import type { Branch, CounterSimple, Profile } from '@/types';

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

    const [branches, setBranches]   = useState<Branch[]>([]);
    const [counters, setCounters]   = useState<CounterSimple[]>([]);
    const [profiles, setProfiles]   = useState<Profile[]>([]);

    const [loadingBranches, setLoadingBranches] = useState(false);
    const [loadingCounters, setLoadingCounters] = useState(false);
    const [loadingProfiles, setLoadingProfiles] = useState(false);

    const [errorBranches, setErrorBranches] = useState<string | null>(null);
    const [errorCounters, setErrorCounters] = useState<string | null>(null);
    const [errorProfiles, setErrorProfiles] = useState<string | null>(null);

    // ── 1. Load branches on mount ──────────────────────────────────
    useEffect(() => {
        setLoadingBranches(true);
        setErrorBranches(null);
        apiClient.get<Branch[]>('/api/branches').then(({ data, error }) => {
            if (error) setErrorBranches(error);
            else setBranches(data ?? []);
        }).finally(() => setLoadingBranches(false));
    }, []);

    // ── 2. Load counters when branch is selected ───────────────────
    useEffect(() => {
        if (!selectedBranch) {
            setCounters([]);
            return;
        }
        setLoadingCounters(true);
        setErrorCounters(null);
        // Reset downstream selections when branch changes
        onCounterChange('');
        onProfileChange('');
        apiClient.get<CounterSimple[]>(`/api/branches/${selectedBranch}/counters`).then(({ data, error }) => {
            if (error) setErrorCounters(error);
            else setCounters(data ?? []);
        }).finally(() => setLoadingCounters(false));
    }, [selectedBranch]);

    // ── 3. Load profiles when counter is selected ──────────────────
    useEffect(() => {
        if (!selectedCounter) {
            setProfiles([]);
            return;
        }
        setLoadingProfiles(true);
        setErrorProfiles(null);
        // Reset downstream selection when counter changes
        onProfileChange('');
        apiClient.get<Profile[]>(`/api/branches/${selectedBranch}/counters/${selectedCounter}/profiles`).then(({ data, error }) => {
            if (error) setErrorProfiles(error);
            else setProfiles(data ?? []);
        }).finally(() => setLoadingProfiles(false));
    }, [selectedCounter]);

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

                    {/* Branch */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                        <select
                            value={selectedBranch || ''}
                            onChange={(e) => onBranchChange(e.target.value)}
                            disabled={loadingBranches}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">
                                {loadingBranches ? 'Loading branches…' : 'Select a branch'}
                            </option>
                            {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                        {errorBranches && (
                            <p className="mt-1 text-xs text-red-500">Failed to load branches: {errorBranches}</p>
                        )}
                    </div>

                    {/* Counter — disabled until branch selected */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Counter</label>
                        <select
                            value={selectedCounter || ''}
                            onChange={(e) => onCounterChange(e.target.value)}
                            disabled={!selectedBranch || loadingCounters}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">
                                {loadingCounters ? 'Loading counters…' : 'Select a counter'}
                            </option>
                            {counters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        {errorCounters && (
                            <p className="mt-1 text-xs text-red-500">Failed to load counters: {errorCounters}</p>
                        )}
                    </div>

                    {/* Profile — disabled until counter selected */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Work Profile</label>
                        <select
                            value={selectedProfile || ''}
                            onChange={(e) => onProfileChange(e.target.value)}
                            disabled={!selectedCounter || loadingProfiles}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">
                                {loadingProfiles ? 'Loading profiles…' : 'Select a profile'}
                            </option>
                            {profiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                        {errorProfiles && (
                            <p className="mt-1 text-xs text-red-500">Failed to load profiles: {errorProfiles}</p>
                        )}
                    </div>

                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onApply}
                        disabled={!isReady}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Apply Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectionScreen;
