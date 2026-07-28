import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkColumnProps {
  title: string;
  links: FooterLink[];
}

export function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div className="flex flex-col space-y-4 text-left">
      <h4 className="text-xs font-extrabold text-gray-200 uppercase tracking-widest">
        {title}
      </h4>
      <ul className="flex flex-col space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="inline-block text-sm text-gray-400 hover:text-[#3B82F6] hover:translate-x-1.5 transition-all duration-300 ease-out"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
