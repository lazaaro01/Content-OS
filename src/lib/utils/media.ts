import type { ContentFormat, Platform } from "@/types";

const VIDEO_FORMATS: ReadonlySet<ContentFormat> = new Set([
  "REEL",
  "VIDEO",
  "LIVE",
]);

export function isVideoFormat(format: ContentFormat): boolean {
  return VIDEO_FORMATS.has(format);
}

export interface FormatMediaAsset {
  kind: "video" | "image";
  src: string;
  extension: "mp4" | "png";
  filename: string;
  label: string;
}

export function getMediaForFormat(format: ContentFormat): FormatMediaAsset {
  if (isVideoFormat(format)) {
    return {
      kind: "video",
      src: "/video.mp4",
      extension: "mp4",
      filename: "video.mp4",
      label: "Vídeo (video.mp4)",
    };
  }
  return {
    kind: "image",
    src: "/imagem.png",
    extension: "png",
    filename: "imagem.png",
    label: "Imagem (imagem.png)",
  };
}

export interface PlatformStudioTarget {
  studioName: string;
  url: string;
}

export const PLATFORM_STUDIO_URLS: Record<Platform, PlatformStudioTarget> = {
  INSTAGRAM: {
    studioName: "Meta Business Suite",
    url: "https://business.facebook.com/latest/composer",
  },
  FACEBOOK: {
    studioName: "Meta Business Suite",
    url: "https://business.facebook.com/latest/composer",
  },
  TIKTOK: {
    studioName: "TikTok Studio Web",
    url: "https://www.tiktok.com/tiktokstudio/upload",
  },
  YOUTUBE: {
    studioName: "YouTube Studio",
    url: "https://studio.youtube.com",
  },
  LINKEDIN: {
    studioName: "LinkedIn",
    url: "https://www.linkedin.com/feed/",
  },
  TWITTER: {
    studioName: "X (Twitter)",
    url: "https://x.com/compose/post",
  },
};

export function formatDispatchCopyText(input: {
  caption: string;
  cta: string;
  hashtags: string[];
}): string {
  const sections: string[] = [];
  if (input.caption.trim()) {
    sections.push(input.caption.trim());
  }
  if (input.cta.trim()) {
    sections.push(input.cta.trim());
  }
  if (input.hashtags.length > 0) {
    sections.push(input.hashtags.join(" "));
  }
  return sections.join("\n\n");
}

export function buildDownloadFilename(title: string, extension: string): string {
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug || "conteudo"}.${extension}`;
}
