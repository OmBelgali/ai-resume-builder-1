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

const checklistItems = [
  "All form sections save to localStorage",
  "Live preview updates in real-time",
  "Template switching preserves data",
  "Color theme persists after refresh",
  "ATS score calculates correctly",
  "Score updates live on edit",
  "Export buttons work (copy/download)",
  "Empty states handled gracefully",
  "Mobile responsive layout works",
  "No console errors on any page",
];

interface StoredArtifact {
  id: string;
  fileName?: string;
  uploadedAt: string;
}

interface FinalSubmission {
  lovableLink: string;
  githubLink: string;
  deployLink: string;
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

function isValidUrl(url: string): boolean {
  if (!url.trim()) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function readFinalSubmission(): FinalSubmission | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem("rb_final_submission");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FinalSubmission;
  } catch {
    return null;
  }
}

function saveFinalSubmission(data: FinalSubmission) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("rb_final_submission", JSON.stringify(data));
}

function readChecklistItem(index: number): boolean {
  if (typeof window === "undefined") return false;
  const raw = window.localStorage.getItem(`rb_checklist_item_${index}`);
  return raw === "true";
}

function saveChecklistItem(index: number, checked: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`rb_checklist_item_${index}`, String(checked));
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
  const [checklist, setChecklist] = useState<boolean[]>(() =>
    checklistItems.map(() => false),
  );
  const [copied, setCopied] = useState(false);
  const [urlErrors, setUrlErrors] = useState({
    lovable: "",
    github: "",
    deploy: "",
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const nextArtifacts = steps.map((step) => readArtifact(step.index));
    setArtifacts(nextArtifacts);

    // Load final submission data
    const submission = readFinalSubmission();
    if (submission) {
      setLovableLink(submission.lovableLink);
      setGithubLink(submission.githubLink);
      setDeployLink(submission.deployLink);
    }

    // Load checklist state
    const nextChecklist = checklistItems.map((_, idx) =>
      readChecklistItem(idx + 1),
    );
    setChecklist(nextChecklist);

    // If any step is incomplete, send the user back to the first incomplete one.
    const firstIncompleteIndex = nextArtifacts.findIndex((a) => !a);
    if (firstIncompleteIndex !== -1) {
      const target = steps[firstIncompleteIndex];
      router.replace(`/rb/${target.id}`);
    }
  }, [hydrated, router]);

  const allStepsComplete = useMemo(
    () => artifacts.every(Boolean),
    [artifacts],
  );

  const allChecklistComplete = useMemo(
    () => checklist.every(Boolean),
    [checklist],
  );

  const allLinksValid = useMemo(() => {
    return (
      isValidUrl(lovableLink) &&
      isValidUrl(githubLink) &&
      isValidUrl(deployLink)
    );
  }, [lovableLink, githubLink, deployLink]);

  const isShipped = useMemo(() => {
    return allStepsComplete && allChecklistComplete && allLinksValid;
  }, [allStepsComplete, allChecklistComplete, allLinksValid]);

  const handleLinkChange = (
    field: "lovable" | "github" | "deploy",
    value: string,
  ) => {
    const newSubmission: FinalSubmission = {
      lovableLink: field === "lovable" ? value : lovableLink,
      githubLink: field === "github" ? value : githubLink,
      deployLink: field === "deploy" ? value : deployLink,
    };

    if (field === "lovable") {
      setLovableLink(value);
      setUrlErrors((prev) => ({
        ...prev,
        lovable: value && !isValidUrl(value) ? "Invalid URL" : "",
      }));
    } else if (field === "github") {
      setGithubLink(value);
      setUrlErrors((prev) => ({
        ...prev,
        github: value && !isValidUrl(value) ? "Invalid URL" : "",
      }));
    } else {
      setDeployLink(value);
      setUrlErrors((prev) => ({
        ...prev,
        deploy: value && !isValidUrl(value) ? "Invalid URL" : "",
      }));
    }

    saveFinalSubmission(newSubmission);
  };

  const handleChecklistToggle = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);
    saveChecklistItem(index + 1, newChecklist[index]);
  };

  const handleCopy = async () => {
    const lines: string[] = [];
    lines.push("------------------------------------------");
    lines.push("AI Resume Builder — Final Submission");
    lines.push("");
    lines.push(`Lovable Project: ${lovableLink || "N/A"}`);
    lines.push(`GitHub Repository: ${githubLink || "N/A"}`);
    lines.push(`Live Deployment: ${deployLink || "N/A"}`);
    lines.push("");
    lines.push("Core Capabilities:");
    lines.push("- Structured resume builder");
    lines.push("- Deterministic ATS scoring");
    lines.push("- Template switching");
    lines.push("- PDF export with clean formatting");
    lines.push("- Persistence + validation checklist");
    lines.push("------------------------------------------");

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
          Review all 8 steps, complete the testing checklist, add your links, and copy a final submission
          payload you can paste into the track.
        </p>
      </header>

      {/* Shipped confirmation */}
      {isShipped && (
        <div className="rounded-lg border border-[#16a34a] bg-[#dcfce7] p-4 text-center">
          <p className="text-sm font-medium text-[#16a34a]">
            Project 3 Shipped Successfully.
          </p>
        </div>
      )}

      {/* 8-step status */}
      <section className="space-y-3 rounded-lg border border-[#2b2118] bg-[#f7f6f3] p-4">
        <h2 className="text-xs font-semibold text-[#2b2118]">
          Step Completion Overview
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
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${complete
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
        {!allStepsComplete && (
          <p className="text-[11px] text-[#8b0000]">
            You can only submit once all 8 steps have artifacts. Missing steps will
            redirect you back into the rail.
          </p>
        )}
      </section>

      {/* Testing Checklist */}
      <section className="space-y-3 rounded-lg border border-[#2b2118] bg-[#f7f6f3] p-4">
        <h2 className="text-xs font-semibold text-[#2b2118]">
          Testing Checklist (Required to mark Shipped)
        </h2>
        <div className="space-y-2">
          {checklistItems.map((item, idx) => (
            <label
              key={idx}
              className="flex items-start gap-2 text-xs cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checklist[idx]}
                onChange={() => handleChecklistToggle(idx)}
                className="mt-0.5 h-4 w-4 rounded border-[#2b2118] text-[#8b0000] focus:ring-[#8b0000] focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-[#2b2118]">{item}</span>
            </label>
          ))}
        </div>
        {!allChecklistComplete && (
          <p className="text-[11px] text-[#8b0000]">
            All 10 checklist items must be tested and checked before marking as shipped.
          </p>
        )}
      </section>

      {/* Artifact Collection */}
      <section className="space-y-3 rounded-lg border border-[#2b2118] bg-[#f7f6f3] p-4">
        <h2 className="text-xs font-semibold text-[#2b2118]">
          Artifact Collection (Required to mark Shipped)
        </h2>
        <div className="space-y-3 text-xs">
          <label className="block space-y-1">
            <span className="text-[#6e6256]">Lovable project link *</span>
            <input
              type="url"
              value={lovableLink}
              onChange={(e) => handleLinkChange("lovable", e.target.value)}
              placeholder="https://app.lovable.dev/..."
              className={`w-full rounded-md border ${urlErrors.lovable
                  ? "border-[#8b0000]"
                  : "border-[#2b2118]"
                } bg-[#f7f6f3] px-3 py-2 text-xs text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/40`}
            />
            {urlErrors.lovable && (
              <p className="text-[11px] text-[#8b0000]">{urlErrors.lovable}</p>
            )}
          </label>
          <label className="block space-y-1">
            <span className="text-[#6e6256]">GitHub repository link *</span>
            <input
              type="url"
              value={githubLink}
              onChange={(e) => handleLinkChange("github", e.target.value)}
              placeholder="https://github.com/..."
              className={`w-full rounded-md border ${urlErrors.github
                  ? "border-[#8b0000]"
                  : "border-[#2b2118]"
                } bg-[#f7f6f3] px-3 py-2 text-xs text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/40`}
            />
            {urlErrors.github && (
              <p className="text-[11px] text-[#8b0000]">{urlErrors.github}</p>
            )}
          </label>
          <label className="block space-y-1">
            <span className="text-[#6e6256]">Deployed URL *</span>
            <input
              type="url"
              value={deployLink}
              onChange={(e) => handleLinkChange("deploy", e.target.value)}
              placeholder="https://your-vercel-deploy-url"
              className={`w-full rounded-md border ${urlErrors.deploy
                  ? "border-[#8b0000]"
                  : "border-[#2b2118]"
                } bg-[#f7f6f3] px-3 py-2 text-xs text-[#2b2118] outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000]/40`}
            />
            {urlErrors.deploy && (
              <p className="text-[11px] text-[#8b0000]">{urlErrors.deploy}</p>
            )}
          </label>
        </div>
        {!allLinksValid && (
          <p className="text-[11px] text-[#8b0000]">
            All 3 proof links must be valid URLs before marking as shipped.
          </p>
        )}
      </section>

      {/* Copy final submission */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs">
        <p className="text-[11px] text-[#6e6256]">
          The button builds a single text payload you can paste as your final submission.
        </p>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!isShipped}
          className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-medium transition ${isShipped
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
