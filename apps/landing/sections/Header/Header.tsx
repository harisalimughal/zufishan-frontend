import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#09090B] border-b border-[#27272A]">
      <nav className="max-w-7xl mx-auto px-8 h-[86px] flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="flex items-center">
        <img
            src="/Nexora-logo-white-transparent.png"
            alt="AI University Logo"
            className="h-[170px] w-[190px] object-contain"
         />

    <span className="text-white text-2xl font-bold tracking-tight">
    AI University
  </span>
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

          <Link
            href="#waitlist"
            className="px-6 py-3 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-[#3B82F6] to-[#6D5DFB] hover:opacity-90 transition"
          >
            Join Waitlist
          </Link>
        </div>
        
      </nav>
    </header>
  );
}