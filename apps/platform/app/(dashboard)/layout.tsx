import { NavbarPlaceholder } from "@/components/layout/navbar-placeholder";
import { SidebarPlaceholder } from "@/components/layout/sidebar-placeholder";
import type { ReactNode } from "react";

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <SidebarPlaceholder />
      <div>
        <NavbarPlaceholder />
        <main>{children}</main>
      </div>
    </div>
  );
}
