import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="absolute left-0 right-0 top-0 z-50 bg-transparent">
      <nav className="mx-auto flex max-w-[1440px] items-start justify-between px-8 pt-8 sm:px-12 lg:px-[7vw]">
        <Link href="/" className="text-lg font-semibold tracking-tight text-[#0f172a]">
          Aaron Yang
        </Link>
        <div className="flex gap-x-8 pt-1 text-sm text-[#334155]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-1 transition after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#8a6f52] after:transition-transform hover:text-[#0f172a] hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
