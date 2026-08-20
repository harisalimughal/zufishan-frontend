type HeaderButtonProps = {
  children: React.ReactNode;
  href: string;
};

export default function HeaderButton({
  children,
  href,
}: HeaderButtonProps) {
  return (
    <a
      href={href}
      className="px-6 py-3 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-90 transition"
    >
      {children}
    </a>
  );
}