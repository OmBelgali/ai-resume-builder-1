import { StepPage } from "../StepPage";

export default function TestPage() {
  return (
    <StepPage stepId="07-test">
      <p className="text-xs text-slate-200">
        Define how you&apos;ll test the AI Resume Builder. Think through unit,
        integration, and end-to-end checks as well as how you&apos;ll validate
        the AI behavior itself.
      </p>
    </StepPage>
  );
}

