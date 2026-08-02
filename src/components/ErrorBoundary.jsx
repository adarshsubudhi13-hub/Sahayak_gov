/**
 * ErrorBoundary – React class-based error boundary.
 *
 * Two variants:
 *  - <AppErrorBoundary>   Full-page fallback (wraps the entire app)
 *  - <RouteErrorBoundary> Inline fallback (wraps individual routes)
 */
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

// ── Base boundary class ───────────────────────────────────────────────────────
class ErrorBoundaryBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production this would send to an error-tracking service
    console.error('[ErrorBoundary] Unhandled error:', error, info.componentStack);
  }

  handleReset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          reset: () => this.handleReset(),
        });
      }
      return this.props.renderFallback
        ? this.props.renderFallback(this.state.error, () => this.handleReset())
        : null;
    }
    return this.props.children;
  }
}

// ── Full-page fallback ────────────────────────────────────────────────────────
export function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundaryBase
      renderFallback={(error, reset) => (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl border border-red-200 p-10 max-w-md w-full text-center space-y-5 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-xl font-extrabold text-gray-900">
              Something went wrong
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              An unexpected error occurred. Your data has not been lost.
              Please try refreshing the page or returning to the home screen.
            </p>
            {import.meta.env.DEV && error && (
              <pre className="text-left text-[10px] bg-gray-100 rounded-xl p-4 overflow-auto max-h-32 text-red-700">
                {error.message}
              </pre>
            )}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={reset}
                className="flex-1 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
              <a
                href="/"
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
              >
                <Home className="w-4 h-4" /> Go Home
              </a>
            </div>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundaryBase>
  );
}

// ── Route-level inline fallback ───────────────────────────────────────────────
export function RouteErrorBoundary({ children }) {
  return (
    <ErrorBoundaryBase
      renderFallback={(error, reset) => (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl border border-amber-200 p-8 max-w-sm w-full text-center space-y-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-base font-bold text-gray-900">This section failed to load</h2>
            <p className="text-xs text-gray-500">
              There was an error rendering this page. Other parts of Sahayak are still working.
            </p>
            {import.meta.env.DEV && error && (
              <pre className="text-left text-[10px] bg-gray-100 rounded-xl p-3 overflow-auto max-h-24 text-red-700">
                {error.message}
              </pre>
            )}
            <button
              onClick={reset}
              className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 mx-auto transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundaryBase>
  );
}
