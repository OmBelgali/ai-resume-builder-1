"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  { index: 1, id: "01-problem", label: "Problem" },
  { index: 2, id: "02-market", label: "Market" },
  { index: 3, id: "03-architecture", label: "Architecture" },
  { index: 4, id: "04-hld", label: "High-Level Design" },
  { index: 5, id: "05-lld", label: "Low-Level Design" },
  { index: 6, id: "06-build", label: "Build" },
  { index: 7, id: "07-test", label: "Test" },
  { index: 8, id: "08-ship", label: "Ship" },
];

interface StoredArtifact {
  id: string;
  fileName?: string;
  uploadedAt: string;
}

function keyFor(index: number) {
  return `rb_step_${index}_artifact`;
}

function readArtifact(index: number): StoredArtifact | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(keyFor(index));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredArtifact;
  } catch {
    return null;
  }
}

export default function ProofPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [artifacts, setArtifacts] = useState<(StoredArtifact | null)[]>(
    () => steps.map(() => null),
  );
  const [lovableLink, setLovableLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [deployLink, setDeployLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const nextArtifacts = steps.map((step) => readArtifact(step.index));
    setArtifacts(nextArtifacts);

    // If any step is incomplete, send the user back to the first incomplete one.
    const firstIncompleteIndex = nextArtifacts.findIndex((a) => !a);
    if (firstIncompleteIndex !== -1) {
      const target = steps[firstIncompleteIndex];
      router.replace(`/rb/${target.id}`);
    }
  }, [hydrated, router]);

  const allComplete = useMemo(
    () => artifacts.every(Boolean),
    [artifacts],
  );

  const handleCopy = async () => {
    const lines: string[] = [];
    lines.push("AI Resume Builder — Build Track");
    lines.push("Final Submission");
    lines.push("");
    lines.push("Step Status:");
    steps.forEach((step, idx) => {
      const artifact = artifacts[idx];
      lines.push(
        `- Step ${step.index} — ${step.label}: ${
          artifact ? "Complete" : "Missing"
        }`,
      );
    });
    lines.push("");
    lines.push(`Lovable project: ${lovableLink || "N/A"}`);
    lines.push(`GitHub repo: ${githubLink || "N/A"}`);
    lines.push(`Production deploy: ${deployLink || "N/A"}`);

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!hydrated) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-[#6e6256]">
        Loading proof status…
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b0000]">
          Proof &amp; Submission
        </p>
        <p className="text-xs text-[#6e6256]">
          Review all 8 steps, add your links, and copy a final submission
          payload you can paste into the track.
        </p>
      </header>

      {/* 8-step status */}
      <section className="space-y-3 rounded-lg border border-[#2b2118] bg-[#f7f6f3] p-4">
        <h2 className="text-xs font-semibold text-[#2b2118]">
          8-step status
        </h2>
        <ol className="space-y-2 text-xs">
          {steps.map((step, idx) => {
            const artifact = artifacts[idx];
            const complete = Boolean(artifact);
            return (
              <li
                key={step.id}
                className="flex items-center justify-between gap-2 rounded-md border border-[#2b2118] bg-[#f7f6f3] px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#2b2118] text-[10px] font-semibold">
                    {String(step.index).padStart(2, "0")}
                  </span>
                  <span>{step.label}</span>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    complete
                      ? "bg-[#8b0000]/5 text-[#8b0000] border border-[#8b0000]"
                      : "bg-transparent text-[#6e6256] border border-[#2b2118]/40"
                  }`}
                >
                  {complete ? "Complete" : "Missing"}
                </span>
              </li>
            );
          })}
        </ol>
        {!allComplete && (
          <p className="text-[11px] text-[#8b0000]">
            You can only submit once all 8 steps have artifacts. Missing steps will
            redirect you back into the rail.
          </p>
        )}
      </section>

      {/* Links */}
      <section className="space-y-3 rounded-lg border border-[#2b2118] bg-[#f7f6f3] p-4">
        <h2 className="text-xs font-semibold text-[#2b2118]">
          Final links
        </h2>
        <div className="space-y-2 text-xs">
          <label className="block space-y-1">
            <span className="text-[#6e6256]">Lovable project link</span>
            <input
              type="url"
              value={lovableLink}
              onChange={(e) => setLovableLink(e.target.value)}
              placeholder="https://app.lovable.dev/..."
              className="w-full rounded-md border border-[#2b2118] bg-[#f7f6f3] px-3 py-2 text-xs text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/40"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-[#6e6256]">GitHub repository link</span>
            <input
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full rounded-md border border-[#2b2118] bg-[#f7f6f3] px-3 py-2 text-xs text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/40"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-[#6e6256]">Production deploy link</span>
            <input
              type="url"
              value={deployLink}
              onChange={(e) => setDeployLink(e.target.value)}
              placeholder="https://your-vercel-deploy-url"
              className="w-full rounded-md border border-[#2b2118] bg-[#f7f6f3] px-3 py-2 text-xs text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/40"
            />
          </label>
        </div>
      </section>

      {/* Copy final submission */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs">
        <p className="text-[11px] text-[#6e6256]">
          The button builds a single text payload you can paste as your final submission.
        </p>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!allComplete}
          className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-medium transition ${
            allComplete
              ? "bg-[#8b0000] text-[#f7f6f3] hover:bg-[#8b0000]/90"
              : "bg-transparent text-[#6e6256] border border-[#2b2118]/40 cursor-not-allowed"
          }`}
        >
          {copied ? "Copied!" : "Copy Final Submission"}
        </button>
      </div>
    </div>
  );
}

