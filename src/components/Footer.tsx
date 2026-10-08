import React from 'react';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full pt-4 pb-6 mt-2 text-center border-t border-slate-800/80">
      <div className="flex flex-col items-center justify-center gap-1.5">
        <p className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide">
          Created by <span className="text-white font-bold">Amr Rabie</span>
        </p>
        <a
          href="mailto:amr.rabie025@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors py-1 px-3 rounded-full bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 hover:border-emerald-500/40"
        >
          <Mail className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono dir-ltr select-all">amr.rabie025@gmail.com</span>
        </a>
      </div>
    </footer>
  );
};
