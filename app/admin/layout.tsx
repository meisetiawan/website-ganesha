import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="card-surface min-h-[75vh] overflow-hidden p-0 md:flex">
      <AdminSidebar />
      <section className="flex-1 p-6">{children}</section>
    </div>
  );
}
