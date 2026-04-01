import { skills } from '@/lib/db/skills'
import { jsonGet } from '@/lib/jsonGetRoute'

export const GET = jsonGet(() => skills)
