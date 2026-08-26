'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getChapter, getSubject, getTopicsByChapter } from '@/lib/data/syllabus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, FileText, Dumbbell, ClipboardList } from 'lucide-react';
import { getQuestionsByChapter } from '@/lib/data/questions';
import { getNotesByChapter } from '@/lib/data/notes';

export default function ChapterPage() {
  const params = useParams();
  const subjectId = params.subject as string;
  const chapterId = params.chapter as string;
  const chapter = getChapter(chapterId);
  const subject = getSubject(subjectId);
  const topics = getTopicsByChapter(chapterId);
  const questions = getQuestionsByChapter(chapterId);
  const notes = getNotesByChapter(chapterId);

  if (!chapter) return <div className="p-8">Chapter not found</div>;

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center gap-2 text-[13px] text-zinc-500">
        <Link href="/learn" className="hover:text-zinc-900">Learn</Link>
        <ChevronRight size={14} />
        <Link href={`/learn/${subjectId}`} className="hover:text-zinc-900">{subject?.name}</Link>
        <ChevronRight size={14} />
        <span className="font-medium text-zinc-900">{chapter.name}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{chapter.name}</h1>
          <p className="text-zinc-600 mt-2">{chapter.unit} • Class {chapter.classLevel} • {topics.length} topics • {questions.length} questions • {notes.length} notes</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/practice?chapter=${chapterId}`} className="rounded-xl bg-zinc-900 text-white px-5 py-2.5 text-[13px] font-medium">Practice {questions.length} Qs</Link>
          <Link href={`/tests?chapter=${chapterId}`} className="rounded-xl border bg-white px-5 py-2.5 text-[13px] font-medium">Chapter Test</Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="font-semibold text-[14px] uppercase tracking-wider text-zinc-500">Topics in this chapter</h2>
          {topics.map(topic => (
            <Link key={topic.id} href={`/learn/${subjectId}/${chapterId}/${topic.id}`} className="block">
              <Card className="hover:shadow-sm transition-shadow">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[14px]">{topic.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">{topic.importance}</Badge>
                      <span className="text-[11px] text-zinc-500">NCERT • PYQ • Notes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex gap-2">
                      <span className="text-[11px] px-2 py-1 rounded-full bg-zinc-50 border">Learn</span>
                      <span className="text-[11px] px-2 py-1 rounded-full bg-zinc-50 border">Practice</span>
                    </div>
                    <ChevronRight size={16} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[14px]">Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/notes?chapter=${chapterId}`} className="flex items-center gap-3 rounded-xl border p-3 hover:bg-zinc-50">
                <FileText size={16} /> <span className="text-[13px] font-medium">View Notes ({notes.length})</span>
              </Link>
              <Link href={`/practice?chapter=${chapterId}&type=pyq`} className="flex items-center gap-3 rounded-xl border p-3 hover:bg-zinc-50">
                <Dumbbell size={16} /> <span className="text-[13px] font-medium">PYQs Only</span>
              </Link>
              <Link href={`/tests?chapter=${chapterId}`} className="flex items-center gap-3 rounded-xl border p-3 hover:bg-zinc-50">
                <ClipboardList size={16} /> <span className="text-[13px] font-medium">Chapter Test</span>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 text-white">
            <CardContent className="p-5">
              <h4 className="font-semibold text-[13px]">Chapter Mastery</h4>
              <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full bg-white w-[42%] rounded-full" /></div>
              <p className="text-[12px] text-zinc-400 mt-2">42% mastered • 3 weak topics • 12 mistakes</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
