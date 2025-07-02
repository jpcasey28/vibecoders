
'use client';

import { useRouter } from 'next/navigation';

export default function PostFAB() {
  // Replace with your auth logic
  const user = true; // Mock, replace with actual user
  const router = useRouter();

  if (!user) return null;

  return (
    <button
      className="fixed bottom-8 right-8 bg-primary hover:bg-primary-focus text-white rounded-full p-4 shadow-lg text-3xl transition-colors"
      title="Post"
      onClick={() => router.push('/prompt-logs/new')}
    >+</button>
  );
}
