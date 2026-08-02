/**
 * VoiceInput — Web Speech API STT/TTS component
 *
 * STT: Microphone button that transcribes speech into text and calls onTranscript.
 * TTS: speak(text, lang) utility exported for use by ChatPage.
 *
 * Browser support: Chrome / Edge (full), Firefox (TTS only), Safari 16.4+.
 * Gracefully hidden when API is unavailable.
 */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

// ── Language code mapping for Web Speech API ──────────────────────────────────
const SPEECH_LANG_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  kn: 'kn-IN',
  ta: 'ta-IN',
  ml: 'ml-IN',
  gu: 'gu-IN',
  bn: 'bn-IN',
  pa: 'pa-IN',
  or: 'or-IN',
  as: 'as-IN',
};

// ── Check API availability ─────────────────────────────────────────────────────
const SpeechRecognition =
  typeof window !== 'undefined' &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

const hasTTS =
  typeof window !== 'undefined' && 'speechSynthesis' in window;

// ── TTS helper (exported for ChatPage) ───────────────────────────────────────
export function speak(text, langCode = 'en') {
  if (!hasTTS || !text) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = SPEECH_LANG_MAP[langCode] || 'en-IN';
  utt.rate = 0.92;
  utt.pitch = 1;
  window.speechSynthesis.speak(utt);
}

export function stopSpeaking() {
  if (hasTTS) window.speechSynthesis.cancel();
}

// ── VoiceInput component ──────────────────────────────────────────────────────
export function VoiceInput({ onTranscript, language = 'en', disabled = false }) {
  const [listening, setListening] = useState(false);
  const [supported] = useState(Boolean(SpeechRecognition));
  const recognizerRef = useRef(null);

  useEffect(() => {
    return () => {
      recognizerRef.current?.stop();
    };
  }, []);

  const toggleListening = useCallback(() => {
    if (!supported) return;

    if (listening) {
      recognizerRef.current?.stop();
      setListening(false);
      return;
    }

    const recognizer = new SpeechRecognition();
    recognizer.lang = SPEECH_LANG_MAP[language] || 'en-IN';
    recognizer.interimResults = false;
    recognizer.maxAlternatives = 1;

    recognizer.onstart = () => setListening(true);

    recognizer.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && onTranscript) onTranscript(transcript);
    };

    recognizer.onerror = (e) => {
      console.warn('[VoiceInput] STT error:', e.error);
      setListening(false);
    };

    recognizer.onend = () => setListening(false);

    recognizerRef.current = recognizer;
    recognizer.start();
  }, [listening, supported, language, onTranscript]);

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggleListening}
      disabled={disabled}
      title={listening ? 'Stop listening' : 'Speak your question'}
      aria-label={listening ? 'Stop voice input' : 'Start voice input'}
      className={`p-3 rounded-2xl border font-semibold text-xs transition-all flex items-center gap-1.5 ${
        listening
          ? 'bg-red-50 border-red-300 text-red-600 animate-pulse shadow-md'
          : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700'
      }`}
    >
      {listening ? (
        <MicOff className="w-4 h-4" />
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  );
}

// ── TTSButton — plays / stops last AI response ─────────────────────────────────
export function TTSButton({ text, language = 'en' }) {
  const [playing, setPlaying] = useState(false);

  if (!hasTTS || !text) return null;

  const handleClick = () => {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
    } else {
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = SPEECH_LANG_MAP[language] || 'en-IN';
      utt.rate = 0.92;
      utt.onend = () => setPlaying(false);
      utt.onerror = () => setPlaying(false);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utt);
      setPlaying(true);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={playing ? 'Stop audio' : 'Listen to this answer'}
      aria-label={playing ? 'Stop reading answer aloud' : 'Read answer aloud'}
      className={`p-1 rounded-lg transition-colors ${
        playing
          ? 'text-teal-700 bg-teal-50'
          : 'text-gray-400 hover:text-teal-600'
      }`}
    >
      {playing ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
    </button>
  );
}
