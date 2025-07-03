
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function PostFAB() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (!user) return null;

  return (
    <button
      className="fixed bottom-8 right-8 bg-primary hover:bg-primary-focus text-white rounded-full p-4 shadow-lg text-3xl transition-colors"
      title="Post"
      onClick={() => router.push('/prompt-logs/new')}
    >+</button>
  );
}
