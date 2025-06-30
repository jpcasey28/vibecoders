'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ProjectCard from './ProjectCard';

type Post = {
  id: string;
  title: string;
  description?: string;
  github_url?: string;
  prompt?: string;
  output?: string;
  created_at: string;
  // Add any other fields your posts have
};

export default function PostFeed({ category }: { category: string }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let table = '';
    if (category === 'Code') table = 'projects';
    else if (category === 'Prompts' || category === 'Theory') table = 'prompt_logs';

    supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => setPosts(data as Post[] || []));
  }, [category]);

  if (!posts.length) return <div>No posts yet.</div>;

  return (
    <div className="flex flex-col gap-4">
      {posts.map(post => (
        <ProjectCard key={post.id} post={post} category={category} />
      ))}
    </div>
  );
}
