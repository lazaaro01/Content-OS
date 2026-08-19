"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-sm bg-primary text-white">
          <Sparkles className="size-4" />
        </div>
        <span className="text-sm font-semibold text-foreground">Content OS</span>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard">Entrar</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard">Começar gratuitamente</Link>
        </Button>
      </div>
    </header>
  );
}
