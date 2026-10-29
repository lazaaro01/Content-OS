"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
      >
        <motion.span variants={item} className="text-sm font-semibold text-muted-foreground">
          Content Operations para times de conteúdo
        </motion.span>
        <motion.h1
          variants={item}
          className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl"
        >
          Seu conteúdo. Organizado do início ao fim.
        </motion.h1>
        <motion.p variants={item} className="max-w-xl text-balance text-lg text-muted-foreground">
          Planeje, produza e aprove seus conteúdos em um único lugar.
        </motion.p>
        <motion.div variants={item} className="pt-2">
          <Button asChild variant="brand" size="lg" className="h-[52px] rounded-xl px-9">
            <Link href="/register">Começar gratuitamente</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-16 max-w-[60rem]"
      >
        <DashboardPreview />
      </motion.div>
    </section>
  );
}

const STATS = [
  { label: "Em produção", value: 12, dot: "bg-success" },
  { label: "Aprovação", value: 4, dot: "bg-warning" },
  { label: "Agendados", value: 8, dot: "bg-status-script" },
  { label: "Publicados", value: 24, dot: "bg-status-production" },
];

const COLUMNS = [
  { label: "Ideia", block: "bg-success/80" },
  { label: "Roteiro", block: "bg-success/80" },
  { label: "Produção", block: "bg-success/80" },
  { label: "Edição", block: "bg-status-script/80" },
  { label: "Aprovação", block: "bg-danger/80" },
];

function DashboardPreview() {
  return (
    <div className="rounded-3xl border border-border bg-surface/80 p-5 shadow-(--shadow-elevated) backdrop-blur-sm sm:p-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="relative rounded-2xl border border-border bg-background/40 px-4 py-3"
          >
            <span className={`absolute right-4 top-4 size-2.5 rounded-full ${s.dot}`} />
            <p className="text-2xl font-semibold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {COLUMNS.map((c) => (
          <div key={c.label} className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-muted-foreground">{c.label}</span>
            <div className={`h-24 rounded-xl ${c.block}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
