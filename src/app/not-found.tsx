import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mb-6 text-sky-400 text-3xl font-bold">
        404
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
        Project Specification Not Found
      </h1>
      <p className="text-slate-400 max-w-md mb-8 text-base leading-relaxed">
        The fabrication blueprint, product model, or workshop section you requested does not exist or has been relocated in our catalog.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:from-sky-400 hover:to-blue-500 transition-all shadow-lg shadow-sky-500/20"
        >
          Return to Workshop Home
        </Link>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 font-semibold hover:bg-slate-800 hover:text-white transition-all"
        >
          Browse Steel Catalog
        </Link>
      </div>
    </div>
  );
}
