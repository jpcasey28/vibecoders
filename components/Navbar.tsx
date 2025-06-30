'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <div>
        <Link href="/" className="font-bold text-xl">VibeCoders</Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link href="/about">About</Link>
        {user ? (
          <>
            <Link href="/profile">Profile</Link>
            <button onClick={handleSignOut}>Sign out</button>
          </>
        ) : (
          <>
            <Link href="/signin" className="px-4 py-2 bg-blue-500 rounded text-white">Sign in</Link>
            <Link href="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
