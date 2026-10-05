import React, { useState } from 'react';
import {
  Link2,
  Search,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Clock,
  Sparkles,
  Lock,
  Globe,
  Mic,
  Server,
  Fingerprint
} from 'lucide-react';
import { evaluateUrl, DEMO_URLS } from '../utils/urlEvaluator';

export default function UrlScanner({ onUrlScanned, onShowToast, scanHistory = [] }) {
  const [inputUrl, setInputUrl] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isListeningMic, setIsListeningMic] = useState(false);

  const handleScan = (urlToScan = inputUrl) => {
    if (!urlToScan || !urlToScan.trim()) {
      onShowToast({ type: 'warning', message: 'Please enter a URL to inspect.' });
      return;
    }

    const result = evaluateUrl(urlToScan);
    if (!result.isValid) {
      onShowToast({ type: 'error', message: result.error });
      return;
    }

    setScanResult(result);
    if (onUrlScanned) {
      onUrlScanned(result);
    }
  };

  // Voice dictation of domain name
  const handleMicDictate = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onShowToast({ type: 'warning', message: 'Speech recognition is not supported in this browser.' });
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onstart = () => setIsListeningMic(true);
      recognition.onresult = (e) => {
        let spoken = e.results[0][0].transcript.toLowerCase().trim();
        spoken = spoken.replace(/\s+dot\s+/g, '.').replace(/\s+/g, '');
        if (!spoken.startsWith('http')) spoken = 'https://' + spoken;
        setInputUrl(spoken);
        handleScan(spoken);
        onShowToast({ type: 'info', message: `Voice scanned: "${spoken}"` });
      };
      recognition.onerror = () => setIsListeningMic(false);
      recognition.onend = () => setIsListeningMic(false);
      recognition.start();
    } catch (err) {
      setIsListeningMic(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Link2 className="w-4 h-4" />
            <span>Client-Side Threat Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            URL & Phishing Threat Inspector
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Deep heuristic inspection of brand typosquatting, Punycode homoglyphs, suspicious TLDs, and IP hostnames.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 font-mono">
            Zero External Tracking • Local Heuristics
          </span>
        </div>
      </div>

      {/* Main Input Box Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <label htmlFor="url-input" className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
          Enter URL or Domain to Analyze
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              id="url-input"
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              placeholder="e.g. https://paypal-security-verification.top/login"
              className="w-full px-4 py-3.5 pr-12 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 font-mono text-xs sm:text-sm outline-none transition-all"
            />
            <button
              onClick={handleMicDictate}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
                isListeningMic
                  ? 'bg-red-500/20 text-red-300 animate-pulse'
                  : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-850'
              }`}
              title="Dictate URL with voice"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => handleScan()}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Scan Destination</span>
          </button>
        </div>

        {/* Demo Presets */}
        <div className="pt-2">
          <span className="text-[11px] text-slate-400 block mb-2 font-medium">
            Test realistic threat presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {DEMO_URLS.map((demo, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputUrl(demo.url);
                  handleScan(demo.url);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-xs text-slate-300 hover:text-white transition-all font-medium flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>{demo.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results View */}
      {scanResult && (
        <div className="space-y-6 animate-fade-in">
          {/* Verdict Overview Banner */}
          <div className={`p-6 rounded-2xl border shadow-2xl ${
            scanResult.badgeColor === 'red'
              ? 'bg-red-950/30 border-red-500/50'
              : scanResult.badgeColor === 'amber'
              ? 'bg-amber-950/30 border-amber-500/50'
              : scanResult.badgeColor === 'cyan'
              ? 'bg-cyan-950/30 border-cyan-500/50'
              : 'bg-emerald-950/30 border-emerald-500/50'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3.5 rounded-2xl shrink-0 mt-0.5 ${
                  scanResult.badgeColor === 'red' ? 'bg-red-500/20 text-red-400' :
                  scanResult.badgeColor === 'amber' ? 'bg-amber-500/20 text-amber-400' :
                  scanResult.badgeColor === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {scanResult.badgeColor === 'red' ? (
                    <ShieldAlert className="w-8 h-8" />
                  ) : scanResult.badgeColor === 'amber' ? (
                    <AlertTriangle className="w-8 h-8" />
                  ) : (
                    <ShieldCheck className="w-8 h-8" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                      scanResult.badgeColor === 'red' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                      scanResult.badgeColor === 'amber' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                      scanResult.badgeColor === 'cyan' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' :
                      'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {scanResult.riskLevel}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Scanned at {scanResult.scannedAt}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white font-mono break-all">
                    {scanResult.hostname}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {scanResult.recommendation}
                  </p>
                </div>
              </div>

              {/* Threat Index Counter */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-center shrink-0 min-w-[140px]">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Threat Index
                </span>
                <span className={`text-3xl font-black font-mono ${
                  scanResult.threatScore >= 70 ? 'text-red-400' :
                  scanResult.threatScore >= 40 ? 'text-amber-400' :
                  scanResult.threatScore >= 15 ? 'text-cyan-400' : 'text-emerald-400'
                }`}>
                  {scanResult.threatScore}%
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Safety: {scanResult.safetyScore}/100
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Heuristic Breakdown Findings */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Heuristic Inspection Vector Analysis ({scanResult.findings.length} Vectors Tested)
            </h3>

            <div className="space-y-3">
              {scanResult.findings.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 transition-colors ${
                    item.status === 'pass'
                      ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                      : item.status === 'warning'
                      ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                      : 'bg-red-950/20 border-red-500/40 text-red-200'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {item.status === 'pass' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : item.status === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                        {item.category}
                      </span>
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                        item.severity === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30 font-bold' :
                        item.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                        item.severity === 'medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {item.severity}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
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
              <span>Recent URL Inspections</span>
            </h3>
            <span className="text-xs text-slate-500">{scanHistory.length} Recorded</span>
          </div>

          <div className="divide-y divide-slate-800">
            {scanHistory.slice(0, 5).map((entry, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setInputUrl(entry.url);
                  handleScan(entry.url);
                }}
                className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 p-2 rounded-lg transition-colors group"
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
