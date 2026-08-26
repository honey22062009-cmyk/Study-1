'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, BookOpen, FileText, Dumbbell, ClipboardList, 
  AlertTriangle, Repeat, BarChart3, Timer, Search, Bot,
  Atom, FlaskConical, Dna, GraduationCap, Menu, X,
  Library, Bookmark, History, Target, Calendar, Users, Settings, User, Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/lib/store/useStore';

const mainNav = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/learn', label: 'Learn', icon: BookOpen, desc: 'Structured syllabus' },
  { href: '/notes', label: 'Notes', icon: FileText, desc: 'Detailed / Short / Quick' },
  { href: '/practice', label: 'Practice', icon: Dumbbell, desc: 'Custom Q builder' },
  { href: '/tests', label: 'Tests', icon: ClipboardList, desc: 'Mocks & chapter tests' },
  { href: '/mistakes', label: 'Mistakes', icon: AlertTriangle, desc: 'Your mistake notebook' },
  { href: '/revision', label: 'Revision', icon: Repeat, desc: 'Spaced & weak topics' },
  { href: '/analytics', label: 'Analytics', icon: BarChart3, desc: 'Real performance data' },
  { href: '/focus', label: 'Focus', icon: Timer, desc: 'Pomodoro & timer' },
];

const secondaryNav = [
  { href: '/library', label: 'Library', icon: Library },
  { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { href: '/history', label: 'History', icon: History },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/planner', label: 'Planner', icon: Calendar },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/ai-tutor', label: 'AI Tutor', icon: Bot },
];

const bottomNav = [
  { href: '/community', label: 'Community', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const subjects = [
  { id: 'biology', name: 'Biology', icon: Dna, color: 'text-amber-600', bg: 'bg-amber-50', questions: 8 },
  { id: 'physics', name: 'Physics', icon: Atom, color: 'text-blue-600', bg: 'bg-blue-50', questions: 4 },
  { id: 'chemistry', name: 'Chemistry', icon: FlaskConical, color: 'text-emerald-600', bg: 'bg-emerald-50', questions: 4 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { attempts, mistakes } = useAppStore();
  const unresolved = mistakes.filter(m=>!m.resolved).length;

  return (
    <>
      <button 
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-xl shadow-lg border"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen w-[300px] border-r bg-white transition-transform lg:translate-x-0 flex flex-col",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 border-b shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-zinc-900 flex items-center justify-center shadow-sm">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-[16px] leading-none tracking-tight">NEET Prep</h1>
              <p className="text-[11px] text-zinc-500 font-medium mt-1 tracking-wide uppercase">Learn • Practice • Excel</p>
            </div>
          </Link>
          <div className="mt-4 flex items-center gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded-full bg-zinc-900 text-white font-semibold">NEET FIRST</span>
            <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 border">JEE Ready Architecture</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            <div>
              <h3 className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Main</h3>
              <nav className="space-y-1">
                {mainNav.map(item => {
                  const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-all",
                        active ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                      )}
                    >
                      <item.icon size={18} className={active ? "text-white" : "text-zinc-400 group-hover:text-zinc-900"} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span>{item.label}</span>
                          {item.href === '/mistakes' && unresolved > 0 && (
                            <span className={cn("text-[11px] px-1.5 py-0.5 rounded-full font-bold", active ? "bg-white text-zinc-900" : "bg-red-100 text-red-700")}>{unresolved}</span>
                          )}
                          {item.href === '/analytics' && attempts.length > 0 && (
                            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", active ? "bg-zinc-800 text-zinc-300" : "bg-zinc-100 text-zinc-600")}>{attempts.length} tests</span>
                          )}
                        </div>
                        <p className={cn("text-[11px] font-normal leading-none mt-1", active ? "text-zinc-300" : "text-zinc-400")}>{item.desc}</p>
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div>
              <h3 className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Study Tools</h3>
              <nav className="space-y-0.5">
                {secondaryNav.map(item => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors",
                        active ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:bg-zinc-50"
                      )}
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div>
              <h3 className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Subjects</h3>
              <div className="space-y-1">
                {subjects.map(s => (
                  <Link
                    key={s.id}
                    href={`/learn/${s.id}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 group"
                  >
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", s.bg)}>
                      <s.icon size={16} className={s.color} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{s.name}</p>
                      <p className="text-[11px] text-zinc-400">{s.questions} Qs • NEET</p>
                    </div>
                    <span className="text-[11px] text-zinc-400 group-hover:text-zinc-900">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 text-white">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-amber-400" />
                <h4 className="text-[13px] font-semibold">Today's Insight</h4>
              </div>
              <p className="text-[12px] text-zinc-300 mt-2 leading-relaxed">
                {attempts.length === 0 
                  ? "Take your first test to unlock personalized insights and real analytics. No fake data - only your actual performance."
                  : `You've taken ${attempts.length} tests. ${unresolved} mistakes pending. Focus on weak topics for best improvement.`
                }
              </p>
              <Link href={attempts.length === 0 ? "/tests" : "/revision"} className="mt-3 inline-flex text-[12px] font-semibold text-white underline underline-offset-4">
                {attempts.length === 0 ? "Start First Test →" : "Continue Revision →"}
              </Link>
            </div>

            <div>
              <h3 className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">More</h3>
              <nav className="space-y-0.5">
                {bottomNav.map(item => {
                  const active = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium", active ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50")}>
                      <item.icon size={16} /> {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>

        <div className="p-4 border-t shrink-0 bg-zinc-50/50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-[12px]">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold truncate">Aarav • NEET 2026</p>
              <p className="text-[11px] text-zinc-500">
                {attempts.length === 0 ? "No tests yet • Start learning" : `${attempts.length} tests • ${unresolved} mistakes`}
              </p>
            </div>
            <Link href="/profile" className="h-8 w-8 rounded-full bg-white border flex items-center justify-center hover:bg-zinc-50">
              <span className="text-[12px]">→</span>
            </Link>
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
