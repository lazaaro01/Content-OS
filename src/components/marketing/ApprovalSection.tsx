"use client";

import { Reveal } from "@/components/marketing/Reveal";
import { Button } from "@/components/ui/Button";

export function ApprovalSection() {
  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
        <Reveal>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Aprovação sem trocar 20 mensagens no WhatsApp.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            O cliente recebe um link, visualiza o conteúdo, comenta o que precisa mudar e aprova com
            um clique. Tudo fica registrado.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col gap-6 rounded-3xl border border-primary/50 bg-surface/80 p-6 shadow-(--shadow-elevated)">
            <div className="flex items-center gap-5">
              <div className="size-20 shrink-0 rounded-2xl bg-warning/90" />
              <div className="flex flex-col gap-2">
                <span className="text-base font-semibold text-foreground">
                  5 erros que fazem seu Instagram perder alcance
                </span>
                <span className="text-sm text-muted-foreground">Aguardando aprovação do cliente</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="brand" size="lg" className="flex-1 rounded-xl" tabIndex={-1}>
                Aprovar
              </Button>
              <Button variant="outline" size="lg" className="flex-1 rounded-xl" tabIndex={-1}>
                Solicitar alteração
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
