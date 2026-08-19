import { Sparkles } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-xs bg-primary text-white">
            <Sparkles className="size-3.5" />
          </div>
          Content OS
        </div>
        <span>Feito para times de conteúdo que querem organizar tudo em um só lugar.</span>
      </div>
    </footer>
  );
}
