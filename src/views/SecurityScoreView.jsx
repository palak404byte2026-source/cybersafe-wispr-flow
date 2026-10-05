import React from 'react';
import {
  Activity,
  KeyRound,
  Fish,
  Link2,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Lock,
  RefreshCw,
  CheckCircle2,
  Info
} from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';

export default function SecurityScoreView({
  overallScore = 0,
  passwordScore = 0,
  quizScore = 0,
  quizCompleted = false,
  scannedUrlsCount = 0,
  setCurrentView,
}) {
  // Exact 3 Pillars from user specification:
  // 1. Password Strength Result (up to 35 pts)
  // 2. Phishing Quiz Result (up to 35 pts)
  // 3. URL Safety Activity (up to 30 pts)
  const passwordPoints = Math.min(35, Math.round((passwordScore / 100) * 35));
  const quizPoints = quizCompleted ? Math.min(35, Math.round((quizScore / 100) * 35)) : 0;
  const urlPoints = Math.min(30, scannedUrlsCount * 10);

  const calculatedTotal = Math.min(100, passwordPoints + quizPoints + urlPoints);

  // Security levels: Needs Improvement, Fair, Good, Intelligent / Excellent
  let level = 'Needs Improvement';
  let levelColor = 'text-red-400';
  let badgeStyle = 'bg-red-500/10 text-red-400 border-red-500/30';
  let recommendation = '';

  if (calculatedTotal >= 85) {
    level = 'Intelligent / Excellent';
    levelColor = 'text-emerald-400';
    badgeStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    recommendation = 'Outstanding posture! Your password resilience, phishing detection rate, and proactive link auditing demonstrate an intelligent, hardened defense against modern cyber threats.';
  } else if (calculatedTotal >= 65) {
    level = 'Good';
    levelColor = 'text-cyan-400';
    badgeStyle = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    recommendation = 'Strong security foundation. To reach an Intelligent/Excellent score, continue testing higher-entropy passphrases (16+ chars) or inspect additional suspicious URLs before opening them.';
  } else if (calculatedTotal >= 40) {
    level = 'Fair';
    levelColor = 'text-amber-400';
    badgeStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    recommendation = 'Moderate security posture. Take the Phishing Awareness Quiz or test stronger, non-dictionary passwords to boost your defense against automated credential attacks.';
  } else {
    level = 'Needs Improvement';
    levelColor = 'text-red-400';
    badgeStyle = 'bg-red-500/10 text-red-400 border-red-500/30';
    recommendation = 'Action Required: Your security baseline is currently vulnerable. Complete the Password Checker, take the Phishing Quiz, and scan incoming web links to fortify your score.';
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Unified Defense Scoreboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Overall Security Score
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Composite cybersecurity posture dynamically calculated from your Password Strength, Phishing Quiz, and URL Safety activity.
          </p>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>Scores Only Stored • Never Passwords</span>
          </span>
        </div>
      </div>

      {/* Main Scoreboard Display Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/25 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radial Indicator Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-4">
            <ScoreGauge score={calculatedTotal} size={220} strokeWidth={16} showDetails={false} />

            <div className="space-y-1">
              <span className="text-xs uppercase font-mono text-slate-400 block tracking-wider">
                Current Posture Rating
              </span>
              <span className={`text-2xl sm:text-3xl font-black font-mono ${levelColor}`}>
                {level}
              </span>
            </div>
          </div>

          {/* Connected 3 Pillars Breakdown */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Connected Defense Activity Contributions (100 Pts Total)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Each completed tool directly increases your aggregate score in real-time.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Pillar 1: Password Strength */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <div className="flex items-center gap-2.5 text-white">
                    <KeyRound className="w-4 h-4 text-cyan-400" />
                    <span>Password Strength Evaluation</span>
                  </div>
                  <span className="font-mono text-cyan-400 font-bold">
                    {passwordPoints} / 35 pts
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${(passwordPoints / 35) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-0.5">
                  <span>Tested Strength: {passwordScore > 0 ? `${passwordScore}%` : 'Not tested yet'}</span>
                  <button
                    onClick={() => setCurrentView('passwords')}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                  >
                    <span>Check Password</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Pillar 2: Phishing Quiz */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <div className="flex items-center gap-2.5 text-white">
                    <Fish className="w-4 h-4 text-blue-400" />
                    <span>Phishing Awareness Quiz</span>
                  </div>
                  <span className="font-mono text-blue-400 font-bold">
                    {quizPoints} / 35 pts
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${(quizPoints / 35) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-0.5">
                  <span>Quiz Accuracy: {quizCompleted ? `${Math.round(quizScore)}%` : 'Incomplete'}</span>
                  <button
                    onClick={() => setCurrentView('quiz')}
                    className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                  >
                    <span>Take Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Pillar 3: URL Safety Activity */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <div className="flex items-center gap-2.5 text-white">
                    <Link2 className="w-4 h-4 text-emerald-400" />
                    <span>URL Safety Activity & Audits</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">
                    {urlPoints} / 30 pts
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                    style={{ width: `${(urlPoints / 30) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-0.5">
                  <span>Checked Links: {scannedUrlsCount} of 3 goal</span>
                  <button
                    onClick={() => setCurrentView('url')}
                    className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                  >
                    <span>Check URL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Card based on Score */}
      <div className={`p-6 rounded-2xl border shadow-xl space-y-2.5 ${badgeStyle}`}>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-current shrink-0" />
          <h3 className="font-bold text-base text-white">
            Personalized Posture Recommendation
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {recommendation}
        </p>
      </div>

      {/* Privacy Notice on Storage */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Storage Safety Notice:</strong> CyberSafe stores only non-sensitive numerical scores, quiz percentage, and URL scan counts locally in your browser’s <code className="text-cyan-300 font-mono">localStorage</code>. <strong>Your actual passwords are never stored, saved, or persisted anywhere</strong>.
        </p>
      </div>
    </div>
  );
}
