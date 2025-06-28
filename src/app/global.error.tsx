'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error boundary caught an error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-8 text-center mx-4">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Critical Application Error
            </h1>

            <p className="text-gray-600 mb-6">
              A critical error occurred that prevented the application from
              loading properly. Please try refreshing the page or contact
              support if the problem persists.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                  Error Information (Development Mode)
                </summary>
                <div className="bg-gray-100 p-4 rounded border">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Error Message:
                  </p>
                  <pre className="text-xs text-red-600 mb-4 overflow-auto">
                    {error.message}
                  </pre>
                  {error.stack && (
                    <>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Stack Trace:
                      </p>
                      <pre className="text-xs text-gray-600 overflow-auto max-h-40">
                        {error.stack}
                      </pre>
                    </>
                  )}
                </div>
              </details>
            )}

            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                Try to Recover
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-md transition-colors"
              >
                Refresh Page
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                If this error persists, please contact our support team.
              </p>
              {error.digest && (
                <p className="text-xs text-gray-400 mt-1">
                  Error Reference: {error.digest}
                </p>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
