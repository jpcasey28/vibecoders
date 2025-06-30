import { NextRequest, NextResponse } from "next/server";
import { supabase } from '../../../lib/supabase';


// GET all comments (optionally for a post)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const post_id = searchParams.get("post_id");

  let query = supabase.from("comments").select("*").order("created_at", { ascending: false });
  if (post_id) query = query.eq("post_id", post_id);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST a new comment
export async function POST(req: NextRequest) {
  const body = await req.json();
  // body should have: user_id, post_type, post_id, content
  const { user_id, post_type, post_id, content } = body;

  if (!user_id || !post_type || !post_id || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("comments")
    .insert([{ user_id, post_type, post_id, content }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
