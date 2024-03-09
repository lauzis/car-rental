import { NextRequest, NextResponse } from 'next/server';
import offers_1 from '@/data/offers_at_location_1.json';
import offers_2 from '@/data/offers_at_location_2.json';
import offers_3 from '@/data/offers_at_location_3.json';

export async function GET(req:NextRequest) {
  const url = req.url;
  const search = url.split('?')[1];
  const searchParams = new URLSearchParams(search);
  const LocationId = searchParams.get('LocationId');

  if (LocationId){
    switch (parseInt(LocationId,10)){
      case 1:
        return NextResponse.json(offers_1);
      case 2:
        return NextResponse.json(offers_2);
      case 3:
        return NextResponse.json(offers_3);
    }
  }
  return NextResponse.json({ error: 'We failed this city!' }, { status: 404 })
}
