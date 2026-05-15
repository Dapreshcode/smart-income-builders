import { createClient } from "@/lib/supabase/server"
import { Profile } from "@/models/profile"

export async function getProfile(
  userId: string
): Promise<Profile | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle()

  if (error) {
    console.error(error)
    return null
  }

  return data
}