import { projects } from '@/lib/db/projects'
import { jsonGet } from '@/lib/jsonGetRoute'

export const GET = jsonGet(() => projects)
