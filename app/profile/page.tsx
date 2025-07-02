'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import PromptLogCard from '@/components/PromptLogCard';
import ProjectCard from '@/components/ProjectCard';

type Post = {
  id: string;
  title: string;
  created_at: string;
  description?: string;
  github_url?: string;
  prompt?: string;
  lesson?: string;
  tags?: string[];
  category?: string; // To differentiate between prompt_log and project
};

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUserDataAndPosts() {
      setLoading(true);
      setError(null);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          // Fetch PromptLogs by user_id
          const { data: promptLogs, error: promptLogsError } = await supabase
            .from('prompt_logs')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (promptLogsError) throw promptLogsError;

          // Fetch Projects by user_id
          const { data: projects, error: projectsError } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (projectsError) throw projectsError;

          const allPosts: Post[] = [
            ...(promptLogs || []).map(p => ({ ...p, category: 'prompt_log' })),
            ...(projects || []).map(p => ({ ...p, category: 'project' })),
          ];

          // Sort all posts by created_at descending
          allPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

          setUserPosts(allPosts);
        }
      } catch (err: any) {
        console.error('Error fetching user data or posts:', err);
        setError(err.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    }

    fetchUserDataAndPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-text-secondary py-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-center text-text-secondary py-8">Please sign in to view your profile.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <div className="bg-foreground rounded-lg p-6 mb-8 shadow-md">
        <h1 className="text-3xl font-bold text-text-primary mb-2">{user.email}</h1>
        <p className="text-text-secondary">Member since: {new Date(user.created_at).toLocaleDateString()}</p>
        {/* Add more profile details here if you have a 'profiles' table */}
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-4">Your Posts</h2>
      <div className="flex flex-col gap-4">
        {userPosts.length === 0 ? (
          <p className="text-text-secondary">You haven't created any posts yet.</p>
        ) : (
          userPosts.map((post) => (
            post.category === 'prompt_log' ? (
              <PromptLogCard key={post.id} post={post} />
            ) : (
              <ProjectCard key={post.id} post={post} />
            )
          ))
        )}
      </div>
    </div>
  );
}