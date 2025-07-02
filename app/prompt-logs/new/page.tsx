'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPromptLog() {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [lesson, setLesson] = useState('');
  const [tools, setTools] = useState('');
  const [category, setCategory] = useState('Prompts');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await fetch('/api/prompt-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        prompt,
        output,
        lesson,
        tools: tools.split(',').map(t => t.trim()),
        category,
      }),
    });

    if (response.ok) {
      router.push('/');
      router.refresh();
    } else {
      const data = await response.json();
      setError(data.error || 'Something went wrong.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Prompt Log</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>Prompts</option>
            <option>Code</option>
            <option>Theory</option>
          </select>
        </div>

        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300">Prompt</label>
          <textarea
            id="prompt"
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="output" className="block text-sm font-medium text-gray-300">Output</label>
          <textarea
            id="output"
            rows={5}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="lesson" className="block text-sm font-medium text-gray-300">Lesson</label>
          <textarea
            id="lesson"
            rows={3}
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="tools" className="block text-sm font-medium text-gray-300">Tools (comma-separated)</label>
          <input
            id="tools"
            type="text"
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}