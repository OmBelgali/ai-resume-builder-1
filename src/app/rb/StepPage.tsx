"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type StepId =
  | "01-problem"
  | "02-market"
  | "03-architecture"
  | "04-hld"
  | "05-lld"
  | "06-build"
  | "07-test"
  | "08-ship";

const stepOrder: StepId[] = [
  "01-problem",
  "02-market",
  "03-architecture",
  "04-hld",
  "05-lld",
  "06-build",
  "07-test",
  "08-ship",
];

const stepLabels: Record<StepId, string> = {
  "01-problem": "Step 1 — Problem",
  "02-market": "Step 2 — Market",
  "03-architecture": "Step 3 — Architecture",
  "04-hld": "Step 4 — High-Level Design",
  "05-lld": "Step 5 — Low-Level Design",
  "06-build": "Step 6 — Build",
  "07-test": "Step 7 — Test",
  "08-ship": "Step 8 — Ship",
};

export interface StepPageProps {
  stepId: StepId;
  children?: ReactNode;
}

interface StoredArtifact {
  id: string;
  fileName?: string;
  uploadedAt: string;
}

function getStorageKey(stepIndex: number) {
  return `rb_step_${stepIndex}_artifact`;
}

function readArtifact(stepIndex: number): StoredArtifact | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(getStorageKey(stepIndex));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredArtifact;
  } catch {
    return null;
  }
}

function writeArtifact(stepIndex: number, artifact: StoredArtifact) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getStorageKey(stepIndex), JSON.stringify(artifact));
}

export function StepPage({ stepId, children }: StepPageProps) {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [artifact, setArtifact] = useState<StoredArtifact | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const stepIndex = useMemo(
    () => stepOrder.indexOf(stepId) + 1,
    [stepId],
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Load current artifact
  useEffect(() => {
    if (!hydrated || stepIndex <= 0) return;
    const stored = readArtifact(stepIndex);
    if (stored) {
      setArtifact(stored);
    }
  }, [hydrated, stepIndex]);

  // Enforce no skipping: redirect to first incomplete step
  useEffect(() => {
    if (!hydrated || stepIndex <= 0) return;
    for (let i = 1; i < stepIndex; i += 1) {
      const prev = readArtifact(i);
      if (!prev) {
        const targetId = stepOrder[i - 1];
        router.replace(`/rb/${targetId}`);
        return;
      }
    }
  }, [hydrated, stepIndex, router]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    if (!file) return;

    setUploadError(null);

    const stored: StoredArtifact = {
      id: `${stepId}-${Date.now()}`,
      fileName: file.name,
      uploadedAt: new Date().toISOString(),
    };

    writeArtifact(stepIndex, stored);
    setArtifact(stored);
  };

  const goToNext = () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex > stepOrder.length) return;
    const nextId = stepOrder[nextIndex - 1];
    router.push(`/rb/${nextId}`);
  };

  const canGoNext = !!artifact && stepIndex < stepOrder.length;

  if (!hydrated) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-[#6e6256]">
        Loading step…
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b0000]">
          {stepLabels[stepId]}
        </p>
        <p className="text-xs text-[#6e6256]">
          Stay focused on this step. Once you&apos;ve uploaded the artifact, you can move
          forward. Skipping ahead is disabled.
        </p>
      </header>

      <section className="flex-1 rounded-lg border border-[#2b2118] bg-[#f7f6f3] p-4 text-xs text-[#2b2118]">
        {children ?? (
          <p>
            This step describes what you need to build for the AI Resume Builder. The
            exact feature details are intentionally omitted here — focus on completing
            the artifact workflow and route rail.
          </p>
        )}
      </section>

      <section className="space-y-3 rounded-lg border border-[#2b2118] bg-[#f7f6f3] p-4">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-medium text-[#2b2118]">
            Step artifact
          </span>
          <span className="text-[11px] text-[#6e6256]">
            Stored as{" "}
            <code className="rounded bg-[#f7f6f3] border border-[#2b2118] px-1 py-0.5">
              rb_step_{stepIndex}_artifact
            </code>
          </span>
        </div>
        <label className="flex flex-col gap-2 text-xs">
          <span className="text-[#6e6256]">
            Upload any file or screenshot that proves this step is done.
          </span>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-xs text-[#2b2118] file:mr-3 file:rounded-md file:border file:border-[#2b2118] file:bg-[#f7f6f3] file:px-3 file:py-2 file:text-xs file:font-medium file:text-[#2b2118] hover:file:bg-[#8b0000]/5"
          />
        </label>
        {uploadError && (
          <p className="text-[11px] text-[#8b0000]">
            {uploadError}
          </p>
        )}
        {artifact && (
          <div className="rounded-md border border-[#2b2118] bg-[#f7f6f3] px-3 py-2 text-[11px] text-[#2b2118]">
            <p className="font-medium">
              Artifact saved for this step.
            </p>
            {artifact.fileName && (
              <p className="mt-1">
                <span className="text-[#6e6256]">File:</span>{" "}
                {artifact.fileName}
              </p>
            )}
          </div>
        )}
      </section>

      <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs">
        <div className="text-[11px] text-[#6e6256]">
          Next is{" "}
          {stepIndex < stepOrder.length
            ? stepLabels[stepOrder[stepIndex]]
            : "Proof & Submission"}
          .
        </div>
        <button
          type="button"
          onClick={goToNext}
          disabled={!canGoNext}
          className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-medium transition ${
            canGoNext
              ? "bg-[#8b0000] text-[#f7f6f3] hover:bg-[#8b0000]/90"
              : "bg-transparent text-[#6e6256] border border-[#2b2118]/40 cursor-not-allowed"
          }`}
        >
          {stepIndex < stepOrder.length ? "Next Step" : "All Steps Complete"}
        </button>
      </div>
    </div>
  );
}

