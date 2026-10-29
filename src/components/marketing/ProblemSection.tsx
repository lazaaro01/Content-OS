"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/marketing/Reveal";
import { MARKETING_TOOLS } from "@/lib/constants/marketing-tools";

export function ProblemSection() {
  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <Reveal>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Seu conteúdo não deveria estar espalhado em seis ferramentas diferentes.
          </h2>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {MARKETING_TOOLS.map((tool) => (
            <motion.span
              key={tool.label}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] px-5 py-3 text-base font-semibold text-foreground"
              style={{
                borderColor: `color-mix(in srgb, ${tool.color} 60%, transparent)`,
                background: `color-mix(in srgb, ${tool.color} 8%, transparent)`,
              }}
            >
              <tool.icon className="size-5" style={{ color: tool.color }} />
              {tool.label}
            </motion.span>
          ))}
        </motion.div>

        <Reveal delay={0.1}>
          <p className="text-base text-muted-foreground">
            Isso dificulta saber o que precisa ser produzido, quem é responsável, o que está
            atrasado e o que aguarda aprovação.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
