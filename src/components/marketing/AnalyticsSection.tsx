"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/marketing/Reveal";

const BARS = [40, 65, 50, 80, 60, 90, 70];

export function AnalyticsSection() {
  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
        <Reveal delay={0.1} className="order-2 md:order-1">
          <div className="rounded-3xl border border-primary/50 bg-surface/80 p-8 shadow-(--shadow-elevated)">
            <div className="flex h-40 items-end justify-between gap-3 border-b border-border pb-5">
              {BARS.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-lg bg-(image:--gradient-brand-vertical)"
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Conteúdos publicados por semana</span>
              <span>últimas 7 semanas</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="order-1 md:order-2">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-semibold text-foreground">
            <span className="size-2 rounded-full bg-status-production" />
            Em breve
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Analytics para entender o que está funcionando.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Uma visão futura do produto: acompanhar volume de produção, ritmo de aprovação e
            performance por cliente — direto no Content OS.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
