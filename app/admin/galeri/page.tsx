import AdminGalleryManager from '@/components/AdminGalleryManager';
import { requireAdminSession } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabaseClient';

export default async function AdminGaleriPage() {
  await requireAdminSession();
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });

  return <AdminGalleryManager initialItems={data ?? []} />;
}
