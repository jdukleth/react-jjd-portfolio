import { NextResponse } from 'next/server'

export const jsonGet = <T>(getData: () => T) => () => NextResponse.json(getData())
