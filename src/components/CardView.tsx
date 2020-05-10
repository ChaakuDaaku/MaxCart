import React from 'react';
import { connect } from '../data/connect';
import { IonList, IonItemGroup, IonContent } from '@ionic/react';
import { Cards } from '../models/Cards';
import CardItem from './CardItem';

interface OwnProps { 
    cardsDataset: Cards
}

interface StateProps { }

interface DispatchProps { }

interface CardViewProps extends OwnProps, StateProps, DispatchProps { };    

const CardView: React.FC<CardViewProps> = ({ cardsDataset }) => {
    return (
        <IonContent fullscreen={true}>
            <IonList>
                {cardsDataset.cardsDataset.map((card, index: number) => (
                    <IonItemGroup key={index}>
                        <CardItem
                            card = {card}
                            key = {index}
                        />
                    </IonItemGroup>
                ))}
            </IonList>
        </IonContent>
    )
}

export default connect<OwnProps, StateProps, DispatchProps>({
    component: CardView
})