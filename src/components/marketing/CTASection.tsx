"use client";

import Link from "next/link";
import { Reveal } from "@/components/marketing/Reveal";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="border-t border-border px-6 py-28">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pare de gerenciar conteúdo em ferramentas diferentes.
        </h2>
        <Button asChild variant="brand" size="lg" className="h-[52px] rounded-xl px-9">
          <Link href="/register">Começar gratuitamente</Link>
        </Button>
      </Reveal>
    </section>
  );
}
