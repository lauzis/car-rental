# Car rental example
Demo page: https://tmp.itdep.lv/

## --- Task description / Case study ---
What needs to be done?
You need to build a simple front-end application (website) that will use our Booking API.
It should:
- Have a search form, with the ability to pick a location where the user can rent a car;
- Display search results;
- Open details about any selected car offer (price, currency, model name, image of the car, supplier name
  and supplier image),
- Have the ability to book an offer;
- When booked, it should return/send a confirmed reservation number;
  Some notes & rules:
- You can go with any desired PHP framework/technology;
- You can use any other technologies that you consider helpful to reach the goal of this case study;
- Although we appreciate people going the extra mile, we encourage you to stay within certain limits and
  treat this as an MVP, a.k.a it could be dirty and quick but should meet requirements.

## --- Getting Started ---
Based on  [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## --- Change log ---

### --- 0.1.0 Initial Version --

#### TODOS / Possible improvements
- Improve filter for offers add ordering (by price) 
- Add free form search field for location, so that it would fill other fields if item selected
- Returning from more info about offer/vehicle would be nice to scroll/be in same position
- Select/Return instead of search params use urls
- Make reservation directly for offer view (there is everything that is needed for reservation)
- Rewrite endpoints so it would read/save data in real db
- <img> -> next/image
- authentication middleware
- user registration routine

### KNOW ISSUES
- The api is blocked by CORS, it could be parsed trough curl request to overcome the CORS but not sure if this si the scope of this "example" project
- Local api reads from dummy jsons 

#### Changes
- Start page is form with several sections
    - Location
    - Offers
    - Customer / Reservation
- Offer page
- Alerts messages
    - Failed to fetch essential data
    - Failed to submit reservation
    - No offers in section
