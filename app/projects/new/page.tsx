'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [github_url, setGithubUrl] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        github_url,
        tags: tags.split(',').map(t => t.trim()),
      }),
    });

    if (response.ok) {
      router.push('/?tab=Code');
      router.refresh();
    } else {
      const data = await response.json();
      setError(data.error || 'Something went wrong.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6 text-text-primary">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text-secondary">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-foreground border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text-secondary">Description</label>
          <textarea
            id="description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-foreground border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          ></textarea>
        </div>

        <div>
          <label htmlFor="github_url" className="block text-sm font-medium text-text-secondary">GitHub URL</label>
          <input
            id="github_url"
            type="url"
            value={github_url}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-foreground border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-text-secondary">Tags (comma-separated)</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-foreground border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}

