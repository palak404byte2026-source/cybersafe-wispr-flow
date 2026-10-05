import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Check,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Cpu,
  Clock,
  Sparkles,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Mic
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
  const [genAvoidAmbiguous, setGenAvoidAmbiguous] = useState(true);
  const [generatedResult, setGeneratedResult] = useState('');
  const [isListeningMic, setIsListeningMic] = useState(false);

  // Synchronize when external voice command generates a password
  useEffect(() => {
    if (externalGeneratedPassword) {
      setPassword(externalGeneratedPassword);
    }
  }, [externalGeneratedPassword]);

  // Run evaluation
  const result = evaluatePassword(password);

  useEffect(() => {
    if (password.length > 0 && onPasswordEvaluated) {
      onPasswordEvaluated(result.score, result.label);
    }
  }, [password, result.score, result.label]);

  const handleCopy = (textToCopy) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    onShowToast({ type: 'success', message: 'Password securely copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = () => {
    const newPass = generateSecurePassword({
      length: genLength,
      includeUpper: genUpper,
      includeLower: genLower,
      includeNumbers: genNumbers,
      includeSymbols: genSymbols,
      avoidAmbiguous: genAvoidAmbiguous,
    });
    setGeneratedResult(newPass);
  };

  // Voice dictation using Web Speech API for this input
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
        const spoken = e.results[0][0].transcript.replace(/\s+/g, '-');
        setPassword(spoken);
        onShowToast({ type: 'info', message: `Dictated passphrase: "${spoken}"` });
      };
      recognition.onerror = () => setIsListeningMic(false);
      recognition.onend = () => setIsListeningMic(false);
      recognition.start();
    } catch (err) {
      setIsListeningMic(false);
    }
  };

  const demoPresets = [
    { label: 'Common Breached', val: 'password123' },
    { label: 'Short & Simple', val: 'Dragon99' },
    { label: 'Moderate Mixed', val: 'Summer#2024!' },
    { label: 'High-Entropy Passphrase', val: 'correct-horse-battery-staple' },
    { label: 'Fortified Alpha-Numeric', val: 'Cyb3r#Saf3&Wispr!2026' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <KeyRound className="w-4 h-4" />
            <span>Entropy & Defense Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Password Strength Analyzer & Generator
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Evaluate mathematical keyspace entropy, simulate GPU cluster brute-force resistance, and check breach exposure.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 font-mono">
            Client-Side Only • Zero Logs
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Password Input & Live Analysis (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Input Box Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password-input" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Enter Password or Passphrase to Test
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMicDictate}
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                    isListeningMic
                      ? 'bg-red-500/20 text-red-300 border-red-500 animate-pulse'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-cyan-400'
                  }`}
                  title="Dictate passphrase via Wispr Voice"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isListeningMic ? 'Listening...' : 'Voice Dictate'}</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type any password (e.g. Cyb3r$afe#2026)..."
                className="w-full px-4 py-3.5 pr-24 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 font-mono text-sm sm:text-base outline-none transition-all"
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
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Demo Presets */}
            <div className="pt-1">
              <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                Try quick preset test cases:
              </span>
              <div className="flex flex-wrap gap-2">
                {demoPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPassword(preset.val)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-[11px] text-slate-300 hover:text-white transition-all font-mono"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Dynamic Strength Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Strength Rating:</span>
                <span className={`font-bold uppercase tracking-wider ${
                  result.color === 'emerald' ? 'text-emerald-400' :
                  result.color === 'cyan' ? 'text-cyan-400' :
                  result.color === 'amber' ? 'text-amber-400' :
                  result.color === 'orange' ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {result.label} ({result.score}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    result.color === 'emerald' ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 glow-emerald' :
                    result.color === 'cyan' ? 'bg-gradient-to-r from-blue-500 to-cyan-400 glow-cyan' :
                    result.color === 'amber' ? 'bg-amber-400' :
                    result.color === 'orange' ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            {/* Breached alert banner if triggered */}
            {result.isBreached && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-red-200">CRITICAL VULNERABILITY DETECTED</p>
                  <p>
                    This password is present in global breach lists (e.g. RockYou, HaveIBeenPwned). Automated credential stuffing attacks test this within the first 100 milliseconds.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mathematical Entropy & Crack Time Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
                <Cpu className="w-4 h-4" />
                <span>Information Entropy</span>
              </div>
              <div className="text-2xl font-extrabold font-mono text-white">
                {result.entropy} <span className="text-sm font-normal text-slate-400">bits</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculated keyspace based on {result.charsetSize} active character pool and {password.length} characters.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <Clock className="w-4 h-4" />
                <span>Estimated Time to Crack</span>
              </div>
              <div className="text-lg font-bold font-mono text-white truncate" title={result.crackTime}>
                {result.crackTime}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assuming 10 billion guesses/sec on modern clustered GPU hash-cracking arrays.
              </p>
            </div>
          </div>

          {/* Criteria Checklist */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Security Criteria Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <CheckItem label="At least 8 characters" passed={result.checks.length8} />
              <CheckItem label="12+ characters (Recommended)" passed={result.checks.length12} />
              <CheckItem label="16+ characters (Fortified)" passed={result.checks.length16} />
              <CheckItem label="Lowercase letters (a-z)" passed={result.checks.hasLower} />
              <CheckItem label="Uppercase letters (A-Z)" passed={result.checks.hasUpper} />
              <CheckItem label="Numeric digits (0-9)" passed={result.checks.hasNumber} />
              <CheckItem label="Special symbols (!@#$%^&*)" passed={result.checks.hasSymbol} />
              <CheckItem label="No sequential patterns (12345, qwerty)" passed={result.checks.noSequences} />
              <CheckItem label="No repetitive identical characters" passed={result.checks.noRepeats} />
            </div>

            {/* Actionable Feedback list */}
            <div className="pt-3 border-t border-slate-800">
              <h4 className="text-xs font-semibold text-slate-300 mb-2">Remediation Guidance:</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {result.feedback.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Fortified Password Generator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Fortified Generator</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Cryptographic CSPRNG
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">
              Generate High-Entropy Password
            </h3>

            {/* Length Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Password Length</span>
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
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>8 (Min)</span>
                <span>16 (Recommended)</span>
                <span>32 (Max)</span>
              </div>
            </div>

            {/* Character Toggles */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Character Composition
              </span>
              <ToggleOption label="Uppercase Letters (A-Z)" checked={genUpper} onChange={setGenUpper} />
              <ToggleOption label="Lowercase Letters (a-z)" checked={genLower} onChange={setGenLower} />
              <ToggleOption label="Numeric Digits (0-9)" checked={genNumbers} onChange={setGenNumbers} />
              <ToggleOption label="Symbols (!@#$%^&*)" checked={genSymbols} onChange={setGenSymbols} />
              <ToggleOption label="Avoid Ambiguous (I, l, 1, O, 0)" checked={genAvoidAmbiguous} onChange={setGenAvoidAmbiguous} />
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate Fortified Password</span>
            </button>

            {/* Generated Password Output Box */}
            {generatedResult && (
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 uppercase font-mono">Generated Result:</span>
                  <button
                    onClick={() => handleCopy(generatedResult)}
                    className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className="font-mono text-sm sm:text-base text-cyan-300 break-all select-all p-2 rounded bg-slate-900 border border-slate-800">
                  {generatedResult}
                </div>
                <button
                  onClick={() => {
                    setPassword(generatedResult);
                    onShowToast({ type: 'info', message: 'Loaded into password strength analyzer!' });
                  }}
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  Test in Strength Analyzer Above
                </button>
              </div>
            )}
          </div>

          {/* Quick Best Practice Card */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              NIST 800-63B Guidelines
            </h4>
            <p className="text-slate-400 leading-relaxed">
              The National Institute of Standards and Technology advises prioritizing passphrase length over arbitrary character replacement rules, and discarding mandatory 90-day password expiration policies which encourage weaker passwords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckItem({ label, passed }) {
  return (
    <div className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
      passed
        ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300'
        : 'bg-slate-950/40 border-slate-800 text-slate-500'
    }`}>
      {passed ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
      )}
      <span className="truncate">{label}</span>
    </div>
  );
}

function ToggleOption({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer select-none">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-400 cursor-pointer"
      />
    </label>
  );
}
