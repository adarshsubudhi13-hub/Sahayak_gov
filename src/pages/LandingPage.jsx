import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useStateContext } from '../context/StateContext.jsx';
import { StateSelectorModal } from '../components/StateSelectorModal.jsx';
import { ShieldCheck, Sparkles, ArrowRight, FileText, Lock, Users, BarChart3, MapPin, Globe } from 'lucide-react';

export function LandingPage() {
  const { t } = useLanguage();
  const { selectedState } = useStateContext();
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-teal-950 via-teal-900 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-800/80 border border-teal-600/50 text-teal-200 text-xs font-semibold backdrop-blur">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Pan-India Government Welfare Navigator • All 28 States & 8 UTs</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            {t('heroTitle')}
          </h1>

          <p className="text-lg sm:text-xl text-teal-100/90 max-w-2xl mx-auto leading-relaxed font-light">
            {t('heroSubtitle')}
          </p>

          {/* Active State Selection Banner */}
          <div className="pt-2">
            <button
              onClick={() => setIsStateModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs backdrop-blur transition-all group"
            >
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Current Selected State: <strong className="text-amber-300 font-bold">{selectedState.emoji} {selectedState.name}</strong></span>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 group-hover:scale-105 transition-transform">
                Change State
              </span>
            </button>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/profile"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              {t('getStarted')}
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setIsStateModalOpen(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-teal-800/60 hover:bg-teal-800 border border-teal-700 text-white font-semibold text-base transition-all flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5 text-amber-400" />
              {t('selectState')}
            </button>
          </div>

          <div className="pt-6 flex items-center justify-center gap-2 text-xs text-teal-200/80">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>{t('privacyNote')}</span>
          </div>

        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Why Citizens & CSC Operators Across India Trust Sahayak
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Transforming complex state government portals into clear, cited action plans in native regional languages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Multilingual & Multi-State</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Supports 12+ official Indian languages (Hindi, Telugu, Marathi, Kannada, Tamil, Malayalam, Gujarati, Bengali, etc.) mapped to all 36 States & UTs.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Auto Document Checklists</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Get state-specific document checklists (MeeSeva, Aaple Sarkar, Seva Sindhu, e-District) with issuing authority notes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Anonymized Government Telemetry</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Empowers state e-Governance officials with district-level demand heatmaps and awareness-to-action insights.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Links Bar */}
      <section className="bg-teal-950 text-white py-12 px-4 mt-auto">
        <div className="max-w-4xl mx-auto bg-teal-900/60 rounded-2xl p-8 border border-teal-700 shadow-xl text-center space-y-6">
          <h3 className="text-xl font-bold text-teal-100">
            Ready to Explore Schemes for {selectedState.name}?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/schemes"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition-all"
            >
              Browse Schemes ({selectedState.name})
            </Link>
            <button
              onClick={() => setIsStateModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
            >
              Switch State / UT
            </button>
            <Link
              to="/chat"
              className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold text-xs border border-teal-500 transition-all"
            >
              Try Grounded AI Chat Assistant
            </Link>
          </div>
        </div>
      </section>

      <StateSelectorModal
        isOpen={isStateModalOpen}
        onClose={() => setIsStateModalOpen(false)}
      />
    </div>
  );
}
