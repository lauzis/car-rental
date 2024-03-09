enum currencyEnum {
  Eur = "EUR",
  Usd = "USD",
}

type customerType = {
  "name": string;
  "surname": string;
}

type reservationType = {
  "offerUId": string;
  "customer": customerType;
}

type priceType = {
  "amount": number;
  "currency": currencyEnum;
}

type vehicleType = {
  "modelName":string;
  "sipp": string;
  "imageLink": string;
}

type vendorType = {
  "name": string;
  "imageLink": string;
}

type offerType = {
  "offerUId": string;
  "vehicle": vehicleType;
  "price": priceType;
  "vendor": vendorType;
}

type locationType = {
  "id": number;
  "country": string;
  "city": string;
  "name": string;
}

type optionsType = {
  id: number,
  label: string
}

