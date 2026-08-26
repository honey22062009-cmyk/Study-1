'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store/useStore';
import { Timer, Play, Pause, RotateCcw, Coffee, BookOpen, BarChart3 } from 'lucide-react';

export default function FocusPage() {
  const { addFocusTime, focusTimeSeconds, totalStudyTimeSeconds } = useAppStore();
  const [mode, setMode] = useState<'pomodoro' | 'custom' | 'stopwatch'>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25*60);
  const [customMinutes, setCustomMinutes] = useState(45);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsToday, setSessionsToday] = useState(2);
  const [subject, setSubject] = useState('biology');

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          addFocusTime(mode === 'pomodoro' ? 25*60 : customMinutes*60);
          setSessionsToday(s => s+1);
          // Notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Focus session complete!', { body: 'Take a break or continue.' });
          }
          return mode === 'pomodoro' ? 25*60 : customMinutes*60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, mode, customMinutes]);

  const format = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <div className="p-6 lg:p-8 max-w-[1000px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Focus & Study Tools</h1>
        <p className="text-zinc-600 mt-2">Study timer, Pomodoro, stopwatch, session tracking, break reminders, focus mode, full-screen study. Supportive, not primary purpose.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-[15px] flex items-center gap-2"><Timer size={16} /> Focus Timer</CardTitle>
              <div className="flex gap-2">
                {[
                  { id: 'pomodoro', label: 'Pomodoro' },
                  { id: 'custom', label: 'Custom' },
                  { id: 'stopwatch', label: 'Stopwatch' },
                ].map(m => (
                  <button key={m.id} onClick={() => { setMode(m.id as any); setIsRunning(false); if (m.id==='pomodoro') setTimeLeft(25*60); else if (m.id==='custom') setTimeLeft(customMinutes*60); }} className={`px-3 py-1.5 rounded-full text-[12px] border ${mode===m.id ? 'bg-zinc-900 text-white' : 'bg-white'}`}>{m.label}</button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="mx-auto h-64 w-64 rounded-full border-[8px] border-zinc-100 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-[8px] border-zinc-900" style={{ clipPath: `inset(0 ${100 - (timeLeft/(mode==='pomodoro'?25*60:customMinutes*60))*100}% 0 0)` }} />
                <p className="text-6xl font-bold tracking-tight">{format(timeLeft)}</p>
                <p className="text-[12px] text-zinc-500 mt-2 uppercase tracking-wider">{mode} • {subject}</p>
              </div>

              <div className="mt-8 flex justify-center gap-3">
                <Button size="lg" onClick={() => setIsRunning(!isRunning)} className="rounded-full h-14 w-14">
                  {isRunning ? <Pause /> : <Play />}
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 w-14" onClick={() => { setIsRunning(false); setTimeLeft(mode==='pomodoro'?25*60:customMinutes*60); }}>
                  <RotateCcw />
                </Button>
              </div>

              {mode==='custom' && (
                <div className="mt-6 flex items-center justify-center gap-3">
                  <span className="text-[12px] text-zinc-500">Custom minutes:</span>
                  <input type="number" value={customMinutes} onChange={e => { setCustomMinutes(parseInt(e.target.value)||45); setTimeLeft((parseInt(e.target.value)||45)*60); }} className="w-20 rounded-full border px-3 py-2 text-center" />
                </div>
              )}

              <div className="mt-6 flex justify-center gap-2">
                {['biology','physics','chemistry'].map(s => (
                  <button key={s} onClick={() => setSubject(s)} className={`px-3 py-1 rounded-full text-[12px] capitalize border ${subject===s ? 'bg-zinc-900 text-white' : 'bg-white'}`}>{s}</button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Card><CardContent className="p-5 text-center"><Coffee className="mx-auto h-5 w-5 text-zinc-400" /><p className="text-2xl font-bold mt-2">{sessionsToday}</p><p className="text-[11px] text-zinc-500">Sessions Today</p></CardContent></Card>
            <Card><CardContent className="p-5 text-center"><Timer className="mx-auto h-5 w-5 text-zinc-400" /><p className="text-2xl font-bold mt-2">{Math.floor(focusTimeSeconds/60)}m</p><p className="text-[11px] text-zinc-500">Focus Today</p></CardContent></Card>
            <Card><CardContent className="p-5 text-center"><BarChart3 className="mx-auto h-5 w-5 text-zinc-400" /><p className="text-2xl font-bold mt-2">{Math.floor(totalStudyTimeSeconds/3600)}h</p><p className="text-[11px] text-zinc-500">Total Studied</p></CardContent></Card>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[14px]">Study Session History</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-[12px]">
              {[
                { subject: 'Biology', topic: 'Breathing', duration: '45 min', time: 'Today 10:30 AM' },
                { subject: 'Physics', topic: 'Capacitance', duration: '30 min', time: 'Today 9:00 AM' },
                { subject: 'Chemistry', topic: 'Bonding', duration: '60 min', time: 'Yesterday' },
              ].map((s,i) => (
                <div key={i} className="flex justify-between border-b last:border-0 pb-2">
                  <div><p className="font-medium">{s.subject} • {s.topic}</p><p className="text-[11px] text-zinc-500">{s.time}</p></div>
                  <span className="font-semibold">{s.duration}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 text-white">
            <CardContent className="p-5">
              <h4 className="font-semibold text-[13px]">Focus Mode</h4>
              <p className="text-[12px] text-zinc-400 mt-2">Full-screen study, break reminders, optional distraction blocking (where technically possible). Supports studying without being primary purpose.</p>
              <Button size="sm" variant="secondary" className="mt-3 w-full">Enter Focus Mode</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[13px]">Time Spent per Subject</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-[12px]">
              <div className="flex justify-between"><span>Biology</span><span className="font-semibold">18h 20m</span></div>
              <div className="flex justify-between"><span>Physics</span><span className="font-semibold">12h 45m</span></div>
              <div className="flex justify-between"><span>Chemistry</span><span className="font-semibold">14h 30m</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
