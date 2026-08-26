'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store/useStore';

export default function RevisionPage() {
  const { mistakes, recommendations } = useAppStore();
  const unresolved = mistakes.filter(m=>!m.resolved).length || 8;

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Revision System</h1>
        <p className="text-zinc-600 mt-2">Short notes, important concepts, previously incorrect, weak topics, recently studied, custom sessions, spaced-revision suggestions. You choose.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">Spaced Revision Due</p>
            <p className="text-2xl font-bold mt-1">3 topics</p>
            <p className="text-[12px] text-amber-800 mt-1">Breathing (5 days ago), Genetics (7 days), Thermodynamics (3 days)</p>
            <Button size="sm" className="mt-3 w-full">Start Spaced Revision</Button>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-red-700">Unresolved Mistakes</p>
            <p className="text-2xl font-bold mt-1">{unresolved}</p>
            <p className="text-[12px] text-red-800 mt-1">Concept gaps in Genetics, Calculation in Physics</p>
            <Link href="/mistakes"><Button size="sm" variant="outline" className="mt-3 w-full bg-white">Review Mistakes</Button></Link>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-700">Weak Topics</p>
            <p className="text-2xl font-bold mt-1">5</p>
            <p className="text-[12px] text-blue-800 mt-1">Accuracy &lt;60% in last attempts</p>
            <Button size="sm" className="mt-3 w-full">Practice Weak Topics</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-[15px]">Create Custom Revision Session</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Link href="/revision?mode=short-notes" className="rounded-xl border p-4 hover:bg-zinc-50">
                  <p className="font-semibold text-[13px]">Short Notes Only</p>
                  <p className="text-[12px] text-zinc-500 mt-1">Rapid revision of all subjects</p>
                </Link>
                <Link href="/revision?mode=mistakes" className="rounded-xl border p-4 hover:bg-zinc-50">
                  <p className="font-semibold text-[13px]">Mistakes Only</p>
                  <p className="text-[12px] text-zinc-500 mt-1">Reattempt {unresolved} incorrect Qs</p>
                </Link>
                <Link href="/revision?mode=weak" className="rounded-xl border p-4 hover:bg-zinc-50">
                  <p className="font-semibold text-[13px]">Weak Topics</p>
                  <p className="text-[12px] text-zinc-500 mt-1">Focused on low accuracy areas</p>
                </Link>
                <Link href="/revision?mode=recent" className="rounded-xl border p-4 hover:bg-zinc-50">
                  <p className="font-semibold text-[13px]">Recently Studied</p>
                  <p className="text-[12px] text-zinc-500 mt-1">Last 7 days topics</p>
                </Link>
              </div>
              <div className="rounded-xl bg-zinc-900 text-white p-4">
                <p className="font-semibold text-[13px]">Smart Revision (AI Suggested, Optional)</p>
                <p className="text-[12px] text-zinc-400 mt-1">Based on your performance, we suggest: Genetics (Mendel), Thermodynamics (Laws), Breathing (Lung volumes). 20 min session.</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="secondary">Start Suggested</Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-zinc-800">Ignore</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-[14px]">Recently Studied Topics</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[
                { topic: 'Breathing and Exchange', subject: 'Biology', time: '2 days ago', mastery: 72 },
                { topic: 'Mendelian Inheritance', subject: 'Biology', time: '4 days ago', mastery: 45 },
                { topic: 'Capacitance', subject: 'Physics', time: '5 days ago', mastery: 60 },
                { topic: 'Chemical Bonding', subject: 'Chemistry', time: '6 days ago', mastery: 78 },
              ].map((item,i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border p-3">
                  <div>
                    <p className="text-[13px] font-medium">{item.topic}</p>
                    <p className="text-[11px] text-zinc-500">{item.subject} • {item.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[12px] font-semibold">{item.mastery}%</p>
                      <div className="h-1 w-16 bg-zinc-100 rounded-full mt-1"><div className="h-full bg-zinc-900 rounded-full" style={{ width: `${item.mastery}%` }} /></div>
                    </div>
                    <Button size="sm" variant="outline">Revise</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[14px]">Quick Revision Notes</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[
                { title: 'Breathing - 2 min', type: 'quick' },
                { title: 'Genetics - Short', type: 'short' },
                { title: 'Thermodynamics - Important', type: 'important' },
                { title: 'Cell - Visual', type: 'visual' },
              ].map(n => (
                <Link key={n.title} href="/notes" className="flex items-center justify-between rounded-xl border p-3 hover:bg-zinc-50">
                  <span className="text-[13px] font-medium">{n.title}</span>
                  <Badge variant="secondary" className="text-[10px]">{n.type}</Badge>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-zinc-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-[13px]">Revision Philosophy</h4>
              <p className="text-[12px] text-zinc-600 mt-2 leading-relaxed">Platform analyzes performance and suggests revision, but student remains free to choose. Spaced repetition is optional. No forced daily tasks. You control depth and time.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
