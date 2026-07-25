import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ShieldCheck, Sparkles, ArrowRight, FileText, Lock, Users, BarChart3 } from 'lucide-react';

export function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-teal-900 via-teal-850 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-800/80 border border-teal-600/50 text-teal-200 text-xs font-semibold backdrop-blur">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Source-Grounded Government Welfare Guide • Telangana State
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            {t('heroTitle')}
          </h1>

          <p className="text-lg sm:text-xl text-teal-100/90 max-w-2xl mx-auto leading-relaxed font-light">
            {t('heroSubtitle')}
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/profile"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              {t('getStarted')}
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/auth"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-teal-800/60 hover:bg-teal-800 border border-teal-700 text-white font-semibold text-base transition-all flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5 text-teal-300" />
              {t('demoCitizenLogin')}
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center gap-2 text-xs text-teal-200/80">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>{t('privacyNote')}</span>
          </div>

        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Why Citizens & CSC Operators Trust Sahayak
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Transforming complex government portals into clear, cited action plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Source-Grounded AI & Citations</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every AI statement cites the exact official government clause and verified timestamp. Zero hallucinated rules.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Auto Document Checklists</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Get a scheme-specific checklist of required certificates (income, caste, bonafide) with issuing authority notes.
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
      <section className="bg-teal-900 text-white py-12 px-4 mt-auto">
        <div className="max-w-4xl mx-auto bg-teal-850 rounded-2xl p-8 border border-teal-700 shadow-xl text-center space-y-6">
          <h3 className="text-xl font-bold text-teal-100">
            Ready to Explore Sahayak in Action?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/schemes"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition-all"
            >
              Browse Telangana Schemes (15+ Seeded)
            </Link>
            <Link
              to="/chat"
              className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold text-xs border border-teal-500 transition-all"
            >
              Try Grounded AI Chat Assistant
            </Link>
            <Link
              to="/admin/analytics"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
            >
              View Government Analytics Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
