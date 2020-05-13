import React, { useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonToast,
  IonButton,
  IonLabel
} from '@ionic/react';
import { Card } from '../models/Cards';

interface CardViewProps {
  card: Card
};

const CardItem: React.FC<CardViewProps> = ({ card }) => {
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>{card.card_id}</IonCardSubtitle>
          <IonCardTitle>{card.business_name}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {card.card_description}
          <IonLabel>
            <p>Delivery Date: {card.delivery_date}</p>
          </IonLabel>
          <IonButton color="medium" expand="block" routerLink={`/tabs/home/${card.id}`}>Open Card</IonButton>
        </IonCardContent>
      </IonCard>
      <IonToast
        isOpen={showCompleteToast}
        message="Click Click"
        duration={1000}
        onDidDismiss={() => setShowCompleteToast(false)}
      />
    </>
  )
}

export default React.memo(CardItem);