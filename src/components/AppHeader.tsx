
const AppHeader: React.FC<{
    counterName: string | null;
    branchName: string | null;
    onChangeSettings: () => void;
}> = ({ counterName, branchName, onChangeSettings }) => (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-blue-600">QMATIC</div>
                <div className="text-gray-400">|</div>
                <div className="text-gray-600 font-medium">{counterName ?? '—'}</div>
            </div>
            <div className="flex items-center gap-6">
                {branchName && <div className="text-sm text-gray-500">{branchName}</div>}
                <button
                    onClick={onChangeSettings}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    Change Settings
                </button>
            </div>
        </div>
    </header>
);

export default AppHeader;
