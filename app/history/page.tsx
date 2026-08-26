'use client';

import { useAppStore } from '@/lib/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History as HistoryIcon } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const { attempts, sessions, mistakes } = useAppStore();
  const hasData = attempts.length > 0 || sessions.length > 0;

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3"><HistoryIcon /> History</h1>
        <p className="text-zinc-600 mt-2">Real timeline of your learning - tests, practice, sessions. No fake history.</p>
      </div>

      {!hasData ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <h3 className="font-semibold">No history yet</h3>
            <p className="text-[13px] text-zinc-500 mt-1">Your real study history will appear here after you start learning, practicing, taking tests.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {attempts.slice().reverse().map(attempt => (
            <Card key={attempt.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[13px]">Test: {attempt.testId}</p>
                  <p className="text-[11px] text-zinc-500">{new Date(attempt.submittedAt || '').toLocaleString()} • {Math.floor(attempt.timeSpentSeconds/60)}m • {attempt.accuracy.toFixed(0)}% accuracy</p>
                </div>
                <Badge>{attempt.score}/{attempt.total}</Badge>
              </CardContent>
            </Card>
          ))}
          {sessions.slice().reverse().map(session => (
            <Card key={session.id}>
              <CardContent className="p-4">
                <p className="text-[13px]">{session.type} • {session.subjectId} • {Math.floor(session.durationSeconds/60)}m</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader><CardTitle className="text-[14px]">Your Real Activity</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-[12px]">
          <div className="flex justify-between"><span>Tests</span><span className="font-semibold">{attempts.length} real</span></div>
          <div className="flex justify-between"><span>Sessions</span><span className="font-semibold">{sessions.length} real</span></div>
          <div className="flex justify-between"><span>Mistakes</span><span className="font-semibold">{mistakes.length} tracked</span></div>
        </CardContent>
      </Card>
    </div>
  );
}
