"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Menu,
  X,
  LayoutDashboard,
  Calendar,
  FileText,
  Megaphone,
  Users,
  CheckSquare,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/content", label: "Content", icon: FileText },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/approvals", label: "Approvals", icon: CheckSquare },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    // Close the drawer whenever the route changes (link click, back/forward nav).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          className="flex size-9 items-center justify-center rounded-sm text-foreground hover:bg-surface-elevated md:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="size-5" />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="radix-fade fixed inset-0 z-50 bg-black/70 md:hidden" />
        <DialogPrimitive.Content className="radix-slide-left fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface p-3 outline-none md:hidden">
          <div className="flex h-11 items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-sm bg-primary text-white">
                <Sparkles className="size-4" />
              </div>
              <DialogPrimitive.Title className="text-sm font-semibold text-foreground">
                Content OS
              </DialogPrimitive.Title>
            </div>
            <DialogPrimitive.Close className="flex size-7 items-center justify-center rounded-xs text-muted-foreground hover:bg-surface-elevated hover:text-foreground">
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>
          <nav className="mt-2 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
