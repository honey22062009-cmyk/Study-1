'use client';

import { Suspense } from 'react';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { questions, getQuestion } from '@/lib/data/questions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store/useStore';
import { MistakeEntry, TestAttempt, UserAnswer } from '@/lib/types';
import { CheckCircle2, XCircle, Clock, Bot, Lightbulb } from 'lucide-react';
import Link from 'next/link';

function PracticeSessionPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addMistake, addAttempt } = useAppStore();

  const idsParam = searchParams.get('ids');
  const questionIds = idsParam ? idsParam.split(',') : questions.slice(0,10).map(q=>q.id);
  const qs = questionIds.map(id => getQuestion(id)).filter(Boolean) as typeof questions;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { selected: string, time: number }>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState(Date.now());
  const [qStartTime, setQStartTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime)/1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const currentQ = qs[currentIdx];
  const currentAnswer = answers[currentQ?.id];

  const handleSelect = (optId: string) => {
    const time = Math.floor((Date.now() - qStartTime)/1000);
    setAnswers(prev => ({ ...prev, [currentQ.id]: { selected: optId, time } }));
  };

  const nextQuestion = () => {
    if (currentIdx < qs.length - 1) {
      setCurrentIdx(c => c+1);
      setShowExplanation(false);
      setQStartTime(Date.now());
    }
  };

  const prevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(c => c-1);
      setShowExplanation(false);
      setQStartTime(Date.now());
    }
  };

  const finishSession = () => {
    // Calculate score
    let correct = 0;
    const userAnswers: UserAnswer[] = qs.map(q => {
      const ans = answers[q.id];
      const isCorrect = ans?.selected === q.correctOptionId;
      if (isCorrect) correct++;
      else if (ans) {
        // add to mistake bank
        const mistake: MistakeEntry = {
          id: `mist-${Date.now()}-${q.id}`,
          questionId: q.id,
          attemptId: `attempt-${Date.now()}`,
          subjectId: q.subjectId,
          chapterId: q.chapterId,
          topicId: q.topicId,
          userAnswerId: ans.selected,
          correctAnswerId: q.correctOptionId,
          category: 'unclassified',
          timesRepeated: 1,
          lastAttempted: new Date().toISOString(),
          resolved: false,
        };
        addMistake(mistake);
      }
      return {
        questionId: q.id,
        selectedOptionId: ans?.selected || null,
        isCorrect: ans ? ans.selected === q.correctOptionId : null,
        timeTakenSeconds: ans?.time || 0,
        markedForReview: false,
        timestamp: new Date().toISOString(),
      };
    });

    const attempt: TestAttempt = {
      id: `attempt-${Date.now()}`,
      testId: `practice-${Date.now()}`,
      examId: 'NEET',
      startedAt: new Date(startTime).toISOString(),
      submittedAt: new Date().toISOString(),
      answers: userAnswers,
      score: correct * 4 - (qs.length - correct - (qs.length - Object.keys(answers).length)) * 1,
      total: qs.length * 4,
      accuracy: qs.length ? (correct / qs.length) * 100 : 0,
      timeSpentSeconds: timeSpent,
      status: 'submitted',
    };
    addAttempt(attempt);

    // Redirect to analysis
    const params = new URLSearchParams({
      correct: correct.toString(),
      total: qs.length.toString(),
      time: timeSpent.toString(),
      ids: questionIds.join(','),
      answers: JSON.stringify(answers),
    });
    router.push(`/practice/session/result?${params.toString()}`);
  };

  if (!currentQ) return <div className="p-8">No questions found. <Link href="/practice" className="underline">Go back</Link></div>;

  const isCorrect = currentAnswer?.selected === currentQ.correctOptionId;

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="flex items-center justify-between px-6 py-3 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-semibold">Practice Session</span>
            <Badge variant="secondary">{currentIdx+1} / {qs.length}</Badge>
            <div className="h-2 w-32 bg-zinc-100 rounded-full overflow-hidden hidden md:block">
              <div className="h-full bg-zinc-900 transition-all" style={{ width: `${((currentIdx+1)/qs.length)*100}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-[13px]"><Clock size={14} /> {Math.floor(timeSpent/60)}:{String(timeSpent%60).padStart(2,'0')}</span>
            <Button size="sm" variant="outline" onClick={finishSession}>Finish</Button>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8 max-w-[1200px] mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        {/* Question */}
        <Card>
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-start justify-between gap-3 mb-6">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="text-[11px]">{currentQ.subjectId}</Badge>
                <Badge variant="outline" className="text-[11px]">{currentQ.type}</Badge>
                <Badge variant={currentQ.difficulty==='easy' ? 'secondary' : currentQ.difficulty==='moderate' ? 'warning' : 'destructive'} className="text-[11px]">{currentQ.difficulty}</Badge>
                {currentQ.source==='pyq' && <Badge className="bg-amber-100 text-amber-800 text-[11px]">PYQ {currentQ.year}</Badge>}
                {currentQ.verified && <Badge variant="secondary" className="text-[10px]">✓ Verified</Badge>}
              </div>
              <span className="text-[11px] text-zinc-500">~{currentQ.timeExpectedSeconds}s</span>
            </div>

            <h2 className="text-[18px] font-semibold leading-relaxed">{currentIdx+1}. {currentQ.statement}</h2>

            <div className="mt-6 space-y-3">
              {currentQ.options.map(opt => {
                const selected = currentAnswer?.selected === opt.id;
                const showCorrect = showExplanation && opt.id === currentQ.correctOptionId;
                const showWrong = showExplanation && selected && opt.id !== currentQ.correctOptionId;
                return (
                  <button
                    key={opt.id}
                    onClick={() => !showExplanation && handleSelect(opt.id)}
                    className={`w-full text-left rounded-xl border p-4 flex items-center gap-3 transition-all
                      ${selected && !showExplanation ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white hover:bg-zinc-50'}
                      ${showCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : ''}
                      ${showWrong ? 'bg-red-50 border-red-300 text-red-900' : ''}
                    `}
                  >
                    <span className={`h-7 w-7 rounded-full border flex items-center justify-center text-[12px] font-bold shrink-0 ${selected ? 'bg-white text-zinc-900' : 'bg-zinc-50'}`}>{opt.id.toUpperCase()}</span>
                    <span className="text-[14px]">{opt.text}</span>
                    {showCorrect && <CheckCircle2 size={18} className="ml-auto text-emerald-600" />}
                    {showWrong && <XCircle size={18} className="ml-auto text-red-600" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex gap-3">
              {!showExplanation ? (
                <>
                  <Button variant="outline" onClick={prevQuestion} disabled={currentIdx===0}>Previous</Button>
                  <Button onClick={() => setShowExplanation(true)} disabled={!currentAnswer} className="flex-1">Check Answer</Button>
                  <Button variant="outline" onClick={nextQuestion} disabled={currentIdx===qs.length-1}>Next</Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={prevQuestion} disabled={currentIdx===0}>Previous</Button>
                  <Button onClick={nextQuestion} disabled={currentIdx===qs.length-1} className="flex-1">
                    {currentIdx===qs.length-1 ? 'Finish Session' : 'Next Question →'}
                  </Button>
                  {currentIdx===qs.length-1 && <Button onClick={finishSession}>View Result</Button>}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Explanation / AI */}
        <div className="space-y-4">
          {showExplanation && (
            <Card className={isCorrect ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/50'}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  {isCorrect ? <CheckCircle2 className="text-emerald-600" size={18} /> : <XCircle className="text-amber-600" size={18} />}
                  <span className="font-semibold text-[14px]">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
                  <Badge variant="secondary" className="ml-auto text-[11px]">{currentAnswer?.time}s taken</Badge>
                </div>
                <p className="text-[13px] font-medium">Explanation:</p>
                <p className="text-[13px] text-zinc-700 mt-1 leading-relaxed">{currentQ.explanation}</p>
                {currentQ.detailedExplanation && (
                  <p className="text-[12px] text-zinc-600 mt-3 bg-white border rounded-xl p-3">{currentQ.detailedExplanation}</p>
                )}
                <div className="mt-4 flex gap-2">
                  <Link href={`/ai-tutor?question=${currentQ.id}`} className="flex items-center gap-2 text-[12px] font-semibold text-zinc-900 underline underline-offset-4">
                    <Bot size={14} /> Ask AI why this answer?
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-5">
              <h4 className="font-semibold text-[13px] flex items-center gap-2"><Lightbulb size={14} /> Question Palette</h4>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {qs.map((q, idx) => {
                  const ans = answers[q.id];
                  const isCurrent = idx === currentIdx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => { setCurrentIdx(idx); setShowExplanation(false); }}
                      className={`h-9 w-9 rounded-xl text-[12px] font-semibold border transition-colors
                        ${isCurrent ? 'bg-zinc-900 text-white' : ans ? (ans.selected === q.correctOptionId ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200') : 'bg-zinc-50 hover:bg-white'}
                      `}
                    >
                      {idx+1}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex gap-3 text-[11px] text-zinc-500">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Correct</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Incorrect</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-zinc-300" /> Unattempted</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 text-white">
            <CardContent className="p-5">
              <h4 className="font-semibold text-[13px]">Session Progress</h4>
              <div className="mt-3 space-y-2 text-[12px]">
                <div className="flex justify-between"><span className="text-zinc-400">Attempted</span><span>{Object.keys(answers).length}/{qs.length}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Correct</span><span className="text-emerald-400">{Object.values(answers).filter((a:any) => {
                  const q = qs.find(q=> q.id === Object.keys(answers).find(k=> answers[k]===a));
                  return false;
                }).length} Calculating...</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Time</span><span>{Math.floor(timeSpent/60)}m {timeSpent%60}s</span></div>
              </div>
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
      <PracticeSessionPageInner {...props} />
    </Suspense>
  );
}

export default WrappedPage;
