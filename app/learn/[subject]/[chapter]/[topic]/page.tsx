'use client';

import { Suspense } from 'react';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { getTopic, getChapter, getSubject } from '@/lib/data/syllabus';
import { getNotesByTopic } from '@/lib/data/notes';
import { getQuestionsByTopic } from '@/lib/data/questions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, FileText, Dumbbell, Bot, Lightbulb, CheckCircle2 } from 'lucide-react';

function TopicPageInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const subjectId = params.subject as string;
  const chapterId = params.chapter as string;
  const topicId = params.topic as string;
  const initialTab = searchParams.get('tab') || 'detailed';

  const topic = getTopic(topicId);
  const chapter = getChapter(chapterId);
  const subject = getSubject(subjectId);
  const notes = getNotesByTopic(topicId);
  const questions = getQuestionsByTopic(topicId);

  const [activeTab, setActiveTab] = useState(initialTab);
  const [showFlashcard, setShowFlashcard] = useState(0);
  const [conceptCheck, setConceptCheck] = useState<string | null>(null);

  if (!topic) return <div className="p-8">Topic not found</div>;

  const detailedNote = notes.find(n => n.type === 'detailed') || notes[0];
  const shortNote = notes.find(n => n.type === 'short');
  const quickNote = notes.find(n => n.type === 'quick-revision');

  const currentNote = activeTab === 'detailed' ? detailedNote : activeTab === 'short' ? shortNote : activeTab === 'quick' ? quickNote : detailedNote;

  const flashcards = [
    { q: 'What is tidal volume?', a: '500 mL normal breathing' },
    { q: 'Where does gas exchange occur?', a: 'Alveoli - 300 million, 70 m²' },
    { q: 'pO2 in alveoli?', a: '104 mmHg' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] text-zinc-500 flex-wrap">
        <Link href="/learn" className="hover:text-zinc-900">Learn</Link>
        <ChevronRight size={14} />
        <Link href={`/learn/${subjectId}`} className="hover:text-zinc-900">{subject?.name}</Link>
        <ChevronRight size={14} />
        <Link href={`/learn/${subjectId}/${chapterId}`} className="hover:text-zinc-900 truncate max-w-[150px]">{chapter?.name}</Link>
        <ChevronRight size={14} />
        <span className="font-medium text-zinc-900">{topic.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{topic.name}</h1>
            <Badge variant={topic.importance === 'very-high' ? 'destructive' : topic.importance === 'high' ? 'warning' : 'secondary'}>{topic.importance}</Badge>
          </div>
          <p className="text-zinc-600 mt-2">{subject?.name} • {chapter?.name} • {questions.length} questions • {notes.length} note types • NCERT aligned</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link href={`/practice?topic=${topicId}&count=10`}><Button size="sm">Practice 10 Qs</Button></Link>
          <Link href={`/practice?topic=${topicId}&type=pyq`}><Button size="sm" variant="outline">PYQs</Button></Link>
          <Link href={`/ai-tutor?topic=${topicId}`}><Button size="sm" variant="secondary"><Bot size={14} className="mr-2" /> Ask AI</Button></Link>
        </div>
      </div>

      {/* Tab selector - student freedom */}
      <div className="flex gap-2 border-b pb-1 overflow-x-auto">
        {[
          { id: 'detailed', label: 'Detailed Learning' },
          { id: 'short', label: 'Short Notes' },
          { id: 'quick', label: 'Quick Revision (2 min)' },
          { id: 'important', label: 'Important Points' },
          { id: 'visual', label: 'Visual' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-zinc-900 text-zinc-900' : 'border-transparent text-zinc-500 hover:text-zinc-900'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
        {/* Main content */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-[15px] flex items-center gap-2">
                <BookOpen size={16} /> {currentNote?.title || topic.name}
              </CardTitle>
              <Badge variant="outline" className="text-[10px]">{currentNote?.verified ? '✓ Verified NCERT' : 'AI Generated'}</Badge>
            </CardHeader>
            <CardContent className="prose-neet">
              {currentNote ? (
                <div className="space-y-4">
                  {currentNote.content.sections.map(sec => (
                    <div key={sec.id}>
                      {sec.type === 'heading' && <h2>{sec.content}</h2>}
                      {sec.type === 'paragraph' && <p className="text-[14px] leading-relaxed">{sec.content}</p>}
                      {sec.type === 'important' && (
                        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                          <p className="font-semibold text-[13px] text-amber-900">{sec.title}</p>
                          <p className="text-[13px] text-amber-800 mt-1">{sec.content}</p>
                        </div>
                      )}
                      {sec.type === 'list' && (
                        <div className="rounded-xl bg-zinc-50 border p-4">
                          {sec.title && <p className="font-semibold text-[13px] mb-2">{sec.title}</p>}
                          <pre className="whitespace-pre-wrap text-[13px] font-sans leading-relaxed">{sec.content}</pre>
                        </div>
                      )}
                      {sec.type === 'table' && (
                        <div className="overflow-x-auto">
                          <pre className="text-[12px] bg-zinc-50 p-4 rounded-xl border whitespace-pre-wrap">{sec.content}</pre>
                        </div>
                      )}
                      {sec.type === 'formula' && (
                        <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                          {sec.title && <p className="font-semibold text-[13px] text-blue-900">{sec.title}</p>}
                          <pre className="text-[13px] font-mono mt-2 whitespace-pre-wrap">{sec.content}</pre>
                        </div>
                      )}
                      {sec.type === 'interactive' && (
                        <div className="rounded-xl bg-violet-50 border border-violet-200 p-4">
                          <p className="font-semibold text-[13px] text-violet-900 flex items-center gap-2"><Lightbulb size={14} /> {sec.title}</p>
                          <p className="text-[13px] text-violet-800 mt-1">{sec.content}</p>
                        </div>
                      )}
                      {sec.type === 'example' && (
                        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                          <p className="font-semibold text-[13px] text-emerald-900">{sec.title}</p>
                          <p className="text-[13px] text-emerald-800 mt-1">{sec.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[14px] text-zinc-500">No notes for this tab. Switch to Detailed Learning.</p>
              )}
            </CardContent>
          </Card>

          {/* Interactive checks */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[14px]">Mini Concept Check (Interactive)</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-[13px] font-medium">What is the partial pressure of CO2 in deoxygenated blood?</p>
              <div className="grid grid-cols-2 gap-2">
                {['40 mmHg', '45 mmHg', '104 mmHg', '95 mmHg'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setConceptCheck(opt)}
                    className={`p-3 rounded-xl border text-[13px] text-left transition-colors ${conceptCheck === opt ? (opt === '45 mmHg' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900') : 'bg-zinc-50 hover:bg-white'}`}
                  >
                    {opt} {conceptCheck === opt && (opt === '45 mmHg' ? '✓' : '✗')}
                  </button>
                ))}
              </div>
              {conceptCheck && (
                <div className={`rounded-xl p-3 text-[12px] ${conceptCheck === '45 mmHg' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                  {conceptCheck === '45 mmHg' ? 'Correct! Deoxygenated blood brings CO2 from tissues (45 mmHg) to alveoli.' : 'Not quite. Deoxygenated blood has pCO2 45 mmHg from tissues. Try again.'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar - tools */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[14px]">Flashcards</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl bg-zinc-900 text-white p-5 min-h-[120px] flex flex-col justify-center">
                <p className="text-[12px] text-zinc-400 uppercase tracking-wider">Q {showFlashcard+1}/{flashcards.length}</p>
                <p className="font-semibold mt-2">{flashcards[showFlashcard].q}</p>
                <details className="mt-3">
                  <summary className="text-[12px] text-zinc-400 cursor-pointer hover:text-white">Show Answer</summary>
                  <p className="text-[13px] mt-2 text-emerald-300">{flashcards[showFlashcard].a}</p>
                </details>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => setShowFlashcard(s => (s-1+flashcards.length)%flashcards.length)}>Prev</Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => setShowFlashcard(s => (s+1)%flashcards.length)}>Next</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[14px]">Practice this topic</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                {[5,10,20].map(n => (
                  <Link key={n} href={`/practice?topic=${topicId}&count=${n}`} className="rounded-xl border bg-zinc-50 py-2.5 text-center text-[13px] font-medium hover:bg-white">
                    {n} Qs
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href={`/practice?topic=${topicId}&difficulty=easy`} className="rounded-xl border p-2.5 text-center text-[12px]">Easy</Link>
                <Link href={`/practice?topic=${topicId}&difficulty=moderate`} className="rounded-xl border p-2.5 text-center text-[12px]">Moderate</Link>
              </div>
              <Link href={`/practice?topic=${topicId}&type=pyq`} className="block rounded-xl bg-amber-50 border border-amber-200 p-3 text-center">
                <p className="text-[13px] font-semibold text-amber-900">PYQs • {questions.filter(q=>q.source==='pyq').length} available</p>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-zinc-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-[13px]">AI Tutor Context</h4>
              <p className="text-[12px] text-zinc-600 mt-2 leading-relaxed">AI understands you are studying <b>{topic.name}</b>. Ask doubts, get alternative explanations, examples, grounded in verified content.</p>
              <Link href={`/ai-tutor?topic=${topicId}`} className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold underline underline-offset-4">
                <Bot size={14} /> Open AI Tutor for this topic
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[13px]">Topic Stats</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-[12px]">
              <div className="flex justify-between"><span className="text-zinc-500">Questions</span><span className="font-semibold">{questions.length}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">PYQs</span><span className="font-semibold">{questions.filter(q=>q.source==='pyq').length}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Avg Accuracy</span><span className="font-semibold">72%</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Your attempts</span><span className="font-semibold">12</span></div>
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
      <TopicPageInner {...props} />
    </Suspense>
  );
}

export default WrappedPage;
