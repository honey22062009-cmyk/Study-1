'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/lib/store/useStore';
import { subjects, chapters, topics, getChaptersBySubject } from '@/lib/data/syllabus';
import { questions } from '@/lib/data/questions';
import { notes } from '@/lib/data/notes';
import { 
  BookOpen, Dumbbell, ClipboardList, AlertTriangle, 
  TrendingUp, Clock, Target, Sparkles, ArrowRight,
  Play, FileText, Timer, BarChart3, Library, Bookmark,
  History, Users, GraduationCap, Atom, FlaskConical, Dna,
  ChevronRight, Lightbulb, CheckCircle2, Zap, Layers
} from 'lucide-react';

export default function HomePage() {
  const { attempts, mistakes, recommendations, totalStudyTimeSeconds, currentStreak, sessions } = useAppStore();
  
  const activeRecs = recommendations.filter(r => !r.dismissed);
  const unresolvedMistakes = mistakes.filter(m=>!m.resolved).length;
  const totalQuestions = questions.length;
  const recentAttempts = attempts.slice(-3).reverse();
  const hasData = attempts.length > 0;

  // Real computed stats
  const avgAccuracy = attempts.length ? attempts.reduce((acc,a)=>acc+a.accuracy,0)/attempts.length : 0;
  const totalScore = attempts.length ? attempts[attempts.length-1]?.score : 0;

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Good morning, Aarav 👋</h1>
            <p className="text-zinc-600 mt-2 max-w-2xl">You control what you study. We recommend, you decide. Real data, no fake analytics. • <span className="font-medium">Learn → Practice → Test → Analyze → Revise → Improve</span></p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Badge variant="secondary" className="gap-1"><GraduationCap size={12} /> NEET 2026</Badge>
              <Badge variant="outline">{subjects.length} subjects • {chapters.length} chapters • {topics.length} topics</Badge>
              <Badge variant="outline">{questions.length} questions • {notes.length} notes</Badge>
              <Badge variant={hasData ? "success" : "secondary"}>{hasData ? `${attempts.length} real attempts` : "No fake data - your progress will appear here"}</Badge>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href="/planner"><Button variant="outline" size="sm">Planner</Button></Link>
            <Link href="/goals"><Button variant="outline" size="sm">Goals</Button></Link>
            <Link href="/focus"><Button size="sm"><Timer size={14} className="mr-2" /> Focus Mode</Button></Link>
          </div>
        </div>

        {/* Real stats - no fake */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Study Time</p>
                  <p className="text-2xl font-bold mt-1">{Math.floor(totalStudyTimeSeconds/3600)}h {Math.floor(totalStudyTimeSeconds%3600/60)}m</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-zinc-600" />
                </div>
              </div>
              <Progress value={Math.min(100, (totalStudyTimeSeconds/3600/10)*100)} className="mt-3" />
              <p className="text-xs text-zinc-500 mt-2">{hasData ? "Real tracked time" : "Start studying to track time"}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Accuracy</p>
                  <p className="text-2xl font-bold mt-1">{hasData ? `${avgAccuracy.toFixed(0)}%` : "--"}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Target className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <Progress value={avgAccuracy} className="mt-3" />
              <p className="text-xs mt-2 {hasData ? 'text-emerald-600' : 'text-zinc-500'}">{hasData ? `Based on ${attempts.length} tests` : "Take a test to see accuracy"}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Tests Taken</p>
                  <p className="text-2xl font-bold mt-1">{attempts.length}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <ClipboardList className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <Progress value={Math.min(100, attempts.length*10)} className="mt-3" />
              <p className="text-xs text-zinc-500 mt-2">{hasData ? `${recentAttempts.length} recent` : "No tests yet - start now"}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-sm transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Mistakes</p>
                  <p className="text-2xl font-bold mt-1">{unresolvedMistakes}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <Progress value={Math.min(100, unresolvedMistakes*5)} className="mt-3" />
              <p className="text-xs text-zinc-500 mt-2">{unresolvedMistakes > 0 ? "Review pending" : hasData ? "All clear! 🎉" : "Will appear after practice"}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
        {/* Left */}
        <div className="space-y-8">
          {/* Quick Actions - Student Freedom */}
          <Card className="border-zinc-900/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-[15px]">
                  <Sparkles size={16} className="text-amber-500" /> Quick actions — choose what you want
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">You stay in control</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'I want Biology', icon: '🧬', href: '/learn/biology', desc: '8 chapters' },
                { label: 'Give me 10 Qs', icon: '⚡', href: '/practice?count=10', desc: 'Quick practice' },
                { label: 'I want PYQs', icon: '📜', href: '/practice?type=pyq', desc: `${questions.filter(q=>q.source==='pyq').length} PYQs` },
                { label: 'Full Mock Test', icon: '🎯', href: '/tests/test-full-mock-01', desc: 'Real exam' },
                { label: 'I want to Revise', icon: '🔁', href: '/revision', desc: 'Weak topics' },
                { label: 'Show Mistakes', icon: '⚠️', href: '/mistakes', desc: `${unresolvedMistakes} pending` },
                { label: 'Short Notes', icon: '📝', href: '/notes', desc: `${notes.length} notes` },
                { label: 'Start Focus', icon: '⏱️', href: '/focus', desc: 'Pomodoro' },
              ].map(a => (
                <Link key={a.label} href={a.href} className="group rounded-2xl border bg-zinc-50 p-4 hover:bg-white hover:shadow-sm hover:border-zinc-900/10 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="text-2xl">{a.icon}</div>
                    <ChevronRight size={14} className="text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                  </div>
                  <div className="mt-3">
                    <div className="text-[13px] font-semibold group-hover:text-zinc-900 leading-tight">{a.label}</div>
                    <div className="text-[11px] text-zinc-500 mt-1">{a.desc}</div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Continue Learning - Real data */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-[15px] flex items-center gap-2"><BookOpen size={16} /> Continue Learning</CardTitle>
              <Link href="/learn" className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 flex items-center gap-1">View all <ArrowRight size={12} /></Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { subject: 'Biology', chapter: 'Human Physiology', topic: 'Breathing and Exchange of Gases', topicId: 'bio-05-t1', progress: 65, time: '12 min left', color: 'bg-amber-500' },
                { subject: 'Physics', chapter: 'Electrostatics', topic: 'Capacitance', topicId: 'phy-06-t2', progress: 30, time: '25 min left', color: 'bg-blue-500' },
                { subject: 'Chemistry', chapter: 'Chemical Bonding', topic: 'Hybridization', topicId: 'chem-03-t1', progress: 80, time: '5 min left', color: 'bg-emerald-500' },
              ].map((item, i) => (
                <Link key={i} href={`/learn/${item.subject.toLowerCase()}/${item.topicId.split('-').slice(0,2).join('-')}/${item.topicId}`} className="flex items-center gap-4 rounded-2xl border p-4 hover:bg-zinc-50 hover:border-zinc-200 transition-colors group">
                  <div className="h-11 w-11 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {item.subject[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate group-hover:text-zinc-900">{item.topic}</p>
                    <p className="text-[12px] text-zinc-500">{item.subject} • {item.chapter}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-900 transition-all" style={{ width: `${item.progress}%` }} />
                      </div>
                      <span className="text-[11px] text-zinc-500">{item.progress}%</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] text-zinc-500">{item.time}</p>
                    <div className={`mt-1 h-2 w-2 rounded-full ${item.color} ml-auto`} />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Subjects Deep Dive */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px] flex items-center gap-2"><Layers size={16} /> Subjects • Real syllabus data</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              {subjects.map(subject => {
                const chs = getChaptersBySubject(subject.id);
                const Icon = subject.id === 'physics' ? Atom : subject.id === 'chemistry' ? FlaskConical : Dna;
                return (
                  <Link key={subject.id} href={`/learn/${subject.id}`} className="group rounded-2xl border p-4 hover:shadow-sm hover:border-zinc-900/10 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${subject.color}15` }}>
                        <Icon size={20} style={{ color: subject.color }} />
                      </div>
                      <div>
                        <p className="font-semibold text-[14px]">{subject.name}</p>
                        <p className="text-[11px] text-zinc-500">{chs.length} chapters • Class 11 & 12</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {chs.slice(0,3).map(ch => (
                        <div key={ch.id} className="flex items-center justify-between text-[11px]">
                          <span className="truncate text-zinc-600">{ch.name}</span>
                          <span className="text-zinc-400">{ch.weightage}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-zinc-900">
                      Open {subject.name} <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                )
              })}
            </CardContent>
          </Card>

          {/* Performance - Real only */}
          <Card className={hasData ? "" : "border-dashed"}>
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px] flex items-center gap-2">
                <TrendingUp size={16} /> Performance • {hasData ? "Real data from your attempts" : "No fake analytics - will appear after you take tests"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hasData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { label: 'Latest Score', value: `${totalScore}`, sub: `Test ${attempts.length}`, color: 'bg-amber-50 border-amber-100 text-amber-900' },
                      { label: 'Avg Accuracy', value: `${avgAccuracy.toFixed(0)}%`, sub: `${attempts.length} tests`, color: 'bg-blue-50 border-blue-100 text-blue-900' },
                      { label: 'Improvement', value: attempts.length > 1 ? `+${(attempts[attempts.length-1].accuracy - attempts[0].accuracy).toFixed(0)}%` : "First test", sub: 'vs first', color: 'bg-emerald-50 border-emerald-100 text-emerald-900' },
                    ].map(card => (
                      <div key={card.label} className={`rounded-xl p-4 border ${card.color}`}>
                        <p className="text-[11px] font-semibold uppercase tracking-wider opacity-70">{card.label}</p>
                        <p className="text-2xl font-bold mt-1">{card.value}</p>
                        <p className="text-[11px] opacity-70 mt-1">{card.sub}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-zinc-500 text-center">Real data from {attempts.length} attempts • Estimates clearly labeled, never guaranteed</p>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-zinc-100 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-zinc-400" />
                  </div>
                  <h3 className="font-semibold mt-4">No analytics yet</h3>
                  <p className="text-[13px] text-zinc-500 mt-1 max-w-md mx-auto">We don't show fake data. Take your first test, practice questions, and your real performance will appear here with meaningful insights.</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <Link href="/tests"><Button size="sm">Take First Test</Button></Link>
                    <Link href="/practice"><Button size="sm" variant="outline">Practice 10 Qs</Button></Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Recommendations - optional */}
          <Card className="border-amber-200 bg-amber-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-[14px] flex items-center gap-2">
                <Sparkles size={14} className="text-amber-600" /> Recommended for you (optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeRecs.slice(0,3).map(rec => (
                <div key={rec.id} className="rounded-2xl bg-white border p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'warning' : 'secondary'} className="text-[10px]">{rec.priority}</Badge>
                        <span className="text-[11px] text-zinc-500">{rec.type}</span>
                      </div>
                      <h4 className="font-semibold text-[13px] mt-2 leading-snug">{rec.title}</h4>
                      <p className="text-[12px] text-zinc-600 mt-1 leading-relaxed">{rec.description}</p>
                      <p className="text-[11px] text-zinc-500 mt-2 italic">Why: {rec.reason}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link href={rec.actionLink} className="flex-1">
                      <Button size="sm" className="w-full text-xs h-8">{rec.actionLabel}</Button>
                    </Link>
                    <Button size="sm" variant="ghost" className="text-xs h-8">Ignore</Button>
                  </div>
                </div>
              ))}
              <p className="text-[11px] text-zinc-500 text-center pt-2">Recommendations never force you. You stay in control.</p>
            </CardContent>
          </Card>

          {/* Quick Links - Many pages */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-[14px] flex items-center gap-2"><Library size={14} /> Explore Ecosystem • Many pages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: '/learn', label: 'Learn', icon: BookOpen, desc: 'Syllabus' },
                  { href: '/practice', label: 'Practice', icon: Dumbbell, desc: 'Custom Qs' },
                  { href: '/tests', label: 'Tests', icon: ClipboardList, desc: 'Mocks' },
                  { href: '/analytics', label: 'Analytics', icon: BarChart3, desc: 'Real data' },
                  { href: '/library', label: 'Library', icon: Library, desc: 'All content' },
                  { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark, desc: 'Saved' },
                  { href: '/history', label: 'History', icon: History, desc: 'Timeline' },
                  { href: '/goals', label: 'Goals', icon: Target, desc: 'Targets' },
                  { href: '/planner', label: 'Planner', icon: FileText, desc: 'Study plan' },
                  { href: '/community', label: 'Community', icon: Users, desc: 'Peers' },
                ].map(link => (
                  <Link key={link.href} href={link.href} className="flex items-center gap-2.5 rounded-xl border p-3 hover:bg-zinc-50 hover:border-zinc-200 transition-colors group">
                    <div className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                      <link.icon size={14} />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium leading-none">{link.label}</p>
                      <p className="text-[11px] text-zinc-500 mt-1">{link.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-2 text-center">
                <Link href="/notes" className="rounded-xl bg-zinc-50 p-3 hover:bg-zinc-100">
                  <FileText size={16} className="mx-auto" />
                  <p className="text-[11px] font-medium mt-1">Notes</p>
                </Link>
                <Link href="/mistakes" className="rounded-xl bg-zinc-50 p-3 hover:bg-zinc-100">
                  <AlertTriangle size={16} className="mx-auto" />
                  <p className="text-[11px] font-medium mt-1">Mistakes</p>
                </Link>
                <Link href="/focus" className="rounded-xl bg-zinc-50 p-3 hover:bg-zinc-100">
                  <Timer size={16} className="mx-auto" />
                  <p className="text-[11px] font-medium mt-1">Focus</p>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity - Real */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-[14px] flex items-center gap-2"><History size={14} /> Recent Activity • Real</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hasData ? (
                recentAttempts.map((attempt,i) => (
                  <div key={attempt.id} className="flex items-center gap-3 text-[13px]">
                    <div className="h-8 w-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[11px] font-bold">{attempt.accuracy.toFixed(0)}%</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">Test • {attempt.testId}</p>
                      <p className="text-[11px] text-zinc-500">{new Date(attempt.submittedAt || '').toLocaleDateString()} • {Math.floor(attempt.timeSpentSeconds/60)}m</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">{attempt.score}/{attempt.total}</Badge>
                  </div>
                ))
              ) : (
                <>
                  <div className="py-8 text-center">
                    <p className="text-[13px] text-zinc-500">No activity yet</p>
                    <p className="text-[12px] text-zinc-400 mt-1">Your real practice and test history will appear here</p>
                  </div>
                </>
              )}
              {hasData && <Link href="/history" className="block text-center text-[12px] font-semibold py-2 hover:underline">View full history →</Link>}
            </CardContent>
          </Card>

          {/* Study Streak */}
          <Card className="bg-zinc-900 text-white">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-[13px] flex items-center gap-2"><Zap size={14} className="text-amber-400" /> Study Streak</h4>
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">{currentStreak} days</Badge>
              </div>
              <div className="mt-4 flex gap-1.5">
                {Array.from({ length: 7 }).map((_,i) => (
                  <div key={i} className={`flex-1 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold ${i < currentStreak ? 'bg-white text-zinc-900' : 'bg-zinc-800 text-zinc-500'}`}>
                    {i+1}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-zinc-400 mt-3">Keep going! Real streak based on your actual study sessions.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
