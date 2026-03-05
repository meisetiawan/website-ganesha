import { requireAdminSession } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabaseClient';
import AdminLogoutButton from '@/components/AdminLogoutButton';

export default async function DashboardPage() {
  await requireAdminSession();
  const supabase = createServerSupabaseClient();
  const [{ count: news }, { count: gallery }, { count: teachers }] = await Promise.all([
    supabase.from('news').select('*', { count: 'exact', head: true }),
    supabase.from('gallery').select('*', { count: 'exact', head: true }),
    supabase.from('teachers').select('*', { count: 'exact', head: true })
  ]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Admin</h1>
        <AdminLogoutButton />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card-surface p-5"><p className="text-sm text-slate-400">Total Berita</p><p className="text-3xl font-bold">{news || 0}</p></div>
        <div className="card-surface p-5"><p className="text-sm text-slate-400">Total Galeri</p><p className="text-3xl font-bold">{gallery || 0}</p></div>
        <div className="card-surface p-5"><p className="text-sm text-slate-400">Total Guru</p><p className="text-3xl font-bold">{teachers || 0}</p></div>
      </div>
    </div>
  );
}
