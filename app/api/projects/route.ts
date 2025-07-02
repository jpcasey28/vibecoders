import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET all projects
export async function GET() {
    const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}

// POST a new project
export async function POST(req: NextRequest) {
    const supabase = createClient();
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, github_url, tags } = await req.json();

    if (!title) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          user_id: user.id,
          title,
          description,
          github_url,
          tags,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}