import { supabase } from './supabase/client';

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function signInWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error;
}

export async function signOut() {
  await supabase.auth.signOut();
}
