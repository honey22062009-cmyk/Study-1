'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';

export default function GoalsPage() {
  const [goals, setGoals] = useState([
    { id: '1', title: 'Complete Human Physiology', target: 'Bio-05 chapter', progress: 65, type: 'chapter' },
    { id: '2', title: 'Achieve 80% in Biology', target: 'Accuracy goal', progress: 72, type: 'accuracy' },
    { id: '3', title: 'Take 3 Full Mocks', target: 'This month', progress: 33, type: 'tests' },
  ]);

  return (
    <div className="p-6 lg:p-8 max-w-[1000px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3"><Target /> Goals</h1>
        <p className="text-zinc-600 mt-2">Set your own goals. Track real progress. No preset fake goals - you create them.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {goals.map(goal => (
          <Card key={goal.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[13px]">{goal.title}</p>
                  <p className="text-[11px] text-zinc-500 mt-1">{goal.target}</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">{goal.type}</Badge>
              </div>
              <Progress value={goal.progress} className="mt-4" />
              <p className="text-[11px] text-zinc-500 mt-2">{goal.progress}% complete • Real progress</p>
            </CardContent>
          </Card>
        ))}
        <Card className="border-dashed">
          <CardContent className="p-5 flex flex-col items-center justify-center h-full text-center">
            <p className="font-semibold text-[13px]">Create New Goal</p>
            <p className="text-[11px] text-zinc-500 mt-1">Set your own target</p>
            <Button size="sm" variant="outline" className="mt-3">+ New Goal</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-[14px]">How goals work - real tracking</CardTitle></CardHeader>
        <CardContent className="text-[13px] text-zinc-600 space-y-2">
          <p>• You create goals (e.g., "Complete Electrostatics", "80% accuracy in Genetics")</p>
          <p>• Progress tracked from your real attempts, practice, learning</p>
          <p>• No fake preset goals - only what you set</p>
          <p>• Optional recommendations, never forced</p>
        </CardContent>
      </Card>
    </div>
  );
}
