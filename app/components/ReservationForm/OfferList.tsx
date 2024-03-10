import Section from '@/app/components/General/Section';
import { useEffect, useState } from 'react';
import { getOfferList } from '@/app/helpers/actions';
import { Alert, Box, Button, LinearProgress, TextField } from '@mui/material';
import { convertToOptions, getUniqueValues } from '@/app/helpers/helpers';
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import OfferListItem from '@/app/components/ReservationForm/OfferListItem';
import ButtonRow from '@/app/components/General/ButtonRow';
import { useSearchParams } from 'next/navigation';

export default function OfferList({location, onChange}: {
  location: locationType | null,
  onChange: (offer: offerType | null) => void}
) {

  const searchParams = useSearchParams();

  const [offers, setOffers] = useState<offerType[]|null>(null);
  const [filteredOffers, setFilteredOffers] = useState<offerType[]|null>(null);
  const [offersIsLoading, setOffersIsLoading] = useState<boolean>(false);
  const [vehicleNames, setVehicleNames] = useState<optionsType[]>([]);
  const [selectedVehicleName, setSelectedVehicleName] = useState<optionsType|null>(null);
  const [selectedOfferUId, setSelectedOfferUId] = useState<string>('');

  useEffect(() => {
    if (location){
      setOffersIsLoading(true);
      setVehicleNames([]);
      getOfferList(location.id).then((offers) => {
        setOffersIsLoading(false);
        setOffers(offers);
        setFilteredOffers(offers);
        setSelectedOfferUId('');
      });
    } else {
      handleClear();
    }
  }, [location]);

  useEffect(() => {
    if (offers){
      const vehicleNames = offers.map(item=>item.vehicle.modelName);
      const options = convertToOptions(getUniqueValues(vehicleNames));
      setVehicleNames(options)

      const offerUId = searchParams.get('offerUId');
      if (offerUId){
        const offer = offers.find(offer=>offer.offerUId===offerUId)
        if (offer){
          setSelectedOfferUId(offerUId)
        }
      }
    }
  }, [offers, searchParams]);

  useEffect(() => {
    if (offers){
      if (selectedVehicleName){
        const filteredOffers = offers.filter(item=> item.vehicle.modelName===selectedVehicleName.label);
        setFilteredOffers(filteredOffers);
      } else {
        setFilteredOffers(offers);
      }
    }
  }, [offers,selectedVehicleName]);

  useEffect(() => {
    if (offers){
      const offer = offers.find(offer => offer.offerUId===selectedOfferUId);
      if (offer){
        onChange(offer);
      } else {
        onChange(null);
      }
    }
  }, [offers, selectedOfferUId, onChange]);


  const handleFieldChange = (fieldName: string, value: optionsType | null) => {
    switch (fieldName) {
      case 'vehicleName':
        setSelectedVehicleName(value);
        break;
    }
  }

  const handleSelectedOrder = (offerUId:string) =>{
    setSelectedOfferUId(offerUId);
  }

  const handleClear = () =>{
    setSelectedOfferUId('');
    setSelectedVehicleName(null);
    setFilteredOffers(null);
  }

  return (
    <Section completed={!!selectedOfferUId} disabled={ !location } title={ 'Step 2: Select the offer!' }>
      { offersIsLoading &&
       <Box sx={ {width: '100%'} }>
         <LinearProgress/>
       </Box>
      }
      { !offersIsLoading && location && (!offers || offers.length === 0) &&
       <Alert severity="info">Sorry there is no offers in selected locations</Alert>
      }

      <ButtonRow>
        <Autocomplete
          id="vehicle"
          options={ vehicleNames }
          sx={ {width: 200} }
          value={ selectedVehicleName }
          onChange={ (e, value) => {
            handleFieldChange('vehicleName', value);
          } }
          renderInput={ (params) => <TextField { ...params } label="Vehicle"/> }
          disabled={!!selectedOfferUId || vehicleNames.length===0}
        />
      </ButtonRow>

      <ButtonRow>
        <Button
          onClick={ handleClear }
          color="error"
          variant="outlined"
          disabled={ !selectedOfferUId && !selectedVehicleName }
          size={ 'large' }>Clear</Button>
      </ButtonRow>



      <div className={"mt-5 grid grid-cols-2 gap-x-5 gap-y-5"}>
        { filteredOffers?.map((offer) => {
          return (
            <OfferListItem locationId={location?.id} key={offer.offerUId} offer={offer} offerUId={selectedOfferUId} onSelect={handleSelectedOrder}/>
          )
        })}
      </div>

    </Section>
  );
}
