/**
 * Footer – shown on all pages.
 * Contains Privacy Policy, Terms, DPDP compliance badge,
 * and the "no Aadhaar/PAN" trust signal.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Brand + tagline */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-sm font-bold text-gray-900">Sahayak</span>
            </div>
            <p className="text-xs text-gray-500">AI Government Scheme Navigator · India</p>
            <p className="text-[11px] text-gray-400">
              © {year} Sahayak. Civic-tech product — not a government portal.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Legal</p>
              <div className="flex flex-col gap-1">
                <Link to="/privacy" className="text-xs text-gray-600 hover:text-teal-700 transition-colors font-medium">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-xs text-gray-600 hover:text-teal-700 transition-colors font-medium">
                  Terms of Service
                </Link>
              </div>
            </div>

            {/* DPDP compliance badge */}
            <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 space-y-1.5 max-w-[220px]">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-teal-600" />
                DPDP Act 2023 Aligned
              </div>
              <p className="text-[10px] text-teal-700 leading-relaxed">
                Explicit consent · Data deletion on request · No Aadhaar/PAN collection
              </p>
            </div>

            {/* Privacy-first badge */}
            <div className="flex items-start gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 max-w-[200px]">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[10px] text-gray-600 leading-relaxed">
                <p className="font-bold text-gray-800">Zero sensitive ID collection</p>
                <p>No Aadhaar · No PAN · No biometrics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
