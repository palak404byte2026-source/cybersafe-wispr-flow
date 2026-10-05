import React, { useState } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Fish,
  Link2,
  Activity,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, overallScore = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact 5 navigation items requested by the user
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ShieldCheck },
    { id: 'passwords', label: 'Password Checker', icon: KeyRound },
    { id: 'quiz', label: 'Phishing Quiz', icon: Fish },
    { id: 'url', label: 'URL Safety', icon: Link2 },
    { id: 'score', label: 'Security Score', icon: Activity },
  ];

  let scoreColorClass = 'text-red-400 border-red-500/30 bg-red-500/10';
  if (overallScore >= 80) scoreColorClass = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  else if (overallScore >= 60) scoreColorClass = 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
  else if (overallScore >= 40) scoreColorClass = 'text-amber-400 border-amber-500/30 bg-amber-500/10';

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Name & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                    Cyber<span className="text-cyan-400">Safe</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                  <span className="text-cyan-400">Awareness Platform</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <span>Wispr Flow</span>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700/80 shadow-inner'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header items: Security Score Chip & Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('score')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all hover:scale-105 ${scoreColorClass}`}
              title="View Security Score breakdown"
            >
              <Activity className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Score:</span>
              <span className="font-mono text-sm">{Math.round(overallScore)}%</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-2 animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
