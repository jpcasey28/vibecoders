'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

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
            <button onClick={() => supabase.auth.signOut()}>Sign out</button>
          </>
        ) : (
          <Link href="/signin" className="px-4 py-2 bg-blue-500 rounded text-white">Sign in</Link>
        )}
      </div>
    </nav>
  );
}
