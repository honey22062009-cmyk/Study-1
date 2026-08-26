import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export const metadata: Metadata = {
  title: "NEET Prep - Learn • Practice • Test • Improve",
  description: "Complete NEET-first learning ecosystem with notes, PYQs, mock tests, mistake tracking, AI tutor and analytics. Student-controlled, recommendation-powered.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#fcfcfc] font-sans antialiased" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
        <Sidebar />
        <div className="lg:pl-[280px] min-h-screen flex flex-col">
          <Topbar />
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t bg-white px-6 lg:px-8 py-6 mt-8">
            <div className="flex flex-col md:flex-row justify-between gap-4 text-[12px] text-zinc-500">
              <div>
                <p className="font-semibold text-zinc-900">NEET Prep Platform • NEET-first, JEE-ready architecture</p>
                <p className="mt-1 max-w-2xl leading-relaxed">Trusted academic content is verified and distinguished from AI-generated material. PYQs, NCERT-aligned notes, and curated questions are validated. Estimated scores are clearly labeled as estimates.</p>
              </div>
              <div className="flex gap-6 shrink-0">
                <span>Learn → Practice → Test → Analyze → Revise → Improve</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
