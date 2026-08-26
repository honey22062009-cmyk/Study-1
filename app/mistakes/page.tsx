'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store/useStore';
import { getQuestion } from '@/lib/data/questions';
import { getTopic, getChapter } from '@/lib/data/syllabus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function MistakesPage() {
  const { mistakes, resolveMistake, updateMistakeCategory } = useAppStore();
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('unresolved');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = mistakes.filter(m => {
    if (filter === 'unresolved' && m.resolved) return false;
    if (filter === 'resolved' && !m.resolved) return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    return true;
  });

  // If no mistakes in store, show mock
  const displayMistakes = filtered.length ? filtered : [
    { id: 'mock-1', questionId: 'q-bio-003', subjectId: 'biology', chapterId: 'bio-07', topicId: 'bio-07-t1', category: 'concept-gap', timesRepeated: 2, resolved: false, lastAttempted: new Date().toISOString() },
    { id: 'mock-2', questionId: 'q-phy-001', subjectId: 'physics', chapterId: 'phy-02', topicId: 'phy-02-t2', category: 'calculation-error', timesRepeated: 1, resolved: false, lastAttempted: new Date().toISOString() },
    { id: 'mock-3', questionId: 'q-chem-003', subjectId: 'chemistry', chapterId: 'chem-05', topicId: 'chem-05-t1', category: 'misread', timesRepeated: 3, resolved: false, lastAttempted: new Date().toISOString() },
  ] as any;

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mistake Bank</h1>
          <p className="text-zinc-600 mt-1">Every incorrect question stored with context. Categorize, reattempt, resolve. Your personal mistake notebook.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/practice?type=incorrect"><Button>Reattempt Mistakes</Button></Link>
          <Link href="/revision"><Button variant="outline">Revision Mode</Button></Link>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="flex gap-2">
          {[
            { id: 'unresolved', label: 'Unresolved' },
            { id: 'resolved', label: 'Resolved' },
            { id: 'all', label: 'All' },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id as any)} className={`px-4 py-2 rounded-full text-[13px] border ${filter===f.id ? 'bg-zinc-900 text-white' : 'bg-white'}`}>{f.label}</button>
          ))}
        </div>
        <div className="w-px h-8 bg-zinc-200 mx-2 hidden md:block" />
        <div className="flex gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'concept-gap', label: 'Concept Gap' },
            { id: 'calculation-error', label: 'Calculation' },
            { id: 'misread', label: 'Misread' },
            { id: 'memory', label: 'Memory' },
            { id: 'careless', label: 'Careless' },
            { id: 'time-pressure', label: 'Time Pressure' },
          ].map(c => (
            <button key={c.id} onClick={() => setCategoryFilter(c.id)} className={`px-3 py-1.5 rounded-full text-[12px] border ${categoryFilter===c.id ? 'bg-zinc-900 text-white' : 'bg-zinc-50'}`}>{c.label}</button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardContent className="p-5 text-center"><p className="text-2xl font-bold">{displayMistakes.filter((m:any)=>!m.resolved).length}</p><p className="text-[12px] text-zinc-500">Unresolved</p></CardContent></Card>
        <Card><CardContent className="p-5 text-center"><p className="text-2xl font-bold">{displayMistakes.filter((m:any)=>m.timesRepeated>1).length}</p><p className="text-[12px] text-zinc-500">Repeated Mistakes</p></CardContent></Card>
        <Card><CardContent className="p-5 text-center"><p className="text-2xl font-bold">68%</p><p className="text-[12px] text-zinc-500">Fixed after revision</p></CardContent></Card>
      </div>

      <div className="space-y-4">
        {displayMistakes.map((mistake: any) => {
          const q = getQuestion(mistake.questionId);
          const topic = getTopic(mistake.topicId);
          const chapter = getChapter(mistake.chapterId);
          if (!q) return null;
          return (
            <Card key={mistake.id} className={mistake.resolved ? 'opacity-60' : ''}>
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline">{mistake.subjectId}</Badge>
                        <Badge variant="secondary">{chapter?.name}</Badge>
                        <Badge variant="outline">{topic?.name}</Badge>
                        <Badge variant={mistake.timesRepeated>1 ? 'destructive' : 'warning'}>{mistake.timesRepeated}x repeated</Badge>
                      </div>
                      <span className="text-[11px] text-zinc-500">{new Date(mistake.lastAttempted).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-semibold text-[14px] mt-3">{q.statement}</h3>
                    <div className="mt-3 space-y-1 text-[13px]">
                      <p><span className="text-zinc-500">Your answer:</span> <span className="font-medium text-red-700">{q.options.find(o=>o.id===mistake.userAnswerId || o.id===mistake.userAnswerId)?.text || 'N/A'} (Incorrect)</span></p>
                      <p><span className="text-zinc-500">Correct:</span> <span className="font-medium text-emerald-700">{q.options.find(o=>o.id===q.correctOptionId)?.text}</span></p>
                      <p className="text-[12px] text-zinc-600 mt-2 bg-zinc-50 border rounded-xl p-3">{q.explanation}</p>
                    </div>
                    <div className="mt-4 flex gap-2 flex-wrap">
                      <Link href={`/learn/${mistake.subjectId}/${mistake.chapterId}/${mistake.topicId}`} className="text-[12px] font-semibold underline">Revise Topic</Link>
                      <Link href={`/practice?topic=${mistake.topicId}&count=5`} className="text-[12px] font-semibold underline">Practice Similar</Link>
                      <Link href={`/ai-tutor?question=${q.id}`} className="text-[12px] font-semibold underline">Ask AI why wrong</Link>
                    </div>
                  </div>
                  <div className="lg:w-[240px] space-y-3">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Mistake Category (optional)</label>
                      <select value={mistake.category} onChange={e => updateMistakeCategory(mistake.id, e.target.value as any)} className="mt-1 w-full rounded-xl border px-3 py-2 text-[13px]">
                        <option value="unclassified">Unclassified</option>
                        <option value="concept-gap">Concept Gap</option>
                        <option value="calculation-error">Calculation Error</option>
                        <option value="misread">Misread Question</option>
                        <option value="memory">Memory Mistake</option>
                        <option value="careless">Careless Mistake</option>
                        <option value="time-pressure">Time Pressure</option>
                      </select>
                      <p className="text-[11px] text-zinc-500 mt-1">You can edit anytime. Not forced.</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => resolveMistake(mistake.id)} disabled={mistake.resolved}>{mistake.resolved ? 'Resolved ✓' : 'Mark Resolved'}</Button>
                      <Button size="sm" className="flex-1">Reattempt</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {displayMistakes.length===0 && (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <p className="font-semibold">No mistakes in this filter 🎉</p>
            <p className="text-[13px] text-zinc-500 mt-1">Great job! Keep practicing to improve further.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
