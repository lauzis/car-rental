import { NextResponse } from 'next/server';
import locations from '@/data/locations.json';
export async function GET(){
  //return NextResponse.json({ error: 'We failed this city!' }, { status: 404 })
  return NextResponse.json(locations);
}
