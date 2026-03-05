import { notFound } from 'next/navigation';
import Image from 'next/image';
import { createServerSupabaseClient } from '@/lib/supabaseClient';

export default async function DetailBeritaPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from('news').select('*').eq('slug', params.slug).maybeSingle();

  if (!data) notFound();

  return (
    <article className="card-surface p-6">
      <p className="mb-2 text-sm text-slate-400">{new Date(data.published_at).toLocaleDateString('id-ID')}</p>
      <h1 className="mb-6 text-3xl font-bold">{data.title}</h1>
      {data.image_url ? (
        <div className="relative mb-6 h-80 overflow-hidden rounded-2xl">
          <Image src={data.image_url} alt={data.title} fill className="object-cover" />
        </div>
      ) : null}
      <div className="prose prose-invert max-w-none whitespace-pre-line">{data.content}</div>
    </article>
  );
}
