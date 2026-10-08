import React from 'react';
import { RotateCcw } from 'lucide-react';
import logoImg from '../assets/images/tips_green_dollar_logo_1791468468299.jpg';

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

      {/* Centered App Logo & Title */}
      <div className="flex items-center gap-2.5 absolute left-1/2 -translate-x-1/2 select-none">
        <div className="w-8 h-8 rounded-xl bg-white p-0.5 shadow-sm border border-white/90 flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={logoImg}
            alt="Tips Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
          Tips
        </h1>
      </div>

      {/* Spacer to keep title centered */}
      <div className="w-10 h-10" />
    </header>
  );
};

