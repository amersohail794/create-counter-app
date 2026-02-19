import { useState } from 'react'
import './App.css'
import SelectionScreen from './screens/SelectionScreen'
import CounterScreen from './screens/CounterScreen'
import ServingScreen from './screens/ServingScreen'
import TransferDialog from './components/transfer/TransferDialog'
import { MOCK_BRANCHES, MOCK_COUNTERS_SIMPLE, MOCK_NEXT_TICKET, MOCK_QUEUES } from './constants/mockData'
import type { Ticket, Screen } from './types'

const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>('selection');
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
    const [selectedCounter, setSelectedCounter] = useState<string | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
    const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
    const [showTransferDialog, setShowTransferDialog] = useState(false);

    // Resolve IDs to display names once — pass names (not IDs) to child components
    const branchName = MOCK_BRANCHES.find(b => b.id === Number(selectedBranch))?.name ?? null;
    const counterName = MOCK_COUNTERS_SIMPLE.find(c => c.id === Number(selectedCounter))?.name ?? null;

    const handleCallNext = () => {
        setCurrentTicket(MOCK_NEXT_TICKET);
        setScreen('serving');
    };

    const handleFinishService = () => {
        setCurrentTicket(null);
        setScreen('counter');
    };

    const handleApplySettings = () => {
        if (!selectedBranch || !selectedCounter || !selectedProfile) return;
        setScreen('counter');
    };

    const handleCancelSelection = () => {
        setSelectedBranch(null);
        setSelectedCounter(null);
        setSelectedProfile(null);
    };

    return (
        <>
            <TransferDialog
                show={showTransferDialog}
                currentTicket={currentTicket}
                queues={MOCK_QUEUES}
                onClose={() => setShowTransferDialog(false)}
            />

            {screen === 'selection' && (
                <SelectionScreen
                    selectedBranch={selectedBranch}
                    selectedCounter={selectedCounter}
                    selectedProfile={selectedProfile}
                    onBranchChange={setSelectedBranch}
                    onCounterChange={setSelectedCounter}
                    onProfileChange={setSelectedProfile}
                    onApply={handleApplySettings}
                    onCancel={handleCancelSelection}
                />
            )}

            {screen === 'counter' && (
                <CounterScreen
                    counterName={counterName}
                    branchName={branchName}
                    queues={MOCK_QUEUES}
                    onCallNext={handleCallNext}
                    onWalkIn={() => { /* TODO: implement walk-in flow */ }}
                    onCloseCounter={() => { /* TODO: implement close counter flow */ }}
                    onChangeSettings={() => setScreen('selection')}
                />
            )}

            {screen === 'serving' && currentTicket && (
                <ServingScreen
                    counterName={counterName}
                    branchName={branchName}
                    queues={MOCK_QUEUES}
                    currentTicket={currentTicket}
                    onFinishService={handleFinishService}
                    onCallNext={handleCallNext}
                    onTransfer={() => setShowTransferDialog(true)}
                    onChangeSettings={() => setScreen('selection')}
                />
            )}
        </>
    );
};

export default App
