'use client';

import { Suspense } from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { subjects, chapters, topics, getSubject, getChapter, getTopic } from '@/lib/data/syllabus';
import { questions, getQuestionsByTopic, getQuestionsByChapter, getQuestionsBySubject, getPYQs } from '@/lib/data/questions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store/useStore';

function PracticePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { attempts, mistakes } = useAppStore();
  const hasData = attempts.length > 0;
  const avgAccuracy = hasData ? attempts.reduce((acc,a)=>acc+a.accuracy,0)/attempts.length : 0;
  const totalPracticed = hasData ? attempts.reduce((acc,a)=>acc+a.answers.length,0) : 0;
  
  const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || '');
  const [selectedChapter, setSelectedChapter] = useState(searchParams.get('chapter') || '');
  const [selectedTopic, setSelectedTopic] = useState(searchParams.get('topic') || '');
  const [count, setCount] = useState(parseInt(searchParams.get('count') || '10'));
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || 'mixed');
  const [qType, setQType] = useState(searchParams.get('type') || 'all');
  const [timeLimit, setTimeLimit] = useState(searchParams.get('time') || 'none');

  // Filter questions
  let filtered = [...questions];
  if (selectedTopic) filtered = filtered.filter(q => q.topicId === selectedTopic);
  else if (selectedChapter) filtered = filtered.filter(q => q.chapterId === selectedChapter);
  else if (selectedSubject) filtered = filtered.filter(q => q.subjectId === selectedSubject);
  
  if (qType === 'pyq') filtered = filtered.filter(q => q.source === 'pyq');
  if (qType === 'incorrect') filtered = filtered.slice(0, 3); // mock previously incorrect
  if (difficulty !== 'mixed') filtered = filtered.filter(q => q.difficulty === difficulty);

  const startPractice = () => {
    const ids = filtered.slice(0, count).map(q => q.id);
    if (ids.length === 0) return;
    const params = new URLSearchParams({
      ids: ids.join(','),
      count: count.toString(),
      topic: selectedTopic,
      chapter: selectedChapter,
      subject: selectedSubject,
    });
    router.push(`/practice/session?${params.toString()}`);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Practice Engine</h1>
        <p className="text-zinc-600 mt-2">You decide everything: subject, chapter, topic, count, difficulty, PYQ/custom, time. Highly specific sessions.</p>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <Card>
          <CardHeader><CardTitle className="text-[15px]">Create Practice Session</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {/* Subject */}
            <div>
              <label className="text-[12px] font-semibold uppercase tracking-wider text-zinc-500">Subject</label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <button onClick={() => { setSelectedSubject(''); setSelectedChapter(''); setSelectedTopic(''); }} className={`rounded-xl border p-3 text-[13px] font-medium ${!selectedSubject ? 'bg-zinc-900 text-white' : 'bg-zinc-50 hover:bg-white'}`}>All</button>
                {subjects.map(s => (
                  <button key={s.id} onClick={() => { setSelectedSubject(s.id); setSelectedChapter(''); setSelectedTopic(''); }} className={`rounded-xl border p-3 text-[13px] font-medium ${selectedSubject===s.id ? 'bg-zinc-900 text-white' : 'bg-zinc-50 hover:bg-white'}`}>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Chapter */}
            {selectedSubject && (
              <div>
                <label className="text-[12px] font-semibold uppercase tracking-wider text-zinc-500">Chapter</label>
                <div className="mt-2 grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto">
                  {chapters.filter(c=>c.subjectId===selectedSubject).map(ch => (
                    <button key={ch.id} onClick={() => { setSelectedChapter(ch.id); setSelectedTopic(''); }} className={`text-left rounded-xl border p-3 ${selectedChapter===ch.id ? 'bg-zinc-900 text-white' : 'bg-zinc-50 hover:bg-white'}`}>
                      <p className="text-[13px] font-medium">{ch.name}</p>
                      <p className="text-[11px] opacity-70">{ch.unit}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Topic */}
            {selectedChapter && (
              <div>
                <label className="text-[12px] font-semibold uppercase tracking-wider text-zinc-500">Topic</label>
                <div className="mt-2 grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto">
                  {topics.filter(t=>t.chapterId===selectedChapter).map(t => (
                    <button key={t.id} onClick={() => setSelectedTopic(t.id)} className={`text-left rounded-xl border p-3 ${selectedTopic===t.id ? 'bg-zinc-900 text-white' : 'bg-zinc-50 hover:bg-white'}`}>
                      <p className="text-[13px] font-medium">{t.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Count */}
            <div>
              <label className="text-[12px] font-semibold uppercase tracking-wider text-zinc-500">Number of Questions</label>
              <div className="mt-2 flex gap-2 flex-wrap">
                {[5,10,20,30,50].map(n => (
                  <button key={n} onClick={() => setCount(n)} className={`rounded-full px-5 py-2.5 text-[13px] font-medium border ${count===n ? 'bg-zinc-900 text-white' : 'bg-white hover:bg-zinc-50'}`}>{n}</button>
                ))}
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-[12px] text-zinc-500">Custom:</span>
                  <input type="number" value={count} onChange={e=>setCount(parseInt(e.target.value)||10)} className="w-20 rounded-full border px-3 py-2 text-[13px]" min={1} max={100} />
                </div>
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-[12px] font-semibold uppercase tracking-wider text-zinc-500">Difficulty</label>
              <div className="mt-2 flex gap-2">
                {[
                  { id: 'mixed', label: 'Mixed' },
                  { id: 'easy', label: 'Easy' },
                  { id: 'moderate', label: 'Moderate' },
                  { id: 'difficult', label: 'Difficult' },
                ].map(d => (
                  <button key={d.id} onClick={() => setDifficulty(d.id)} className={`rounded-full px-4 py-2 text-[13px] border ${difficulty===d.id ? 'bg-zinc-900 text-white' : 'bg-white'}`}>{d.label}</button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="text-[12px] font-semibold uppercase tracking-wider text-zinc-500">Question Type</label>
              <div className="mt-2 flex gap-2 flex-wrap">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'pyq', label: 'PYQ Only' },
                  { id: 'incorrect', label: 'Previously Incorrect' },
                  { id: 'mixed', label: 'Mixed Types' },
                ].map(t => (
                  <button key={t.id} onClick={() => setQType(t.id)} className={`rounded-full px-4 py-2 text-[13px] border ${qType===t.id ? 'bg-zinc-900 text-white' : 'bg-white'}`}>{t.label}</button>
                ))}
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="text-[12px] font-semibold uppercase tracking-wider text-zinc-500">Time Limit (Optional)</label>
              <div className="mt-2 flex gap-2">
                {[
                  { id: 'none', label: 'No limit' },
                  { id: '1', label: '1 min / Q' },
                  { id: '2', label: '2 min / Q' },
                  { id: 'custom', label: 'Custom' },
                ].map(t => (
                  <button key={t.id} onClick={() => setTimeLimit(t.id)} className={`rounded-full px-4 py-2 text-[13px] border ${timeLimit===t.id ? 'bg-zinc-900 text-white' : 'bg-white'}`}>{t.label}</button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t flex gap-3">
              <Button onClick={startPractice} className="flex-1" disabled={filtered.length===0}>
                Start Practice • {Math.min(count, filtered.length)} Questions →
              </Button>
              <Button variant="outline" onClick={() => { setSelectedSubject(''); setSelectedChapter(''); setSelectedTopic(''); setCount(10); setDifficulty('mixed'); setQType('all'); }}>Reset</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[14px]">Preview • {filtered.length} questions found</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {filtered.length===0 ? (
                <p className="text-[13px] text-zinc-500">No questions match filters. Try broader selection.</p>
              ) : (
                <>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{filtered.filter(q=>q.source==='pyq').length} PYQs</Badge>
                    <Badge variant="secondary">{filtered.filter(q=>q.difficulty==='easy').length} Easy</Badge>
                    <Badge variant="secondary">{filtered.filter(q=>q.difficulty==='moderate').length} Moderate</Badge>
                    <Badge variant="secondary">{filtered.filter(q=>q.difficulty==='difficult').length} Difficult</Badge>
                  </div>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                    {filtered.slice(0, count).map((q,i) => (
                      <div key={q.id} className="rounded-xl border p-3 bg-zinc-50">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[12px] font-medium leading-snug flex-1">{i+1}. {q.statement.slice(0,100)}...</p>
                          <Badge variant="outline" className="text-[10px] shrink-0">{q.difficulty}</Badge>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-1">{q.subjectId} • {q.chapterId} • {q.type} {q.year ? `• ${q.year}` : ''}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-[12px] text-amber-800">
                    Example: <b>Biology → Human Physiology → Breathing → PYQs → Mixed Difficulty → 20 Questions</b> — exactly like this builder allows.
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[13px]">Your Practice Stats • Real Data</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-[12px]">
              {hasData ? (
                <>
                  <div className="flex justify-between"><span className="text-zinc-500">Total Practiced</span><span className="font-semibold">{totalPracticed} Qs (real)</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Accuracy</span><span className="font-semibold">{avgAccuracy.toFixed(1)}% avg (real)</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Tests</span><span className="font-semibold">{attempts.length} tests</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Mistakes</span><span className="font-semibold text-amber-700">{mistakes.filter(m=>!m.resolved).length} pending (real)</span></div>
                </>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-zinc-500">No practice data yet</p>
                  <p className="text-[11px] text-zinc-400 mt-1">Your real stats will appear after you start practicing. No fake data.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


function WrappedPage(props: any) {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <PracticePageInner {...props} />
    </Suspense>
  );
}

export default WrappedPage;
