"use client";

import * as React from "react";
import { Film, Images, BookOpen, Newspaper, Radio, Play } from "lucide-react";
import { gradientForSeed } from "@/lib/utils/gradient";
import { getMediaForFormat } from "@/lib/utils/media";
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
  /** Real thumbnail (e.g. from a Google Drive file) — falls back to the format media in /public when absent. */
  imageUrl?: string;
  /** Enables native video controls on detail and review screens. */
  controls?: boolean;
  className?: string;
}

export function ContentThumbnail({
  seed,
  format,
  platform,
  imageUrl,
  controls = false,
  className,
}: ContentThumbnailProps) {
  const FormatIcon = FORMAT_ICON[format];
  const PlatformIcon = PLATFORM_CONFIG[platform].icon;
  const [failedDriveUrl, setFailedDriveUrl] = React.useState<string | null>(null);
  const [failedFallbackSrc, setFailedFallbackSrc] = React.useState<string | null>(null);

  const defaultMedia = getMediaForFormat(format);
  const showDriveImage = Boolean(imageUrl) && failedDriveUrl !== imageUrl;
  const fallbackMediaFailed = failedFallbackSrc === defaultMedia.src;

  return (
    <div
      className={cn(
        "relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-md",
        className
      )}
      style={{ background: gradientForSeed(seed) }}
    >
      {showDriveImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- remote Drive thumbnail
        <img
          src={imageUrl}
          alt=""
          onError={() => setFailedDriveUrl(imageUrl ?? null)}
          className="absolute inset-0 size-full object-cover"
        />
      ) : !fallbackMediaFailed ? (
        defaultMedia.kind === "video" ? (
          controls ? (
            <video
              key={defaultMedia.src}
              src={defaultMedia.src}
              controls
              playsInline
              preload="metadata"
              onError={() => setFailedFallbackSrc(defaultMedia.src)}
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <>
              <video
                key={defaultMedia.src}
                src={`${defaultMedia.src}#t=0.1`}
                muted
                loop
                playsInline
                preload="metadata"
                onMouseEnter={(e) => {
                  void e.currentTarget.play().catch(() => {});
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                }}
                onError={() => setFailedFallbackSrc(defaultMedia.src)}
                className="absolute inset-0 size-full object-cover"
              />
              <div className="pointer-events-none absolute bottom-2 left-2 flex size-6 items-center justify-center rounded-full bg-scrim backdrop-blur-sm">
                <Play className="size-3 fill-current text-on-media" />
              </div>
            </>
          )
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- local format media asset from /public
          <img
            src={defaultMedia.src}
            alt=""
            onError={() => setFailedFallbackSrc(defaultMedia.src)}
            className="absolute inset-0 size-full object-cover"
          />
        )
      ) : (
        <FormatIcon className="size-10 text-on-media/25" strokeWidth={1.5} />
      )}
      <div className="pointer-events-none absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-scrim backdrop-blur-sm">
        <PlatformIcon className="size-3.5 text-on-media" />
      </div>
    </div>
  );
}
