import React from 'react';

interface TheBillCardProps {
  billAmount: string;
  setBillAmount: (val: string) => void;
  totalAmount: string;
  setTotalAmount: (val: string) => void;
}

export const TheBillCard: React.FC<TheBillCardProps> = ({
  billAmount,
  setBillAmount,
  totalAmount,
  setTotalAmount,
}) => {
  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/[^0-9.]/g, '');
    const parts = clean.split('.');
    if (parts.length > 2) return;
    setBillAmount(clean);
  };

  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/[^0-9.]/g, '');
    const parts = clean.split('.');
    if (parts.length > 2) return;
    setTotalAmount(clean);
  };

  const bill = parseFloat(billAmount);
  const total = parseFloat(totalAmount);

  const hasInputs = !isNaN(bill) && !isNaN(total) && bill > 0 && total > 0;
  // Difference = Total - Bill (tips amount)
  // Tips after 14% = difference / 1.14
  const difference = hasInputs ? total - bill : 0;
  const resultAfter14 = hasInputs ? (difference / 1.14).toFixed(2) : null;

  return (
    <div className="bg-[#1C2738] rounded-3xl p-5 border border-slate-700/60 shadow-xl shadow-black/25">
      {/* Card Header */}
      <div className="flex justify-end mb-2">
        <h2 className="text-emerald-400 font-bold text-lg tracking-wide select-none">
          The bill
        </h2>
      </div>

      <div className="space-y-4">
        {/* The Bill Input */}
        <div>
          <label className="block text-right text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
            The bill
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={billAmount}
            onChange={handleBillChange}
            placeholder="أدخل الرقم"
            className="w-full bg-[#15202E] text-white text-base sm:text-lg font-bold rounded-2xl py-3 px-4 text-center border border-slate-700/70 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-500 font-mono"
          />
        </div>

        {/* Total Input */}
        <div>
          <label className="block text-right text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
            Total
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={totalAmount}
            onChange={handleTotalChange}
            placeholder="أدخل الرقم"
            className="w-full bg-[#15202E] text-white text-base sm:text-lg font-bold rounded-2xl py-3 px-4 text-center border border-slate-700/70 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-500 font-mono"
          />
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
