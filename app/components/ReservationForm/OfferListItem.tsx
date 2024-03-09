import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';

export default function OfferListItem({offer, offerUId, onSelect,locationId}:{offer:offerType, offerUId:string, onSelect: (offerUId:string)=>void, locationId:number|undefined}) {
  const selected = offer.offerUId === offerUId;
  const selectedText = selected ? "Deselect" : "Select";

  const handleSelectClick = (offer:offerType)=>{
    if (offerUId === offer.offerUId){
      onSelect('');
    } else {
      onSelect(offer.offerUId);
    }
  }

  if (!selected && offerUId){
    return null;
  }
  return (
    <Card>
      <div className={'flex justify-center p-10'}>
        <img
          src={offer.vehicle.imageLink }
          title={ offer.vehicle.modelName }
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link href={`/location/${locationId}/vehicle/${offer.offerUId}`}>{ offer.vehicle.modelName }</Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { offer.price.amount } { offer.price.currency }
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={(e)=>handleSelectClick(offer)} color={selected ? "error": "success"} variant={"outlined"} size="large">{selectedText}</Button>

        <Link href={`/location/${locationId}/vehicle/${offer.offerUId}`}><Button variant={"outlined"} size="large">Info</Button></Link>
      </CardActions>
    </Card>
  );
}
