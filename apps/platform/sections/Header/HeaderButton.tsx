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
      className="px-6 py-3 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-[#3B82F6] to-[#6D5DFB] hover:opacity-90 transition"
    >
      {children}
    </a>
  );
}