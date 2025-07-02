'use client';

import Link from 'next/link';

type Post = {
  id: string;
  title: string;
  prompt?: string;
  lesson?: string;
  created_at: string;
  // Add user data if you join tables
};

export default function PromptLogCard({ post }: { post: Post }) {
  return (
    <div className="bg-foreground border border-border rounded-lg p-4 shadow-md hover:border-primary transition">
        <Link href={`/prompt-logs/${post.id}`} className="block">
            <h3 className="text-xl font-bold text-text-primary hover:underline">{post.title}</h3>
        </Link>
        <p className="text-text-secondary text-sm mt-1">Posted on {new Date(post.created_at).toLocaleDateString()}</p>
        
        {post.prompt && (
            <div className="mt-4">
                <p className="text-text-primary font-semibold">Prompt:</p>
                <p className="bg-background p-2 rounded mt-1 font-mono text-sm text-text-secondary whitespace-pre-wrap">{post.prompt.substring(0, 200)}{post.prompt.length > 200 && '...'}</p>
            </div>
        )}

        {post.lesson && (
            <div className="mt-4">
                <p className="text-text-primary font-semibold">Lesson:</p>
                <p className="text-text-secondary mt-1">{post.lesson}</p>
            </div>
        )}
    </div>
  );
}