'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { subjects, chapters, topics } from '@/lib/data/syllabus';
import { questions } from '@/lib/data/questions';
import { notes } from '@/lib/data/notes';
import { BookOpen, FileText, Dumbbell, Library as LibIcon } from 'lucide-react';

export default function LibraryPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3"><LibIcon /> Library</h1>
        <p className="text-zinc-600 mt-2">All your learning content in one place - real data from syllabus, notes, questions. Organized by subject/chapter/topic.</p>
      </div>

      <Tabs defaultValue="subjects">
        <TabsList>
          <TabsTrigger value="subjects">Subjects ({subjects.length})</TabsTrigger>
          <TabsTrigger value="chapters">Chapters ({chapters.length})</TabsTrigger>
          <TabsTrigger value="topics">Topics ({topics.length})</TabsTrigger>
          <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
          <TabsTrigger value="notes">Notes ({notes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects">
          <div className="grid md:grid-cols-3 gap-4">
            {subjects.map(s => (
              <Card key={s.id} className="hover:shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[15px]">{s.name}</CardTitle>
                  <p className="text-[12px] text-zinc-500">{chapters.filter(c=>c.subjectId===s.id).length} chapters • {questions.filter(q=>q.subjectId===s.id).length} Qs</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  {chapters.filter(c=>c.subjectId===s.id).slice(0,4).map(ch => (
                    <Link key={ch.id} href={`/learn/${s.id}/${ch.id}`} className="block rounded-xl border p-3 hover:bg-zinc-50 text-[13px]">{ch.name}</Link>
                  ))}
                  <Link href={`/learn/${s.id}`} className="block text-center text-[12px] font-semibold py-2">View all →</Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chapters">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {chapters.map(ch => (
              <Link key={ch.id} href={`/learn/${ch.subjectId}/${ch.id}`} className="rounded-xl border p-4 hover:bg-zinc-50 block">
                <p className="font-semibold text-[13px]">{ch.name}</p>
                <p className="text-[11px] text-zinc-500 mt-1">{ch.subjectId} • {ch.unit} • {topics.filter(t=>t.chapterId===ch.id).length} topics</p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary" className="text-[10px]">{ch.weightage}% weightage</Badge>
                  <Badge variant="outline" className="text-[10px]">Class {ch.classLevel}</Badge>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="topics">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {topics.map(t => (
              <Link key={t.id} href={`/learn/${t.subjectId}/${t.chapterId}/${t.id}`} className="rounded-xl border p-4 hover:bg-zinc-50 block">
                <p className="font-semibold text-[13px]">{t.name}</p>
                <p className="text-[11px] text-zinc-500 mt-1">{t.subjectId} • {t.chapterId} • {t.importance}</p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline" className="text-[10px]">{questions.filter(q=>q.topicId===t.id).length} Qs</Badge>
                  <Badge variant="outline" className="text-[10px]">{notes.filter(n=>n.topicId===t.id).length} notes</Badge>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="questions">
          <div className="space-y-2">
            {questions.map(q => (
              <Card key={q.id}>
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[13px] font-medium">{q.statement}</p>
                    <p className="text-[11px] text-zinc-500 mt-1">{q.subjectId} • {q.chapterId} • {q.type} • {q.difficulty} {q.source==='pyq' ? `• PYQ ${q.year}` : ''}</p>
                  </div>
                  <Badge variant={q.verified ? "success" : "warning"} className="shrink-0 text-[10px]">{q.verified ? "✓ Verified" : "AI"}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes">
          <div className="grid md:grid-cols-2 gap-4">
            {notes.map(n => (
              <Card key={n.id}>
                <CardContent className="p-4">
                  <p className="font-semibold text-[13px]">{n.title}</p>
                  <p className="text-[11px] text-zinc-500 mt-1">{n.subjectId} • {n.type} • {n.source}</p>
                  <Link href={`/learn/${n.subjectId}/${n.chapterId}/${n.topicId}`} className="mt-3 block text-center rounded-xl bg-zinc-900 text-white py-2 text-[12px]">Open →</Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
