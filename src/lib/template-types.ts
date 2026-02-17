export type TemplateType = "classic" | "modern" | "minimal";

export interface TemplateStyles {
  layout: "single-column" | "two-column";
  headerFontSize: string;
  headerFontFamily: string;
  headerSpacing: string;
  sectionSpacing: string;
  sectionHeaderSize: string;
  sectionHeaderWeight: string;
  sectionHeaderTracking: string;
  bodyFontSize: string;
  bodyFontFamily: string;
  lineHeight: string;
  borderStyle: string;
  padding: string;
  hasSidebar: boolean;
}

export const templateStyles: Record<TemplateType, TemplateStyles> = {
  classic: {
    layout: "single-column",
    headerFontSize: "text-2xl",
    headerFontFamily: "font-serif",
    headerSpacing: "mb-2",
    sectionSpacing: "space-y-6",
    sectionHeaderSize: "text-[10px]",
    sectionHeaderWeight: "font-semibold",
    sectionHeaderTracking: "tracking-[0.2em]",
    bodyFontSize: "text-sm",
    bodyFontFamily: "font-sans",
    lineHeight: "leading-relaxed",
    borderStyle: "border-b border-black",
    padding: "p-6",
    hasSidebar: false,
  },
  modern: {
    layout: "two-column",
    headerFontSize: "text-2xl",
    headerFontFamily: "font-sans",
    headerSpacing: "mb-3",
    sectionSpacing: "space-y-5",
    sectionHeaderSize: "text-xs",
    sectionHeaderWeight: "font-semibold",
    sectionHeaderTracking: "tracking-widest",
    bodyFontSize: "text-sm",
    bodyFontFamily: "font-sans",
    lineHeight: "leading-relaxed",
    borderStyle: "border-b border-black/20",
    padding: "p-0",
    hasSidebar: true,
  },
  minimal: {
    layout: "single-column",
    headerFontSize: "text-xl",
    headerFontFamily: "font-sans",
    headerSpacing: "mb-2",
    sectionSpacing: "space-y-4",
    sectionHeaderSize: "text-[10px]",
    sectionHeaderWeight: "font-medium",
    sectionHeaderTracking: "tracking-[0.15em]",
    bodyFontSize: "text-xs",
    bodyFontFamily: "font-sans",
    lineHeight: "leading-normal",
    borderStyle: "",
    padding: "p-5",
    hasSidebar: false,
  },
};
