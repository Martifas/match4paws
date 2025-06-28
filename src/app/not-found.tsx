import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="relative -mt-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It
              might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Go Home
          </Link>

          <div className="text-sm text-gray-500">
            or try these popular pages:
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Dashboard
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/search"
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Search
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/dashboard/account"
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Account
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <button
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            ← Go back to previous page
          </button>
        </div>
      </div>
    </div>
  );
}
