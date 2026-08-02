import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertCircle, Clock, ExternalLink, Download, Lock, RefreshCw } from 'lucide-react';

const INITIAL_DOCUMENTS = [
  {
    id: 'doc-income',
    name: 'Income Certificate',
    category: 'Revenue Department',
    issuing_authority: 'Tahsildar / Meeseva / E-Seva',
    status: 'verified',
    valid_until: '31-Mar-2027',
    digilocker_synced: true,
  },
  {
    id: 'doc-caste',
    name: 'Integrated Caste Certificate (SC/ST/BC)',
    category: 'Revenue Department',
    issuing_authority: 'Revenue Divisional Officer (RDO)',
    status: 'verified',
    valid_until: 'Lifetime',
    digilocker_synced: true,
  },
  {
    id: 'doc-domicile',
    name: 'Residence / Domicile Certificate',
    category: 'State Portal',
    issuing_authority: 'Mandal Revenue Officer (MRO)',
    status: 'pending',
    valid_until: 'Requires Renewal',
    digilocker_synced: false,
  },
  {
    id: 'doc-bonafide',
    name: 'Student Bonafide / Institutional Study Certificate',
    category: 'Education Department',
    issuing_authority: 'Head of Institution / Registrar',
    status: 'verified',
    valid_until: 'Academic Year 2025-26',
    digilocker_synced: false,
  },
  {
    id: 'doc-ration',
    name: 'Food Security Card / Ration Card',
    category: 'Civil Supplies Department',
    issuing_authority: 'Department of Consumer Affairs',
    status: 'verified',
    valid_until: 'Active',
    digilocker_synced: true,
  },
];

export function DocumentVaultPage() {
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [isDigiLockerConnected, setIsDigiLockerConnected] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const handleSyncDigiLocker = () => {
    setSyncing(true);
    setTimeout(() => {
      setDocuments(prev =>
        prev.map(d => ({ ...d, status: 'verified', digilocker_synced: true }))
      );
      setSyncing(false);
    }, 1200);
  };

  const verifiedCount = documents.filter(d => d.status === 'verified').length;
  const readinessPercentage = Math.round((verifiedCount / documents.length) * 100);

  return (
    <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-teal-300 font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4 text-emerald-400" />
            Citizen Document Vault & DigiLocker Readiness
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Official Document Readiness Vault 📄
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/80 max-w-2xl leading-relaxed">
            Verify and store your certificates before applying for government schemes. Connected seamlessly with Indian e-Governance verification portals.
          </p>
        </div>

        {/* DigiLocker Status Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center space-y-3 shrink-0 min-w-[220px]">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            DigiLocker Integration
          </div>
          <p className="text-[11px] text-teal-100">
            {isDigiLockerConnected ? 'Connected via Aadhaar SSO' : 'Not Connected'}
          </p>
          <button
            onClick={handleSyncDigiLocker}
            disabled={syncing}
            className="w-full px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync DigiLocker'}
          </button>
        </div>
      </div>

      {/* Readiness Overview Progress */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-sm font-bold text-gray-900">Application Document Readiness</h2>
          <p className="text-xs text-gray-500">
            {verifiedCount} of {documents.length} essential certificates verified for scheme application.
          </p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:w-48 bg-gray-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-teal-700 h-full rounded-full transition-all duration-500"
              style={{ width: `${readinessPercentage}%` }}
            />
          </div>
          <span className="text-sm font-extrabold text-teal-800">{readinessPercentage}%</span>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal-700" />
          Verified Certificates & Required Documents
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map(doc => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:border-teal-300 transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 uppercase tracking-wide">
                    {doc.category}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900">{doc.name}</h4>
                  <p className="text-xs text-gray-500">Authority: {doc.issuing_authority}</p>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shrink-0 ${
                    doc.status === 'verified'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {doc.status === 'verified' ? (
                    <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified</>
                  ) : (
                    <><AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Pending</>
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  Validity: <strong className="text-gray-700">{doc.valid_until}</strong>
                </span>

                <div className="flex items-center gap-2">
                  {doc.digilocker_synced && (
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      DigiLocker Verified
                    </span>
                  )}
                  <button className="p-1.5 text-gray-400 hover:text-teal-700 transition-colors" title="Download Record">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
