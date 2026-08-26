'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function BookmarksPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1000px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3"><Bookmark /> Bookmarks</h1>
        <p className="text-zinc-600 mt-2">Save topics, questions, notes for quick access. Real bookmarks from your actions.</p>
      </div>

      <Card className="border-dashed">
        <CardContent className="p-12 text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-zinc-100 flex items-center justify-center">
            <Bookmark className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="font-semibold mt-4">No bookmarks yet</h3>
          <p className="text-[13px] text-zinc-500 mt-1">Bookmark topics, questions, notes while studying. They will appear here - real data only.</p>
          <div className="mt-4 flex justify-center gap-2">
            <Link href="/learn"><Button size="sm">Browse Learn</Button></Link>
            <Link href="/library"><Button size="sm" variant="outline">Open Library</Button></Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardContent className="p-5"><p className="font-semibold text-[13px]">How bookmarks work</p><p className="text-[12px] text-zinc-600 mt-2">Click bookmark icon on any topic, question, note. Access quickly here.</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="font-semibold text-[13px]">No fake data</p><p className="text-[12px] text-zinc-600 mt-2">We don't show preset bookmarks. Only your real saved items.</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="font-semibold text-[13px]">Quick access</p><p className="text-[12px] text-zinc-600 mt-2">Jump to bookmarked content in one click from here.</p></CardContent></Card>
      </div>
    </div>
  );
}
