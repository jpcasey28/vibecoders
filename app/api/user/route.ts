import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = createClient();
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Optionally fetch more detailed user profile from a 'profiles' table if you have one
    // For now, we'll just return the basic user object from auth
    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}