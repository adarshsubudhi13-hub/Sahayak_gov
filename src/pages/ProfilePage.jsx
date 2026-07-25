import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ShieldCheck, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { fetchDemographicFields } from '../lib/api.js';

export function ProfilePage() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const [profile, setProfile] = useState({});
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFields() {
      try {
        const response = await fetchDemographicFields();
        setFields(response.data.fields);
        
        // Initialize profile state based on fetched fields
        const initialProfile = { id: 'demo-user-1', role: 'citizen', preferred_language: language };
        response.data.fields.forEach(f => {
          initialProfile[f.field_key] = f.data_type === 'number' ? '' : (f.data_type === 'boolean' ? false : '');
        });

        // Merge with any saved profile
        const saved = localStorage.getItem('sahayak_user_profile');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            Object.assign(initialProfile, parsed);
          } catch (e) {}
        }
        
        setProfile(initialProfile);
      } catch (error) {
        console.error("Error loading demographic fields:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFields();
  }, [language]);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('sahayak_user_profile', JSON.stringify(profile));
    navigate('/schemes');
  };

  const getLabel = (field) => {
    return field.translations?.[language]?.label || field.label_default;
  };

  const getOptionLabel = (option) => {
    return option.translations?.[language] || option.translations?.en || option.value;
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-3xl w-full mx-auto py-10 px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg space-y-8">
        
        <div className="border-b border-gray-100 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-200">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Step 1 of 2 • Dynamic Profile Generation
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t('profileTitle')}
          </h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            {t('profileSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(field => {
              if (field.data_type === 'boolean') return null; // Render checkboxes at the bottom
              
              return (
                <div key={field.field_key}>
                  <label htmlFor={field.field_key} className="block text-xs font-semibold text-gray-700 mb-1">
                    {getLabel(field)}
                  </label>
                  
                  {field.data_type === 'enum' && field.options ? (
                    <select
                      id={field.field_key}
                      required={field.is_required}
                      value={profile[field.field_key] || ''}
                      onChange={e => setProfile({ ...profile, [field.field_key]: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none bg-white"
                    >
                      <option value="">Select an option...</option>
                      {field.options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {getOptionLabel(opt)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.field_key}
                      type={field.data_type === 'number' ? 'number' : 'text'}
                      required={field.is_required}
                      value={profile[field.field_key] || ''}
                      onChange={e => setProfile({ ...profile, [field.field_key]: field.data_type === 'number' ? Number(e.target.value) : e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-600 outline-none"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {fields.filter(f => f.data_type === 'boolean').map(field => (
            <div key={field.field_key} className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id={field.field_key}
                checked={!!profile[field.field_key]}
                onChange={e => setProfile({ ...profile, [field.field_key]: e.target.checked })}
                className="w-4 h-4 text-teal-700 border-gray-300 rounded focus:ring-teal-600"
              />
              <label htmlFor={field.field_key} className="text-xs font-medium text-gray-700 cursor-pointer">
                {getLabel(field)}
              </label>
            </div>
          ))}

          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {t('saveProfileBtn')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-emerald-500" />
            {t('privacyNote')}
          </p>

        </form>

      </div>
    </div>
  );
}
