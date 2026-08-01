"use client";

import Link from "next/link";
import { useTheme } from "../../lib/theme/ThemeContext";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkColumnProps {
  title: string;
  links: FooterLink[];
}

export function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex flex-col space-y-4 text-left">
      <h4 className={`text-xs font-extrabold uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? "text-gray-200" : "text-zinc-800"}`}>
        {title}
      </h4>
      <ul className="flex flex-col space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={`inline-block text-sm hover:text-[#3B82F6] hover:translate-x-1.5 transition-all duration-300 ease-out ${
                isDarkMode ? "text-gray-400" : "text-zinc-600"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
