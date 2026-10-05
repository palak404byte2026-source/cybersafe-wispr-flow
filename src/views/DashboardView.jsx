import React, { useState } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Fish,
  Link2,
  Activity,
  ArrowRight,
  Sparkles,
  Lock,
  Bookmark,
  CheckCircle2,
  Clock,
  Radio,
  FileCheck,
  Zap,
  Globe,
  Smartphone,
  Wifi,
  Key
} from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';
import { SECURITY_TIPS } from '../utils/securityTips';

export default function DashboardView({
  setCurrentView,
  overallScore = 0,
  passwordScore = 0,
  quizCompleted = false,
  quizScore = 0,
  scannedUrlsCount = 0,
  completedChecklistCount = 0,
  masteredTips = {},
  bookmarkedTips = {},
  onToggleMasteredTip,
  onToggleBookmarkTip,
}) {
  const [selectedTipCategory, setSelectedTipCategory] = useState('all');

  const tipCategories = [
    { id: 'all', label: 'All Tips' },
    { id: 'passwords', label: 'Passwords' },
    { id: 'phishing', label: 'Phishing' },
    { id: 'browsing', label: 'Browsing' },
    { id: 'devices', label: 'Devices' },
    { id: 'network', label: 'Network' },
  ];

  const displayedTips = SECURITY_TIPS.filter(
    tip => selectedTipCategory === 'all' || tip.category === selectedTipCategory
  );

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* 1. Hero Section: Educational Cybersecurity Awareness Platform */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-10 shadow-2xl">
        {/* Cyber glow effects */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 -mb-20 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>Educational Cybersecurity Awareness Platform • Wispr Flow Challenge</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Master Digital Defense with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">CyberSafe</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              CyberSafe is an interactive, educational cybersecurity awareness platform designed to help you analyze password resilience, identify sophisticated phishing traps, inspect deceptive URLs, and elevate your overall digital hygiene—all calculated <strong>100% locally in your browser with zero data collection</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentView('passwords')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <KeyRound className="w-4 h-4" />
                <span>Test Password Strength</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('quiz')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95"
              >
                <Fish className="w-4 h-4 text-cyan-400" />
                <span>Take Phishing Quiz</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('url')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95"
              >
                <Link2 className="w-4 h-4 text-emerald-400" />
                <span>Scan URL Safety</span>
              </button>
            </div>
          </div>

          {/* Privacy & Zero-Log Educational Highlight */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-center shrink-0 lg:max-w-xs shadow-inner space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Zero-Leak Guarantee</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              No backend server. No telemetry. All password entropy algorithms, link heuristics, and quiz evaluations run exclusively inside your browser runtime.
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Client-Side</span>
              <span className="text-emerald-400 font-semibold">Active & Secure</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Cards for the 3 Main Security Tools + Overall Security Score Card */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>Core Defense Tools & Security Score</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Click any tool card below to run interactive simulations and view live assessments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Tool Card 1: Password Strength Checker */}
          <div
            onClick={() => setCurrentView('passwords')}
            className="group cursor-pointer p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setCurrentView('passwords')}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                  <KeyRound className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Tool #1
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Password Strength Checker
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Analyze password entropy locally, test against 5 core criteria, simulate GPU brute-force crack time, and generate fortified keys.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Status:</span>
              <span className="font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>{passwordScore > 0 ? `Tested (${passwordScore}%)` : 'Ready to Test'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Tool Card 2: Phishing Awareness Quiz */}
          <div
            onClick={() => setCurrentView('quiz')}
            className="group cursor-pointer p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setCurrentView('quiz')}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                  <Fish className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Tool #2
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Phishing Awareness Quiz
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  5 interactive scenario questions covering suspicious links, urgent messages, cloned login portals, malicious attachments, and OTP requests.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Progress:</span>
              <span className="font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>{quizCompleted ? `Completed (${Math.round(quizScore)}%)` : '5 Questions Ready'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Tool Card 3: URL Safety Checker */}
          <div
            onClick={() => setCurrentView('url')}
            className="group cursor-pointer p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setCurrentView('url')}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Link2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Tool #3
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  URL Safety Checker
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Deep client-side heuristic inspection of unencrypted HTTP, raw IP addresses, high-risk TLDs, and deceptive brand typosquatting.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Inspections:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>{scannedUrlsCount} Scanned</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Tool Card 4: Overall Security Score Card */}
          <div
            onClick={() => setCurrentView('score')}
            className="group cursor-pointer p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 shadow-xl flex flex-col items-center justify-between text-center relative overflow-hidden"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setCurrentView('score')}
          >
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                Posture Radar
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Composite
              </span>
            </div>

            <ScoreGauge score={overallScore} size={135} strokeWidth={11} showDetails={true} />

            <div className="w-full pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs mt-3">
              <span className="text-slate-400 font-medium">Hygiene:</span>
              <span className="font-bold text-purple-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>{completedChecklistCount} / 8 Controls</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Security Tips Section */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Cybersecurity Defense Tips</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Actionable, practical habits to protect your identity, credentials, and digital footprint.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {tipCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedTipCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTipCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedTips.slice(0, 6).map((tip) => {
            const isBookmarked = !!bookmarkedTips[tip.id];
            const isMastered = !!masteredTips[tip.id];

            return (
              <div
                key={tip.id}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {tip.category}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onToggleBookmarkTip?.(tip.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBookmarked ? 'text-cyan-400 bg-slate-800' : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title={isBookmarked ? 'Bookmarked' : 'Save Tip'}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleMasteredTip?.(tip.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isMastered ? 'text-emerald-400 bg-slate-800' : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title={isMastered ? 'Mastered' : 'Mark as Mastered'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {tip.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tip.summary}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {tip.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {tip.readTime}
                  </span>
                  <span className={`font-semibold ${
                    tip.impact === 'Critical' ? 'text-red-400' : tip.impact === 'High' ? 'text-amber-400' : 'text-cyan-400'
                  }`}>
                    {tip.impact} Impact
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
