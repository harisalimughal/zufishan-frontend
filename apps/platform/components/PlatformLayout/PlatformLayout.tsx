"use client";

import { Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type PlatformLayoutProps = {
  children: ReactNode;
};

export function PlatformLayout({ children }: PlatformLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FFFFFF]">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-56 border-r border-[#27272A] bg-black transition-all duration-200 lg:sticky lg:top-0 lg:block lg:h-screen lg:translate-x-0 ${
            collapsed ? "lg:w-20 py-3" : "py-6"
          } ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar collapsed={collapsed} onNavigate={() => setIsOpen(false)} />

          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`hidden lg:flex absolute -right-3 z-50 h-6 w-6 items-center justify-center rounded-full border border-[#27272A] bg-black text-slate-300 hover:bg-[#1F2937] hover:text-white transition-colors ${
              collapsed ? "top-6" : "top-20"
            }`}
          >
            {collapsed ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
          </button>
        </aside>

        {isOpen ? (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-[#27272A] bg-black px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                aria-label="Open sidebar"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#27272A] bg-black text-slate-200 lg:hidden"
                onClick={() => setIsOpen(true)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <div className="flex-1">
                <Topbar />
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
