import Link from "next/link";
import HeaderButton from "./HeaderButton";

export default function Header() {
  return (
    <header className="w-full bg-[#09090B] border-b border-[#27272A]">
      <nav className="max-w-7xl mx-auto px-8 h-[86px] flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="flex items-center">
        <img
            src="/Nexora-logo-white.png"
            alt="AI University Logo"
            className="h-[160px] w-[160px] object-contain"
         />
</a>
        {/* Menu */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-300">
          <Link href="#features" className="hover:text-white transition">
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-white transition">
            How It Works
          </Link>
          <Link href="#courses" className="hover:text-white transition">
            Courses
          </Link>
          <Link href="#institutions" className="hover:text-white transition">
            For Institutions
          </Link>
          <Link href="#pricing" className="hover:text-white transition">
            Pricing
          </Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition"
          >
            Log in
          </Link>

          <HeaderButton href="#waitlist">
              Join Waitlist
          </HeaderButton>
        </div>
      </nav>
    </header>
  );
}