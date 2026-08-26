'use client';

import { useState } from 'react';
import Link from 'next/link';
import { subjects, chapters, topics } from '@/lib/data/syllabus';
import { questions } from '@/lib/data/questions';
import { notes } from '@/lib/data/notes';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const q = query.toLowerCase();

  const results = [
    ...subjects.filter(s => s.name.toLowerCase().includes(q) || s.id.includes(q)).map(s => ({ type: 'subject', title: s.name, subtitle: `${s.chapters.length} chapters`, link: `/learn/${s.id}`, relevance: 100 })),
    ...chapters.filter(c => c.name.toLowerCase().includes(q)).map(c => ({ type: 'chapter', title: c.name, subtitle: `${c.subjectId} • ${c.unit}`, link: `/learn/${c.subjectId}/${c.id}`, relevance: 90 })),
    ...topics.filter(t => t.name.toLowerCase().includes(q)).map(t => ({ type: 'topic', title: t.name, subtitle: `${t.subjectId} • ${t.chapterId}`, link: `/learn/${t.subjectId}/${t.chapterId}/${t.id}`, relevance: 95 })),
    ...questions.filter(qu => qu.statement.toLowerCase().includes(q) || qu.tags.some(tag => tag.includes(q))).slice(0,5).map(qu => ({ type: 'question', title: qu.statement.slice(0,80)+'...', subtitle: `${qu.subjectId} • ${qu.type} • ${qu.source}`, link: `/practice?topic=${qu.topicId}`, relevance: 80 })),
    ...notes.filter(n => n.title.toLowerCase().includes(q)).map(n => ({ type: 'note', title: n.title, subtitle: `${n.type} • ${n.subjectId}`, link: `/learn/${n.subjectId}/${n.chapterId}/${n.topicId}`, relevance: 85 })),
  ].filter(r => q.length > 1).sort((a,b)=>b.relevance-a.relevance).slice(0,20);

  const examples = [
    'Questions on capacitors',
    'Short notes for respiration',
    'My wrong questions from genetics',
    'Physics PYQs',
    'Breathing and exchange',
    'Mendelian inheritance',
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1000px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-zinc-600 mt-2">Fast, intelligent search across subjects, chapters, topics, questions, PYQs, notes, tests, mistakes. Natural queries supported.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search topics, questions, notes... Try: 'Questions on capacitors'"
              className="w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50 pl-12 pr-4 py-4 text-[15px] focus:border-zinc-900 focus:bg-white outline-none transition-colors"
              autoFocus
            />
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">Try:</span>
            {examples.map(ex => (
              <button key={ex} onClick={() => setQuery(ex)} className="text-[12px] px-3 py-1 rounded-full border bg-white hover:bg-zinc-50">"{ex}"</button>
            ))}
          </div>
        </CardContent>
      </Card>

      {query && (
        <div className="space-y-3">
          <p className="text-[13px] text-zinc-500">{results.length} results for "{query}"</p>
          {results.map((r,i) => (
            <Link key={i} href={r.link}>
              <Card className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{r.type}</Badge>
                      <span className="text-[13px] font-semibold">{r.title}</span>
                    </div>
                    <p className="text-[12px] text-zinc-500 mt-1">{r.subtitle}</p>
                  </div>
                  <span className="text-[12px] text-zinc-400">→</span>
                </CardContent>
              </Card>
            </Link>
          ))}
          {results.length===0 && (
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <p className="font-medium">No results for "{query}"</p>
                <p className="text-[13px] text-zinc-500 mt-1">Try broader terms like "genetics", "capacitors", "respiration"</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {!query && (
        <div className="grid md:grid-cols-3 gap-4">
          <Card><CardContent className="p-5"><h4 className="font-semibold text-[13px]">Recent Searches</h4><div className="mt-3 space-y-2 text-[12px] text-zinc-600"><p>• breathing</p><p>• genetics PYQ</p><p>• capacitance</p></div></CardContent></Card>
          <Card><CardContent className="p-5"><h4 className="font-semibold text-[13px]">Popular Topics</h4><div className="mt-3 space-y-2 text-[12px] text-zinc-600"><p>• Human Physiology</p><p>• Electrostatics</p><p>• Genetics</p></div></CardContent></Card>
          <Card><CardContent className="p-5"><h4 className="font-semibold text-[13px]">Quick Access</h4><div className="mt-3 space-y-2 text-[12px]"><Link href="/mistakes" className="block hover:underline">My wrong questions from genetics</Link><Link href="/practice?type=pyq" className="block hover:underline">Physics PYQs</Link></div></CardContent></Card>
        </div>
      )}
    </div>
  );
}
