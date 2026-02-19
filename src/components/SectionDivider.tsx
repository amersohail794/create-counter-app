
const SectionDivider: React.FC<{ label: string }> = ({ label }) => (
    <div className="relative">
        <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
      <span className="bg-white px-3 text-xs font-semibold text-gray-400 tracking-widest uppercase">
        {label}
      </span>
        </div>
    </div>
);

export default SectionDivider;
