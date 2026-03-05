import Link from 'next/link';

const menus = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/berita', label: 'Kelola Berita' },
  { href: '/admin/galeri', label: 'Kelola Galeri' },
  { href: '/admin/profil', label: 'Profil Sekolah' }
];

export default function AdminSidebar() {
  return (
    <aside className="hidden w-64 border-r border-white/10 bg-slate-900/70 p-6 md:block">
      <h2 className="mb-6 text-lg font-semibold text-teal-300">Admin Panel</h2>
      <ul className="space-y-2">
        {menus.map((menu) => (
          <li key={menu.href}>
            <Link href={menu.href} className="block rounded-lg px-3 py-2 text-sm transition hover:bg-white/10">
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
