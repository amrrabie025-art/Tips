import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X } from 'lucide-react';

export const InstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // If already running as an installed standalone app, or dismissed
  if (isInstalled || dismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // General instructions fallback
      setShowIOSModal(true);
    }
  };

  return (
    <>
      {/* Prominent Mobile App Install Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-800 to-slate-800/90 border border-emerald-500/40 rounded-2xl p-3 shadow-lg flex items-center justify-between gap-2.5 animate-fadeIn">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">
              تثبيت كـ Mobile App على الهاتف
            </p>
            <p className="text-[11px] text-slate-300 truncate">
              يعمل كتطبيق مستقل بشاشة كاملة وبدون متصفح
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleInstallClick}
            className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 text-xs font-extrabold py-1.5 px-3 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>تثبيت</span>
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="إغلاق"
            className="p-1 text-slate-400 hover:text-slate-200 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Guided Install Modal for iOS & Browsers */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700 p-5 shadow-2xl text-right">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white">
                تثبيت تطبيق Tips على شاشة هاتفك
              </h3>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 py-1">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <p className="font-bold text-emerald-400 mb-1">
                  📱 لمستخدمي أندرويد (Google Chrome):
                </p>
                <p>
                  اضغط على خيارات المتصفح (⋮) في الأعلى ➔ ثم اختر{' '}
                  <strong className="text-white">"تثبيت التطبيق"</strong> أو{' '}
                  <strong className="text-white">"إضافة إلى الشاشة الرئيسية"</strong>.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <p className="font-bold text-emerald-400 mb-1">
                  🍎 لمستخدمي آيفون (Safari):
                </p>
                <p>
                  1. اضغط على زر <strong className="text-white">المشاركة (Share)</strong> في شريط سفاري.<br />
                  2. مرر للأسفل واختر <strong className="text-white">"إضافة إلى الشاشة الرئيسية" (Add to Home Screen)</strong>.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="mt-4 w-full rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer"
            >
              فهمت، حسناً
            </button>
          </div>
        </div>
      )}
    </>
  );
};
