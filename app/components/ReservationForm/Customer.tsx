import Button from '@mui/material/Button';
import Section from '@/app/components/General/Section';
import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import ButtonRow from '@/app/components/General/ButtonRow';

export default function Customer({location, offer, onSubmit}: {
  location: locationType | null,
  offer: offerType | null,
  onSubmit: (customer: customerType) => void
}) {

  const defaultCustomer:customerType = {
    name: '',
    surname: ''
  } as customerType;
  const [customer, setCustomer] = useState<customerType>(defaultCustomer);

  const handleFieldChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name:string) => {
    setCustomer({
      ...customer,
      [name]: e.target.value
    } as customerType)
  };

  const handleSubmit = () => {
      onSubmit(customer);
  }

  const formValid = () => {
    return location && offer && customer.name.length>0 && customer.surname.length>0;
  }

  const disabled = !location || !offer;
  const disabledButton = disabled || !formValid();


  return (
    <Section completed={!disabledButton} disabled={disabled} title={ 'Step 3: Complete reservation!' }>
      <ul>
        <li>
          Location: {location?.name} - {location?.city} - {location?.country}
        </li>
        <li>
          Offer: {offer?.vehicle.modelName} - {offer?.price?.amount} {offer?.price?.currency}
        </li>
      </ul>

      <ButtonRow>
        <TextField

          id="name"
          label="Name"
          variant="outlined"
          value={ customer.name }
          disabled={disabled}
          onChange={ (e) => handleFieldChange(e, 'name') }
        />

        <TextField
          id="surname"
          label="Surname"
          variant="outlined"
          value={ customer.surname }
          disabled={disabled}
          onChange={ (e) => handleFieldChange(e, 'surname') }
        />
      </ButtonRow>
      <ButtonRow>
        <Button
          onClick={ handleSubmit }
          variant="outlined"
          disabled={disabledButton}
          size={'large'}
        >
          Complete reservation
        </Button>
      </ButtonRow>




    </Section>
  );
}
