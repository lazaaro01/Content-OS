"use client";

import * as React from "react";
import {
  Copy,
  Check,
  Download,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { useContentStore } from "@/store/content-store";
import { PLATFORM_CONFIG, FORMAT_LABELS } from "@/lib/constants/platforms";
import {
  getMediaForFormat,
  PLATFORM_STUDIO_URLS,
  formatDispatchCopyText,
  buildDownloadFilename,
} from "@/lib/utils/media";
import type { Content } from "@/types";

export interface AssistedPublishCardProps {
  content: Content;
}

export function AssistedPublishCard({ content }: AssistedPublishCardProps) {
  const { toast } = useToast();
  const moveContent = useContentStore((s) => s.moveContent);
  const [copied, setCopied] = React.useState(false);

  const media = getMediaForFormat(content.format);
  const studio = PLATFORM_STUDIO_URLS[content.platform];
  const platformLabel = PLATFORM_CONFIG[content.platform].label;
  const formattedText = formatDispatchCopyText({
    caption: content.caption,
    cta: content.cta,
    hashtags: content.hashtags,
  });

  async function handleCopyCaption() {
    if (!formattedText) {
      toast({
        title: "Sem texto para copiar",
        description: "Adicione legenda, CTA ou hashtags antes de copiar.",
        variant: "info",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      toast({
        title: "Legenda e hashtags copiadas!",
        description: "Pronto para colar na publicação.",
        variant: "success",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Não foi possível copiar automaticamente",
        description: "Selecione o texto abaixo e copie manualmente.",
        variant: "error",
      });
    }
  }

  function handleDownloadMedia() {
    const link = document.createElement("a");
    link.href = media.src;
    link.download = buildDownloadFilename(content.title, media.extension);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download da mídia iniciado",
      description: `${media.label} — ${FORMAT_LABELS[content.format]}`,
      variant: "success",
    });
  }

  function handleMarkPublished() {
    moveContent(content.id, "PUBLICADO");
    toast({
      title: "Conteúdo marcado como Publicado!",
      description: `"${content.title}" foi registrado como publicado.`,
      variant: "success",
    });
  }

  return (
    <Card className="border-primary/40">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary/15 text-primary-text">
            <Sparkles className="size-4" />
          </div>
          <div className="flex flex-col">
            <CardTitle>Central de Despacho (1-Clique)</CardTitle>
            <span className="text-xs text-muted-foreground">
              Baixe a mídia, copie a legenda formatada e publique em segundos no {platformLabel}.
            </span>
          </div>
        </div>
        <Badge variant="outline">
          {FORMAT_LABELS[content.format]} · {media.kind === "video" ? "Vídeo MP4" : "Imagem PNG"}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <Button variant="secondary" onClick={handleDownloadMedia} className="justify-start">
            <Download className="size-4 shrink-0 text-primary-text" />
            <span className="truncate">
              1. Baixar {media.kind === "video" ? "Vídeo" : "Imagem"}
            </span>
          </Button>

          <Button variant="secondary" onClick={handleCopyCaption} className="justify-start">
            {copied ? (
              <Check className="size-4 shrink-0 text-success" />
            ) : (
              <Copy className="size-4 shrink-0 text-primary-text" />
            )}
            <span className="truncate">
              {copied ? "Copiado!" : "2. Copiar Legenda & Tags"}
            </span>
          </Button>

          <Button asChild variant="primary" className="justify-start">
            <a href={studio.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4 shrink-0" />
              <span className="truncate">3. Abrir {studio.studioName}</span>
            </a>
          </Button>
        </div>

        {formattedText && (
          <div className="flex flex-col gap-1.5 rounded-md border border-border bg-surface-elevated p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Prévia do texto formatado para colar
              </span>
              <button
                type="button"
                onClick={handleCopyCaption}
                className="text-xs font-medium text-primary-text hover:underline"
              >
                {copied ? "Copiado" : "Copiar texto"}
              </button>
            </div>
            <p className="max-h-32 overflow-y-auto whitespace-pre-line text-xs text-foreground">
              {formattedText}
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          {content.status === "PUBLICADO" ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success">
              <CheckCircle2 className="size-4" /> Publicação concluída e registrada no histórico
            </span>
          ) : (
            <>
              <span className="text-xs text-muted-foreground">
                Já finalizou a postagem na rede social?
              </span>
              <Button size="sm" variant="outline" onClick={handleMarkPublished}>
                <CheckCircle2 className="size-3.5 text-success" /> Marcar como Publicado
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
