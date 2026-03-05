import NewsCard from '@/components/NewsCard';
import { createServerSupabaseClient } from '@/lib/supabaseClient';

export default async function BeritaPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page || 1);
  const pageSize = 7;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = createServerSupabaseClient();
  const { data: news, count } = await supabase
    .from('news')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(from, to);

  const headline = news?.[0];
  const rest = news?.slice(1) ?? [];
  const totalPages = Math.max(1, Math.ceil((count || 0) / pageSize));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Berita Sekolah</h1>
      {headline ? (
        <div className="card-surface p-6">
          <p className="mb-2 text-xs text-slate-400">Headline</p>
          <NewsCard item={headline} />
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-3">
        {rest.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const p = idx + 1;
          return (
            <a key={p} href={`/berita?page=${p}`} className={`rounded-lg px-3 py-1.5 text-sm ${p === page ? 'bg-teal-400 text-slate-900' : 'bg-white/10'}`}>
              {p}
            </a>
          );
        })}
      </div>
    </div>
  );
}
