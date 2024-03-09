import { notFound } from 'next/navigation';
import { getLocationList, getOfferList } from '@/app/helpers/actions';
import Link from 'next/link';
import { Button } from '@mui/material';
import ButtonRow from '@/app/components/General/ButtonRow';

const Page = async ({params}: { params: { locationId: string, vehicleId: string } }) => {
  const {locationId, vehicleId} = params;
  const locations = await getLocationList();
  const location = locations ? locations.find(loc => loc.id === parseInt(locationId)) : null;
  const offers = await getOfferList(parseInt(locationId, 10));
  const offer = offers ? offers.find(item => item.offerUId === vehicleId) : null;

  if (offer && location) {
    return (
      <main className="flex flex-col content-start p-24">
        <section className={ 'max-w-lg' }>
          <div>
            <h1>{ offer.vehicle.modelName }</h1>
            <div className={ 'flex justify-center p-10' }>
              <img
                src={ offer.vehicle.imageLink }
                title={ offer.vehicle.modelName }
              />
            </div>

            <div>
              <ul>
                <li>
                  Location: { location.name }, { location.city }, { location.country }
                </li>
                <li>
                  Price: { offer.price.amount } { offer.price.currency }
                </li>
                <li>
                  Vendor: { offer.vendor.name }
                </li>
                <li>
                  <img src={ offer.vendor.imageLink } title={ offer.vendor.name } alt={ offer.vendor.name }/>
                </li>
              </ul>
            </div>

            <ButtonRow>
              <Link href={ `/?locationId=${ locationId }` }>
                <Button color={ 'warning' } variant={ "outlined" } size="large">{ 'Go back' }</Button>
              </Link>
              <Link href={ `/?locationId=${ locationId }&offerUId=${ vehicleId }` }>
                <Button color={ 'success' } variant={ "outlined" } size="large">{ 'Select' }</Button>
              </Link>
            </ButtonRow>
          </div>

        </section>
      </main>
    );
  }

  return notFound();
}

export default Page;
