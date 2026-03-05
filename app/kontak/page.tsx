export default function KontakPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Kontak Sekolah</h1>
      <section className="card-surface grid gap-6 p-6 md:grid-cols-2">
        <div className="space-y-3 text-slate-300">
          <p><span className="font-semibold text-white">Alamat:</span> Jl. Pendidikan No. 10, Jakarta</p>
          <p><span className="font-semibold text-white">Telepon:</span> (021) 555-1234</p>
          <p><span className="font-semibold text-white">Email:</span> info@smaganesha.sch.id</p>
        </div>
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps?q=Monas%20Jakarta&output=embed"
          className="h-80 w-full rounded-xl border-0"
          loading="lazy"
        />
      </section>
    </div>
  );
}
