"use client";

import { Reveal } from "@/components/marketing/Reveal";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

/** Dia do mês (1–35) → cor do card de conteúdo naquele dia. */
const CHIPS: Record<number, string> = {
  3: "bg-danger",
  6: "bg-warning",
  10: "bg-danger",
  13: "bg-danger",
  14: "bg-status-production",
  17: "bg-warning",
  20: "bg-danger",
  23: "bg-success",
  27: "bg-danger",
  30: "bg-success",
};

export function CalendarShowcase() {
  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Um calendário editorial que dá vontade de usar.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Visualize por mês, semana ou dia. Arraste e solte para reorganizar sua agenda de
            publicações.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-3xl border border-border bg-surface/80 shadow-(--shadow-elevated)">
            <div className="grid grid-cols-7">
              {WEEKDAYS.map((d) => (
                <div key={d} className="px-2 pb-2 pt-4 text-center text-sm font-semibold text-foreground">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i + 1;
                const chip = CHIPS[day];
                return (
                  <div
                    key={day}
                    className="flex h-16 flex-col gap-1 border-r border-t border-border p-2 sm:h-[104px] [&:nth-child(7n)]:border-r-0"
                  >
                    <span className="text-xs text-muted-foreground">{day}</span>
                    {chip && <div className={`mx-auto mt-auto h-4 w-4/5 rounded-lg sm:h-8 ${chip}`} />}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
