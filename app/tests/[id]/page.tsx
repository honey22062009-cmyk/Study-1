'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockTests, questions, getQuestion } from '@/lib/data/questions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store/useStore';
import { TestAttempt, UserAnswer, MistakeEntry } from '@/lib/types';
import { Clock, Flag, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

export default function TestPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;
  const test = mockTests.find(t => t.id === testId) || mockTests[0];
  const { addAttempt, addMistake } = useAppStore();

  const testQuestions = test.questionIds.map(id => getQuestion(id)).filter(Boolean) as typeof questions;
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { selected: string | null, marked: boolean, time: number }>>({});
  const [timeLeft, setTimeLeft] = useState(test.durationMinutes * 60);
  const [qStart] = useState(Date.now());
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentQ = testQuestions[currentIdx];
  const currentAns = answers[currentQ?.id];

  const selectOption = (optId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: { selected: optId, marked: prev[currentQ.id]?.marked || false, time: Math.floor((Date.now() - qStart)/1000) }
    }));
  };

  const toggleMark = () => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: { selected: prev[currentQ.id]?.selected || null, marked: !prev[currentQ.id]?.marked, time: prev[currentQ.id]?.time || 0 }
    }));
  };

  const handleSubmit = () => {
    // Calculate
    let correct = 0, incorrect = 0, unattempted = 0;
    const userAnswers: UserAnswer[] = testQuestions.map(q => {
      const ans = answers[q.id];
      if (!ans?.selected) unattempted++;
      else if (ans.selected === q.correctOptionId) correct++;
      else incorrect++;

      if (ans?.selected && ans.selected !== q.correctOptionId) {
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
        isCorrect: ans?.selected ? ans.selected === q.correctOptionId : null,
        timeTakenSeconds: ans?.time || 0,
        markedForReview: ans?.marked || false,
        timestamp: new Date().toISOString(),
      };
    });

    const score = correct * test.marking.correct + incorrect * test.marking.incorrect;

    const attempt: TestAttempt = {
      id: `attempt-${Date.now()}`,
      testId: test.id,
      examId: 'NEET',
      startedAt: new Date(Date.now() - (test.durationMinutes*60 - timeLeft)*1000).toISOString(),
      submittedAt: new Date().toISOString(),
      answers: userAnswers,
      score,
      total: testQuestions.length * test.marking.correct,
      accuracy: testQuestions.length ? (correct/testQuestions.length)*100 : 0,
      timeSpentSeconds: test.durationMinutes*60 - timeLeft,
      status: 'submitted',
    };
    addAttempt(attempt);

    router.push(`/tests/${test.id}/analysis?attemptId=${attempt.id}`);
  };

  if (!currentQ) return <div className="p-8">Test not found</div>;

  const formatTime = (s: number) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b bg-white">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-[14px]">{test.title}</h1>
            <Badge variant="outline" className="hidden md:inline-flex">{testQuestions.length} Qs • {test.durationMinutes} min • +4/-1</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-bold ${timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-zinc-900 text-white'}`}>
              <Clock size={14} /> {formatTime(timeLeft)}
            </div>
            <Button size="sm" onClick={() => setShowSubmitConfirm(true)}>Submit Test</Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full">
        {/* Question Area */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-[800px] mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="secondary">Q {currentIdx+1} of {testQuestions.length}</Badge>
              <Badge variant="outline">{currentQ.subjectId}</Badge>
              <Badge variant="outline">{currentQ.difficulty}</Badge>
              <button onClick={toggleMark} className={`ml-auto flex items-center gap-1 text-[12px] px-3 py-1.5 rounded-full border ${currentAns?.marked ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-white'}`}>
                <Flag size={12} /> {currentAns?.marked ? 'Marked' : 'Mark for Review'}
              </button>
            </div>

            <h2 className="text-[18px] font-semibold leading-relaxed">{currentQ.statement}</h2>

            <div className="mt-8 space-y-3">
              {currentQ.options.map(opt => {
                const selected = currentAns?.selected === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => selectOption(opt.id)}
                    className={`w-full text-left rounded-2xl border-2 p-5 flex gap-4 transition-all ${selected ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300 bg-white'}`}
                  >
                    <span className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-[13px] font-bold shrink-0 ${selected ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white'}`}>{opt.id.toUpperCase()}</span>
                    <span className="text-[15px] leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentIdx(i => Math.max(0, i-1))} disabled={currentIdx===0}><ChevronLeft size={16} /> Previous</Button>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setAnswers(prev => ({ ...prev, [currentQ.id]: { selected: null, marked: prev[currentQ.id]?.marked || false, time: 0 } }))}>Clear</Button>
                <Button onClick={() => setCurrentIdx(i => Math.min(testQuestions.length-1, i+1))} disabled={currentIdx===testQuestions.length-1}>Next <ChevronRight size={16} /></Button>
              </div>
            </div>
          </div>
        </div>

        {/* Palette */}
        <div className="w-full lg:w-[340px] border-l bg-zinc-50 p-5 space-y-5">
          <div>
            <h3 className="font-semibold text-[13px]">Question Palette</h3>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {testQuestions.map((q, idx) => {
                const ans = answers[q.id];
                const isCurrent = idx === currentIdx;
                let cls = 'bg-white border-zinc-200';
                if (isCurrent) cls = 'bg-zinc-900 text-white border-zinc-900';
                else if (ans?.marked) cls = 'bg-amber-100 border-amber-300 text-amber-800';
                else if (ans?.selected) cls = 'bg-emerald-100 border-emerald-300 text-emerald-800';
                return (
                  <button key={q.id} onClick={() => setCurrentIdx(idx)} className={`h-10 w-10 rounded-xl border text-[13px] font-semibold ${cls}`}>
                    {idx+1}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-emerald-100 border border-emerald-300" /> Answered</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-amber-100 border border-amber-300" /> Marked</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-white border" /> Not visited</span>
              <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-zinc-900" /> Current</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-4 space-y-2 text-[12px]">
              <div className="flex justify-between"><span className="text-zinc-500">Answered</span><span className="font-bold">{Object.values(answers).filter(a=>a.selected).length}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Marked</span><span className="font-bold">{Object.values(answers).filter(a=>a.marked).length}</span></div>
              <div className="flex justify-between"><span className="text-zinc-500">Not Attempted</span><span className="font-bold">{testQuestions.length - Object.values(answers).filter(a=>a.selected).length}</span></div>
            </CardContent>
          </Card>

          <Button className="w-full" onClick={() => setShowSubmitConfirm(true)}>Submit Test</Button>
          <p className="text-[11px] text-zinc-500 text-center">Negative marking: -1 for incorrect. Review before submit.</p>
        </div>
      </div>

      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <AlertCircle className="text-amber-500 shrink-0" />
                <div>
                  <h3 className="font-bold">Submit Test?</h3>
                  <p className="text-[13px] text-zinc-600 mt-2">You have attempted {Object.values(answers).filter(a=>a.selected).length} of {testQuestions.length} questions. {testQuestions.length - Object.values(answers).filter(a=>a.selected).length} unattempted. You cannot change answers after submit.</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowSubmitConfirm(false)}>Review Again</Button>
                    <Button className="flex-1" onClick={handleSubmit}>Confirm Submit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
