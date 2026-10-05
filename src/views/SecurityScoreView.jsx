import React, { useState } from 'react';
import {
  Activity,
  ShieldCheck,
  CheckSquare,
  Square,
  Download,
  Share2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Lock,
  KeyRound,
  Fish,
  Link2,
  FileCheck
} from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';

export const HYGIENE_ITEMS = [
  {
    id: 'mfa',
    title: 'Multi-Factor Authentication (MFA / 2FA)',
    desc: 'Enabled authenticator app or hardware keys on primary email, cloud storage, and banking.',
    points: 4,
  },
  {
    id: 'auto_updates',
    title: 'Automated OS & Browser Security Patches',
    desc: 'Windows/macOS and browser auto-updates active to defend against disclosed N-day exploits.',
    points: 4,
  },
  {
    id: 'password_manager',
    title: 'Dedicated Password Vault in Use',
    desc: '100% unique passwords generated per service; zero password reuse across logins.',
    points: 4,
  },
  {
    id: 'vpn_public',
    title: 'Encrypted VPN on Public / Hotel Wi-Fi',
    desc: 'Never transmitting credentials or session tokens over unencrypted open airport or cafe networks.',
    points: 4,
  },
  {
    id: 'screen_lock',
    title: 'Screen Auto-Lock <= 2 Minutes',
    desc: 'Device automatically locks to prevent physical tampering and unauthorized physical access.',
    points: 3,
  },
  {
    id: 'backups',
    title: 'Encrypted Backups (3-2-1 Strategy)',
    desc: '3 copies, 2 different media, 1 offsite encrypted cloud backup to immunize against ransomware.',
    points: 4,
  },
  {
    id: 'passkeys',
    title: 'FIDO2 / Hardware Passkeys Adopted',
    desc: 'Using biometric Touch ID / Face ID / YubiKey where supported to eliminate phishing risks.',
    points: 4,
  },
  {
    id: 'privacy_audit',
    title: 'Social Media & Phone Privacy Hardened',
    desc: 'Phone numbers and birthday hidden from public profiles to thwart SIM-swapping and spear-phishing.',
    points: 3,
  },
];

