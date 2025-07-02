'use client';

import Link from 'next/link';

type Post = {
  id: string;
  title: string;
  description?: string;
  github_url?: string;
  tags?: string[];
  created_at: string;
};

export default function ProjectCard({ post }: { post: Post }) {
  return (
    <div className="bg-foreground border border-border rounded-lg p-4 shadow-md hover:border-secondary transition">
        <div className="flex justify-between items-start">
            <Link href={`/projects/${post.id}`} className="block">
                <h3 className="text-xl font-bold text-text-primary hover:underline">{post.title}</h3>
            </Link>
            {post.github_url && (
                <a 
                    href={post.github_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm bg-background hover:bg-border text-text-secondary font-bold py-1 px-3 rounded-full transition-colors"
                >
                    GitHub
                </a>
            )}
        </div>
        <p className="text-text-secondary text-sm mt-1">Posted on {new Date(post.created_at).toLocaleDateString()}</p>
        
        {post.description && (
            <p className="text-text-primary mt-3">{post.description}</p>
        )}

        {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                    <span key={tag} className="bg-secondary/20 text-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                ))}
            </div>
        )}
    </div>
  );
}