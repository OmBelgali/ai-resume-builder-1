"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode, useMemo } from "react";

const steps = [
  { id: 1, slug: "01-problem", label: "Problem" },
  { id: 2, slug: "02-market", label: "Market" },
  { id: 3, slug: "03-architecture", label: "Architecture" },
  { id: 4, slug: "04-hld", label: "High-Level Design" },
  { id: 5, slug: "05-lld", label: "Low-Level Design" },
  { id: 6, slug: "06-build", label: "Build" },
  { id: 7, slug: "07-test", label: "Test" },
  { id: 8, slug: "08-ship", label: "Ship" },
];

function getStepFromPath(pathname: string | null): number | null {
  if (!pathname) return null;
  const match = pathname.match(/\/rb\/(\d{2})-/);
  if (!match) return null;
  const num = Number(match[1]);
  const index = steps.findIndex((s) => s.id === num);
  return index >= 0 ? index + 1 : null;
}

function isStepComplete(stepIndex: number): boolean {
  if (typeof window === "undefined") return false;
  const key = `rb_step_${stepIndex}_artifact`;
  const raw = window.localStorage.getItem(key);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw);
    return Boolean(parsed && parsed.id);
  } catch {
    return false;
  }
}

function useStepsProgress() {
  if (typeof window === "undefined") {
    return {
      completed: steps.map(() => false),
    };
  }

  const completed = steps.map((_, index) => isStepComplete(index + 1));
  return { completed };
}

export default function RbLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentStep = useMemo(() => getStepFromPath(pathname), [pathname]);
  const { completed } = useStepsProgress();

  const statusText =
    currentStep && currentStep >= 1 && currentStep <= 8
      ? `In Progress — Step ${currentStep} of 8`
      : "In Progress";

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      {/* Top bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between text-sm">
          <div className="font-semibold tracking-tight">
            AI Resume Builder
          </div>
          <div className="text-slate-300 text-xs sm:text-sm">
            Project 3 —{" "}
            {currentStep
              ? `Step ${currentStep} of 8`
              : "Build Track"}
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Status: Active
            </span>
          </div>
        </div>
      </header>

      {/* Context header */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Build Track — Route Rail
            </h1>
            <p className="text-xs text-slate-400 max-w-xl">
              Move through each step in order. You can&apos;t skip ahead until you
              upload the artifact for the current step.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hidden sm:inline">{statusText}</span>
          </div>
        </div>
      </section>

      {/* Main workspace + secondary build panel + rail */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col gap-6 lg:flex-row">
          {/* Route rail */}
          <nav className="w-full lg:w-48 border border-slate-800/80 rounded-xl bg-slate-900/60 p-3 flex flex-row lg:flex-col gap-2 text-xs">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCurrent =
                currentStep !== null && currentStep === stepNumber;
              const previousStepsComplete = completed
                .slice(0, index)
                .every(Boolean);
              const unlocked = previousStepsComplete;

              const baseClasses =
                "flex-1 lg:flex-none flex items-center justify-between rounded-lg border px-3 py-2 transition text-xs";
              const interactiveClasses = unlocked
                ? "border-slate-700 bg-slate-900/70 hover:border-sky-400 hover:bg-slate-900"
                : "border-slate-800 bg-slate-900/40 opacity-50 cursor-not-allowed";
              const activeClasses = isCurrent
                ? "border-sky-400 bg-sky-500/10"
                : "";

              const content = (
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] font-semibold">
                      {String(stepNumber).padStart(2, "0")}
                    </span>
                    <span className="hidden sm:inline">{step.label}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-slate-400">
                    {completed[index] ? "Done" : unlocked ? "Open" : "Locked"}
                  </span>
                </span>
              );

              if (!unlocked) {
                return (
                  <div
                    key={step.slug}
                    className={`${baseClasses} ${interactiveClasses} ${activeClasses}`}
                    aria-disabled="true"
                  >
                    {content}
                  </div>
                );
              }

              return (
                <Link
                  key={step.slug}
                  href={`/rb/${step.slug}`}
                  className={`${baseClasses} ${interactiveClasses} ${activeClasses}`}
                >
                  {content}
                </Link>
              );
            })}
            <Link
              href="/rb/proof"
              className="flex-1 lg:flex-none mt-0 lg:mt-2 flex items-center justify-between rounded-lg border border-violet-500/60 bg-violet-500/10 px-3 py-2 text-xs hover:border-violet-400 hover:bg-violet-500/20 transition"
            >
              <span className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-semibold">
                  ✅
                </span>
                <span className="hidden sm:inline">Proof & Submission</span>
              </span>
              <span className="text-[10px] uppercase tracking-wide text-violet-200">
                Final
              </span>
            </Link>
          </nav>

          {/* Main and build panels */}
          <div className="flex-1 flex flex-col lg:flex-row gap-4">
            {/* Main workspace (70%) */}
            <section className="lg:w-[70%] min-h-[360px] border border-slate-800 rounded-xl bg-slate-900/60 p-4">
              {children}
            </section>

            {/* Secondary build panel (30%) */}
            <aside className="lg:w-[30%] min-h-[260px] border border-slate-800 rounded-xl bg-slate-900/80 p-4 flex flex-col gap-4">
              <h2 className="text-sm font-semibold tracking-tight">
                Build Panel
              </h2>
              <p className="text-xs text-slate-400">
                Use this panel to move instructions into Lovable and track the
                artifact for this step.
              </p>
              <textarea
                className="min-h-[140px] w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/60 resize-none"
                placeholder="Copy This Into Lovable..."
              />
              <div className="flex flex-wrap gap-2 text-xs">
                <button className="flex-1 rounded-lg bg-slate-800 px-3 py-2 font-medium hover:bg-slate-700 transition">
                  Copy
                </button>
                <button className="flex-1 rounded-lg bg-sky-600 px-3 py-2 font-medium hover:bg-sky-500 transition">
                  Build in Lovable
                </button>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <button className="flex-1 rounded-lg border border-emerald-500/60 bg-emerald-500/10 px-2 py-1 font-medium text-emerald-200 hover:bg-emerald-500/20 transition">
                  It Worked
                </button>
                <button className="flex-1 rounded-lg border border-rose-500/60 bg-rose-500/10 px-2 py-1 font-medium text-rose-200 hover:bg-rose-500/20 transition">
                  Error
                </button>
                <button className="w-full rounded-lg border border-slate-600 bg-slate-900 px-2 py-1 font-medium hover:bg-slate-800 transition">
                  Add Screenshot
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Proof footer */}
      <footer className="border-t border-slate-800 bg-slate-950/90">
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-400">
          <span>
            Proof rail is tracked locally in your browser. Complete all 8 steps
            before submitting.
          </span>
          <span>
            Final summary lives on{" "}
            <Link
              href="/rb/proof"
              className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
            >
              the Proof page
            </Link>
            .
          </span>
        </div>
      </footer>
    </div>
  );
}

