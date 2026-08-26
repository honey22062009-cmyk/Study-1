'use client';

import { Suspense } from 'react';

import { useParams, useSearchParams } from 'next/navigation';
import { mockTests, getQuestion } from '@/lib/data/questions';
import { useAppStore } from '@/lib/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TrendingUp, Clock, Target, AlertTriangle, BookOpen, BarChart3 } from 'lucide-react';

function AnalysisPageInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const testId = params.id as string;
  const attemptId = searchParams.get('attemptId');
  const test = mockTests.find(t => t.id === testId) || mockTests[0];
  const { attempts } = useAppStore();
  const attempt = attempts.find(a => a.id === attemptId) || attempts[attempts.length-1];

  if (!attempt) {
    return (
      <div className="p-8 max-w-[800px] mx-auto">
        <h1 className="text-2xl font-bold">No attempt found</h1>
        <p className="text-zinc-600 mt-2">Take a test to see analysis.</p>
        <Link href="/tests"><Button className="mt-4">Go to Tests</Button></Link>
      </div>
    );
  }

  const correct = attempt.answers.filter(a => a.isCorrect).length;
  const incorrect = attempt.answers.filter(a => a.isCorrect === false).length;
  const unattempted = attempt.answers.filter(a => a.isCorrect === null).length;

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Test Analysis</h1>
        <p className="text-zinc-600 mt-1">{test.title} • Attempt {attempt.id.slice(-6)}</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Total Score</p>
            <p className="text-3xl font-bold mt-1">{attempt.score}/{attempt.total}</p>
            <p className="text-[11px] text-zinc-500 mt-1">Estimate: 580/720 NEET</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Accuracy</p>
            <p className="text-3xl font-bold mt-1">{attempt.accuracy.toFixed(1)}%</p>
            <p className="text-[11px] text-emerald-600 mt-1">↑ +5% vs last</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Time Spent</p>
            <p className="text-3xl font-bold mt-1">{Math.floor(attempt.timeSpentSeconds/60)}m</p>
            <p className="text-[11px] text-zinc-500 mt-1">Avg {Math.round(attempt.timeSpentSeconds/attempt.answers.length)}s / Q</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Correct</p>
            <p className="text-3xl font-bold mt-1 text-emerald-600">{correct}</p>
            <p className="text-[11px] text-zinc-500 mt-1">{incorrect} wrong • {unattempted} unattempted</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-[15px] flex items-center gap-2"><TrendingUp size={16} /> What the stats mean (not just numbers)</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-[13px] leading-relaxed">
              <p>• You performed <b>well on conceptual Biology questions</b> but lost marks on statement-based questions. Focus on reading NCERT statements carefully - statement-based PYQs are high-yield in NEET.</p>
              <p>• Your Physics accuracy is reasonable ({attempt.accuracy.toFixed(0)}%), but your average solving time is significantly higher on numerical problems. Practice timed numerical drills.</p>
              <p>• Chemistry equilibrium questions took longest. Revise Kc/Qc concepts and do 10 targeted Qs.</p>
              <p>• You left {unattempted} unattempted - time management improved vs last mock (previously 8 unattempted). Good progress.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-[14px]">Subject & Chapter Performance</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { subject: 'Biology', correct: 12, total: 15, accuracy: 80, avgTime: 45 },
                { subject: 'Physics', correct: 5, total: 8, accuracy: 62, avgTime: 95 },
                { subject: 'Chemistry', correct: 6, total: 8, accuracy: 75, avgTime: 70 },
              ].map(s => (
                <div key={s.subject} className="flex items-center gap-4">
                  <div className="w-20 text-[13px] font-semibold">{s.subject}</div>
                  <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden"><div className="h-full bg-zinc-900" style={{ width: `${s.accuracy}%` }} /></div>
                  <div className="text-[12px] w-32">{s.correct}/{s.total} • {s.accuracy}% • {s.avgTime}s avg</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-[14px]">Question-wise Breakdown</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {attempt.answers.map((ans, idx) => {
                const q = getQuestion(ans.questionId);
                if (!q) return null;
                return (
                  <div key={ans.questionId} className={`rounded-xl border p-4 ${ans.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : ans.isCorrect===false ? 'bg-red-50/50 border-red-200' : 'bg-zinc-50'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[13px] font-medium flex-1">{idx+1}. {q.statement}</p>
                      <Badge variant={ans.isCorrect ? 'success' : ans.isCorrect===false ? 'destructive' : 'secondary'}>{ans.isCorrect ? 'Correct' : ans.isCorrect===false ? 'Incorrect' : 'Unattempted'}</Badge>
                    </div>
                    <p className="text-[12px] text-zinc-600 mt-2">Your: {q.options.find(o=>o.id===ans.selectedOptionId)?.text || 'Not attempted'} | Correct: {q.options.find(o=>o.id===q.correctOptionId)?.text}</p>
                    <p className="text-[12px] text-zinc-500 mt-1">{q.explanation} • Time: {ans.timeTakenSeconds}s</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-zinc-900 text-white">
            <CardContent className="p-5">
              <h4 className="font-semibold text-[13px]">Improvement Plan (Optional)</h4>
              <div className="mt-3 space-y-3 text-[12px]">
                <div className="rounded-xl bg-zinc-800 p-3">
                  <p className="font-semibold">Revise Genetics</p>
                  <p className="text-zinc-400 mt-1">Weakest chapter 45% accuracy. 15 targeted Qs + short notes.</p>
                  <Link href="/learn/biology/bio-07/bio-07-t1" className="text-white underline text-[11px] mt-2 inline-block">Revise Now</Link>
                </div>
                <div className="rounded-xl bg-zinc-800 p-3">
                  <p className="font-semibold">Fix Mistakes</p>
                  <p className="text-zinc-400 mt-1">{incorrect} new mistakes added. Categorize and reattempt.</p>
                  <Link href="/mistakes" className="text-white underline text-[11px] mt-2 inline-block">View Mistakes</Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[13px]">Difficulty & Type</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-[12px]">
              <div className="flex justify-between"><span>Easy</span><span className="font-semibold">80% (4/5)</span></div>
              <div className="flex justify-between"><span>Moderate</span><span className="font-semibold">65% (13/20)</span></div>
              <div className="flex justify-between"><span>Difficult</span><span className="font-semibold">40% (2/5)</span></div>
              <div className="border-t pt-2 mt-2 space-y-1">
                <div className="flex justify-between"><span>Statement-based</span><span className="font-semibold text-amber-700">50% weak</span></div>
                <div className="flex justify-between"><span>Numerical</span><span className="font-semibold">60%</span></div>
                <div className="flex justify-between"><span>MCQ</span><span className="font-semibold">75%</span></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-2">
            <Link href="/practice"><Button variant="outline" size="sm" className="w-full">Practice Weak</Button></Link>
            <Link href="/mistakes"><Button variant="outline" size="sm" className="w-full">Mistakes</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}


function WrappedPage(props: any) {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <AnalysisPageInner {...props} />
    </Suspense>
  );
}

export default WrappedPage;
