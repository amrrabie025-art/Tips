import React from 'react';

interface OtherCurrencyCardProps {
  otherCurrencyAmount: string;
  setOtherCurrencyAmount: (val: string) => void;
  exchangeRate: string;
  setExchangeRate: (val: string) => void;
}

export const OtherCurrencyCard: React.FC<OtherCurrencyCardProps> = ({
  otherCurrencyAmount,
  setOtherCurrencyAmount,
  exchangeRate,
  setExchangeRate,
}) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/[^0-9.]/g, '');
    const parts = clean.split('.');
    if (parts.length > 2) return;
    setOtherCurrencyAmount(clean);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/[^0-9.]/g, '');
    const parts = clean.split('.');
    if (parts.length > 2) return;
    setExchangeRate(clean);
  };

  const amount = parseFloat(otherCurrencyAmount);
  const rate = parseFloat(exchangeRate);

  const hasValidInputs = !isNaN(amount) && amount > 0 && !isNaN(rate) && rate > 0;
  const egpResult = hasValidInputs ? (amount * rate).toFixed(2) : null;
  const egpAfter14Result = hasValidInputs ? ((amount * rate) / 1.14).toFixed(2) : null;

  const presets = ['1', '5', '10', '15', '20'];

  return (
    <div className="bg-[#1C2738] rounded-3xl p-5 border border-slate-700/60 shadow-xl shadow-black/25">
      {/* Card Header */}
      <div className="flex justify-end mb-2">
        <h2 className="text-emerald-400 font-bold text-lg tracking-wide select-none">
          Other currency
        </h2>
      </div>

      <div className="space-y-4">
        {/* Other Currency Input */}
        <div>
          <label className="block text-right text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
            Other currency
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={otherCurrencyAmount}
            onChange={handleAmountChange}
            placeholder="أدخل الرقم"
            className="w-full bg-[#15202E] text-white text-base sm:text-lg font-bold rounded-2xl py-3 px-4 text-center border border-slate-700/70 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-500 font-mono mb-2.5"
          />

          {/* Shortcut Preset Buttons: 1, 5, 10, 15, 20 */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {presets.map((val) => {
              const isSelected = otherCurrencyAmount === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setOtherCurrencyAmount(val)}
                  className={`py-2.5 sm:py-3 px-1 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer text-center active:scale-95 border ${
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

        {/* Exchange Rate Input */}
        <div>
          <label className="block text-right text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
            Exchange rate
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={exchangeRate}
            onChange={handleRateChange}
            placeholder="سعر الصرف"
            className="w-full bg-[#15202E] text-white text-base sm:text-lg font-bold rounded-2xl py-3 px-4 text-center border-2 border-emerald-500/80 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none transition-all placeholder:text-slate-500 font-mono shadow-sm shadow-emerald-500/10"
          />
        </div>

        {/* EGP Result */}
        <div>
          <label className="block text-right text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
            EGP
          </label>
          <div className="w-full bg-[#15202E] rounded-2xl py-3 px-4 text-center border border-slate-700/70 min-h-[50px] flex items-center justify-center font-mono select-all">
            {egpResult !== null ? (
              <span className="text-white font-bold text-lg tracking-wide">
                {egpResult}
              </span>
            ) : (
              <span className="text-slate-500 font-bold text-xl select-none">
                —
              </span>
            )}
          </div>
        </div>

        {/* EGP after 14% */}
        <div>
          <label className="block text-right text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
            EGP after 14%
          </label>
          <div className="w-full bg-[#15202E] rounded-2xl py-3 px-4 text-center border border-slate-700/70 min-h-[50px] flex items-center justify-center font-mono select-all">
            {egpAfter14Result !== null ? (
              <span className="text-emerald-400 font-bold text-lg tracking-wide">
                {egpAfter14Result}
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
