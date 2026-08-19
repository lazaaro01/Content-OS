import { Film, Images, BookOpen, Newspaper, Radio } from "lucide-react";
import { gradientForSeed } from "@/lib/utils/gradient";
import { PLATFORM_CONFIG } from "@/lib/constants/platforms";
import { cn } from "@/lib/utils/cn";
import type { ContentFormat, Platform } from "@/types";

const FORMAT_ICON: Record<ContentFormat, React.ElementType> = {
  REEL: Film,
  CAROUSEL: Images,
  STORY: BookOpen,
  POST: Newspaper,
  VIDEO: Film,
  LIVE: Radio,
};

export interface ContentThumbnailProps {
  seed: string;
  format: ContentFormat;
  platform: Platform;
  className?: string;
}

export function ContentThumbnail({ seed, format, platform, className }: ContentThumbnailProps) {
  const FormatIcon = FORMAT_ICON[format];
  const PlatformIcon = PLATFORM_CONFIG[platform].icon;

  return (
    <div
      className={cn(
        "relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-md",
        className
      )}
      style={{ background: gradientForSeed(seed) }}
    >
      <FormatIcon className="size-10 text-white/25" strokeWidth={1.5} />
      <div className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
        <PlatformIcon className="size-3.5 text-white" />
      </div>
    </div>
  );
}
