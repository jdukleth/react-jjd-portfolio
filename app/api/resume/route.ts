import { resume } from '@/lib/db/resume'
import { jsonGet } from '@/lib/jsonGetRoute'

export const GET = jsonGet(() => resume)
