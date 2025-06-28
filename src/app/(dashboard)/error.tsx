'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg p-6 text-center">
        <div className="mb-4">
          <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
            <svg
              className="h-5 w-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Dashboard Error
        </h3>

        <p className="text-gray-600 mb-4">
          Something went wrong while loading your dashboard content.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Technical Details
            </summary>
            <pre className="mt-2 text-xs bg-gray-50 p-2 rounded border overflow-auto text-red-600 max-h-32">
              {error.message}
            </pre>
          </details>
        )}

        <div className="space-y-2">
          <button
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-md transition-colors text-sm"
          >
            Retry Dashboard
          </button>

          <Link
            href="/dashboard"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-3 rounded-md transition-colors text-sm"
          >
            Refresh Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
