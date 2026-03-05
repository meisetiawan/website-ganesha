'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';

export default function AdminLoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    const { error } = await supabase.auth.signInWithPassword({
      email: String(formData.get('email')),
      password: String(formData.get('password'))
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-md card-surface p-6">
      <h1 className="mb-4 text-2xl font-bold">Login Admin</h1>
      <form onSubmit={handleLogin} className="space-y-3">
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-lg bg-white/10 p-3 outline-none focus:ring-2 focus:ring-teal-300" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded-lg bg-white/10 p-3 outline-none focus:ring-2 focus:ring-teal-300" />
        <button className="w-full rounded-lg bg-teal-400 py-3 font-semibold text-slate-900">Masuk</button>
      </form>
      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
