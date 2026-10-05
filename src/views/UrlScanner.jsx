import React, { useState } from 'react';
import {
  Link2,
  Search,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Lock,
  Globe,
  Info,
  Server,
  Fingerprint
} from 'lucide-react';
import { evaluateUrl, DEMO_URLS } from '../utils/urlEvaluator';

export default function UrlScanner({ onUrlScanned, onShowToast, scanHistory = [] }) {
  const [inputUrl, setInputUrl] = useState('');
  const [scanResult, setScanResult] = useState(null);

  const handleCheckUrl = (urlToCheck = inputUrl) => {
    if (!urlToCheck || !urlToCheck.trim()) {
      onShowToast?.({ type: 'warning', message: 'Please enter a URL to check.' });
      return;
    }

    const result = evaluateUrl(urlToCheck);
    if (!result.isValid) {
      setScanResult(result);
      onShowToast?.({ type: 'error', message: result.error });
      return;
    }

    setScanResult(result);
    onUrlScanned?.(result);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Link2 className="w-4 h-4" />
            <span>Educational URL Safety Analyzer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            URL Safety Checker
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Client-side heuristic inspection of encryption, host IP literals, suspicious keywords, subdomain stacking, malformed syntax, and anomalous character traits.
          </p>
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero External API Calls</span>
          </span>
        </div>
      </div>

      {/* Mandatory Educational Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3.5 shadow-lg">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm space-y-1">
          <h4 className="font-bold text-amber-100 flex items-center gap-2">
            Educational Demonstration Notice
          </h4>
          <p className="text-slate-300 leading-relaxed">
            This tool performs client-side heuristic inspection in the browser for educational awareness. It is <strong>an educational demonstration and not a replacement for professional threat intelligence, antivirus software, or an enterprise security gateway</strong>.
          </p>
        </div>
      </div>

      {/* Input Box Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <label htmlFor="url-input" className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
          Enter URL to Inspect
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="url-input"
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheckUrl()}
            placeholder="e.g. https://www.chase.com or http://secure-login.xyz..."
            className="flex-1 px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 font-mono text-xs sm:text-sm outline-none transition-all"
          />

          <button
            type="button"
            onClick={() => handleCheckUrl()}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Check URL</span>
          </button>
        </div>

        {/* Demo Preset Buttons */}
        <div className="pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-2 font-medium">
            Or test one of these educational examples:
          </span>
          <div className="flex flex-wrap gap-2">
            {DEMO_URLS.map((demo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputUrl(demo.url);
                  handleCheckUrl(demo.url);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all font-medium flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{demo.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Malformed URL Warning (if applicable) */}
      {scanResult && !scanResult.isValid && (
        <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/50 shadow-xl space-y-3 animate-fade-in">
          <div className="flex items-center gap-3 text-red-400 font-bold text-base">
            <XCircle className="w-6 h-6 shrink-0" />
            <span>Malformed URL Structure Detected</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {scanResult.error}
          </p>
          <div className="text-xs text-slate-400 font-mono">
            Indicator: URL Format Integrity check failed. Please enter a valid protocol and domain (e.g. https://domain.com).
          </div>
        </div>
      )}

      {/* Valid Results View */}
      {scanResult && scanResult.isValid && (
        <div className="space-y-6 animate-fade-in">
          {/* Main Verdict Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl ${
            scanResult.riskLevel === 'High Risk'
              ? 'bg-red-950/20 border-red-500/50'
              : scanResult.riskLevel === 'Suspicious'
              ? 'bg-amber-950/20 border-amber-500/50'
              : 'bg-emerald-950/20 border-emerald-500/50'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className={`p-3.5 rounded-2xl shrink-0 mt-0.5 ${
                  scanResult.riskLevel === 'High Risk' ? 'bg-red-500/20 text-red-400' :
                  scanResult.riskLevel === 'Suspicious' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {scanResult.riskLevel === 'High Risk' ? (
                    <ShieldAlert className="w-8 h-8" />
                  ) : scanResult.riskLevel === 'Suspicious' ? (
                    <AlertTriangle className="w-8 h-8" />
                  ) : (
                    <ShieldCheck className="w-8 h-8" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-mono uppercase font-bold px-3 py-1 rounded-full border ${
                      scanResult.riskLevel === 'High Risk' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                      scanResult.riskLevel === 'Suspicious' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      Verdict: {scanResult.riskLevel}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Checked at {scanResult.scannedAt}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white font-mono break-all">
                    {scanResult.hostname}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {scanResult.riskSummary}
                  </p>
                </div>
              </div>

              {/* Threat Index Score Pill */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center shrink-0 min-w-[150px]">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Threat Index
                </span>
                <span className={`text-3xl sm:text-4xl font-black font-mono ${
                  scanResult.riskLevel === 'High Risk' ? 'text-red-400' :
                  scanResult.riskLevel === 'Suspicious' ? 'text-amber-400' :
                  'text-emerald-400'
                }`}>
                  {scanResult.threatScore}%
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Safety Rating: {scanResult.safetyScore}/100
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Detected Indicators & Explanations */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>Client-Side Detected Indicators & Heuristic Analysis</span>
              <span className="text-[11px] text-slate-500 font-mono font-normal">6 Core Checks Evaluated</span>
            </h3>

            <div className="space-y-3 pt-1">
              {scanResult.indicators.map((ind, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 transition-colors ${
                    ind.status === 'pass'
                      ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                      : ind.status === 'warning'
                      ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                      : 'bg-red-950/20 border-red-500/40 text-red-200'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {ind.status === 'pass' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : ind.status === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                        {ind.name}
                      </span>
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                        ind.status === 'pass' ? 'bg-emerald-500/10 text-emerald-400' :
                        ind.status === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {ind.status === 'pass' ? 'Safe' : ind.severity === 'high' ? 'High Risk Indicator' : 'Warning'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">
                      {ind.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {ind.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Historical Scans */}
      {scanHistory.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Recent URL Checks</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">{scanHistory.length} Checked</span>
          </div>

          <div className="divide-y divide-slate-800">
            {scanHistory.slice(0, 5).map((entry, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setInputUrl(entry.url);
                  handleCheckUrl(entry.url);
                }}
                className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-850 p-2 rounded-lg transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white truncate font-mono group-hover:text-cyan-300">
                    {entry.url}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {entry.riskLevel} • Threat: {entry.threatScore}%
                  </p>
                </div>
                <span className="text-[10px] text-slate-500 font-mono shrink-0">
                  {entry.scannedAt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
