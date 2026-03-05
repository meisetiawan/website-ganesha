import Link from 'next/link';

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil' },
  { href: '/berita', label: 'Berita' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/kontak', label: 'Kontak' }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <nav className="container-main flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-wide text-teal-300">SMA Ganesha</Link>
        <ul className="flex items-center gap-2 md:gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/admin/login" className="rounded-lg bg-teal-400/20 px-3 py-2 text-sm text-teal-200 transition hover:bg-teal-400/30">
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
