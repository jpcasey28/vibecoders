'use client';

import { useState } from 'react';
import WelcomeBanner from '../components/WelcomeBanner';
import PostFeed from '../components/PostFeed';
import PostFAB from '../components/PostFAB';

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
