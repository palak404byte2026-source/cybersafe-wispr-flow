import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VoiceAssistant from './components/VoiceAssistant';
import Toast from './components/Toast';

import DashboardView from './views/DashboardView';
import PasswordChecker from './views/PasswordChecker';
import PhishingQuiz from './views/PhishingQuiz';
import UrlScanner from './views/UrlScanner';
import SecurityScoreView from './views/SecurityScoreView';
import TipsView from './views/TipsView';

import { getStoredData, setStoredData, KEYS } from './utils/storage';
import { generateSecurePassword } from './utils/passwordEvaluator';

export default function App() {
  // Navigation view state
  const [currentView, setCurrentView] = useState('dashboard');

  // Application state persisted in localStorage
  const [passwordScore, setPasswordScore] = useState(() => getStoredData(KEYS.PASSWORD_HISTORY, 0));
  const [quizScore, setQuizScore] = useState(() => getStoredData(KEYS.QUIZ_RESULTS, 0));
  const [quizCompleted, setQuizCompleted] = useState(() => getStoredData('cybersafe_quiz_completed', false));
  const [scannedUrls, setScannedUrls] = useState(() => getStoredData(KEYS.URL_HISTORY, []));
  const [masteredTips, setMasteredTips] = useState(() => getStoredData(KEYS.MASTERED_TIPS, {}));
  const [bookmarkedTips, setBookmarkedTips] = useState(() => getStoredData(KEYS.BOOKMARKED_TIPS, {}));
  const [recentActivities, setRecentActivities] = useState(() =>
    getStoredData('cybersafe_recent_activities', [
      {
        type: 'password',
        title: 'Initial Password Vault Check',
        subtitle: 'Entropy checked for sample master passphrase',
        time: 'Today',
      },
      {
        type: 'url',
        title: 'Heuristic URL Scanner Active',
        subtitle: 'Protection filters ready for incoming domain queries',
        time: 'Today',
      }
    ])
  );

  // External generated password for Voice Assistant trigger
  const [externalGeneratedPassword, setExternalGeneratedPassword] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  // Log activity helper
  const addRecentActivity = (type, title, subtitle) => {
    const newActivity = {
      type,
      title,
      subtitle,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newActivity, ...recentActivities.slice(0, 9)];
    setRecentActivities(updated);
    setStoredData('cybersafe_recent_activities', updated);
  };

  // Handlers for modules
  const handlePasswordEvaluated = (score, _label) => {
    setPasswordScore(score);
    setStoredData(KEYS.PASSWORD_HISTORY, score);
  };

  const handleQuizCompleted = (finalScorePercent) => {
    setQuizScore(finalScorePercent);
    setQuizCompleted(true);
    setStoredData(KEYS.QUIZ_RESULTS, finalScorePercent);
    setStoredData('cybersafe_quiz_completed', true);
    addRecentActivity('quiz', `Phishing Lab Completed (${Math.round(finalScorePercent)}%)`, 'All scenario vectors assessed');
  };

  const handleUrlScanned = (result) => {
    const updated = [result, ...scannedUrls.filter(u => u.url !== result.url).slice(0, 19)];
    setScannedUrls(updated);
    setStoredData(KEYS.URL_HISTORY, updated);
    addRecentActivity('url', `Scanned ${result.hostname}`, `Risk: ${result.riskLevel} (${result.threatScore}% threat)`);
    showToast({
      type: result.threatScore > 50 ? 'warning' : 'success',
      message: `Inspection finished for ${result.hostname}. Verdict: ${result.riskLevel}.`
    });
  };

  const handleToggleMasteredTip = (id) => {
    const updated = { ...masteredTips, [id]: !masteredTips[id] };
    setMasteredTips(updated);
    setStoredData(KEYS.MASTERED_TIPS, updated);
    showToast({
      type: 'success',
      message: updated[id] ? 'Marked tip as mastered!' : 'Removed from mastered list.'
    });
  };

  const handleToggleBookmarkTip = (id) => {
    const updated = { ...bookmarkedTips, [id]: !bookmarkedTips[id] };
    setBookmarkedTips(updated);
    setStoredData(KEYS.BOOKMARKED_TIPS, updated);
    showToast({
      type: 'info',
      message: updated[id] ? 'Tip added to bookmarks.' : 'Bookmark removed.'
    });
  };

  // Generate password on voice assistant command
  const handleVoiceGeneratePassword = () => {
    const newPass = generateSecurePassword({ length: 18 });
    setExternalGeneratedPassword(newPass);
    addRecentActivity('password', 'Wispr Voice Generated Password', 'Fortified 18-character key generated');
  };

  // Dynamic Overall Security Score calculation (0 to 100):
  // 1. Password Strength Result: up to 35 points
  // 2. Phishing Quiz Result: up to 35 points
  // 3. URL Safety Activity: up to 30 points (10 pts per scanned link, max 30)
  const passwordPoints = Math.min(35, Math.round((passwordScore / 100) * 35));
  const quizPoints = quizCompleted ? Math.min(35, Math.round((quizScore / 100) * 35)) : 0;
  const urlPoints = Math.min(30, scannedUrls.length * 10);

  const overallSecurityScore = Math.min(100, passwordPoints + quizPoints + urlPoints);


  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        overallScore={overallSecurityScore}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentView === 'dashboard' && (
          <DashboardView
            setCurrentView={setCurrentView}
            overallScore={overallSecurityScore}
            passwordScore={passwordScore}
            quizCompleted={quizCompleted}
            quizScore={quizScore}
            scannedUrlsCount={scannedUrls.length}
          />
        )}

        {currentView === 'passwords' && (
          <PasswordChecker
            onPasswordEvaluated={handlePasswordEvaluated}
            onShowToast={showToast}
            externalGeneratedPassword={externalGeneratedPassword}
          />
        )}

        {currentView === 'quiz' && (
          <PhishingQuiz
            onQuizCompleted={handleQuizCompleted}
            onShowToast={showToast}
          />
        )}

        {currentView === 'url' && (
          <UrlScanner
            onUrlScanned={handleUrlScanned}
            onShowToast={showToast}
            scanHistory={scannedUrls}
          />
        )}

        {currentView === 'score' && (
          <SecurityScoreView
            overallScore={overallSecurityScore}
            passwordScore={passwordScore}
            quizScore={quizScore}
            quizCompleted={quizCompleted}
            scannedUrlsCount={scannedUrls.length}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'tips' && (
          <TipsView
            masteredTips={masteredTips}
            bookmarkedTips={bookmarkedTips}
            onToggleMastered={handleToggleMasteredTip}
            onToggleBookmark={handleToggleBookmarkTip}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Floating Wispr Flow Voice Assistant */}
      <VoiceAssistant
        setCurrentView={setCurrentView}
        onShowToast={showToast}
        overallScore={overallSecurityScore}
        onGeneratePassword={handleVoiceGeneratePassword}
      />

      {/* Global Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}
