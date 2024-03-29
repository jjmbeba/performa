"use client";

import { createClient } from "@/utils/supabase/client";
import { Student } from "@/utils/types";

type SignupData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

type LoginData = {
  email: string;
  password: string;
};
export const supabase = createClient();

export async function signUpNewUser({
  fullName,
  email,
  phoneNumber,
  password,
  confirmPassword,
}: SignupData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone_number: phoneNumber,
      },
    },
  });

  return { data, error };
}

export async function signInUser({ email, password }: LoginData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  return { error };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  const user = await getCurrentUser();

  return { data, user, error };
}

export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return { session, error };
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

export async function getExistingClasses() {
  const { data, error } = await supabase
    .from("classes")
    .select("id, class_name");

  return { data, error };
}

export async function addStudent(values: Student) {
  const { data, error } = await supabase
    .from("students")
    .insert([values])
    .select();

  return { data, error };
}

export async function deleteStudent(id: number) {
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  return { error };
}
