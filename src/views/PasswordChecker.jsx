import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Check,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  Info
} from 'lucide-react';
import { evaluatePassword, generateSecurePassword } from '../utils/passwordEvaluator';

export default function PasswordChecker({
  onPasswordEvaluated,
  onShowToast,
  externalGeneratedPassword = null,
}) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generator options
  const [genLength, setGenLength] = useState(16);
  const [genUpper, setGenUpper] = useState(true);
  const [genLower, setGenLower] = useState(true);
  const [genNumbers, setGenNumbers] = useState(true);
  const [genSymbols, setGenSymbols] = useState(true);
  const [generatedResult, setGeneratedResult] = useState('');

  // Handle external voice-generated passwords
  useEffect(() => {
    if (externalGeneratedPassword) {
      setPassword(externalGeneratedPassword);
    }
  }, [externalGeneratedPassword]);

  // Real-time local evaluation
  const result = evaluatePassword(password);

  useEffect(() => {
    if (password.length > 0 && onPasswordEvaluated) {
      onPasswordEvaluated(result.score, result.label);
    }
  }, [password, result.score, result.label]);

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    onShowToast?.({ type: 'success', message: 'Password copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = () => {
    const newPass = generateSecurePassword({
      length: genLength,
      includeUpper: genUpper,
      includeLower: genLower,
      includeNumbers: genNumbers,
      includeSymbols: genSymbols,
    });
    setGeneratedResult(newPass);
  };

  const demoPresets = [
    { label: 'Very Weak', val: '123456' },
    { label: 'Weak', val: 'Summer2024' },
    { label: 'Fair', val: 'Falcon#98' },
    { label: 'Strong', val: 'Tr0ub4dor&39' },
    { label: 'Very Strong', val: 'K9#xP2$vL9@mQ4!z' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <KeyRound className="w-4 h-4" />
            <span>Cryptographic Entropy & Defense</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Password Strength Checker
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Instant client-side entropy evaluation against dictionary brute-forcing, pattern repetition, and breach leaks.
          </p>
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>100% Client-Side Evaluation</span>
          </span>
        </div>
      </div>

      {/* Mandatory Educational Privacy Message */}
      <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-cyan-200 flex items-start gap-3.5 shadow-lg">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm space-y-1">
          <h4 className="font-bold text-white flex items-center gap-2">
            Educational Privacy Guarantee
          </h4>
          <p className="text-slate-300 leading-relaxed">
            All password analysis runs <strong>100% locally in your browser memory</strong> using client-side JavaScript.
            Your password is <strong>never transmitted over any network, never saved, and never stored</strong> in any database, backend server, or local log.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Password Input & Live Analysis (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <label htmlFor="password-field" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Test Your Password
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {password.length} characters
              </span>
            </div>

            {/* Input with Show/Hide Toggle */}
            <div className="relative">
              <input
                id="password-field"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type a password to evaluate (e.g., K9#xP2$vL9@mQ4)..."
                className="w-full px-4 py-3.5 pr-24 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 font-mono text-sm sm:text-base outline-none transition-all"
                autoComplete="off"
                spellCheck="false"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {password && (
                  <button
                    onClick={() => handleCopy(password)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Copy password"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-cyan-400" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Strength Level & Visual Strength Meter */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Strength Level:</span>
                <span className={`font-bold uppercase tracking-wider text-sm ${
                  result.color === 'emerald' ? 'text-emerald-400' :
                  result.color === 'cyan' ? 'text-cyan-400' :
                  result.color === 'amber' ? 'text-amber-400' :
                  result.color === 'orange' ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {result.label} ({result.score}%)
                </span>
              </div>

              {/* Visual meter bar with multi-stage transitions */}
              <div className="w-full h-3 rounded-full bg-slate-800/90 overflow-hidden p-0.5 border border-slate-700/50">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    result.color === 'emerald' ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]' :
                    result.color === 'cyan' ? 'bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]' :
                    result.color === 'amber' ? 'bg-amber-400' :
                    result.color === 'orange' ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${password.length > 0 ? result.score : 0}%` }}
                />
              </div>

              {/* 5 Levels Legend Indicators */}
              <div className="grid grid-cols-5 gap-1 pt-1 text-[10px] text-center font-mono text-slate-500">
                <span className={result.label.includes('Very Weak') ? 'text-red-400 font-bold' : ''}>Very Weak</span>
                <span className={result.label === 'Weak' ? 'text-orange-400 font-bold' : ''}>Weak</span>
                <span className={result.label === 'Fair' ? 'text-amber-400 font-bold' : ''}>Fair</span>
                <span className={result.label === 'Strong' ? 'text-cyan-400 font-bold' : ''}>Strong</span>
                <span className={result.label === 'Very Strong' ? 'text-emerald-400 font-bold' : ''}>Very Strong</span>
              </div>
            </div>

            {/* Quick Demo Preset Buttons */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                Try quick preset passwords:
              </span>
              <div className="flex flex-wrap gap-2">
                {demoPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPassword(preset.val)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-[11px] text-slate-300 hover:text-white transition-all font-mono"
                  >
                    {preset.label}: <span className="text-cyan-300">{preset.val}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Breached alert if triggered */}
            {result.isBreached && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-red-200">KNOWN COMPROMISED PASSWORD</p>
                  <p>
                    This exact password exists in public breach dumps (e.g. RockYou, HaveIBeenPwned). Attack bots test this automatically within milliseconds.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Individual Requirement Indicators */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Individual Requirement Indicators (5 Core Criteria)
            </h3>
            <div className="space-y-2.5">
              {result.requirements.map((req) => (
                <div
                  key={req.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    req.met
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
                    {req.met ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                    <span>{req.label}</span>
                  </div>
                  <span className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                    req.met ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {req.met ? 'Passed' : 'Missing'}
                  </span>
                </div>
              ))}
            </div>

            {/* Recommendations List */}
            <div className="pt-3 border-t border-slate-800">
              <h4 className="text-xs font-semibold text-slate-300 mb-2">
                Recommendations for Improvement:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Brute-Force Simulation & Fortified Generator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Crack Time & Keyspace Entropy */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Brute-Force GPU Simulation</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Estimated Crack Time:</span>
                <div className="text-lg font-bold font-mono text-cyan-300">
                  {result.crackTime}
                </div>
                <p className="text-[11px] text-slate-500">
                  Calculated against 10 billion guesses/sec on clustered RTX 4090 GPU rigs.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Information Entropy:</span>
                <div className="text-lg font-bold font-mono text-white">
                  {result.entropy} <span className="text-xs text-slate-400 font-normal">bits of entropy</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Based on a keyspace pool of {result.charsetSize} active character variations.
                </p>
              </div>
            </div>
          </div>

          {/* Secure Password Generator */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Secure Password Generator</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                CSPRNG
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Length</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">{genLength} chars</span>
              </div>
              <input
                type="range"
                min="8"
                max="32"
                value={genLength}
                onChange={(e) => setGenLength(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                <span>Uppercase (A-Z)</span>
                <input
                  type="checkbox"
                  checked={genUpper}
                  onChange={(e) => setGenUpper(e.target.checked)}
                  className="rounded bg-slate-800 text-cyan-500 border-slate-700"
                />
              </label>
              <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                <span>Lowercase (a-z)</span>
                <input
                  type="checkbox"
                  checked={genLower}
                  onChange={(e) => setGenLower(e.target.checked)}
                  className="rounded bg-slate-800 text-cyan-500 border-slate-700"
                />
              </label>
              <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                <span>Numbers (0-9)</span>
                <input
                  type="checkbox"
                  checked={genNumbers}
                  onChange={(e) => setGenNumbers(e.target.checked)}
                  className="rounded bg-slate-800 text-cyan-500 border-slate-700"
                />
              </label>
              <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                <span>Symbols (!@#$%)</span>
                <input
                  type="checkbox"
                  checked={genSymbols}
                  onChange={(e) => setGenSymbols(e.target.checked)}
                  className="rounded bg-slate-800 text-cyan-500 border-slate-700"
                />
              </label>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate Fortified Password</span>
            </button>

            {generatedResult && (
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-3 animate-fade-in">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Generated Result:</span>
                  <button
                    onClick={() => handleCopy(generatedResult)}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className="font-mono text-sm text-cyan-300 break-all p-2 rounded bg-slate-900 border border-slate-800 select-all">
                  {generatedResult}
                </div>
                <button
                  onClick={() => {
                    setPassword(generatedResult);
                    onShowToast?.({ type: 'info', message: 'Loaded into Password Strength Checker!' });
                  }}
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  Test in Strength Checker
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
