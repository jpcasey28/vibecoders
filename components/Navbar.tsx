'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-foreground border-b border-border">
      <div>
        <Link href="/" className="font-bold text-xl text-text-primary">VibeCoders</Link>
      </div>
      <div className="flex gap-4 items-center text-text-secondary">
        <Link href="/about" className="hover:text-text-primary transition-colors">About</Link>
        {user ? (
          <>
            <Link href="/profile" className="hover:text-text-primary transition-colors">Profile</Link>
            <button onClick={handleSignOut} className="hover:text-text-primary transition-colors">Sign out</button>
          </>
        ) : (
          <>
            <Link href="/signin" className="px-4 py-2 bg-primary hover:bg-primary-focus rounded text-white transition-colors">Sign in</Link>
            <Link href="/signup" className="hover:text-text-primary transition-colors">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
