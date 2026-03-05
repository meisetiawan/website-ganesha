import GalleryPageClient from '@/components/GalleryPageClient';
import { createServerSupabaseClient } from '@/lib/supabaseClient';

export default async function GaleriPage() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });

  return <GalleryPageClient items={data ?? []} />;
}
