import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="border-b border-ink/10 bg-paper/95">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="text-base font-semibold text-ink">
          Aaron Young
        </Link>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/70">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
