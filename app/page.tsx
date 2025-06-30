'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // correct place
import WelcomeBanner from '../components/WelcomeBanner';
import PostFeed from '../components/PostFeed';

const TABS = ['Prompts', 'Code', 'Theory'];

export default function Home() {
  const [tab, setTab] = useState('Prompts');

  return (
    <div>
      <WelcomeBanner />
      <div className="flex gap-4 mt-4 mb-6">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1 rounded ${tab === t ? 'bg-blue-500 text-white' : 'bg-white border'}`}
          >{t}</button>
        ))}
      </div>
      <PostFeed category={tab} />
      <PostFAB />
    </div>
  );
}

// Make sure PostFAB is **not** nested inside Home
function PostFAB() {
  // Replace with your auth logic
  const user = true; // Mock, replace with actual user
  const router = useRouter();

  if (!user) return null;

  return (
    <button
      className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg text-3xl"
      title="Post"
      onClick={() => router.push('/post/new')}
    >+</button>
  );
}
