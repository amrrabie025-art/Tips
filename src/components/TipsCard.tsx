import React from 'react';

interface TipsCardProps {
  tipsAmount: string;
  setTipsAmount: (val: string) => void;
}

export const TipsCard: React.FC<TipsCardProps> = ({ tipsAmount, setTipsAmount }) => {
  const presetsRow1 = ['200', '150', '100', '50'];
  const presetsRow2 = ['500', '400', '300', '250'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/[^0-9.]/g, '');
    const parts = clean.split('.');
    if (parts.length > 2) return;
    setTipsAmount(clean);
  };

  const numVal = parseFloat(tipsAmount);
  const resultAfter14 = !isNaN(numVal) && numVal > 0 ? (numVal / 1.14).toFixed(2) : null;

  return (
    <div className="bg-[#1C2738] rounded-3xl p-5 border border-slate-700/60 shadow-xl shadow-black/25">
      {/* Card Header */}
      <div className="flex justify-end mb-2">
        <h2 className="text-emerald-400 font-bold text-lg tracking-wide select-none">
          Tips
        </h2>
      </div>

      <div className="space-y-4">
        {/* Tips Input */}
        <div>
          <label className="block text-right text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
            Tips
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={tipsAmount}
            onChange={handleInputChange}
            placeholder="أدخل الرقم"
            className="w-full bg-[#15202E] text-white text-base sm:text-lg font-bold rounded-2xl py-3 px-4 text-center border border-slate-700/70 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-500 font-mono"
          />
        </div>

        {/* Preset Buttons Grid: 2 rows */}
        <div className="space-y-2.5">
          {/* Row 1: [200] [150] [100] [50] */}
          <div className="grid grid-cols-4 gap-2">
            {presetsRow1.map((val) => {
              const isSelected = tipsAmount === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTipsAmount(val)}
                  className={`py-3 px-1 text-sm font-bold rounded-xl transition-all cursor-pointer text-center active:scale-95 border ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-sm'
                      : 'bg-[#233144] text-white border-slate-700/40 hover:bg-[#2c3d54]'
                  }`}
                >
                  {val}
                </button>
              );
            })}
          </div>

          {/* Row 2: [500] [400] [300] [250] */}
          <div className="grid grid-cols-4 gap-2">
            {presetsRow2.map((val) => {
              const isSelected = tipsAmount === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTipsAmount(val)}
                  className={`py-3 px-1 text-sm font-bold rounded-xl transition-all cursor-pointer text-center active:scale-95 border ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-sm'
                      : 'bg-[#233144] text-white border-slate-700/40 hover:bg-[#2c3d54]'
                  }`}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tips after 14% */}
        <div>
          <label className="block text-right text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
            Tips after 14%
          </label>
          <div className="w-full bg-[#15202E] rounded-2xl py-3 px-4 text-center border border-slate-700/70 min-h-[50px] flex items-center justify-center font-mono select-all">
            {resultAfter14 !== null ? (
              <span className="text-emerald-400 font-bold text-lg tracking-wide">
                {resultAfter14}
              </span>
            ) : (
              <span className="text-slate-500 font-bold text-xl select-none">
                —
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
