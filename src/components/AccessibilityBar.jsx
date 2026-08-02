import React, { useState, useEffect } from 'react';
import { Eye, Sun, Moon, Volume2, Type } from 'lucide-react';

export function AccessibilityBar() {
  const [fontSizeLevel, setFontSizeLevel] = useState(100); // 90, 100, 110, 120
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isScreenReaderMode, setIsScreenReaderMode] = useState(false);

  useEffect(() => {
    // Apply font size adjustment to html root
    document.documentElement.style.fontSize = `${fontSizeLevel}%`;
  }, [fontSizeLevel]);

  useEffect(() => {
    // Toggle high contrast class on root html tag
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  const handleSkipToContent = (e) => {
    e.preventDefault();
    const mainElement = document.querySelector('main') || document.getElementById('main-content');
    if (mainElement) {
      mainElement.setAttribute('tabIndex', '-1');
      mainElement.focus();
    }
  };

  return (
    <div 
      className="bg-slate-900 text-slate-100 px-4 py-1.5 text-xs flex items-center justify-between border-b border-slate-800 z-50 select-none"
      aria-label="Accessibility Toolbar"
      role="region"
    >
      {/* Skip to Main Content Link (GIGW 3.0 Mandate) */}
      <a
        href="#main-content"
        onClick={handleSkipToContent}
        className="sr-only focus:not-sr-only focus:bg-amber-400 focus:text-slate-950 focus:px-3 focus:py-1 focus:rounded-md font-bold transition-all"
      >
        Skip to main content
      </a>

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline font-semibold text-slate-400 flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-teal-400" />
          Accessibility & GIGW 3.0 Controls:
        </span>

        {/* Font Size Adjusters */}
        <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
          <button
            onClick={() => setFontSizeLevel(prev => Math.max(90, prev - 10))}
            className={`px-2 py-0.5 rounded font-bold transition-colors ${
              fontSizeLevel === 90 ? 'bg-teal-600 text-white' : 'hover:bg-slate-700 text-slate-300'
            }`}
            title="Decrease font size (A-)"
            aria-label="Decrease text size"
          >
            A-
          </button>
          <button
            onClick={() => setFontSizeLevel(100)}
            className={`px-2 py-0.5 rounded font-bold transition-colors ${
              fontSizeLevel === 100 ? 'bg-teal-600 text-white' : 'hover:bg-slate-700 text-slate-300'
            }`}
            title="Reset font size (A)"
            aria-label="Default text size"
          >
            A
          </button>
          <button
            onClick={() => setFontSizeLevel(prev => Math.min(130, prev + 10))}
            className={`px-2 py-0.5 rounded font-bold transition-colors ${
              fontSizeLevel >= 110 ? 'bg-teal-600 text-white' : 'hover:bg-slate-700 text-slate-300'
            }`}
            title="Increase font size (A+)"
            aria-label="Increase text size"
          >
            A+
          </button>
        </div>

        {/* High Contrast Toggle */}
        <button
          onClick={() => setIsHighContrast(!isHighContrast)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold border transition-colors ${
            isHighContrast
              ? 'bg-amber-400 text-slate-950 border-amber-300'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
          aria-pressed={isHighContrast}
          aria-label="Toggle High Contrast Mode"
        >
          {isHighContrast ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          <span>High Contrast</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] text-teal-400 font-mono hidden md:inline">
          WCAG 2.1 AA Compliant
        </span>
      </div>
    </div>
  );
}
