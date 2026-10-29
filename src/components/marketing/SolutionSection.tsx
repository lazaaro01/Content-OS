"use client";

import { Layers, CalendarDays, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";
import { Card } from "@/components/ui/Card";

const FEATURES = [
  {
    icon: Layers,
    title: "Tudo em um lugar",
    description: "Clientes, campanhas, conteúdos e aprovações centralizados em um único fluxo.",
  },
  {
    icon: CalendarDays,
    title: "Calendário visual",
    description: "Veja o que vem por aí, arraste conteúdos entre datas e mude de mês, semana ou dia.",
  },
  {
    icon: CheckCircle2,
    title: "Aprovação simples",
    description: "Envie para o cliente, receba comentários e aprove sem sair da plataforma.",
  },
];

export function SolutionSection() {
  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            O Content OS centraliza toda a sua operação de conteúdo.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.1}>
              <Card className="flex h-full flex-col gap-4 rounded-3xl bg-surface/80 p-7">
                <div className="flex size-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 text-primary-text">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
