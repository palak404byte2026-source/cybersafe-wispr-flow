import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  Shield,
  Key,
  Fish,
  Globe,
  Smartphone,
  Wifi
} from 'lucide-react';
import { SECURITY_TIPS, CATEGORIES, GLOSSARY_TERMS } from '../utils/securityTips';

export default function TipsView({
  masteredTips = {},
  bookmarkedTips = {},
  onToggleMastered,
  onToggleBookmark,
  _onShowToast
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('tips'); // 'tips' | 'glossary'

  const iconMap = {
    Shield: <Shield className="w-4 h-4" />,
    Key: <Key className="w-4 h-4" />,
    Fish: <Fish className="w-4 h-4" />,
    Globe: <Globe className="w-4 h-4" />,
    Smartphone: <Smartphone className="w-4 h-4" />,
    Wifi: <Wifi className="w-4 h-4" />,
  };

  // Filter tips
  const filteredTips = SECURITY_TIPS.filter(tip => {
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter glossary
  const filteredGlossary = GLOSSARY_TERMS.filter(item =>
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const spotlightTip = SECURITY_TIPS[0];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Cyber Defense Knowledge Base</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Cybersecurity Tips & Threat Glossary
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Curated actionable security practices, FIDO2 guidelines, and threat intelligence definitions.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'tips' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Defense Best Practices
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'glossary' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Threat Glossary
          </button>
        </div>
      </div>

      {/* Spotlight Tip Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tip of the Day Spotlight</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {spotlightTip.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {spotlightTip.summary}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              {spotlightTip.details}
            </p>
          </div>

          <div className="flex flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onToggleBookmark(spotlightTip.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                bookmarkedTips[spotlightTip.id]
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{bookmarkedTips[spotlightTip.id] ? 'Bookmarked' : 'Save Tip'}</span>
            </button>
            <button
              onClick={() => onToggleMastered(spotlightTip.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                masteredTips[spotlightTip.id]
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{masteredTips[spotlightTip.id] ? 'Mastered!' : 'Mark Mastered'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Category Pills (Only on tips tab) */}
        {activeTab === 'tips' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                {iconMap[cat.icon]}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'tips' ? 'Search best practices...' : 'Search threat glossary...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white text-xs outline-none transition-all placeholder-slate-500"
          />
        </div>
      </div>

      {/* Main Content: Tips Grid or Glossary Grid */}
      {activeTab === 'tips' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTips.map((tip) => {
            const isBookmarked = !!bookmarkedTips[tip.id];
            const isMastered = !!masteredTips[tip.id];

            return (
              <div
                key={tip.id}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {tip.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onToggleBookmark(tip.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isBookmarked ? 'text-cyan-400 bg-slate-800' : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title={isBookmarked ? 'Bookmarked' : 'Bookmark tip'}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleMastered(tip.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isMastered ? 'text-emerald-400 bg-slate-800' : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title={isMastered ? 'Mastered' : 'Mark as mastered'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {tip.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tip.summary}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {tip.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {tip.readTime} read
                  </span>
                  <span className={`font-semibold ${
                    tip.impact === 'Critical' ? 'text-red-400' : tip.impact === 'High' ? 'text-amber-400' : 'text-cyan-400'
                  }`}>
                    {tip.impact} Defense Impact
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Threat Glossary Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGlossary.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 shadow-lg"
            >
              <div className="flex items-center gap-2 text-cyan-400">
                <HelpCircle className="w-4 h-4" />
                <h4 className="text-sm font-bold text-white">
                  {item.term}
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
