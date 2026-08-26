'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Trophy, Lightbulb } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1000px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3"><Users /> Community</h1>
        <p className="text-zinc-600 mt-2">Peer learning, doubts, discussions - optional community features.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardContent className="p-5 text-center"><MessageCircle className="mx-auto h-6 w-6 text-zinc-400" /><p className="font-semibold text-[13px] mt-2">Doubt Forum</p><p className="text-[11px] text-zinc-500 mt-1">Ask & answer doubts</p><Button size="sm" variant="outline" className="mt-3 w-full">Open Forum</Button></CardContent></Card>
        <Card><CardContent className="p-5 text-center"><Trophy className="mx-auto h-6 w-6 text-zinc-400" /><p className="font-semibold text-[13px] mt-2">Leaderboard</p><p className="text-[11px] text-zinc-500 mt-1">Optional - based on real tests</p><Button size="sm" variant="outline" className="mt-3 w-full">View Board</Button></CardContent></Card>
        <Card><CardContent className="p-5 text-center"><Lightbulb className="mx-auto h-6 w-6 text-zinc-400" /><p className="font-semibold text-[13px] mt-2">Study Groups</p><p className="text-[11px] text-zinc-500 mt-1">Find study partners</p><Button size="sm" variant="outline" className="mt-3 w-full">Find Groups</Button></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-[14px]">Recent Discussions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { title: 'How to remember lung volumes?', author: 'Priya • Bio', replies: 12, tag: 'Biology' },
            { title: 'Best way to solve projectile numericals fast?', author: 'Aman • Physics', replies: 8, tag: 'Physics' },
            { title: 'Chemical bonding tricks', author: 'Rahul • Chemistry', replies: 15, tag: 'Chemistry' },
          ].map((d,i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border p-4 hover:bg-zinc-50">
              <div>
                <p className="font-medium text-[13px]">{d.title}</p>
                <p className="text-[11px] text-zinc-500 mt-1">{d.author} • {d.replies} replies</p>
              </div>
              <Badge variant="secondary" className="text-[10px]">{d.tag}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
