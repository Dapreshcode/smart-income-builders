export interface Profile {
  id: string
  email: string
  full_name: string | null
  username: string | null
  bio: string | null
  website: string | null
  location: string | null
  avatar_url: string | null
  onboarding_completed: boolean
}