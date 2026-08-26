'use client';

import { Search, Bell, Timer, Sparkles, Command, BookOpen, Target } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store/useStore';
import { useState } from 'react';

export function Topbar() {
  const { attempts, currentStreak } = useAppStore();
  const [showSearch, setShowSearch] = useState(false);
  
  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6 lg:px-8 gap-4">
        <div className="flex items-center gap-6 min-w-0">
          <div className="hidden lg:flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-[13px]">NEET 2026</span>
            </div>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-600 text-[13px]">
              {attempts.length === 0 ? "Take a test to see estimated score" : `${attempts.length} tests taken • Real analytics`}
            </span>
          </div>
          <div className="lg:hidden">
            <span className="font-bold text-[14px]">NEET Prep</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link href="/search" className="hidden md:flex items-center gap-3 rounded-full border bg-zinc-50 pl-4 pr-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 transition-colors">
            <Search size={16} />
            <span className="text-[13px]">Search topics, questions...</span>
            <span className="ml-2 hidden lg:inline-flex items-center gap-1 text-[11px] bg-white border px-1.5 py-0.5 rounded-md">
              <Command size={10} />K
            </span>
          </Link>

          <Link href="/planner" className="hidden md:flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-[13px] font-medium hover:bg-zinc-50">
            <Target size={14} />
            Planner
          </Link>

          <Link href="/focus" className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 shadow-sm">
            <Timer size={16} />
            <span className="hidden sm:inline">Focus</span>
          </Link>

          <button className="relative p-2.5 rounded-full border bg-white hover:bg-zinc-50">
            <Bell size={18} />
            {attempts.length > 0 && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />}
          </button>

          <div className="hidden md:flex items-center gap-2 rounded-full border bg-amber-50 border-amber-200 px-3 py-1.5">
            <Sparkles size={14} className="text-amber-600" />
            <span className="text-xs font-semibold text-amber-800">{currentStreak} day streak</span>
          </div>

          <Link href="/library" className="hidden md:flex h-9 w-9 rounded-full bg-zinc-100 border items-center justify-center hover:bg-zinc-200">
            <BookOpen size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
