import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl font-extrabold text-brand-blue mb-2">404</h1>
      <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-400 text-sm mb-6 max-w-md text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}
