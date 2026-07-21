import { NavbarPlaceholder } from "../../components/layout/navbar-placeholder";
import { SidebarPlaceholder } from "../../components/layout/sidebar-placeholder";
import type { ReactNode } from "react";

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-black">
      <SidebarPlaceholder />
      <div className="flex flex-1 flex-col min-w-0">
        <NavbarPlaceholder />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}