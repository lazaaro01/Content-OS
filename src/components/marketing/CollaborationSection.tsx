"use client";

import { motion } from "framer-motion";
import { Target, ListTodo, SquareDot, Check } from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";

const STEPS = [
  { icon: Target, label: "Social Media" },
  { icon: ListTodo, label: "Conteúdo" },
  { icon: SquareDot, label: "Cliente" },
  { icon: Check, label: "Aprovação" },
];

export function CollaborationSection() {
  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-12">
        <Reveal className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Colaboração sem fricção entre equipe e cliente.
          </h2>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="flex w-full max-w-[26rem] flex-col items-center"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="flex w-full flex-col items-center"
            >
              <div className="flex w-full items-center gap-4 rounded-full border-[1.5px] border-primary/60 bg-surface/80 p-2.5 pr-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/20 text-primary-text">
                  <step.icon className="size-5" />
                </span>
                <span className="text-base font-semibold text-foreground">{step.label}</span>
              </div>
              {i < STEPS.length - 1 && <span className="h-5 w-0.5 bg-primary/60" />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
