"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Sparkles, Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  React.useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary text-white shadow-elevated animate-pulse">
            <Sparkles className="size-5" />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" />
            <span>Carregando Content OS...</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
