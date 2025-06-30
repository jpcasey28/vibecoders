import Link from 'next/link';

export default function ProjectCard({ post, category }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between">
        <span className="text-xs uppercase text-gray-400">{category}</span>
        <span className="text-xs">{new Date(post.created_at).toLocaleDateString()}</span>
      </div>
      <h2 className="font-bold text-lg mt-2 mb-1">{post.title}</h2>
      <p className="mb-2">{post.description || post.prompt || post.theory}</p>
      {post.github_url && (
        <a href={post.github_url} className="underline text-blue-500" target="_blank">GitHub</a>
      )}
      <Link href={`/${category.toLowerCase()}/${post.id}`} className="text-blue-500 underline ml-4">
        View
      </Link>
    </div>
  );
}
