"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const cookieStore = cookies();

const supabase = createClient(cookieStore);

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function revalidate() {
  revalidatePath("/", "layout");
}

export async function getUserRole() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: userRole, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id);

    return { userRole, error };
  }
}

export async function getParentStudents() {
  const user = await getCurrentUser();

  if (user) {
    const { data: students, error } = await supabase
      .from("students")
      .select(`*`)
      .eq("parent_id", user.id);

    return { students, error };
  }
}

export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return { session, error };
}
