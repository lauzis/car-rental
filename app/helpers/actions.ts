const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getLocationList() {
  try {
    const res = await fetch(`${ API_BASE_URL }Locations/Locations`);
    if (res.ok){
      const locations: locationType[] = await res.json();
      return locations;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}

export async function getOfferList(locationId: number) {
  try {
    const res = await fetch(`${ API_BASE_URL }Availability/GetOffers/?LocationId=${ locationId }`);
    if (res.ok){
      const offers: offerType[] = await res.json();
      return offers;
    } else {
      return null;
    }
  } catch (e) {
     return null;
  }
}

export async function requestReservation(reservation:reservationType) {
  try {
    const res = await fetch(
      `${ API_BASE_URL }Reservations/CreateReservation/`, {
        method: 'POST',
        body: JSON.stringify(reservation),
        headers: {'content-type': 'application/json'}
      });
    if (res.ok){
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}


