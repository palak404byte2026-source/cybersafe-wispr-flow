import React, { useState } from 'react';
import {
  Fish,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Mail,
  MessageSquare,
  QrCode,
  BellRing,
  HelpCircle,
  Award,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Printer,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../utils/quizQuestions';

export default function PhishingQuiz({ onQuizCompleted, onShowToast }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userName, setUserName] = useState('Cybersecurity Defender');

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = currentQ.options[index].isCorrect;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz complete
      setQuizFinished(true);
      const finalPercentage = ((score + (currentQ.options[selectedOption]?.isCorrect ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;
      if (onQuizCompleted) {
        onQuizCompleted(finalPercentage);
      }
      if (finalPercentage >= 70) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        onShowToast({ type: 'success', message: 'Congratulations! Phishing Defense Certification earned!' });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  // Mock UI renderer based on question type
  const renderScenarioMockup = () => {
    switch (currentQ.type) {
      case 'email':
        return (
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 shadow-inner space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-slate-400">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-slate-300">Corporate Mailbox Inspector</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 text-[11px]">
              <span className="text-slate-500">From:</span>
              <span className="sm:col-span-3 text-red-300 font-semibold break-all">{currentQ.sender}</span>
              <span className="text-slate-500">Subject:</span>
              <span className="sm:col-span-3 text-white font-bold">{currentQ.subject}</span>
              <span className="text-slate-500">Date:</span>
              <span className="sm:col-span-3 text-slate-400">{currentQ.timestamp}</span>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800/80 text-slate-200 whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed">
              {currentQ.content}
            </div>
          </div>
        );

      case 'sms':
        return (
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 shadow-inner space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Encrypted Cellular SMS</span>
              </div>
              <span className="text-slate-500">{currentQ.sender}</span>
            </div>
            <div className="max-w-md mx-auto my-2">
              <div className="p-3.5 rounded-2xl rounded-tl-sm bg-slate-800 text-slate-100 text-xs sm:text-sm leading-relaxed border border-slate-700 shadow-md">
                <p className="whitespace-pre-wrap">{currentQ.content}</p>
                <span className="text-[10px] text-slate-400 block mt-1.5 text-right font-mono">{currentQ.timestamp}</span>
              </div>
            </div>
          </div>
        );

      case 'qr':
        return (
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 shadow-inner space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs text-slate-400 font-mono">
              <QrCode className="w-4 h-4 text-purple-400" />
              <span>Physical Space Intrusion: {currentQ.sender}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 text-center max-w-sm mx-auto space-y-3">
              <div className="w-20 h-20 mx-auto rounded-lg bg-white p-2 flex items-center justify-center">
                <QrCode className="w-16 h-16 text-slate-950" />
              </div>
              <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">{currentQ.content}</p>
            </div>
          </div>
        );

      case 'alert':
      default:
        return (
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 shadow-inner space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs text-slate-400 font-mono">
              <BellRing className="w-4 h-4 text-amber-400" />
              <span>Authenticator Prompt Flood Simulation</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 max-w-md mx-auto space-y-3 text-xs">
              <div className="font-semibold text-amber-300">{currentQ.subject}</div>
              <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{currentQ.content}</p>
            </div>
          </div>
        );
    }
  };

  const finalScorePercent = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Fish className="w-4 h-4" />
            <span>Interactive Threat Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Phishing & Social Engineering Lab
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Test your cognitive threat detection against modern Smishing, Quishing, CEO fraud, and MFA fatigue attacks.
          </p>
        </div>

        {/* Live Score Counter */}
        {!quizFinished && (
          <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl shrink-0">
            <div className="text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Score</span>
              <span className="text-lg font-mono font-bold text-white">{score} / {QUIZ_QUESTIONS.length}</span>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div className="text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Streak</span>
              <span className="text-lg font-mono font-bold text-cyan-400">🔥 {streak}</span>
            </div>
          </div>
        )}
      </div>

      {!quizFinished ? (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Scenario {currentIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-cyan-400 font-bold">{currentQ.difficulty} Tier</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Scenario Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
                <span>{currentQ.scenarioDescription}</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                {currentQ.title}
              </h2>
            </div>

            {/* Visual Realistic Mockup */}
            {renderScenarioMockup()}

            {/* Question prompt */}
            <div className="pt-2">
              <h3 className="text-sm sm:text-base font-bold text-white mb-4">
                {currentQ.question}
              </h3>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 text-slate-200';
                  if (isAnswered) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10';
                    } else if (selectedOption === idx) {
                      btnStyle = 'bg-red-500/15 border-red-500 text-red-200 shadow-lg shadow-red-500/10';
                    } else {
                      btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 ${btnStyle}`}
                    >
                      <div className="w-5 h-5 rounded-full border border-current shrink-0 flex items-center justify-center text-xs font-mono mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1 leading-relaxed">{opt.text}</span>
                      {isAnswered && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {isAnswered && selectedOption === idx && !opt.isCorrect && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation & Red Flags Drawer (Shows immediately after answering) */}
            {isAnswered && (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 animate-fade-in">
                <div className="flex items-center gap-2">
                  {currentQ.options[selectedOption]?.isCorrect ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Correct Detection!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Phished! High Security Risk</span>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>

                {/* Red Flags Highlight */}
                <div className="pt-2 border-t border-slate-900">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
                    Critical Red Flags in this Scenario:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {currentQ.redFlags.map((flag, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-400 font-bold shrink-0">⚠️</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Question Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
                  >
                    <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Scenario' : 'View Final Certification'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results & Certificate Screen */
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          {/* Summary Card */}
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                <Award className="w-10 h-10 text-cyan-400" />
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">Evaluation Completed</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                {finalScorePercent >= 80 ? 'Cyber Sentinel Defense Rating' : finalScorePercent >= 50 ? 'Security Practitioner' : 'Training Recommended'}
              </h2>
              <div className="text-5xl font-black font-mono text-cyan-300 mt-2">
                {finalScorePercent}%
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mt-2">
                You correctly identified {score} out of {QUIZ_QUESTIONS.length} malicious social engineering and phishing attack scenarios.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={handlePrintCertificate}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>

          {/* Printable Official Certificate */}
          <div className="p-8 sm:p-12 rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden shadow-2xl print:border-black print:bg-white print:text-black">
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>

            <div className="relative z-10 text-center space-y-6">
              <div className="flex items-center justify-center gap-2 text-cyan-400">
                <ShieldCheck className="w-8 h-8" />
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400">CyberSafe Security Institute</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                  CERTIFICATE OF CYBERSECURITY READINESS
                </h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                  Wispr Flow Voice-Driven Defense Challenge
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-400">This certifies that</p>
                <div className="max-w-xs mx-auto">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full text-center text-xl sm:text-2xl font-bold text-cyan-300 bg-transparent border-b border-cyan-500/50 focus:border-cyan-400 outline-none pb-1"
                    title="Click to edit your name"
                  />
                </div>
                <p className="text-[11px] text-slate-500 italic mt-1">(Click name above to customize)</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Has successfully demonstrated cognitive awareness against Business Email Compromise, QR code Quishing, SMS Smishing, and MFA prompt flooding attack vectors with a verified score of <strong className="text-cyan-400">{finalScorePercent}%</strong>.
              </p>

              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
                <div>Date: {new Date().toLocaleDateString()}</div>
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Verified Hash: CS-{Math.random().toString(36).substring(2, 9).toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
