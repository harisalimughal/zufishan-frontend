export function Header() {
  return (
    <header className="bg-white py-6 px-4 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">Header Section</div>
        <nav className="space-x-6 text-slate-700">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
