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
  KeyRound
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../utils/quizQuestions';

export default function PhishingQuiz({ onQuizCompleted, onShowToast }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [progressionError, setProgressionError] = useState('');

  // Gracefully handle edge cases if QUIZ_QUESTIONS is undefined or empty
  const questionsList = Array.isArray(QUIZ_QUESTIONS) && QUIZ_QUESTIONS.length > 0 ? QUIZ_QUESTIONS : [];
  const currentQ = questionsList[currentIndex] || {
    id: 1,
    theme: 'Phishing Awareness',
    title: 'Security Question',
    scenario: 'Loading scenario...',
    question: 'Please wait...',
    options: [],
    explanation: ''
  };

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setProgressionError('');
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = currentQ.options[index]?.isCorrect || false;
    setAnswers(prev => [...prev, {
      questionId: currentQ.id,
      theme: currentQ.theme,
      selectedIndex: index,
      isCorrect,
      explanation: currentQ.explanation
    }]);
  };

  // Prevent invalid progression: cannot continue without selecting an answer
  const handleNext = () => {
    if (!isAnswered || selectedOption === null) {
      setProgressionError('Please select one of the four options above before proceeding.');
      onShowToast?.({ type: 'warning', message: 'Please select an answer to continue.' });
      return;
    }

    setProgressionError('');

    if (currentIndex < questionsList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz completed
      setQuizFinished(true);
      const correctCount = answers.filter(a => a.isCorrect).length + (currentQ.options[selectedOption]?.isCorrect ? 1 : 0);
      const percentage = Math.round((correctCount / questionsList.length) * 100);
      onQuizCompleted?.(percentage);

      if (percentage >= 80) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore canvas-confetti error if not supported
        }
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
    setProgressionError('');
  };

  const themeIcons = {
    'Suspicious Links': <Link2 className="w-4 h-4 text-cyan-400" aria-hidden="true" />,
    'Urgent Messages': <Clock className="w-4 h-4 text-amber-400" aria-hidden="true" />,
    'Fake Login Pages': <Lock className="w-4 h-4 text-purple-400" aria-hidden="true" />,
    'Unexpected Attachments': <Paperclip className="w-4 h-4 text-red-400" aria-hidden="true" />,
    'Requests for Sensitive Information': <KeyRound className="w-4 h-4 text-emerald-400" aria-hidden="true" />
  };

  const totalCorrect = answers.filter(a => a.isCorrect).length;
  const percentageScore = questionsList.length > 0 ? Math.round((totalCorrect / questionsList.length) * 100) : 0;

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
            <Fish className="w-4 h-4" aria-hidden="true" />
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
          <div
            className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-300"
            aria-live="polite"
          >
            <span>Question {currentIndex + 1} of {questionsList.length}</span>
          </div>
        )}
      </div>

      {!quizFinished ? (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress Bar (Shows 1 question at a time) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                {themeIcons[currentQ.theme] || <Fish className="w-4 h-4 text-cyan-400" aria-hidden="true" />}
                Theme {currentIndex + 1}: {currentQ.theme}
              </span>
              <span>{Math.round(((currentIndex) / questionsList.length) * 100)}% Complete</span>
            </div>
            <div
              className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700/50"
              role="progressbar"
              aria-valuenow={currentIndex + 1}
              aria-valuemin="1"
              aria-valuemax={questionsList.length}
              aria-label={`Quiz progress: question ${currentIndex + 1} of ${questionsList.length}`}
            >
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questionsList.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-cyan-300 text-xs font-semibold mb-3 border border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true"></span>
                <span>{currentQ.theme}</span>
              </div>
              <h2 id="quiz-question-title" className="text-lg sm:text-xl font-bold text-white">
                {currentQ.title}
              </h2>
            </div>

            {/* Scenario Box */}
            <div
              className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-300 text-xs sm:text-sm leading-relaxed font-mono"
              role="region"
              aria-label="Scenario details"
            >
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
            <div
              className="space-y-3"
              role="radiogroup"
              aria-labelledby="quiz-question-title"
            >
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'bg-slate-950/70 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 text-slate-200';
                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-500/20 border-red-500 text-red-200 shadow-lg shadow-red-500/10';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3.5 focus-visible:ring-2 focus-visible:ring-cyan-400 ${btnStyle}`}
                  >
                    <div className="w-6 h-6 rounded-full border border-current shrink-0 flex items-center justify-center text-xs font-mono font-bold mt-0.5" aria-hidden="true">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                    {isAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-label="Correct answer" />
                    )}
                    {isAnswered && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-label="Incorrect answer" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Error Message if user attempts invalid progression */}
            {progressionError && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2" role="alert">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                <span>{progressionError}</span>
              </div>
            )}

            {/* Answer Explanation & Continue Button */}
            {isAnswered && (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-fade-in" aria-live="polite">
                <div className="flex items-center gap-2">
                  {currentQ.options[selectedOption]?.isCorrect ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                      <span>Correct Answer!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                      <AlertTriangle className="w-5 h-5" aria-hidden="true" />
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
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span>{currentIndex < questionsList.length - 1 ? 'Next Question' : 'View Final Score'}</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
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
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 shadow-lg shadow-cyan-500/30" aria-hidden="true">
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
                  <span className="text-3xl font-black font-mono text-white" aria-label={`Score: ${totalCorrect} out of ${questionsList.length}`}>
                    {totalCorrect} / {questionsList.length}
                  </span>
                </div>
                <div className="p-3 px-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-500 uppercase font-bold block">Percentage</span>
                  <span className="text-3xl font-black font-mono text-cyan-400" aria-label={`Percentage: ${percentageScore} percent`}>
                    {percentageScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Security Awareness Message */}
            <div className={`p-5 rounded-2xl border text-left space-y-2 ${badgeColor}`} role="region" aria-label="Awareness feedback">
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2 text-white">
                <ShieldCheck className="w-5 h-5 text-current shrink-0" aria-hidden="true" />
                <span>{awarenessTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {awarenessMessage}
              </p>
            </div>

            {/* Restart Quiz Button */}
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
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
              {questionsList.map((q, idx) => {
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
