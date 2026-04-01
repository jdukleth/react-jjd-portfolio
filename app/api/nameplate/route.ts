import { nameplate } from '@/lib/db/nameplate'
import { jsonGet } from '@/lib/jsonGetRoute'

export const GET = jsonGet(() => nameplate)
