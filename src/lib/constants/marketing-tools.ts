import { FileSpreadsheet, HardDrive, Camera, MessageCircle, NotebookText, SquareKanban } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Ferramentas citadas na seção "Problema" da landing, com a cor de marca de cada uma. */
export interface MarketingTool {
  label: string;
  icon: LucideIcon;
  color: string;
}

export const MARKETING_TOOLS: MarketingTool[] = [
  { label: "WhatsApp", icon: MessageCircle, color: "#25d366" },
  { label: "Google Drive", icon: HardDrive, color: "#fbbc04" },
  { label: "Notion", icon: NotebookText, color: "#9ca3af" },
  { label: "Planilhas", icon: FileSpreadsheet, color: "#10b981" },
  { label: "Trello", icon: SquareKanban, color: "#3b82f6" },
  { label: "Instagram", icon: Camera, color: "#ec4899" },
];
