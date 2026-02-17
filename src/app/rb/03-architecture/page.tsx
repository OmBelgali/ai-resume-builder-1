import { StepPage } from "../StepPage";

export default function ArchitecturePage() {
  return (
    <StepPage stepId="03-architecture">
      <p className="text-xs text-[#6e6256]">
        Sketch the high-level architecture for the AI Resume Builder: core
        services, data flows, and integrations. The goal is to support the
        build track routing and gating, not to finalize technical choices.
      </p>
    </StepPage>
  );
}