export default function SecurityScoreView({
  overallScore = 0,
  passwordScore = 0,
  quizScore = 0,
  quizCompleted = false,
  scannedUrlsCount = 0,
  checklistState = {},
  onToggleChecklistItem,
  onShowToast,
  setCurrentView,
}) {
  const [exportModal, setExportModal] = useState(false);

  // Compute breakdown points
  const passwordWeight = Math.min(25, Math.round((passwordScore / 100) * 25));
  const quizWeight = quizCompleted ? Math.min(25, Math.round((quizScore / 100) * 25)) : 0;
  const urlWeight = Math.min(20, scannedUrlsCount * 5); // 4 scans = max 20 pts

  let checklistPoints = 0;
  HYGIENE_ITEMS.forEach(item => {
    if (checklistState[item.id]) checklistPoints += item.points;
  });

  const computedTotal = Math.min(100, passwordWeight + quizWeight + urlWeight + checklistPoints);

  // Grade
  let grade = 'F';
  let gradeColor = 'text-red-400';
  if (computedTotal >= 90) { grade = 'A+'; gradeColor = 'text-emerald-400'; }
  else if (computedTotal >= 80) { grade = 'A'; gradeColor = 'text-emerald-400'; }
  else if (computedTotal >= 70) { grade = 'B'; gradeColor = 'text-cyan-400'; }
  else if (computedTotal >= 55) { grade = 'C'; gradeColor = 'text-amber-400'; }
  else if (computedTotal >= 40) { grade = 'D'; gradeColor = 'text-orange-400'; }

  const handleExportReport = () => {
    const reportData = {
      platform: 'CyberSafe (Wispr Flow Voice-Driven Development Challenge)',
      generatedAt: new Date().toISOString(),
      overallScore: computedTotal,
      grade,
      breakdown: {
        passwordDefenseScore: `${passwordScore}/100 (${passwordWeight}/25 pts)`,
        phishingDefenseScore: quizCompleted ? `${Math.round(quizScore)}% (${quizWeight}/25 pts)` : 'Incomplete (0/25 pts)',
        urlInspectionsCount: `${scannedUrlsCount} urls (${urlWeight}/20 pts)`,
        hygieneChecklistScore: `${checklistPoints}/30 pts`,
      },
      completedHygieneControls: HYGIENE_ITEMS.filter(item => checklistState[item.id]).map(i => i.title),
      pendingHygieneControls: HYGIENE_ITEMS.filter(item => !checklistState[item.id]).map(i => i.title),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cybersafe-audit-report-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    onShowToast({ type: 'success', message: 'Cybersecurity Health Audit Report downloaded!' });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Aggregate Posture Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Overall Security Health Score & Hygiene Radar
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Synthesized rating computed from password entropy, phishing challenge scores, URL scans, and endpoint controls.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-semibold text-xs transition-colors shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit JSON</span>
        </button>
      </div>

      {/* Main Score Hero Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/20 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Gauge Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <ScoreGauge score={computedTotal} size={220} strokeWidth={16} showDetails={false} />
            <div className="mt-4 flex items-center gap-3">
              <span className={`text-4xl font-black font-mono ${gradeColor}`}>Grade {grade}</span>
              <span className="text-xs uppercase font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {computedTotal >= 80 ? 'Fortified Posture' : computedTotal >= 60 ? 'Resilient' : 'Action Required'}
              </span>
            </div>
          </div>

          {/* Mathematical Pillars Breakdown */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Composite Defense Weight Breakdown (100 Pts Total)
            </h3>

            <div className="space-y-3">
              {/* Pillar 1: Password */}
              <div
                onClick={() => setCurrentView('passwords')}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-300 flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-cyan-400" />
                    <span>Password Defense & Entropy</span>
                  </span>
                  <span className="font-mono text-cyan-400">{passwordWeight} / 25 pts</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${(passwordWeight / 25) * 100}%` }} />
                </div>
              </div>

              {/* Pillar 2: Phishing */}
              <div
                onClick={() => setCurrentView('quiz')}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Fish className="w-4 h-4 text-blue-400" />
                    <span>Phishing Simulation Mastery</span>
                  </span>
                  <span className="font-mono text-blue-400">{quizWeight} / 25 pts</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-400 transition-all duration-500" style={{ width: `${(quizWeight / 25) * 100}%` }} />
                </div>
              </div>

              {/* Pillar 3: URL Scans */}
              <div
                onClick={() => setCurrentView('url')}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-emerald-400" />
                    <span>URL Threat Scanner Verification</span>
                  </span>
                  <span className="font-mono text-emerald-400">{urlWeight} / 20 pts</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${(urlWeight / 20) * 100}%` }} />
                </div>
              </div>

              {/* Pillar 4: Hygiene Checklist */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-300 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-purple-400" />
                    <span>Security Hygiene Checklist</span>
                  </span>
                  <span className="font-mono text-purple-400">{checklistPoints} / 30 pts</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-purple-400 transition-all duration-500" style={{ width: `${(checklistPoints / 30) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Hygiene Checklist */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-cyan-400" />
              <span>Interactive Defense Checklist (Live Score Booster)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Toggle these 8 essential cybersecurity habits to harden your personal digital perimeter and boost your score.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {Object.values(checklistState).filter(Boolean).length} / {HYGIENE_ITEMS.length} Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {HYGIENE_ITEMS.map((item) => {
            const isChecked = !!checklistState[item.id];
            return (
              <div
                key={item.id}
                onClick={() => onToggleChecklistItem(item.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                  isChecked
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-white shadow-inner'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                      +{item.points} pts
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
