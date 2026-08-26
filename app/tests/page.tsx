'use client';

import Link from 'next/link';
import { mockTests } from '@/lib/data/questions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText, Target, Zap, BookOpen, Layers } from 'lucide-react';

export default function TestsPage() {
  const quickTests = mockTests.filter(t => t.type === 'quick' || t.type === 'topic');
  const chapterTests = mockTests.filter(t => t.type === 'chapter');
  const fullMocks = mockTests.filter(t => t.type === 'full-mock');

  const TestCard = ({ test }: { test: typeof mockTests[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-[14px] leading-snug">{test.title}</CardTitle>
            <p className="text-[12px] text-zinc-500 mt-1">{test.description}</p>
          </div>
          <Badge variant={test.type==='full-mock' ? 'destructive' : test.type==='chapter' ? 'warning' : 'secondary'}>{test.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-4 text-[11px] text-zinc-500">
          <span className="flex items-center gap-1"><FileText size={12} /> {test.questionIds.length} Qs</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {test.durationMinutes} min</span>
          <span className="flex items-center gap-1"><Target size={12} /> {test.difficulty}</span>
        </div>
        <div className="flex gap-2">
          <Link href={`/tests/${test.id}`} className="flex-1"><Button size="sm" className="w-full">Start Test</Button></Link>
          <Button size="sm" variant="outline">Details</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tests & Examination Engine</h1>
        <p className="text-zinc-600 mt-2">Quick tests, topic tests, chapter tests, subject tests, custom tests, full NEET mocks. Real exam interface.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="font-semibold text-[14px] uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2"><Zap size={14} /> Quick & Topic Tests</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {quickTests.map(t => <TestCard key={t.id} test={t} />)}
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-[14px] uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2"><Layers size={14} /> Chapter Tests</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {chapterTests.map(t => <TestCard key={t.id} test={t} />)}
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <p className="text-[13px] font-medium">Create Custom Chapter Test</p>
                  <p className="text-[12px] text-zinc-500 mt-1">Choose any chapter, difficulty, PYQ mix</p>
                  <Button size="sm" variant="outline" className="mt-3">Create Custom</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-[14px] uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2"><BookOpen size={14} /> Full NEET Mocks (Serious Exam Experience)</h2>
            <div className="grid gap-4">
              {fullMocks.map(test => (
                <Card key={test.id} className="border-zinc-900">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-[16px]">{test.title}</h3>
                        <p className="text-[13px] text-zinc-600 mt-1">{test.description}</p>
                        <div className="flex gap-3 mt-3 text-[12px]">
                          <Badge>180 Qs (demo 18)</Badge>
                          <Badge variant="outline">180 min</Badge>
                          <Badge variant="outline">+4 / -1 marking</Badge>
                          <Badge variant="outline">NTA Pattern</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Link href={`/tests/${test.id}`}><Button>Start Mock Test</Button></Link>
                      </div>
                    </div>
                    <div className="mt-4 rounded-xl bg-zinc-50 border p-4 text-[12px] text-zinc-600">
                      Exam features: Countdown timer, question palette, mark for review, skip, answer changes, submission confirmation, negative marking, time tracking, section status, final score - simulates real NEET seriousness.
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[14px]">Create Custom Test</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-[12px] text-zinc-600">Student chooses exactly what they want - subjects, chapters, difficulty, PYQ mix, time.</p>
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase">Test Type</label>
                <select className="w-full rounded-xl border px-3 py-2 text-[13px]">
                  <option>Quick Test (5-10 Qs)</option>
                  <option>Topic Test</option>
                  <option>Chapter Test</option>
                  <option>Subject Test</option>
                  <option>Full Mock</option>
                  <option>Custom</option>
                </select>
              </div>
              <Button className="w-full" size="sm">Build Custom Test →</Button>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 text-white">
            <CardContent className="p-5">
              <h4 className="font-semibold text-[13px]">Test Analysis Includes</h4>
              <ul className="mt-3 space-y-1.5 text-[12px] text-zinc-300 list-disc pl-4">
                <li>Total score, accuracy, correct/incorrect/unattempted</li>
                <li>Time spent, avg time per Q</li>
                <li>Subject, chapter, topic, difficulty performance</li>
                <li>Question-type performance patterns</li>
                <li>Meaningful insights, not just stats</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[13px]">Recent Tests</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-[12px]">
              <div className="flex justify-between"><span>Biology Chapter Test</span><Badge variant="secondary">142/180</Badge></div>
              <div className="flex justify-between"><span>Physics Quick Test</span><Badge variant="secondary">18/20</Badge></div>
              <div className="flex justify-between"><span>Full Mock 02</span><Badge variant="secondary">523/720</Badge></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
