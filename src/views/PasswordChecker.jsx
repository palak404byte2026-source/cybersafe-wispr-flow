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

  // Generator state
  const [genLength, setGenLength] = useState(16);
  const [genUpper, setGenUpper] = useState(true);
  const [genLower, setGenLower] = useState(true);
  const [genNumbers, setGenNumbers] = useState(true);
  const [genSymbols, setGenSymbols] = useState(true);
  const [generatedResult, setGeneratedResult] = useState('');

  // Handle external voice-generated passwords
  useEffect(() => {
    if (externalGeneratedPassword && typeof externalGeneratedPassword === 'string') {
      setPassword(externalGeneratedPassword);
    }
  }, [externalGeneratedPassword]);

  // Real-time local evaluation (handles empty string safely)
  const result = evaluatePassword(password || '');

  useEffect(() => {
    if (onPasswordEvaluated) {
      // Passes only non-sensitive score and label
      onPasswordEvaluated(result.score, result.label);
    }
  }, [password, result.score, result.label]);

  const handleCopy = (text) => {
    if (!text) return;
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      onShowToast?.({ type: 'success', message: 'Password securely copied to clipboard!' });
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      onShowToast?.({ type: 'warning', message: 'Unable to access clipboard. Please copy manually.' });
    }
  };

  const handleGenerate = () => {
    try {
      const newPass = generateSecurePassword({
        length: Math.max(8, Math.min(32, genLength)),
        includeUpper: genUpper,
        includeLower: genLower,
        includeNumbers: genNumbers,
        includeSymbols: genSymbols,
      });
      setGeneratedResult(newPass);
    } catch (err) {
      console.warn('Password generator error:', err);
    }
  };

  const demoPresets = [
    { label: 'Very Weak', val: '123456' },
    { label: 'Weak', val: 'Summer2024' },
    { label: 'Fair', val: 'Falcon#98' },
    { label: 'Strong', val: 'Tr0ub4dor&39' },
    { label: 'Very Strong', val: 'K9#xP2$vL9@mQ4!z' }
  ];

  const isEmpty = !password || password.length === 0;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <KeyRound className="w-4 h-4" aria-hidden="true" />
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
            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>100% Client-Side Evaluation</span>
          </span>
        </div>
      </div>

      {/* Mandatory Educational Privacy Message */}
      <div
        className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-cyan-200 flex items-start gap-3.5 shadow-lg"
        role="region"
        aria-label="Educational Privacy Guarantee"
      >
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm space-y-1">
          <h2 className="font-bold text-white text-sm">
            Educational Privacy Guarantee
          </h2>
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
              <span className="text-xs text-slate-400 font-mono" aria-live="polite">
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
                className="w-full px-4 py-3.5 pr-24 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400 text-white placeholder-slate-500 font-mono text-sm sm:text-base outline-none transition-all"
                autoComplete="off"
                spellCheck="false"
                aria-describedby="password-meter-desc password-feedback"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {password && (
                  <button
                    type="button"
                    onClick={() => handleCopy(password)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
                    title="Copy password to clipboard"
                    aria-label="Copy password to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
                  title={showPassword ? 'Hide password text' : 'Show password text'}
                  aria-label={showPassword ? 'Hide password text' : 'Show password text'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-cyan-400" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                </button>
              </div>
            </div>

            {/* Strength Level & Visual Strength Meter */}
            <div className="space-y-2 pt-1" id="password-meter-desc">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Strength Level:</span>
                <span
                  className={`font-bold uppercase tracking-wider text-sm ${
                    isEmpty ? 'text-slate-400' :
                    result.color === 'emerald' ? 'text-emerald-400' :
                    result.color === 'cyan' ? 'text-cyan-400' :
                    result.color === 'amber' ? 'text-amber-400' :
                    result.color === 'orange' ? 'text-orange-400' : 'text-red-400'
                  }`}
                  aria-live="polite"
                >
                  {isEmpty ? 'Enter a password' : `${result.label} (${result.score}%)`}
                </span>
              </div>

              {/* Visual meter bar with role="progressbar" */}
              <div
                className="w-full h-3 rounded-full bg-slate-800/90 overflow-hidden p-0.5 border border-slate-700/50"
                role="progressbar"
                aria-valuenow={isEmpty ? 0 : result.score}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`Password strength: ${isEmpty ? 0 : result.score} percent, rating: ${isEmpty ? 'Empty' : result.label}`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    isEmpty ? 'w-0' :
                    result.color === 'emerald' ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]' :
                    result.color === 'cyan' ? 'bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]' :
                    result.color === 'amber' ? 'bg-amber-400' :
                    result.color === 'orange' ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${isEmpty ? 0 : result.score}%` }}
                />
              </div>

              {/* 5 Levels Legend Indicators */}
              <div className="grid grid-cols-5 gap-1 pt-1 text-[10px] text-center font-mono text-slate-500" aria-hidden="true">
                <span className={!isEmpty && result.label.includes('Very Weak') ? 'text-red-400 font-bold' : ''}>Very Weak</span>
                <span className={!isEmpty && result.label === 'Weak' ? 'text-orange-400 font-bold' : ''}>Weak</span>
                <span className={!isEmpty && result.label === 'Fair' ? 'text-amber-400 font-bold' : ''}>Fair</span>
                <span className={!isEmpty && result.label === 'Strong' ? 'text-cyan-400 font-bold' : ''}>Strong</span>
                <span className={!isEmpty && result.label === 'Very Strong' ? 'text-emerald-400 font-bold' : ''}>Very Strong</span>
              </div>
            </div>

            {/* Quick Demo Preset Buttons */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                Try quick preset test passwords:
              </span>
              <div className="flex flex-wrap gap-2">
                {demoPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPassword(preset.val)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-[11px] text-slate-300 hover:text-white transition-all font-mono focus-visible:ring-2 focus-visible:ring-cyan-400"
                    aria-label={`Test preset password: ${preset.val} (${preset.label})`}
                  >
                    {preset.label}: <span className="text-cyan-300">{preset.val}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Breached alert if triggered */}
            {result.isBreached && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 flex items-start gap-3" role="alert">
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
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
            <div className="space-y-2.5" role="list">
              {result.requirements.map((req) => (
                <div
                  key={req.id}
                  role="listitem"
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    req.met
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
                    {req.met ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-600 shrink-0" aria-hidden="true" />
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
            <div className="pt-3 border-t border-slate-800" id="password-feedback">
              <h4 className="text-xs font-semibold text-slate-300 mb-2">
                Recommendations for Improvement:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400" aria-live="polite">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold shrink-0 mt-0.5" aria-hidden="true">•</span>
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
              <Cpu className="w-4 h-4" aria-hidden="true" />
              <span>Brute-Force GPU Simulation</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Estimated Crack Time:</span>
                <div className="text-lg font-bold font-mono text-cyan-300" aria-live="polite">
                  {isEmpty ? 'None (enter a password)' : result.crackTime}
                </div>
                <p className="text-[11px] text-slate-500">
                  Calculated against 10 billion guesses/sec on clustered RTX 4090 GPU rigs.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Information Entropy:</span>
                <div className="text-lg font-bold font-mono text-white" aria-live="polite">
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
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Secure Password Generator</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                CSPRNG
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="gen-length-slider" className="text-slate-300 font-medium">
                  Length: <span className="font-mono font-bold text-cyan-400 text-sm">{genLength} chars</span>
                </label>
              </div>
              <input
                id="gen-length-slider"
                type="range"
                min="8"
                max="32"
                value={genLength}
                onChange={(e) => setGenLength(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Password length slider"
                aria-valuemin="8"
                aria-valuemax="32"
                aria-valuenow={genLength}
              />
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
              <label className="flex items-center justify-between text-slate-300 cursor-pointer select-none">
                <span>Uppercase (A-Z)</span>
                <input
                  type="checkbox"
                  checked={genUpper}
                  onChange={(e) => setGenUpper(e.target.checked)}
                  className="rounded bg-slate-800 text-cyan-500 border-slate-700 focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                  aria-label="Include uppercase letters"
                />
              </label>
              <label className="flex items-center justify-between text-slate-300 cursor-pointer select-none">
                <span>Lowercase (a-z)</span>
                <input
                  type="checkbox"
                  checked={genLower}
                  onChange={(e) => setGenLower(e.target.checked)}
                  className="rounded bg-slate-800 text-cyan-500 border-slate-700 focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                  aria-label="Include lowercase letters"
                />
              </label>
              <label className="flex items-center justify-between text-slate-300 cursor-pointer select-none">
                <span>Numbers (0-9)</span>
                <input
                  type="checkbox"
                  checked={genNumbers}
                  onChange={(e) => setGenNumbers(e.target.checked)}
                  className="rounded bg-slate-800 text-cyan-500 border-slate-700 focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                  aria-label="Include numbers"
                />
              </label>
              <label className="flex items-center justify-between text-slate-300 cursor-pointer select-none">
                <span>Symbols (!@#$%)</span>
                <input
                  type="checkbox"
                  checked={genSymbols}
                  onChange={(e) => setGenSymbols(e.target.checked)}
                  className="rounded bg-slate-800 text-cyan-500 border-slate-700 focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                  aria-label="Include special symbols"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>Generate Fortified Password</span>
            </button>

            {generatedResult && (
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-3 animate-fade-in" aria-live="polite">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Generated Result:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(generatedResult)}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                    aria-label="Copy generated password"
                  >
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className="font-mono text-sm text-cyan-300 break-all p-2 rounded bg-slate-900 border border-slate-800 select-all">
                  {generatedResult}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPassword(generatedResult);
                    onShowToast?.({ type: 'info', message: 'Loaded into Password Strength Checker!' });
                  }}
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
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
