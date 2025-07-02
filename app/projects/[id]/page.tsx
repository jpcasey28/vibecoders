import { createClient } from '@/lib/supabase/server';
import CommentSection from '@/components/CommentSection';

interface ProjectDetailPageProps {
  params: { id: string };
}

export default async function ProjectDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = await paramsPromise;
  const { id } = params;
  const supabase = createClient();

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    return <div className="text-center text-red-500 py-8">Error loading project.</div>;
  }

  if (!project) {
    return <div className="text-center text-text-secondary py-8">Project not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold text-text-primary mb-4">{project.title}</h1>
      <p className="text-text-secondary text-sm mb-6">Posted on {new Date(project.created_at).toLocaleDateString()}</p>

      {project.description && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Description:</h2>
          <p className="text-text-secondary">{project.description}</p>
        </div>
      )}

      {project.github_url && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">GitHub:</h2>
          <a 
            href={project.github_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {project.github_url}
          </a>
        </div>
      )}

      {project.tags && project.tags.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Tags:</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span key={tag} className="bg-secondary/20 text-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      )}

      <CommentSection post_id={project.id} post_type="project" />
    </div>
  );
}