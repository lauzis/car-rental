import Section from '@/app/components/General/Section';
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Alert, Box, Button, LinearProgress, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { getLocationList } from '@/app/helpers/actions';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import ButtonRow from '@/app/components/General/ButtonRow';

export default function Location({onChange}: {
  onChange: (location: locationType | null) => void
}) {

  const router = useRouter();
  const searchParams = useSearchParams()


  const [locations, setLocations] = useState<locationType[]>([]);
  const [locationsIsLoading, setLocationsIsLoading] = useState<boolean>(false);
  const [locationsHasError, setLocationsHasError] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<null | optionsType>(null);
  const [selectedCity, setSelectedCity] = useState<null | optionsType>(null);
  const [selectedPickUpPoint, setSelectedPickUpPoint] = useState<null | optionsType>(null);
  const countries: optionsType[] = locations.map((loc, index) => {
    return {id: loc.id, label: loc.country}
  });
  const [cities, setCities] = useState<optionsType[]>([]);
  const [pickUpPoints, setPickUpPoints] = useState<optionsType[]>([]);

  useEffect(() => {
    if (!locationsHasError) {
      setLocationsIsLoading(true);
      getLocationList().then((locations) => {
        if (locations) {
          setLocations(locations);
        } else {
          setLocations([]);
          setLocationsHasError(true);
        }
        setLocationsIsLoading(false);
      });
    }
  }, [locationsHasError]);

  useEffect(() => {
    const locationId = searchParams.get('locationId');

    if (locationId) {
      const location = locations.find(item => item.id === parseInt(locationId));
      if (location) {
        setSelectedCountry({id: location.id, label: location.country});
        setSelectedCity({id: location.id, label: location.city});
        setSelectedPickUpPoint({id: location.id, label: location.name});
      }
    }
  }, [locations]);

  //update city list when country selected
  useEffect(() => {
    if (selectedCountry) {
      const locationsByCountry = locations.filter(loc => loc.country === selectedCountry.label);
      const cityList = locationsByCountry.map((loc, index) => {
        return {id: loc.id, label: loc.city} as optionsType
      });
      setCities(cityList);
    }
  }, [selectedCountry, locations]);

  //update pickup points list when city selected
  useEffect(() => {
    if (selectedCity && selectedCountry) {
      const locationsByCountryAndCity = locations.filter(loc => loc.country === selectedCountry.label && loc.city == selectedCity.label);
      const pickUpPointList = locationsByCountryAndCity.map((loc, index) => {
        return {id: loc.id, label: loc.name} as optionsType
      });
      setPickUpPoints(pickUpPointList);
    }
  }, [selectedCity, selectedCountry, locations]);

  useEffect(() => {
    let location = null;
    if (selectedPickUpPoint) {
      location = locations?.find(item => item.id === selectedPickUpPoint.id)
    }
    onChange(location ? location : null);
  }, [onChange, selectedPickUpPoint, locations]);

  const handleClear = () => {
    setSelectedCountry(null);
    setSelectedCity(null);
    setSelectedPickUpPoint(null);
    router.push("/")
  }

  const handleFieldChange = (fieldName: string, value: optionsType | null) => {

    switch (fieldName) {
      case 'country':
        setSelectedCountry(value);
        setSelectedCity(null);
        setSelectedPickUpPoint(null);
        break;
      case 'city':
        setSelectedCity(value);
        setSelectedPickUpPoint(null);
        break;
      case 'pickUpPoint':
        setSelectedPickUpPoint(value);
        break;
    }
  }

  const handleRefresh = () => {
    setLocationsHasError(false);
  }

  const citiesDisabled = !selectedCountry;
  const pickUpPointDisabled = !selectedCity || !selectedCountry;

  return (
    <>
      { locationsHasError &&
       <section>
         <Alert severity="error">
           Sorry, we could not retrieve the data. <Button onClick={ handleRefresh } variant={ "outlined" }>Try
           again?</Button>
         </Alert>
       </section>

      }
      <Section completed={ !!selectedPickUpPoint } disabled={ locationsHasError }
               title={ 'Step 1: Select the location' }>

        { locationsIsLoading &&
         <Box>
           <LinearProgress/>
         </Box>
        }


        <ButtonRow>

          <Autocomplete
            id="countries"
            options={ countries }
            sx={ {width: '100%'} }
            value={ selectedCountry }
            onChange={ (e, value) => {
              handleFieldChange('country', value);
            } }
            renderInput={ (params) => <TextField { ...params } label="Country"/> }
          />

          <Autocomplete
            disabled={ citiesDisabled }
            id="cities"
            options={ cities }
            sx={ {width: '100%'} }
            value={ selectedCity }
            onChange={ (e, value) => {
              handleFieldChange('city', value);
            } }
            renderInput={ (params) => <TextField { ...params } label="City"/> }
          />

          <Autocomplete
            disabled={ pickUpPointDisabled }
            id="pick-up-point"
            options={ pickUpPoints }
            sx={ {width: '100%'} }
            value={ selectedPickUpPoint }
            onChange={ (e, value) => {
              handleFieldChange('pickUpPoint', value);
            } }
            renderInput={ (params) => <TextField { ...params } label="Pickup point"/> }
          />


        </ButtonRow>
        <ButtonRow>
          <Button
            onClick={ handleClear }
            color="error"
            variant="outlined"
            disabled={ !selectedPickUpPoint }
            size={ 'large' }>Clear</Button>
        </ButtonRow>


      </Section>
    </>

  );
}
