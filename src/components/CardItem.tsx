import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonToast, IonButton} from '@ionic/react';
import { Card } from '../models/Cards';

interface CardViewProps { 
    card: Card
};

const CardItem: React.FC<CardViewProps> = ({ card }) => {
    const [showCompleteToast, setShowCompleteToast] = useState(false);

    return (
        <>
            <IonCard button={true}>
                <IonCardHeader>
                    <IonCardSubtitle>{card.card_id}</IonCardSubtitle>
                    <IonCardTitle>{card.business_name}</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                    {card.card_description}
                    <IonButton color="tertiary" expand="block"  routerLink={"/tabs/home/cards/items"}>Open Card</IonButton>
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