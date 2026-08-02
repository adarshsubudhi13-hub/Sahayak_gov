/**
 * OfflineBanner – shown when the user's device is offline.
 *
 * Design rules (UI/UX Brief):
 * - Never show a blank screen or silent failure
 * - Make it clear what still works (cached scheme listings)
 * - Dismiss automatically when connectivity returns
 */
import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Nothing to show when online and no reconnect message
  if (isOnline && !showReconnected) return null;

  // Reconnected briefly
  if (isOnline && showReconnected) {
    return (
      <div className="bg-emerald-600 text-white px-4 py-2 flex items-center justify-center gap-2 text-xs font-semibold animate-pulse">
        <Wifi className="w-4 h-4" />
        Connection restored — you are back online.
      </div>
    );
  }

  // Offline state
  return (
    <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-xs">
        <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong>You are offline.</strong>{' '}
          Saved scheme listings are available. AI assistant and live data require a connection.
        </span>
      </div>
    </div>
  );
}
