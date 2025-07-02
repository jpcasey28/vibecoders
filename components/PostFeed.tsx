'use client';

import ProjectCard from './ProjectCard';
import PromptLogCard from './PromptLogCard';

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

export default function PostFeed({ posts, category }: { posts: Post[], category: string }) {

  if (!posts || !posts.length) return <div className="text-center text-text-secondary py-8">No posts yet.</div>;

  return (
    <div className="flex flex-col gap-4">
      {posts.map(post => {
        if (category === 'Code') {
          // Assuming you have a ProjectCard component
          return <ProjectCard key={post.id} post={post} />;
        } else {
          return <PromptLogCard key={post.id} post={post} />;
        }
      })}
    </div>
  );
}

