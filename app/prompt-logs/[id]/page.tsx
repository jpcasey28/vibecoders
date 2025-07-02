import { createClient } from '@/lib/supabase/server';
import CommentSection from '@/components/CommentSection';

interface PromptLogDetailPageProps {
  params: { id: string };
}

export default async function PromptLogDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  const { id } = params;
  const supabase = createClient();

  const { data: post, error } = await supabase
    .from('prompt_logs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching prompt log:', error);
    return <div className="text-center text-red-500 py-8">Error loading prompt log.</div>;
  }

  if (!post) {
    return <div className="text-center text-text-secondary py-8">Prompt log not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold text-text-primary mb-4">{post.title}</h1>
      <p className="text-text-secondary text-sm mb-6">Posted on {new Date(post.created_at).toLocaleDateString()}</p>

      {post.prompt && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Prompt:</h2>
          <pre className="bg-background p-4 rounded-md text-text-secondary whitespace-pre-wrap overflow-x-auto">{post.prompt}</pre>
        </div>
      )}

      {post.output && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Output:</h2>
          <pre className="bg-background p-4 rounded-md text-text-secondary whitespace-pre-wrap overflow-x-auto">{post.output}</pre>
        </div>
      )}

      {post.lesson && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Lesson:</h2>
          <p className="text-text-secondary">{post.lesson}</p>
        </div>
      )}

      {post.tools && post.tools.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Tools:</h2>
          <div className="flex flex-wrap gap-2">
            {post.tools.map((tool: string) => (
              <span key={tool} className="bg-primary/20 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">{tool}</span>
            ))}
          </div>
        </div>
      )}

      <CommentSection post_id={post.id} post_type="prompt_log" />
    </div>
  );
}