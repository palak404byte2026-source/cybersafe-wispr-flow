import React, { useState } from 'react';
import {
  Fish,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
  Award,
  Link2,
  Clock,
  Lock,
  Paperclip,
  KeyRound,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../utils/quizQuestions';

export default function PhishingQuiz({ onQuizCompleted, onShowToast }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState([]); // stores { questionId, selectedIndex, isCorrect }
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = currentQ.options[index].isCorrect;
    setAnswers(prev => [...prev, {
      questionId: currentQ.id,
      theme: currentQ.theme,
      selectedIndex: index,
      isCorrect,
      explanation: currentQ.explanation
    }]);
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz finished
      setQuizFinished(true);
      const correctCount = answers.filter(a => a.isCorrect).length + (currentQ.options[selectedOption]?.isCorrect ? 1 : 0);
      const percentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
      onQuizCompleted?.(percentage);

      if (percentage >= 80) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onShowToast?.({ type: 'success', message: `Great job! Score: ${correctCount}/5 (${percentage}%)` });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnswers([]);
    setQuizFinished(false);
  };

  // Theme icons
  const themeIcons = {
    'Suspicious Links': <Link2 className="w-4 h-4 text-cyan-400" />,
    'Urgent Messages': <Clock className="w-4 h-4 text-amber-400" />,
    'Fake Login Pages': <Lock className="w-4 h-4 text-purple-400" />,
    'Unexpected Attachments': <Paperclip className="w-4 h-4 text-red-400" />,
    'Requests for Sensitive Information': <KeyRound className="w-4 h-4 text-emerald-400" />
  };

  // End calculations
  const totalCorrect = answers.filter(a => a.isCorrect).length;
  const percentageScore = Math.round((totalCorrect / QUIZ_QUESTIONS.length) * 100);

  // Security awareness messages based on score
  let awarenessTitle = '';
  let awarenessMessage = '';
  let badgeColor = '';

  if (percentageScore === 100) {
    awarenessTitle = 'Elite Cyber Sentinel (Fortified Defense)';
    awarenessMessage = 'Outstanding performance! You successfully spotted all 5 critical attack vectors: suspicious link manipulation, manufactured urgency, cloned login portals, executable attachments, and social engineering OTP requests. Keep maintaining this level of vigilance.';
    badgeColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
  } else if (percentageScore >= 80) {
    awarenessTitle = 'High Security Awareness (Resilient)';
    awarenessMessage = 'Great work! You demonstrated strong awareness across most phishing themes. Review the question you missed below to close any remaining attack vector gaps before real threat actors can exploit them.';
    badgeColor = 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10';
  } else if (percentageScore >= 60) {
    awarenessTitle = 'Moderate Security Awareness (Caution Advised)';
    awarenessMessage = 'You caught several common red flags, but fell for deceptive traps. Remember: always inspect the true destination domain in links, never trust artificial urgency, and never disclose one-time passwords to anyone.';
    badgeColor = 'text-amber-400 border-amber-500/40 bg-amber-500/10';
  } else {
    awarenessTitle = 'High Vulnerability Risk (Immediate Training Recommended)';
    awarenessMessage = 'Your responses indicate high susceptibility to real-world social engineering and phishing campaigns. Take time to study the explanations below: threat actors rely heavily on double extensions and urgency to breach accounts.';
    badgeColor = 'text-red-400 border-red-500/40 bg-red-500/10';
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Fish className="w-4 h-4" />
            <span>Interactive Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Phishing Awareness Quiz
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            A 5-question cognitive challenge testing your detection of suspicious links, fake logins, urgency, malicious attachments, and sensitive data requests.
          </p>
        </div>

        {!quizFinished && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-300">
            <span>Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</span>
          </div>
        )}
      </div>

      {!quizFinished ? (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress Bar (Shows 1 question at a time) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                {themeIcons[currentQ.theme]}
                Theme {currentIndex + 1}: {currentQ.theme}
              </span>
              <span>{Math.round(((currentIndex) / QUIZ_QUESTIONS.length) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-cyan-300 text-xs font-semibold mb-3 border border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>{currentQ.theme}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {currentQ.title}
              </h2>
            </div>

            {/* Scenario Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-300 text-xs sm:text-sm leading-relaxed font-mono">
              <span className="text-[11px] text-slate-500 block uppercase font-bold tracking-wider mb-1">
                Scenario Simulation:
              </span>
              {currentQ.scenario}
            </div>

            {/* Question Text */}
            <h3 className="text-sm sm:text-base font-bold text-white pt-1">
              {currentQ.question}
            </h3>

            {/* 4 Multiple Choice Answers */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 text-slate-200';
                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10 font-semibold';
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-red-500/20 border-red-500 text-red-200 shadow-lg shadow-red-500/10';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3.5 ${btnStyle}`}
                  >
                    <div className="w-6 h-6 rounded-full border border-current shrink-0 flex items-center justify-center text-xs font-mono font-bold mt-0.5">
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

            {/* Brief Answer Explanation (shows immediately after selecting) */}
            {isAnswered && (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-fade-in">
                <div className="flex items-center gap-2">
                  {currentQ.options[selectedOption]?.isCorrect ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Correct Answer!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Phished! Incorrect Detection</span>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-white">Explanation: </strong>
                  {currentQ.explanation}
                </p>

                {/* Continue to Next Question Button */}
                <div className="pt-3 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
                  >
                    <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Final Score'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* End Screen: Score out of 5, Percentage, Awareness Message, Brief Explanations, Restart Button */
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          {/* Main Results Card */}
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl text-center space-y-5">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 shadow-lg shadow-cyan-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                <Award className="w-10 h-10 text-cyan-400" />
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                Assessment Complete
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Phishing Awareness Evaluation
              </h2>

              {/* Score out of 5 & Percentage */}
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="p-3 px-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-500 uppercase font-bold block">Score</span>
                  <span className="text-3xl font-black font-mono text-white">
                    {totalCorrect} / {QUIZ_QUESTIONS.length}
                  </span>
                </div>
                <div className="p-3 px-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-500 uppercase font-bold block">Percentage</span>
                  <span className="text-3xl font-black font-mono text-cyan-400">
                    {percentageScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Security Awareness Message */}
            <div className={`p-5 rounded-2xl border text-left space-y-2 ${badgeColor}`}>
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2 text-white">
                <ShieldCheck className="w-5 h-5 text-current shrink-0" />
                <span>{awarenessTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {awarenessMessage}
              </p>
            </div>

            {/* Restart Quiz Button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25 hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart Quiz</span>
              </button>
            </div>
          </div>

          {/* Answer Breakdown & Explanations Review */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Brief Explanations & Question Review
            </h3>

            <div className="space-y-4">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const answerRecord = answers.find(a => a.questionId === q.id);
                const wasCorrect = answerRecord?.isCorrect;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border space-y-2 ${
                      wasCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'bg-red-950/20 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Theme {idx + 1}: {q.theme}
                      </span>
                      <span className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded ${
                        wasCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {wasCorrect ? 'Correct' : 'Missed'}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {q.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-white">Explanation: </strong>
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
