'use client';

import { useState } from 'react';
import { notes, getNotesByTopic } from '@/lib/data/notes';
import { subjects, chapters, topics } from '@/lib/data/syllabus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function NotesPage() {
  const [filterType, setFilterType] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  let filtered = notes;
  if (filterType !== 'all') filtered = filtered.filter(n => n.type === filterType);
  if (subjectFilter !== 'all') filtered = filtered.filter(n => n.subjectId === subjectFilter);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notes System</h1>
        <p className="text-zinc-600 mt-2">Structured layer: Detailed • Short • Quick Revision • Important Points • Visual. Organized by subject/chapter/topic, not one giant doc.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All Types' },
            { id: 'detailed', label: 'Detailed' },
            { id: 'short', label: 'Short' },
            { id: 'quick-revision', label: 'Quick Revision' },
            { id: 'important-points', label: 'Important' },
          ].map(t => (
            <button key={t.id} onClick={() => setFilterType(t.id)} className={`px-4 py-2 rounded-full text-[13px] border ${filterType===t.id ? 'bg-zinc-900 text-white' : 'bg-white'}`}>{t.label}</button>
          ))}
        </div>
        <div className="w-px h-8 bg-zinc-200 hidden md:block" />
        <div className="flex gap-2">
          <button onClick={() => setSubjectFilter('all')} className={`px-4 py-2 rounded-full text-[13px] border ${subjectFilter==='all' ? 'bg-zinc-900 text-white' : 'bg-white'}`}>All Subjects</button>
          {subjects.map(s => (
            <button key={s.id} onClick={() => setSubjectFilter(s.id)} className={`px-4 py-2 rounded-full text-[13px] border ${subjectFilter===s.id ? 'bg-zinc-900 text-white' : 'bg-white'}`}>{s.name}</button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(note => (
          <Card key={note.id} className="hover:shadow-sm transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-[14px] leading-snug">{note.title}</CardTitle>
                <Badge variant={note.verified ? 'success' : 'warning'} className="shrink-0 text-[10px]">{note.verified ? '✓ Verified' : 'AI'}</Badge>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge variant="outline" className="text-[10px]">{note.type}</Badge>
                <Badge variant="secondary" className="text-[10px]">{note.subjectId}</Badge>
                <span className="text-[11px] text-zinc-500">{note.source} • {note.updatedAt}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-[12px] text-zinc-600 line-clamp-3">
                {note.content.sections.slice(0,2).map(s => s.content.slice(0,100)).join(' ')}...
              </div>
              <Link href={`/learn/${note.subjectId}/${note.chapterId}/${note.topicId}?tab=${note.type==='detailed' ? 'detailed' : note.type==='short' ? 'short' : 'quick'}`} className="block text-center rounded-xl bg-zinc-900 text-white py-2 text-[13px] font-medium">
                Open Note →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-zinc-50 border-dashed">
        <CardContent className="p-6">
          <h3 className="font-semibold text-[14px]">Notes Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-4 mt-3 text-[13px] text-zinc-600 leading-relaxed">
            <div><b className="text-zinc-900">Detailed Notes:</b> Complete conceptual understanding, NCERT-aligned, structured explanations, examples, diagrams.</div>
            <div><b className="text-zinc-900">Short Notes:</b> Rapid revision, high-yield, concise, perfect for daily revision.</div>
            <div><b className="text-zinc-900">Quick Revision:</b> Extremely concise, last-minute, formulas, values, exceptions.</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
