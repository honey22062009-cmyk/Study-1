'use client';

import { useAppStore } from '@/lib/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { User, Target, Clock, BookOpen } from 'lucide-react';

export default function ProfilePage() {
  const { attempts, mistakes, totalStudyTimeSeconds, currentStreak } = useAppStore();
  const hasData = attempts.length > 0;

  return (
    <div className="p-6 lg:p-8 max-w-[1000px] mx-auto space-y-6">
      <div className="flex items-start gap-6">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">A</div>
        <div>
          <h1 className="text-2xl font-bold">Aarav Sharma</h1>
          <p className="text-zinc-600 text-[13px] mt-1">NEET 2026 Aspirant • Class 12 • Target 650+</p>
          <div className="mt-3 flex gap-2">
            <Badge>{attempts.length} tests (real)</Badge>
            <Badge variant="secondary">{mistakes.filter(m=>!m.resolved).length} mistakes</Badge>
            <Badge variant="outline">{Math.floor(totalStudyTimeSeconds/3600)}h studied (real)</Badge>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardContent className="p-5"><div className="flex items-center gap-3"><Target size={16} /><p className="font-semibold text-[13px]">Goal</p></div><p className="text-2xl font-bold mt-2">650/720</p><p className="text-[11px] text-zinc-500 mt-1">Target score</p></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center gap-3"><Clock size={16} /><p className="font-semibold text-[13px]">Streak</p></div><p className="text-2xl font-bold mt-2">{currentStreak} days</p><p className="text-[11px] text-zinc-500 mt-1">Real streak</p></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center gap-3"><BookOpen size={16} /><p className="font-semibold text-[13px]">Focus</p></div><p className="text-2xl font-bold mt-2">Biology</p><p className="text-[11px] text-zinc-500 mt-1">Most studied</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-[14px]">Your Real Progress</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {hasData ? (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-[12px]"><span>Tests Taken</span><span className="font-semibold">{attempts.length} real tests</span></div>
                <Progress value={Math.min(100, attempts.length*10)} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[12px]"><span>Accuracy</span><span className="font-semibold">{attempts.length ? (attempts.reduce((a,b)=>a+b.accuracy,0)/attempts.length).toFixed(1) : 0}% avg real</span></div>
                <Progress value={attempts.length ? attempts.reduce((a,b)=>a+b.accuracy,0)/attempts.length : 0} />
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              <p className="text-[13px] text-zinc-500">No progress yet - start learning to see real progress here. No fake data.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button>Edit Profile</Button>
        <Button variant="outline">Share Progress</Button>
      </div>
    </div>
  );
}
