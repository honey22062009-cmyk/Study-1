'use client';

import { Suspense } from 'react';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTopic, getChapter } from '@/lib/data/syllabus';
import { getQuestion } from '@/lib/data/questions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Sparkles, BookOpen, Lightbulb, Send } from 'lucide-react';

function AITutorPageInner() {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topic');
  const questionId = searchParams.get('question');
  const topic = topicId ? getTopic(topicId) : null;
  const question = questionId ? getQuestion(questionId) : null;

  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string, grounded?: boolean }[]>([
    { role: 'ai', content: `Hi! I'm your NEET AI Tutor. I understand you're studying ${topic ? topic.name : question ? 'a question' : 'NEET'}. I can help with concept explanations, doubts, alternative explanations, examples, mistake analysis, personalized practice, revision suggestions - grounded in verified NCERT content. What do you want to learn?`, grounded: true }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    // Mock AI response - grounded in verified content
    setTimeout(() => {
      let response = '';
      if (userMsg.toLowerCase().includes('breathing') || topic?.id.includes('bio-05')) {
        response = `Great question about Breathing!\n\n**Concept (from verified NCERT):** Alveoli are primary sites of gas exchange. O2 diffuses from alveoli (104 mmHg) to blood (40 mmHg) due to pressure gradient.\n\n**Why this happens:** Simple diffusion, large surface area (70 m²), thin membrane (0.5mm).\n\n**Common mistake:** Students confuse tidal volume (500 mL) with residual volume (1200 mL). TV is normal breathing, RV remains after forced expiration.\n\n**Practice suggestion:** Try 5 PYQs on lung volumes. Want me to generate them?\n\n*Grounded in: NCERT Class 11 Biology Page 274, verified content.*`;
      } else if (userMsg.toLowerCase().includes('mendel') || userMsg.toLowerCase().includes('genetics')) {
        response = `**Mendelian Inheritance - Simplified:**\n\nLaw of Segregation: Alleles separate in gamete formation. So Aa parent gives 50% A, 50% a gametes.\n\n**Alternative explanation:** Think of alleles as two different colored balls in a bag. When you make gametes, you pick one ball randomly.\n\n**Why test cross ratio is 1:1:1:1:** Because heterozygous parent makes 4 types of gametes equally, homozygous recessive makes only 1 type.\n\n**Example:** AaBb x aabb → AB, Ab, aB, ab each 25% from first parent, only ab from second → 4 combos equal.\n\n*Verified from NCERT, not AI-fabricated. Distinction maintained.*`;
      } else if (question) {
        response = `**Why your answer was wrong for this question:**\n\nQuestion: ${question.statement}\n\nYou might have chosen wrong because:\n- Misread: The question asks primary site, not conducting zone\n- Concept gap: Bronchi conduct, alveoli exchange\n- Memory: Recall alveoli = 300 million, 70 m² surface\n\n**Correct answer:** ${question.options.find(o=>o.id===question.correctOptionId)?.text}\n\n**Explanation:** ${question.explanation}\n\nWant similar questions to fix this?`;
      } else {
        response = `I can help with that! Here's a structured explanation:\n\n**Concept:** ${userMsg}\n\n**Verified content says:** [This would be pulled from curated NCERT database]\n\n**AI-generated alternative explanation:** Let me simplify...\n\n**Important:** AI explanations are always grounded in verified content and clearly distinguished. Trusted academic content is validated, AI content is labeled.\n\nWould you like:\n- Detailed learning\n- Quick revision\n- 5 practice questions\n- Common mistakes in this topic?`;
      }

      setMessages(prev => [...prev, { role: 'ai', content: response, grounded: true }]);
    }, 800);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3"><Bot className="h-8 w-8" /> AI Tutor</h1>
          <p className="text-zinc-600 mt-1">Deeply integrated but does NOT replace verified content. Helps with explanations, doubts, examples, mistake analysis, personalized practice.</p>
        </div>
        <Badge variant="outline" className="hidden md:flex gap-2"><Sparkles size={12} /> Grounded in verified NCERT</Badge>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-6 flex-1 min-h-0">
        {/* Chat */}
        <Card className="flex flex-col min-h-0">
          <CardHeader className="pb-3 border-b shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[14px]">Chat • Context: {topic?.name || question ? question?.statement.slice(0,40) : 'General NEET'}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-[10px]">Verified Content</Badge>
                <Badge variant="outline" className="text-[10px]">AI Assist</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((m,i) => (
              <div key={i} className={`flex ${m.role==='user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed whitespace-pre-wrap ${m.role==='user' ? 'bg-zinc-900 text-white' : 'bg-zinc-50 border'}`}>
                  {m.content}
                  {m.role==='ai' && m.grounded && <p className="text-[10px] text-zinc-500 mt-2 border-t pt-2">✓ Grounded in verified NCERT • AI-generated but validated • Distinction maintained</p>}
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t shrink-0">
            <div className="flex gap-2">
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && sendMessage()} placeholder="Ask doubt, request alternative explanation, simplify concept..." className="flex-1 rounded-full border px-5 py-3 text-[14px] outline-none focus:border-zinc-900" />
              <Button onClick={sendMessage} className="rounded-full h-12 w-12"><Send size={16} /></Button>
            </div>
            <div className="mt-3 flex gap-2 flex-wrap">
              {['Explain this concept simply', 'Give me an example', 'Why is my answer wrong?', 'Create 5 practice Qs', 'Summarize this topic'].map(s => (
                <button key={s} onClick={() => setInput(s)} className="text-[11px] px-3 py-1 rounded-full border bg-zinc-50 hover:bg-white">{s}</button>
              ))}
            </div>
          </div>
        </Card>

        {/* Tools */}
        <div className="space-y-4 overflow-y-auto">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[14px] flex items-center gap-2"><Lightbulb size={14} /> What AI Can Do</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-[12px] text-zinc-600">
              <p>• Concept explanations grounded in verified content</p>
              <p>• Doubt solving with alternative explanations</p>
              <p>• Simplifying difficult concepts</p>
              <p>• Generating examples</p>
              <p>• Creating personalized practice</p>
              <p>• Analyzing mistakes & patterns</p>
              <p>• Revision suggestions & study plans (optional)</p>
              <p>• Explaining why answer was wrong</p>
              <p>• Custom quizzes, adjusting difficulty</p>
              <p>• Summarizing learning material</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 text-white">
            <CardContent className="p-5">
              <h4 className="font-semibold text-[13px]">Quality & Reliability</h4>
              <p className="text-[12px] text-zinc-400 mt-2 leading-relaxed">Trusted educational content is distinguished from AI-generated. Question answers, explanations, formulas, marking schemes validated before being authoritative. No fabricated PYQs, stats, or official exam info. AI does NOT automatically become trusted academic content.</p>
            </CardContent>
          </Card>

          {question && (
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-[13px]">Current Question Context</CardTitle></CardHeader>
              <CardContent className="text-[12px]">
                <p className="font-medium">{question.statement}</p>
                <p className="text-zinc-500 mt-2">Correct: {question.options.find(o=>o.id===question.correctOptionId)?.text}</p>
                <p className="text-zinc-600 mt-2">{question.explanation}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-[13px]">Quick Actions</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline">Simplify Concept</Button>
              <Button size="sm" variant="outline">Give Example</Button>
              <Button size="sm" variant="outline">Create Quiz</Button>
              <Button size="sm" variant="outline">Analyze Mistake</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


function WrappedPage(props: any) {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <AITutorPageInner {...props} />
    </Suspense>
  );
}

export default WrappedPage;
