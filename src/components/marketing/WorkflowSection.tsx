"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/marketing/Reveal";
import { STATUS_CONFIG, STATUS_ORDER } from "@/lib/constants/status";

export function WorkflowSection() {
  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto flex max-w-[80rem] flex-col gap-14">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Do primeiro rascunho até a publicação.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Um fluxo claro que sua equipe já entende: ideia, roteiro, produção, edição, aprovação,
            agendamento e publicação.
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="flex flex-wrap items-center justify-center gap-y-4"
        >
          {STATUS_ORDER.map((status, i) => {
            const config = STATUS_CONFIG[status];
            return (
              <motion.div
                key={status}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="flex items-center"
              >
                <div
                  className="rounded-full border-2 px-7 py-3.5 text-base font-semibold"
                  style={{
                    color: config.color,
                    borderColor: "color-mix(in srgb, " + config.color + " 70%, transparent)",
                    background: "color-mix(in srgb, " + config.color + " 8%, transparent)",
                  }}
                >
                  {config.label}
                </div>
                {i < STATUS_ORDER.length - 1 && (
                  <ArrowRight className="mx-3 size-5 text-muted-foreground/60" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
