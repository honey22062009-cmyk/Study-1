'use client';

import Link from 'next/link';
import { subjects, getChaptersBySubject } from '@/lib/data/syllabus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Atom, FlaskConical, Dna, ChevronRight } from 'lucide-react';

const iconMap: any = {
  atom: Atom,
  flask: FlaskConical,
  dna: Dna,
};

export default function LearnPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learn</h1>
        <p className="text-zinc-600 mt-2">Structured learning: NEET → Subject → Class → Unit → Topic. Digital classroom, not PDF viewer.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {subjects.map(subject => {
          const chapters = getChaptersBySubject(subject.id);
          const Icon = subject.id === 'physics' ? Atom : subject.id === 'chemistry' ? FlaskConical : Dna;
          return (
            <Card key={subject.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${subject.color}15` }}>
                    <Icon size={20} style={{ color: subject.color }} />
                  </div>
                  <div>
                    <CardTitle className="text-[16px]">{subject.name}</CardTitle>
                    <p className="text-[12px] text-zinc-500">{chapters.length} chapters • Class 11 & 12</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {chapters.slice(0,6).map(ch => (
                    <Link key={ch.id} href={`/learn/${subject.id}/${ch.id}`} className="flex items-center justify-between rounded-xl border p-3 hover:bg-zinc-50 group">
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium truncate">{ch.name}</p>
                        <p className="text-[11px] text-zinc-500">{ch.unit} • Weightage {ch.weightage}%</p>
                      </div>
                      <ChevronRight size={14} className="text-zinc-400 group-hover:text-zinc-900" />
                    </Link>
                  ))}
                </div>
                <Link href={`/learn/${subject.id}`} className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white py-2.5 text-[13px] font-medium hover:bg-zinc-800">
                  Open {subject.name} <ChevronRight size={14} />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[15px]">How Learn Works</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6 text-[13px] leading-relaxed text-zinc-600">
          <div>
            <h4 className="font-semibold text-zinc-900 mb-1">Detailed Learning</h4>
            <p>Structured explanations, NCERT-aligned, concepts, definitions, examples, diagrams, tables, important facts.</p>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 mb-1">Interactive Learning</h4>
            <p>Expandable concepts, flashcards, mini checks, What happens if...? interactions, comparisons.</p>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 mb-1">Student Control</h4>
            <p>Choose detailed vs quick revision. Every topic has short notes, important points, visual learning. You decide depth.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
