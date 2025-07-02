'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

type Comment = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  // You might want to join with user table to get username/avatar
};

interface CommentSectionProps {
  post_id: string;
  post_type: 'project' | 'prompt_log';
}

export default function CommentSection({ post_id, post_type }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    fetchComments();
  }, [post_id]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?post_id=${post_id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to fetch comments.');
      }
    } catch (e) {
      setError('An unexpected error occurred while fetching comments.');
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError('You must be logged in to comment.');
      return;
    }
    if (!newComment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          post_type,
          post_id,
          content: newComment,
        }),
      });

      if (response.ok) {
        setNewComment('');
        fetchComments(); // Refresh comments
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to post comment.');
      }
    } catch (e) {
      setError('An unexpected error occurred while posting comment.');
    }
  };

  return (
    <div className="mt-8 p-4 bg-foreground rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-text-primary mb-4">Comments</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <p className="text-text-secondary">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-background p-3 rounded-md border border-border">
              <p className="text-text-primary">{comment.content}</p>
              <p className="text-text-secondary text-sm mt-1">By User {comment.user_id.substring(0, 8)}... on {new Date(comment.created_at).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>

      {user ? (
        <form onSubmit={handleSubmitComment} className="flex flex-col gap-3">
          <textarea
            className="w-full p-3 rounded-md bg-background border border-border text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            rows={3}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="self-end px-5 py-2 bg-primary hover:bg-primary-focus text-white rounded-md transition-colors"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="text-text-secondary">Please log in to leave a comment.</p>
      )}
    </div>
  );
}