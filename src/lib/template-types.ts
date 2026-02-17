export type TemplateType = "classic" | "modern" | "minimal";

export interface TemplateStyles {
  headerFontSize: string;
  headerSpacing: string;
  sectionSpacing: string;
  sectionHeaderSize: string;
  sectionHeaderWeight: string;
  sectionHeaderTracking: string;
  bodyFontSize: string;
  lineHeight: string;
  borderStyle: string;
  padding: string;
}

export const templateStyles: Record<TemplateType, TemplateStyles> = {
  classic: {
    headerFontSize: "text-2xl",
    headerSpacing: "mb-2",
    sectionSpacing: "space-y-6",
    sectionHeaderSize: "text-[10px]",
    sectionHeaderWeight: "font-semibold",
    sectionHeaderTracking: "tracking-[0.2em]",
    bodyFontSize: "text-sm",
    lineHeight: "leading-relaxed",
    borderStyle: "border-b border-black",
    padding: "p-6",
  },
  modern: {
    headerFontSize: "text-2xl",
    headerSpacing: "mb-3",
    sectionSpacing: "space-y-5",
    sectionHeaderSize: "text-xs",
    sectionHeaderWeight: "font-semibold",
    sectionHeaderTracking: "tracking-widest",
    bodyFontSize: "text-sm",
    lineHeight: "leading-relaxed",
    borderStyle: "border-b border-black/20",
    padding: "p-6",
  },
  minimal: {
    headerFontSize: "text-xl",
    headerSpacing: "mb-2",
    sectionSpacing: "space-y-4",
    sectionHeaderSize: "text-[10px]",
    sectionHeaderWeight: "font-medium",
    sectionHeaderTracking: "tracking-[0.15em]",
    bodyFontSize: "text-xs",
    lineHeight: "leading-normal",
    borderStyle: "border-b border-black/10",
    padding: "p-5",
  },
};
