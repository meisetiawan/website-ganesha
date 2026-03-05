import AdminNewsManager from '@/components/AdminNewsManager';
import { requireAdminSession } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabaseClient';

export default async function AdminBeritaPage() {
  await requireAdminSession();
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });

  return <AdminNewsManager initialNews={data ?? []} />;
}
