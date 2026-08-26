'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Target } from 'lucide-react';
import Link from 'next/link';

export default function PlannerPage() {
  const week = [
    { day: 'Mon', date: 'Today', tasks: ['Biology: Breathing (45m)', 'Practice: 20 Qs Genetics'], done: 1 },
    { day: 'Tue', date: 'Tomorrow', tasks: ['Physics: Electrostatics', 'Test: Chapter Test'], done: 0 },
    { day: 'Wed', date: '28 Aug', tasks: ['Chemistry: Bonding', 'Revision: Mistakes'], done: 0 },
    { day: 'Thu', date: '29 Aug', tasks: ['Full Mock 01', 'Analysis'], done: 0 },
    { day: 'Fri', date: '30 Aug', tasks: ['Weak topics practice', 'Notes revision'], done: 0 },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3"><Calendar /> Planner</h1>
        <p className="text-zinc-600 mt-2">Optional study planner - you control it. Recommendations are optional, never forced. Edit anytime.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {week.map(d => (
          <Card key={d.day} className={d.date==='Today' ? 'border-zinc-900' : ''}>
            <CardHeader className="pb-2">
              <CardTitle className="text-[13px] flex items-center justify-between">
                {d.day}
                {d.date==='Today' && <Badge className="text-[10px]">Today</Badge>}
              </CardTitle>
              <p className="text-[11px] text-zinc-500">{d.date}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {d.tasks.map((t,i) => (
                <div key={i} className="rounded-lg bg-zinc-50 p-2 text-[11px] flex items-center gap-2">
                  <input type="checkbox" checked={i < d.done} readOnly className="rounded" />
                  <span className={i < d.done ? "line-through text-zinc-400" : ""}>{t}</span>
                </div>
              ))}
              <Button size="sm" variant="ghost" className="w-full text-[11px]">+ Add</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-[14px]">AI Suggested Plan (Optional - you decide)</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-[13px]">
            <p>Based on your weak topics (Genetics 45% accuracy) and 8 unresolved mistakes, suggested:</p>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
              <p className="font-semibold text-amber-900">This week focus:</p>
              <ul className="mt-2 space-y-1 text-amber-800 list-disc pl-4 text-[12px]">
                <li>Genetics: 15 targeted Qs + short notes (Mendelian inheritance)</li>
                <li>Thermodynamics: Revise 8 mistakes</li>
                <li>2 chapter tests + 1 full mock</li>
              </ul>
              <div className="mt-3 flex gap-2">
                <Button size="sm">Apply Suggestion</Button>
                <Button size="sm" variant="outline">Ignore - I'll plan myself</Button>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500">Planner is supportive, not forcing. You control schedule.</p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[13px]">Quick Links</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Link href="/focus" className="rounded-xl border p-3 text-center hover:bg-zinc-50"><Clock size={16} className="mx-auto" /><p className="text-[11px] mt-1">Focus Timer</p></Link>
              <Link href="/goals" className="rounded-xl border p-3 text-center hover:bg-zinc-50"><Target size={16} className="mx-auto" /><p className="text-[11px] mt-1">Goals</p></Link>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 text-white">
            <CardContent className="p-5">
              <h4 className="font-semibold text-[13px]">Planner Philosophy</h4>
              <p className="text-[12px] text-zinc-400 mt-2">We recommend, you decide. No strict productivity system. Open platform and simply choose: "I want Biology" or "Give me 10 Qs". System adapts to your intention.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
