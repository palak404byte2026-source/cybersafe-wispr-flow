import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
    error: <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500/30 bg-slate-900/95 text-emerald-200',
    warning: 'border-amber-500/30 bg-slate-900/95 text-amber-200',
    info: 'border-cyan-500/30 bg-slate-900/95 text-cyan-200',
    error: 'border-red-500/30 bg-slate-900/95 text-red-200'
  };

  const type = toast.type || 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-bounce-in">
      <div className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl ${borderColors[type]}`}>
        {icons[type]}
        <div className="flex-1 text-sm font-medium pr-2 text-slate-100">
          {toast.message}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
