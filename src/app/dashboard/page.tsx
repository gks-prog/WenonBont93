"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
      <h1 className="text-4xl font-bold text-green-500 mb-4">ROUTING SUCCESSFUL</h1>
      <p className="text-[#a1a1aa] mb-8">If you can see this page, your Next.js router is working perfectly.</p>
      
      <Link href="/login" className="px-6 py-3 border border-white/20 rounded hover:bg-white hover:text-black transition-colors">
        Go Back to Login
      </Link>
    </div>
  );
}
