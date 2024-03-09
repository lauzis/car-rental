'use client';
import React, { useEffect, useState } from 'react';
import { requestReservation } from '@/app/helpers/actions';
import Location from '@/app/components/ReservationForm/Location';
import OfferList from '@/app/components/ReservationForm/OfferList';
import Customer from '@/app/components/ReservationForm/Customer';
import { Alert, Box, Button, LinearProgress } from '@mui/material';
import ButtonRow from '@/app/components/General/ButtonRow';

const ReservationForm = () => {
  const TIMEOUT_LENGTH = 15;
  const [selectedLocation, setSelectedLocation] = useState<locationType | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<offerType | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittingError, setSubmittingError] = useState<boolean>(false);
  const [submittingTimeout, setSubmittingTimeout] = useState<number>(TIMEOUT_LENGTH);
  const [customer, setCustomer] = useState<customerType | null>(null);

  const handleLocationChange = (location: locationType | null): void => {
    setSelectedLocation(location);
  }

  const handleOfferChange = (offer: offerType | null): void => {
    setSelectedOffer(offer);
  }

  const handleSubmit = (customer: customerType) => {
    if (selectedOffer) {
      const reservation: reservationType = {
        offerUId: selectedOffer.offerUId,
        customer: customer
      };
      setCustomer(customer);
      setSubmitting(true);
      requestReservation(reservation).then((result) => {
        if (result) {
          setSubmitted(true);
        } else {
          setSubmittingError(true)
        }
        setSubmitting(false);
        setSubmittingTimeout(TIMEOUT_LENGTH);
      });
    }
  }
  useEffect(() => {
      if (submittingError && submittingTimeout>0){
        setTimeout(()=>{
          setSubmittingTimeout(submittingTimeout-1);
        },1000)
      }
  }, [submittingTimeout,submittingError]);


  const handleRestart = () =>{
    setSubmitting(false);
    setSubmitted(false);
    setSubmittingError(false);
    setSelectedLocation(null);
    setSelectedOffer(null);
    setSubmittingTimeout(TIMEOUT_LENGTH);
  }

  if (submitting) {
    return (
      <section>
        <LinearProgress/>
      </section>
    )
  }

  if (submitted){
    return (
      <section>
        <Alert severity="success">
          Thank you! Your request submitted!
        </Alert>
        <ButtonRow>
          <Button variant={ "outlined" } onClick={handleRestart}>Add another one!</Button>
        </ButtonRow>
      </section>
    )
  }

  if (submittingError){
    return (
      <section>
        <Alert severity="error">
          Sorry! We failed to save your reservation.
        </Alert>
        <ButtonRow>
          {customer &&
            <Button
             disabled={submittingTimeout>0}
             variant={ "outlined" }
             color="warning"
             onClick={()=>{handleSubmit(customer)}}>Retry the request for reservation! {submittingTimeout>0?`(${submittingTimeout})`:''}</Button>
          }
          <Button variant={ "outlined" } onClick={handleRestart}>Start from beginning!</Button>
        </ButtonRow>
      </section>
    )
  }

  return (
    <>
      <Location onChange={ handleLocationChange }/>
      <OfferList location={ selectedLocation } onChange={ handleOfferChange }/>
      <Customer location={ selectedLocation } offer={ selectedOffer } onSubmit={ handleSubmit }></Customer>
    </>
  );
}

export default ReservationForm;
