import WelcomeBanner from '@/components/WelcomeBanner';
import PostFeed from '@/components/PostFeed';
import PostFAB from '@/components/PostFAB';
import { createClient } from '@/lib/supabase/server';

async function getPosts(category: string) {
    const supabase = createClient();
    let table = '';
    if (category === 'Code') table = 'projects';
    else if (category === 'Prompts' || category === 'Theory') table = 'prompt_logs';

    if (!table) return [];

    const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
    return data;
}

export default async function Home({ searchParams }: { searchParams: Promise<{ tab: string }> }) {
  const awaitedSearchParams = await searchParams;
  const tab = awaitedSearchParams.tab || 'Prompts';
  const posts = await getPosts(tab);

  return (
    <div>
      <WelcomeBanner />
      <div className="flex gap-4 mt-4 mb-6">
        {['Prompts', 'Code', 'Theory'].map(t => (
          <a
            key={t}
            href={`/?tab=${t}`}
            className={`px-4 py-1 rounded transition-colors ${tab === t ? 'bg-primary text-white' : 'bg-foreground text-text-secondary border border-border hover:bg-border'}`}
          >{t}</a>
        ))}
      </div>
      <PostFeed posts={posts} category={tab} />
      <PostFAB />
    </div>
  );
}
