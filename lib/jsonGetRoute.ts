import { NextResponse } from 'next/server'

const noStoreJson = { 'Cache-Control': 'no-store, max-age=0' }

export const jsonGet = <T>(getData: () => T) => () =>
  NextResponse.json(getData(), { headers: noStoreJson })
