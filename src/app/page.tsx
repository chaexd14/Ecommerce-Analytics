import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Ecommerce Analytics
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            View Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}