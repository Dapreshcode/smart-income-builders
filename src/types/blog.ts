// types/learning.ts
export type LearningPathEntry = {
  incomeSystem: string
  guide: string
  phase: number
  pathOrder: number
}

export type PostLike = {
  slug: string
  frontmatter: {
    title?: string
    description?: string
    category?: string
    learningPaths?: LearningPathEntry[]
    level?: string
  }
}

export type Phase = { number: number; title: string; description: string }
export type Guide = {
  id: string
  title: string
  description: string
  order: number
  href?: string
  phases: Phase[]
}
export type IncomeSystem = {
  id: string
  title: string
  description: string
  category: string
  guides: Guide[]
}