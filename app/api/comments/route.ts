import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/lib/supabase/server';


// GET all comments (optionally for a post)
export async function GET(req: NextRequest) {
    const supabase = createClient();
    try {
        const { searchParams } = new URL(req.url);
        const post_id = searchParams.get("post_id");

        let query = supabase.from("comments").select("*").order("created_at", { ascending: false });
        if (post_id) query = query.eq("post_id", post_id);

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching comments:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}

// POST a new comment
export async function POST(req: NextRequest) {
    const supabase = createClient();
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { post_type, post_id, content } = await req.json();

        if (!post_type || !post_id || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("comments")
            .insert([{ user_id: user.id, post_type, post_id, content }])
            .select()
            .single();

        if (error) {
            console.error('Error creating comment:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}
