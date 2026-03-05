import AdminProfileManager from '@/components/AdminProfileManager';
import { requireAdminSession } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabaseClient';

export default async function AdminProfilPage() {
  await requireAdminSession();
  const supabase = createServerSupabaseClient();

  const [{ data: profile }, { data: teachers }] = await Promise.all([
    supabase.from('profiles').select('*').limit(1).maybeSingle(),
    supabase.from('teachers').select('*').order('created_at', { ascending: false })
  ]);

  return <AdminProfileManager initialProfile={profile} initialTeachers={teachers ?? []} />;
}
