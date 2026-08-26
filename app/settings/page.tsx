'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[800px] mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3"><SettingsIcon /> Settings</h1>
        <p className="text-zinc-600 mt-2">Manage your account, preferences, data.</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-[14px]">Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="font-medium text-[13px]">Exam Focus</p><p className="text-[11px] text-zinc-500">NEET first, JEE ready architecture</p></div>
            <Badge>NEET</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div><p className="font-medium text-[13px]">AI Assistance</p><p className="text-[11px] text-zinc-500">Grounded in verified content</p></div>
            <Badge variant="secondary">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div><p className="font-medium text-[13px]">Recommendations</p><p className="text-[11px] text-zinc-500">Optional, never forced</p></div>
            <Badge variant="secondary">On</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-[14px]">Data & Privacy</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-[13px]">
          <p>• All analytics are from your real data - no fake preset data</p>
          <p>• Mistakes, attempts, sessions stored locally (Zustand persist)</p>
          <p>• You control what data is tracked</p>
          <div className="pt-3 flex gap-2">
            <Button size="sm" variant="outline">Export Data</Button>
            <Button size="sm" variant="destructive">Clear All Data</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-50">
        <CardContent className="p-5">
          <h4 className="font-semibold text-[13px]">Architecture</h4>
          <p className="text-[12px] text-zinc-600 mt-2">Built NEET-first but designed for JEE and other exams without rebuild. ExamType abstraction, MarkingScheme interface, QuestionType extensible. Future-proof.</p>
        </CardContent>
      </Card>
    </div>
  );
}
