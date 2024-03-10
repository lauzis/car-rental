import { NextResponse } from 'next/server';
export async function POST(req: any) {
  //return NextResponse.json({ error: 'We failed this city!' }, { status: 404 })
  const data = await req.json()
  return NextResponse.json(data)
}
