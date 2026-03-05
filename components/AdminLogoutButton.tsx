'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';

export default function AdminLogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button onClick={logout} className="rounded-lg border border-white/20 px-3 py-2 text-sm transition hover:bg-white/10">
      Logout
    </button>
  );
}
