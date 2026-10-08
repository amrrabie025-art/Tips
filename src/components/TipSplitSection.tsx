import React from 'react';
import { DollarSign, Users, Minus, Plus } from 'lucide-react';

interface TipSplitSectionProps {
  billAmount: string;
  setBillAmount: (val: string) => void;
  tipPercent: string;
  setTipPercent: (val: string) => void;
  splitCount: number;
  setSplitCount: (fn: (prev: number) => number) => void;
  currency: string;
}

const PRESET_TIPS = [10, 12, 14, 15, 20];

export const TipSplitSection: React.FC<TipSplitSectionProps> = ({
  billAmount,
  setBillAmount,
  tipPercent,
  setTipPercent,
  splitCount,
  setSplitCount,
  currency,
}) => {
  // Calculations
  const billNum = parseFloat(billAmount) || 0;
  const tipPercentNum = parseFloat(tipPercent) || 0;

  const tipAmount = (billNum * tipPercentNum) / 100;
  const totalAmount = billNum + tipAmount;
  const perPersonAmount = splitCount >= 2 ? totalAmount / splitCount : totalAmount;
  const perPersonTip = splitCount >= 2 ? tipAmount / splitCount : tipAmount;

  const formatMoney = (val: number) => {
    return isNaN(val) ? '0.00' : val.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    // prevent multiple dots
    const parts = val.split('.');
    if (parts.length > 2) return;
    setBillAmount(val);
  };

  const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    const parts = val.split('.');
    if (parts.length > 2) return;
    setTipPercent(val);
  };

  const currentTipValue = parseFloat(tipPercent);

  return (
    <section className="bg-[#1E293B] rounded-3xl p-5 border border-slate-700/60 shadow-xl shadow-slate-950/20 transition-all">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-700/50 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">
              حاسبة البقشيش والتقسيم
            </h2>
            <p className="text-xs text-slate-400">
              حساب إجمالي البقشيش وتقسيم الفاتورة
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Bill Amount Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            مبلغ الفاتورة (Bill Amount)
          </label>
          <div className="relative flex items-center">
            <span className="absolute right-3.5 text-sm font-bold text-emerald-400 select-none">
              {currency}
            </span>
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*"
              value={billAmount}
              onChange={handleBillChange}
              placeholder="0.00"
              className="w-full bg-slate-900/90 text-white text-lg font-bold rounded-2xl pr-12 pl-4 py-3 border border-slate-700/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-600 font-mono tabular-nums text-left dir-ltr"
            />
            {billAmount && (
              <button
                type="button"
                onClick={() => setBillAmount('')}
                className="absolute left-3 text-slate-500 hover:text-slate-300 text-xs px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tip % Input & Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300">
              نسبة البقشيش (Tip %)
            </label>
            <span className="text-xs text-slate-400 font-mono">
              {tipPercent ? `${tipPercent}%` : '0%'}
            </span>
          </div>

          <div className="relative flex items-center mb-2.5">
            <span className="absolute right-3.5 text-sm font-bold text-emerald-400 select-none">
              %
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={tipPercent}
              onChange={handleTipChange}
              placeholder="12"
              className="w-full bg-slate-900/90 text-white text-lg font-bold rounded-2xl pr-10 pl-4 py-3 border border-slate-700/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-600 font-mono tabular-nums text-left dir-ltr"
            />
          </div>

          {/* Quick Presets: [10%, 12%, 14%, 15%, 20%] */}
          <div className="grid grid-cols-5 gap-1.5">
            {PRESET_TIPS.map((preset) => {
              const isActive = currentTipValue === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTipPercent(preset.toString())}
                  className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer text-center active:scale-95 border ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/25 font-extrabold'
                      : 'bg-slate-900/60 text-slate-300 hover:text-white border-slate-700/70 hover:bg-slate-900'
                  }`}
                >
                  {preset}%
                </button>
              );
            })}
          </div>
        </div>

        {/* Split Counter */}
        <div className="bg-slate-900/60 rounded-2xl p-3 border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">تقسيم الفاتورة</p>
              <p className="text-[11px] text-slate-400">
                {splitCount === 1 ? 'فرد واحد فقط' : `${splitCount} أفراد`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={splitCount <= 1}
              onClick={() => setSplitCount((prev) => Math.max(1, prev - 1))}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all cursor-pointer ${
                splitCount <= 1
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-800'
                  : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 active:scale-90'
              }`}
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-8 text-center font-bold text-base text-emerald-400 font-mono tabular-nums">
              {splitCount}
            </span>

            <button
              type="button"
              onClick={() => setSplitCount((prev) => prev + 1)}
              className="w-9 h-9 rounded-xl bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 flex items-center justify-center font-bold text-sm active:scale-90 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Real-time Results Card */}
        <div className="mt-4 pt-4 border-t border-slate-700/60 space-y-3">
          {/* Tip Amount */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-400 font-medium">إجمالي مبلغ البقشيش:</span>
            <span className="font-bold text-slate-200 font-mono tabular-nums text-sm">
              {formatMoney(tipAmount)} <span className="text-xs text-slate-400 font-normal">{currency}</span>
            </span>
          </div>

          {/* Total Amount (Featured Large Emerald Text) */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-slate-900 border border-emerald-500/30 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-semibold text-emerald-300 block">
                المبلغ الإجمالي الكلي
              </span>
              <span className="text-[11px] text-slate-400">
                الفاتورة + إجمالي البقشيش
              </span>
            </div>
            <div className="text-left dir-ltr">
              <span className="text-2xl sm:text-3xl font-black text-[#10B981] font-mono tabular-nums drop-shadow-sm">
                {formatMoney(totalAmount)}
              </span>
              <span className="ml-1 text-xs font-bold text-emerald-400">
                {currency}
              </span>
            </div>
          </div>

          {/* Per Person Share (Only shown if splitCount >= 2 as specified!) */}
          {splitCount >= 2 && (
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/70 space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  نصيب كل فرد ({splitCount} أفراد):
                </span>
                <div className="text-left dir-ltr">
                  <span className="text-lg sm:text-xl font-bold text-white font-mono tabular-nums">
                    {formatMoney(perPersonAmount)}
                  </span>
                  <span className="ml-1 text-xs text-slate-400">
                    {currency}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                <span>(نصيب الفرد من البقشيش):</span>
                <span className="font-mono text-slate-300">
                  {formatMoney(perPersonTip)} {currency}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
