import React from 'react';
import { Scale, ArrowUpDown } from 'lucide-react';

interface DifferenceTaxSectionProps {
  firstBill: string;
  setFirstBill: (val: string) => void;
  secondBill: string;
  setSecondBill: (val: string) => void;
  currency: string;
}

export const DifferenceTaxSection: React.FC<DifferenceTaxSectionProps> = ({
  firstBill,
  setFirstBill,
  secondBill,
  setSecondBill,
  currency,
}) => {
  const bill1 = parseFloat(firstBill) || 0;
  const bill2 = parseFloat(secondBill) || 0;

  // Real-time calculation:
  // Difference = First Bill - Second Bill
  const difference = bill1 - bill2;
  // Tips after 14% = Difference / 1.14
  const tipsAfter14 = difference / 1.14;

  const formatMoney = (val: number) => {
    return isNaN(val) ? '0.00' : val.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleFirstBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    const parts = val.split('.');
    if (parts.length > 2) return;
    setFirstBill(val);
  };

  const handleSecondBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    const parts = val.split('.');
    if (parts.length > 2) return;
    setSecondBill(val);
  };

  const swapBills = () => {
    const temp = firstBill;
    setFirstBill(secondBill);
    setSecondBill(temp);
  };

  return (
    <section className="bg-[#1E293B] rounded-3xl p-5 border border-slate-700/60 shadow-xl shadow-slate-950/20 transition-all">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-700/50 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Scale className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">
              حاسبة الفروقات وضريبة الـ 14%
            </h2>
            <p className="text-xs text-slate-400">
              حساب الفرق بين بيلين واستخراج صافي البقشيش
            </p>
          </div>
        </div>

        {(firstBill || secondBill) && (
          <button
            type="button"
            onClick={swapBills}
            title="تبديل القيمتين"
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-emerald-400 hover:bg-slate-750 border border-slate-700 active:scale-95 transition-all text-xs flex items-center gap-1 cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">تبديل</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* First Bill Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            البيل الأول (First Bill)
          </label>
          <div className="relative flex items-center">
            <span className="absolute right-3.5 text-sm font-bold text-emerald-400 select-none">
              {currency}
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={firstBill}
              onChange={handleFirstBillChange}
              placeholder="0.00"
              className="w-full bg-slate-900/90 text-white text-lg font-bold rounded-2xl pr-12 pl-4 py-3 border border-slate-700/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-600 font-mono tabular-nums text-left dir-ltr"
            />
            {firstBill && (
              <button
                type="button"
                onClick={() => setFirstBill('')}
                className="absolute left-3 text-slate-500 hover:text-slate-300 text-xs px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Second Bill Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            البيل الثاني (Second Bill)
          </label>
          <div className="relative flex items-center">
            <span className="absolute right-3.5 text-sm font-bold text-emerald-400 select-none">
              {currency}
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={secondBill}
              onChange={handleSecondBillChange}
              placeholder="0.00"
              className="w-full bg-slate-900/90 text-white text-lg font-bold rounded-2xl pr-12 pl-4 py-3 border border-slate-700/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-600 font-mono tabular-nums text-left dir-ltr"
            />
            {secondBill && (
              <button
                type="button"
                onClick={() => setSecondBill('')}
                className="absolute left-3 text-slate-500 hover:text-slate-300 text-xs px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Real-time Results Card */}
        <div className="mt-4 pt-4 border-t border-slate-700/60 space-y-3">
          {/* Difference (الفرق بينهما) */}
          <div className="flex items-center justify-between text-xs sm:text-sm p-3 rounded-2xl bg-slate-900/60 border border-slate-700/50">
            <div>
              <span className="text-slate-300 font-bold block">
                الفرق بينهما (Difference)
              </span>
              <span className="text-[11px] text-slate-400 font-sans">
                البيل الأول - البيل الثاني
              </span>
            </div>
            <div className="text-left dir-ltr">
              <span
                className={`font-mono font-bold text-base sm:text-lg tabular-nums ${
                  difference < 0 ? 'text-amber-400' : 'text-slate-100'
                }`}
              >
                {formatMoney(difference)}
              </span>
              <span className="ml-1 text-xs text-slate-400">
                {currency}
              </span>
            </div>
          </div>

          {/* Tips after 14% (معروض باللون الأخضر البارز) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-slate-900 border border-emerald-500/40 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-300 block">
                  Tips after 14%
                </span>
                <span className="text-[11px] text-emerald-400/80 font-medium">
                  الفرق مقسوماً على 1.14 (صافي البقشيش)
                </span>
              </div>
              <div className="text-left dir-ltr">
                <span className="text-2xl sm:text-3xl font-black text-[#10B981] font-mono tabular-nums drop-shadow-sm">
                  {formatMoney(tipsAfter14)}
                </span>
                <span className="ml-1 text-xs font-bold text-emerald-400">
                  {currency}
                </span>
              </div>
            </div>

            <p className="text-[10px] sm:text-[11px] text-slate-400/90 pt-2 border-t border-emerald-500/20 flex items-center justify-between">
              <span>الصيغة: Difference ÷ 1.14</span>
              <span>خصم ضريبة القيمة المضافة 14%</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
