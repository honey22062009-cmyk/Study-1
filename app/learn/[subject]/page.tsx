'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getSubject, getChaptersBySubject, getTopicsByChapter } from '@/lib/data/syllabus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, BookOpen, Layers } from 'lucide-react';

export default function SubjectPage() {
  const params = useParams();
  const subjectId = params.subject as string;
  const subject = getSubject(subjectId);
  const chapters = getChaptersBySubject(subjectId);

  if (!subject) return <div className="p-8">Subject not found</div>;

  const class11 = chapters.filter(c => c.classLevel === '11');
  const class12 = chapters.filter(c => c.classLevel === '12');

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center gap-2 text-[13px] text-zinc-500">
        <Link href="/learn" className="hover:text-zinc-900">Learn</Link>
        <ChevronRight size={14} />
        <span className="font-medium text-zinc-900">{subject.name}</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">{subject.name}</h1>
        <p className="text-zinc-600 mt-2">Class 11 & 12 • {chapters.length} chapters • NEET weightage organized</p>
      </div>

      {[
        { title: 'Class 11', list: class11 },
        { title: 'Class 12', list: class12 },
      ].map(group => (
        <div key={group.title} className="space-y-3">
          <h2 className="text-[14px] font-semibold uppercase tracking-wider text-zinc-500">{group.title} • {group.list.length} chapters</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {group.list.map(ch => {
              const topics = getTopicsByChapter(ch.id);
              return (
                <Card key={ch.id} className="hover:shadow-sm transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-[15px] leading-snug">{ch.name}</CardTitle>
                        <p className="text-[12px] text-zinc-500 mt-1">{ch.unit} • {topics.length} topics • {ch.weightage}% weightage</p>
                      </div>
                      <Badge variant={ch.weightage && ch.weightage > 6 ? 'warning' : 'secondary'} className="shrink-0">
                        {ch.weightage && ch.weightage > 7 ? 'High Yield' : ch.weightage && ch.weightage > 4 ? 'Medium' : 'Foundation'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {topics.slice(0,4).map(t => (
                      <Link key={t.id} href={`/learn/${subjectId}/${ch.id}/${t.id}`} className="flex items-center justify-between rounded-xl border bg-zinc-50 p-3 hover:bg-white">
                        <div>
                          <p className="text-[13px] font-medium">{t.name}</p>
                          <p className="text-[11px] text-zinc-500 capitalize">{t.importance} importance</p>
                        </div>
                        <ChevronRight size={14} />
                      </Link>
                    ))}
                    <Link href={`/learn/${subjectId}/${ch.id}`} className="block text-center text-[12px] font-semibold py-2 hover:underline">
                      View all {topics.length} topics →
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
