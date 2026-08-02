import React, { useState } from 'react';
import { INDIA_STATES, INDIA_REGIONS } from '../lib/seed/states.js';
import { useStateContext } from '../context/StateContext.jsx';
import { Search, MapPin, CheckCircle, X, Globe, Sparkles } from 'lucide-react';

export function StateSelectorModal({ isOpen, onClose }) {
  const { selectedStateId, setSelectedState } = useStateContext();
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  if (!isOpen) return null;

  const filteredStates = INDIA_STATES.filter(state => {
    const matchesSearch = state.name.toLowerCase().includes(search.toLowerCase()) ||
                          state.capital.toLowerCase().includes(search.toLowerCase()) ||
                          state.localLangName.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || state.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const handleSelect = (stateId) => {
    setSelectedState(stateId);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-gray-200 shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 p-6 text-white relative">
          {onClose && (
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> All India Coverage • 28 States & 8 UTs
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Select Your State / Union Territory
              </h2>
            </div>
          </div>
          <p className="text-xs text-teal-100/80 max-w-xl">
            Sahayak auto-configures regional schemes, eligibility criteria, district dropdowns, and native language translation for your selected state.
          </p>

          {/* Search & Region Filter */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by state name, capital, or language..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-teal-200/50 text-xs focus:ring-2 focus:ring-amber-400 outline-none backdrop-blur"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {['All', ...INDIA_REGIONS].map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedRegion === region
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-white/10 text-teal-100 hover:bg-white/20'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* States Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 flex-1">
          {filteredStates.map((state) => {
            const isSelected = state.id === selectedStateId;
            return (
              <button
                key={state.id}
                onClick={() => handleSelect(state.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-start justify-between group ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/80 shadow-md ring-2 ring-teal-600/30'
                    : 'border-gray-200 bg-white hover:border-teal-400 hover:bg-teal-50/30 hover:shadow-sm'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{state.emoji}</span>
                    <span className={`font-bold text-sm ${isSelected ? 'text-teal-900' : 'text-gray-900 group-hover:text-teal-700'}`}>
                      {state.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <span className="font-medium text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded-md">
                      {state.localLangName}
                    </span>
                    <span>• {state.districts.length} Districts</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Capital: {state.capital}</p>
                </div>

                {isSelected && (
                  <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}

          {filteredStates.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400 text-xs">
              No states or Union Territories found matching "{search}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-teal-600" /> You can switch your state anytime from the top navigation bar.
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs"
            >
              Done
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
