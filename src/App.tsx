/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { TipsCard } from './components/TipsCard.tsx';
import { OtherCurrencyCard } from './components/OtherCurrencyCard.tsx';
import { TheBillCard } from './components/TheBillCard.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  // Card 1 state: Tips
  const [tipsAmount, setTipsAmount] = useState<string>('');

  // Card 2 state: Other currency
  const [otherCurrencyAmount, setOtherCurrencyAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<string>('');

  // Card 3 state: The bill
  const [billAmount, setBillAmount] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<string>('');

  // Reset all fields (called by header reload button)
  const handleReset = () => {
    setTipsAmount('');
    setOtherCurrencyAmount('');
    setExchangeRate('');
    setBillAmount('');
    setTotalAmount('');
  };

  // Dismiss keyboard when tapping on empty areas
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName !== 'INPUT' &&
      target.tagName !== 'BUTTON' &&
      target.tagName !== 'A'
    ) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="min-h-screen bg-[#111A26] text-slate-100 flex justify-center py-2 sm:py-6 px-3 sm:px-4 selection:bg-emerald-500 selection:text-white"
    >
      {/* Mobile-proportioned container matching screenshots */}
      <main className="w-full max-w-[430px] flex flex-col min-h-screen sm:min-h-0 space-y-4">
        {/* Top Header */}
        <Header onReset={handleReset} />

        {/* 1. Tips Card */}
        <TipsCard
          tipsAmount={tipsAmount}
          setTipsAmount={setTipsAmount}
        />

        {/* 2. Other Currency Card */}
        <OtherCurrencyCard
          otherCurrencyAmount={otherCurrencyAmount}
          setOtherCurrencyAmount={setOtherCurrencyAmount}
          exchangeRate={exchangeRate}
          setExchangeRate={setExchangeRate}
        />

        {/* 3. The Bill Card */}
        <TheBillCard
          billAmount={billAmount}
          setBillAmount={setBillAmount}
          totalAmount={totalAmount}
          setTotalAmount={setTotalAmount}
        />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
