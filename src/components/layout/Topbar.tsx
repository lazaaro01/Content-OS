"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/Dropdown";
import { useSettingsStore } from "@/store/settings-store";
import { getInitials } from "@/lib/utils/text";

export function Topbar() {
  const settings = useSettingsStore((s) => s.settings);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <MobileNav />

      <div className="flex-1" />

      <Button asChild size="sm" variant="secondary" className="hidden sm:inline-flex">
        <Link href="/content?create=1">
          <Plus className="size-4" />
          Novo conteúdo
        </Link>
      </Button>

      <Dropdown>
        <DropdownTrigger asChild>
          <button className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
            <Avatar
              initials={getInitials(settings.profileName)}
              size="sm"
              color="#5B4BFF"
            />
          </button>
        </DropdownTrigger>
        <DropdownContent align="end">
          <DropdownLabel>{settings.profileName}</DropdownLabel>
          <DropdownSeparator />
          <DropdownItem asChild>
            <Link href="/settings">Configurações</Link>
          </DropdownItem>
          <DropdownItem asChild>
            <Link href="/">Ver landing page</Link>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </header>
  );
}
