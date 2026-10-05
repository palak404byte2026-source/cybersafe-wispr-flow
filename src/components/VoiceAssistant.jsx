import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, X, Play } from 'lucide-react';

export default function VoiceAssistant({
  setCurrentView,
  onShowToast,
  overallScore = 0,
  onGeneratePassword,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(() => {
    return typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  });
  const [spokenFeedback, setSpokenFeedback] = useState(true);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const handleVoiceCommandRef = useRef(null);
  const onShowToastRef = useRef(onShowToast);

  useEffect(() => {
    onShowToastRef.current = onShowToast;
  }, [onShowToast]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    if (!SpeechRecognition) {
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);

        if (event.results[0].isFinal) {
          handleVoiceCommandRef.current?.(currentTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error !== 'no-speech') {
          onShowToastRef.current?.({
            type: 'warning',
            message: `Voice error: ${event.error}. You can still use the 1-click voice command buttons!`
          });
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Speech Recognition setup failed:', e);
      setTimeout(() => setSpeechSupported(false), 0);
    }
  }, []);

  const speakText = (text) => {
    if (!spokenFeedback || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  };

  const toggleListening = () => {
    if (!speechSupported) {
      onShowToast({
        type: 'info',
        message: 'Browser speech recognition not detected. Try the interactive 1-click command simulator below!'
      });
      setIsOpen(true);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        setIsOpen(true);
      } catch (err) {
        console.warn('Failed to start speech recognition:', err);
      }
    }
  };

  const handleVoiceCommand = (rawText) => {
    const text = rawText.toLowerCase().trim();

    if (text.includes('password') || text.includes('passwords') || text.includes('check password') || text.includes('strength')) {
      setCurrentView('passwords');
      const response = 'Opening Password Strength Checker.';
      speakText(response);
      onShowToast({ type: 'success', message: `Wispr Flow: ${response}` });
      setIsOpen(false);
      return;
    }

    if (text.includes('quiz') || text.includes('phishing') || text.includes('test me')) {
      setCurrentView('quiz');
      const response = 'Opening Phishing Awareness Simulator.';
      speakText(response);
      onShowToast({ type: 'success', message: `Wispr Flow: ${response}` });
      setIsOpen(false);
      return;
    }

    if (text.includes('url') || text.includes('link') || text.includes('scan') || text.includes('domain') || text.includes('website')) {
      setCurrentView('url');
      const response = 'Launching URL Safety & Threat Evaluator.';
      speakText(response);
      onShowToast({ type: 'success', message: `Wispr Flow: ${response}` });
      setIsOpen(false);
      return;
    }

    if (text.includes('tip') || text.includes('tips') || text.includes('glossary') || text.includes('best practices') || text.includes('advice')) {
      setCurrentView('tips');
      const response = 'Displaying Cybersecurity Tips and Threat Glossary.';
      speakText(response);
      onShowToast({ type: 'success', message: `Wispr Flow: ${response}` });
      setIsOpen(false);
      return;
    }

    if (text.includes('score') || text.includes('overall') || text.includes('hygiene') || text.includes('health') || text.includes('audit')) {
      setCurrentView('score');
      const response = `Your overall security score is currently ${Math.round(overallScore)} out of 100.`;
      speakText(response);
      onShowToast({ type: 'info', message: `Wispr Flow: ${response}` });
      setIsOpen(false);
      return;
    }

    if (text.includes('dashboard') || text.includes('home') || text.includes('overview') || text.includes('main')) {
      setCurrentView('dashboard');
      const response = 'Navigating to CyberSafe Security Command Center.';
      speakText(response);
      onShowToast({ type: 'success', message: `Wispr Flow: ${response}` });
      setIsOpen(false);
      return;
    }

    if (text.includes('generate') || text.includes('create password') || text.includes('random password')) {
      setCurrentView('passwords');
      if (onGeneratePassword) onGeneratePassword();
      const response = 'Generated a new high-entropy fortified password!';
      speakText(response);
      onShowToast({ type: 'success', message: `Wispr Flow: ${response}` });
      setIsOpen(false);
      return;
    }

    // Unrecognized
    const fallbackResponse = `Command "${rawText}" processed. Try saying: "Check password", "Scan URL", "Take quiz", or "Show security score".`;
    speakText('Command not recognized. Please choose from the available options.');
    onShowToast({ type: 'warning', message: fallbackResponse });
  };

  useEffect(() => {
    handleVoiceCommandRef.current = handleVoiceCommand;
  });

  const sampleCommands = [
    { label: 'Check Password Strength', cmd: 'Check password' },
    { label: 'Launch Phishing Quiz', cmd: 'Take phishing quiz' },
    { label: 'Scan Suspicious URL', cmd: 'Scan URL' },
    { label: 'What is my Security Score?', cmd: 'What is my score?' },
    { label: 'Show Cybersecurity Tips', cmd: 'Show security tips' },
    { label: 'Return to Dashboard', cmd: 'Go to dashboard' },
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
        <button
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
              if (isListening) recognitionRef.current?.stop();
            } else {
              setIsOpen(true);
              toggleListening();
            }
          }}
          className={`group flex items-center gap-3 px-4 py-3 rounded-full border shadow-2xl transition-all duration-300 backdrop-blur-md ${
            isListening
              ? 'bg-red-500/20 border-red-500 text-red-200 shadow-red-500/30 animate-pulse'
              : 'bg-slate-900/90 border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:shadow-cyan-500/20'
          }`}
          title="Wispr Flow Voice Navigation"
        >
          <div className="relative">
            {isListening ? (
              <Mic className="w-5 h-5 text-red-400 animate-bounce" />
            ) : (
              <Mic className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            )}
            {isListening && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-400 flex items-center gap-1">
              Wispr Flow <Sparkles className="w-3 h-3 text-cyan-400" />
            </span>
            <span className="text-xs font-medium text-slate-100">
              {isListening ? 'Listening now...' : 'Voice Assistant'}
            </span>
          </div>
        </button>
      </div>

      {/* Voice Assistant Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm flex items-center gap-1.5">
                    Wispr Flow Voice Controller
                    <span className="text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                      Challenge Edition
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Speak naturally to control CyberSafe hands-free</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSpokenFeedback(!spokenFeedback)}
                  className={`p-2 rounded-lg transition-colors ${
                    spokenFeedback ? 'text-cyan-400 bg-slate-800' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title={spokenFeedback ? 'Mute voice feedback' : 'Enable voice feedback'}
                >
                  {spokenFeedback ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (isListening) recognitionRef.current?.stop();
                  }}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Listening State & Visualizer */}
            <div className="p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-slate-900 to-slate-950/80">
              <button
                onClick={toggleListening}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening
                    ? 'bg-red-500 text-white shadow-xl shadow-red-500/40 animate-pulse scale-105'
                    : 'bg-cyan-500/10 text-cyan-400 border-2 border-cyan-500/40 hover:bg-cyan-500/20 hover:scale-105'
                }`}
              >
                {isListening ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
              </button>

              <div className="mt-4">
                <div className="text-sm font-semibold text-white">
                  {isListening ? 'Listening... Speak a command' : 'Tap microphone to speak'}
                </div>
                <div className="text-xs text-slate-400 mt-1 min-h-[20px] font-mono">
                  {transcript ? `"${transcript}"` : (isListening ? 'Say: "Check password", "Scan URL", or "What is my score?"' : 'Powered by Wispr Flow voice innovation')}
                </div>
              </div>

              {/* Animated Waveform Simulation */}
              {isListening && (
                <div className="flex items-center gap-1.5 mt-4 h-8">
                  {[40, 75, 95, 60, 85, 45, 90, 70, 50, 80, 60, 40].map((height, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-full animate-pulse"
                      style={{
                        height: `${height}%`,
                        animationDuration: `${0.4 + (i % 5) * 0.15}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Quick 1-Click Simulated Voice Prompts */}
            <div className="p-4 border-t border-slate-800 bg-slate-950">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Interactive Voice Commands (1-Click Run)
                </span>
                <span className="text-[11px] text-cyan-400 font-medium">Instant simulation</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sampleCommands.map((cmdItem, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleVoiceCommand(cmdItem.cmd)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 text-left text-xs text-slate-300 hover:text-white transition-all group"
                  >
                    <span className="truncate">{cmdItem.label}</span>
                    <Play className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-1 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
