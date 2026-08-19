"use client";

import Link from "next/link";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ContentThumbnail } from "@/components/content/ContentThumbnail";
import { StatusBadge } from "@/components/content/StatusBadge";
import { getClientById } from "@/data/mock-clients";
import { formatTime } from "@/lib/utils/date";
import { cn } from "@/lib/utils/cn";
import type { Content } from "@/types";

export function CalendarAgendaCard({ content }: { content: Content }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: content.id,
    data: { content },
  });
  const client = getClientById(content.clientId);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={cn(
        "flex cursor-grab items-center gap-3 rounded-lg border border-border bg-surface p-2.5 active:cursor-grabbing",
        isDragging && "opacity-40"
      )}
    >
      <span className="w-12 shrink-0 text-xs font-medium text-muted-foreground">
        {formatTime(new Date(content.scheduledAt))}
      </span>
      <div className="size-10 shrink-0">
        <ContentThumbnail
          seed={content.thumbnailSeed}
          format={content.format}
          platform={content.platform}
          className="aspect-square"
        />
      </div>
      <Link
        href={`/content/${content.id}`}
        onClick={(e) => e.stopPropagation()}
        className="min-w-0 flex-1 truncate text-sm font-medium text-foreground hover:text-primary"
      >
        {content.title}
      </Link>
      <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">{client?.name}</span>
      <StatusBadge status={content.status} className="shrink-0" />
    </div>
  );
}
