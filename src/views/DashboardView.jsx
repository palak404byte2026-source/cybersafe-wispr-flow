import React from 'react';
import {
  ShieldCheck,
  KeyRound,
  Fish,
  Link2,
  Activity,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Mic,
  Zap,
  Radio,
  FileCheck
} from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';

export default function DashboardView({
  setCurrentView,
  overallScore = 0,
  passwordScore = 0,
  quizCompleted = false,
  quizScore = 0,
  scannedUrlsCount = 0,
  completedChecklistCount = 0,
  recentActivities = [],
}) {
  const threatBulletins = [
    {
      id: 1,
      tag: 'Critical Alert',
      title: 'Active QR-Code (Quishing) Campaigns Targeting Enterprise SSO',
      summary: 'Attackers are physically placing fake parking and cafeteria QR stickers that direct users to reverse-proxy credential stealers.',
      time: '12m ago',
      level: 'high'
    },
    {
      id: 2,
      tag: 'Advisory',
      title: 'MFA Prompt Bombing Attacks Surging Against Cloud Accounts',
      summary: 'Threat actors trigger midnight push notifications hoping fatigued employees click "Approve" to silence alarms.',
      time: '1h ago',
      level: 'medium'
    },
    {
      id: 3,
      tag: 'Good News',
      title: 'Passkeys Adoption Reduces Phishing Success by 98%',
      summary: 'FIDO2 / WebAuthn cryptographic keys inherently neutralize man-in-the-middle proxy phishing.',
      time: '3h ago',
      level: 'info'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>Wispr Flow Voice-Driven Development Challenge</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Cybersecurity Defense Command Center
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Real-time threat evaluation, password entropy verification, and cognitive phishing defense.
              Voice-enabled with <strong className="text-cyan-300">Wispr Flow</strong> navigation and zero backend exposure.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentView('passwords')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
              >
                <KeyRound className="w-4 h-4" />
                <span>Test Password Defense</span>
              </button>
              <button
                onClick={() => setCurrentView('quiz')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition-all hover:scale-105"
              >
                <Fish className="w-4 h-4 text-cyan-400" />
                <span>Take Phishing Lab</span>
              </button>
              <button
                onClick={() => setCurrentView('url')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition-all hover:scale-105"
              >
                <Link2 className="w-4 h-4 text-emerald-400" />
                <span>Scan URL</span>
              </button>
            </div>
          </div>

          {/* Quick Score Highlight Widget */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center shrink-0 min-w-[240px] shadow-inner">
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-2">
              Security Posture
            </span>
            <ScoreGauge score={overallScore} size={130} strokeWidth={11} showDetails={true} />
            <button
              onClick={() => setCurrentView('score')}
              className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold group"
            >
              <span>Full Health Audit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Password Strength */}
        <div
          onClick={() => setCurrentView('passwords')}
          className="group cursor-pointer p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all duration-300 shadow-lg relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
              <KeyRound className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Entropy Engine
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              Password Strength
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Brute-force crack time, breach database cross-referencing & generator.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Current Test:</span>
            <span className={`font-mono font-bold ${passwordScore > 70 ? 'text-emerald-400' : passwordScore > 40 ? 'text-amber-400' : 'text-slate-400'}`}>
              {passwordScore > 0 ? `${passwordScore}/100` : 'Not Tested'}
            </span>
          </div>
        </div>

        {/* Card 2: Phishing Quiz */}
        <div
          onClick={() => setCurrentView('quiz')}
          className="group cursor-pointer p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all duration-300 shadow-lg relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
              <Fish className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Simulation Lab
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              Phishing Awareness
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Smishing, Quishing, CEO wire fraud & credential harvesting exercises.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Quiz Status:</span>
            <span className={`font-mono font-bold ${quizCompleted ? 'text-emerald-400' : 'text-slate-400'}`}>
              {quizCompleted ? `${Math.round(quizScore)}% Certified` : 'Pending'}
            </span>
          </div>
        </div>

        {/* Card 3: URL Threat Scanner */}
        <div
          onClick={() => setCurrentView('url')}
          className="group cursor-pointer p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all duration-300 shadow-lg relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
              <Link2 className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Heuristic Scan
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              URL Threat Inspector
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Punycode homoglyphs, brand typosquatting & malicious TLD analyzer.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">URLs Analyzed:</span>
            <span className="font-mono font-bold text-cyan-400">
              {scannedUrlsCount} Inspected
            </span>
          </div>
        </div>

        {/* Card 4: Hygiene Checklist */}
        <div
          onClick={() => setCurrentView('score')}
          className="group cursor-pointer p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all duration-300 shadow-lg relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
              <FileCheck className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Hygiene Radar
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              Security Checklist
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              MFA enforcement, auto-updates, password vault & encryption controls.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Completed:</span>
            <span className="font-mono font-bold text-purple-400">
              {completedChecklistCount} / 8 Controls
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Threat Bulletins + Recent Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Bulletin Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Live Threat Intelligence Feed</h2>
            </div>
            <span className="text-xs text-slate-400">Simulated Global SOC Feeds</span>
          </div>

          <div className="space-y-3">
            {threatBulletins.map((bulletin) => (
              <div
                key={bulletin.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    bulletin.level === 'high'
                      ? 'bg-red-500/10 text-red-400 border-red-500/30'
                      : bulletin.level === 'medium'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  }`}>
                    {bulletin.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{bulletin.time}</span>
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  {bulletin.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {bulletin.summary}
                </p>
              </div>
            ))}
          </div>

          {/* Wispr Flow Voice Prompt Helper Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/30 flex items-start gap-4 shadow-lg">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 shrink-0">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Wispr Flow Voice Navigation Active
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300">
                  Try It!
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Click the microphone button at the bottom-left or say aloud:
                <em className="text-cyan-300 not-italic font-semibold"> "Check password"</em>,
                <em className="text-cyan-300 not-italic font-semibold"> "Take phishing quiz"</em>, or
                <em className="text-cyan-300 not-italic font-semibold"> "What is my score?"</em> to navigate effortlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Security Activity Log & Hygiene Snapshot (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Recent Security Activity</h2>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 divide-y divide-slate-800/80">
            {recentActivities.length > 0 ? (
              recentActivities.slice(0, 5).map((act, index) => (
                <div key={index} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                    act.type === 'password'
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : act.type === 'quiz'
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {act.type === 'password' ? <KeyRound className="w-4 h-4" /> : act.type === 'quiz' ? <Fish className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{act.title}</p>
                    <p className="text-[11px] text-slate-400">{act.subtitle}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 whitespace-nowrap font-mono">{act.time}</span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs">
                <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p>No activity recorded yet.</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Interact with the modules to build your defense history!
                </p>
              </div>
            )}
          </div>

          {/* Quick Knowledge Spotlight */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Knowledge Spotlight
              </span>
            </div>
            <h4 className="text-xs font-semibold text-white">
              Why length beats complexity in passwords
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Every added character increases the search space exponentially. A 16-character passphrase of common words takes trillions of times longer to crack than an 8-character mixed password.
            </p>
            <button
              onClick={() => setCurrentView('tips')}
              className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>Explore 10+ Security Best Practices</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
