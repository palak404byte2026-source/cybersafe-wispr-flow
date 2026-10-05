import React from 'react';
import { ShieldCheck, Lock, ExternalLink, Cpu, Heart } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/70 text-slate-400 py-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Privacy */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-white text-base tracking-tight">CyberSafe</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Wispr Flow Challenge
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A 100% frontend-only cybersecurity education and evaluation platform. All password entropy calculations, URL heuristic scans, and phishing quiz evaluations run locally in your browser memory.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-medium">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>Zero-backend architecture: No passwords, URLs, or inputs are ever logged or transmitted.</span>
            </div>
          </div>

          {/* Quick Modules */}
          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Security Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentView('passwords')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Password Entropy & Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('quiz')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Phishing Awareness Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('url')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  URL & Domain Threat Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('score')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Overall Security Health Score
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('tips')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Cyber Defense Knowledge Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture & Deploy */}
          <div>
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider mb-3">
              Deployment & Tech
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Vite + React 19 + Tailwind CSS</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Pre-configured for frictionless static deployment on Render.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Build: Static Output (/dist)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} CyberSafe. Crafted for the Wispr Flow Voice-Driven Development Challenge.</p>
          <div className="flex items-center gap-4">
            <span>Voice Driven • Client-Side • Privacy First</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
