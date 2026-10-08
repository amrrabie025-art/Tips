import React from 'react';
import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="w-full pt-2 pb-4 px-2 flex items-center justify-between relative">
      {/* Reset Button on the left */}
      <button
        type="button"
        onClick={onReset}
        title="إعادة تعيين / Reset"
        aria-label="Reset all fields"
        className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white active:text-emerald-400 active:scale-90 transition-all cursor-pointer rounded-full hover:bg-slate-800/60"
      >
        <RotateCcw className="w-6 h-6 stroke-[2.2]" />
      </button>

      {/* Centered App Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide text-center absolute left-1/2 -translate-x-1/2 select-none">
        Tips Calculator
      </h1>

      {/* Spacer to keep title centered */}
      <div className="w-10 h-10" />
    </header>
  );
};
