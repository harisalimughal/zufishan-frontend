import { PlatformLayout } from "../../components/PlatformLayout";
import type { ReactNode } from "react";

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <PlatformLayout>{children}</PlatformLayout>;
}