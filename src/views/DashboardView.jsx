import React from 'react';
import {
  ShieldCheck,
  KeyRound,
  Fish,
  Link2,
  Activity,
  ArrowRight,
  Sparkles,
  Lock,
  RefreshCw,
  Globe,
  Briefcase,
  Zap,
  Radio,
  Key
} from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';
import { SIX_SECURITY_TIPS } from '../utils/securityTips';

export default function DashboardView({
  setCurrentView,
  overallScore = 0,
  passwordScore = 0,
  quizCompleted = false,
  quizScore = 0,
  scannedUrlsCount = 0,
}) {
  const iconMap = {
    Key: <Key className="w-6 h-6 text-cyan-400" aria-hidden="true" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
    Fish: <Fish className="w-6 h-6 text-blue-400" aria-hidden="true" />,
    RefreshCw: <RefreshCw className="w-6 h-6 text-purple-400" aria-hidden="true" />,
    Globe: <Globe className="w-6 h-6 text-teal-400" aria-hidden="true" />,
    Briefcase: <Briefcase className="w-6 h-6 text-amber-400" aria-hidden="true" />
  };

  let securityLevelText = 'Needs Improvement';
  let levelColor = 'text-red-400';
  if (overallScore >= 85) {
    securityLevelText = 'Intelligent / Excellent';
    levelColor = 'text-emerald-400';
  } else if (overallScore >= 65) {
    securityLevelText = 'Good';
    levelColor = 'text-cyan-400';
  } else if (overallScore >= 40) {
    securityLevelText = 'Fair';
    levelColor = 'text-amber-400';
  }

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* 1. Hero Section: Educational Cybersecurity Platform */}
      <section
        className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-10 shadow-2xl"
        aria-labelledby="hero-title"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" aria-hidden="true"></div>
        <div className="absolute bottom-0 left-1/4 -mb-20 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" aria-hidden="true"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" aria-hidden="true" />
              <span>Educational Cybersecurity Awareness Platform</span>
            </div>

            <h1 id="hero-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Proactive Cyber Defense with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">CyberSafe</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              CyberSafe is an educational awareness platform built to train your instincts against modern cyber threats. Evaluate password strength, spot deceptive phishing scenarios, and inspect suspicious links—<strong>all calculated locally in your browser with zero external APIs</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentView('passwords')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Open Password Strength Checker"
              >
                <KeyRound className="w-4 h-4" aria-hidden="true" />
                <span>Check Password</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('quiz')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Open Phishing Awareness Quiz"
              >
                <Fish className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>Take Quiz</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('url')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Open URL Safety Checker"
              >
                <Link2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Check URL</span>
              </button>
            </div>
          </div>

          {/* Privacy & Zero-Backend Card */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-center shrink-0 lg:max-w-xs shadow-inner space-y-3" role="region" aria-label="Privacy Summary">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4" aria-hidden="true" />
              <span>100% Client-Side Privacy</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Passwords, quiz answers, and inspected URLs never leave your computer. Analysis runs entirely inside your browser memory with zero tracking.
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Architecture</span>
              <span className="text-emerald-400 font-semibold">Zero Backend</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Cards for the 3 Main Security Tools & Overall Security Score Card */}
      <section className="space-y-4" aria-labelledby="tools-section-title">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="tools-section-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              <span>Interactive Security Tools & Posture Scoreboard</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Live interactive cards updating as you interact with CyberSafe. Click any button to launch.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" role="list">
          {/* Card 1: Password Strength Checker */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-5 group" role="listitem">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform" aria-hidden="true">
                  <KeyRound className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Tool 1
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Password Checker
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Evaluate keyspace entropy, length, character diversity, and simulated GPU crack time without saving passwords.
                </p>
              </div>

              <div className="pt-2 text-xs">
                <span className="text-slate-400">Current Score: </span>
                <span className={`font-mono font-bold ${passwordScore > 70 ? 'text-emerald-400' : passwordScore > 40 ? 'text-amber-400' : 'text-slate-400'}`}>
                  {passwordScore > 0 ? `${passwordScore}%` : 'Not tested yet'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCurrentView('passwords')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Open Password Strength Checker"
            >
              <span>Check Password</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Card 2: Phishing Awareness Quiz */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-850 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-5 group" role="listitem">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform" aria-hidden="true">
                  <Fish className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Tool 2
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  Phishing Quiz
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  5 interactive scenario questions covering deceptive links, false urgency, fake logins, attachments, and OTP requests.
                </p>
              </div>

              <div className="pt-2 text-xs">
                <span className="text-slate-400">Quiz Status: </span>
                <span className={`font-mono font-bold ${quizCompleted ? 'text-blue-400' : 'text-slate-400'}`}>
                  {quizCompleted ? `${Math.round(quizScore)}% Completed` : 'Ready to start'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCurrentView('quiz')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Open Phishing Awareness Quiz"
            >
              <span>Take Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Card 3: URL Safety Checker */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-5 group" role="listitem">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform" aria-hidden="true">
                  <Link2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Tool 3
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  URL Safety Checker
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Heuristic client-side inspection of HTTPS encryption, IP literals, suspicious keywords, subdomain stacking, and deceptive chars.
                </p>
              </div>

              <div className="pt-2 text-xs">
                <span className="text-slate-400">Inspections: </span>
                <span className="font-mono font-bold text-emerald-400">
                  {scannedUrlsCount} links audited
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCurrentView('url')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Open URL Safety Checker"
            >
              <span>Check URL</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Card 4: Overall Security Score Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 shadow-xl flex flex-col items-center justify-between text-center space-y-4 group" role="listitem">
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" aria-hidden="true" />
                Scoreboard
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                0-100 Scale
              </span>
            </div>

            <div className="py-1">
              <ScoreGauge score={overallScore} size={140} strokeWidth={12} showDetails={false} />
            </div>

            <div className="w-full space-y-2">
              <div className="text-xs font-mono font-bold">
                <span className="text-slate-400">Level: </span>
                <span className={levelColor}>{securityLevelText}</span>
              </div>

              <button
                type="button"
                onClick={() => setCurrentView('score')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="View Detailed Security Scoreboard"
              >
                <span>View Score</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Improved Cybersecurity Tip Section: 6 Beginner-Friendly Tips */}
      <section className="space-y-6 pt-4" aria-labelledby="tips-section-title">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 id="tips-section-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              <span>Cybersecurity Essentials: 6 Beginner-Friendly Tips</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Fundamental best practices every user should know to protect passwords, devices, and personal privacy.
            </p>
          </div>
        </div>

        {/* 6 Polished Interactive Cards with Icons, Explanations, and Hover Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" role="list">
          {SIX_SECURITY_TIPS.map((tip, idx) => (
            <div
              key={tip.id}
              role="listitem"
              tabIndex={0}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-850 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-default focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={`Security tip ${idx + 1}: ${tip.title}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-110 transition-transform">
                    {iconMap[tip.iconName]}
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    Tip {idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tip.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {tip.summary}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {tip.details}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-cyan-300 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" aria-hidden="true"></span>
                <span className="leading-snug">{tip.actionAdvice}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
