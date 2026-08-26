'use client';

import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getQuestion } from '@/lib/data/questions';
import { CheckCircle2, XCircle, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

function ResultPageInner() {
  const searchParams = useSearchParams();
  const correct = parseInt(searchParams.get('correct') || '0');
  const total = parseInt(searchParams.get('total') || '0');
  const time = parseInt(searchParams.get('time') || '0');
  const ids = searchParams.get('ids')?.split(',') || [];
  const accuracy = total ? (correct/total)*100 : 0;

  return (
    <div className="p-6 lg:p-8 max-w-[1000px] mx-auto space-y-6">
      <div className="text-center py-8">
        <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold ${accuracy>=70 ? 'bg-emerald-100 text-emerald-700' : accuracy>=40 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
          {Math.round(accuracy)}%
        </div>
        <h1 className="text-3xl font-bold mt-4">Practice Complete!</h1>
        <p className="text-zinc-600 mt-2">{correct} correct out of {total} • {Math.floor(time/60)}m {time%60}s • Accuracy {accuracy.toFixed(1)}%</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 text-center">
            <CheckCircle2 className="mx-auto text-emerald-500" />
            <p className="text-2xl font-bold mt-2">{correct}</p>
            <p className="text-[12px] text-zinc-500">Correct</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <XCircle className="mx-auto text-red-500" />
            <p className="text-2xl font-bold mt-2">{total-correct}</p>
            <p className="text-[12px] text-zinc-500">Incorrect</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <Clock className="mx-auto text-blue-500" />
            <p className="text-2xl font-bold mt-2">{Math.round(time/total) || 0}s</p>
            <p className="text-[12px] text-zinc-500">Avg / Q</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-[15px] flex items-center gap-2"><TrendingUp size={16} /> Analysis</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-[13px]">
          <p>• You performed <b>{accuracy>=70 ? 'well' : accuracy>=50 ? 'moderately' : 'poorly'}</b> on this set. {accuracy>=70 ? 'Keep practicing to maintain consistency.' : 'Focus on weak areas and revise concepts.'}</p>
          <p>• Average solving time {Math.round(time/total)}s per question is {Math.round(time/total) < 60 ? 'excellent - fast and accurate' : Math.round(time/total) < 90 ? 'reasonable but can improve on numerical problems' : 'significantly higher - practice speed'}.</p>
          <p>• {total-correct} mistakes added to Mistake Bank for spaced revision. You can categorize them as Concept Gap, Calculation Error, etc.</p>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Link href="/practice" className="flex-1"><Button className="w-full">Practice Again</Button></Link>
        <Link href="/mistakes" className="flex-1"><Button variant="outline" className="w-full"><AlertTriangle size={14} className="mr-2" /> Review Mistakes</Button></Link>
        <Link href="/analytics"><Button variant="secondary">View Analytics</Button></Link>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-[14px]">Question-wise Review</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {ids.map((id, idx) => {
            const q = getQuestion(id);
            if (!q) return null;
            return (
              <div key={id} className="rounded-xl border p-4">
                <p className="text-[13px] font-medium">{idx+1}. {q.statement}</p>
                <p className="text-[12px] text-zinc-500 mt-1">Correct: {q.options.find(o=>o.id===q.correctOptionId)?.text} • {q.explanation}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}


function WrappedPage(props: any) {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <ResultPageInner {...props} />
    </Suspense>
  );
}

export default WrappedPage;
