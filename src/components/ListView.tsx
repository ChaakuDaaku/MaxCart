import { IonItemGroup, IonList, IonAlert, AlertButton, IonPage, IonContent } from '@ionic/react';
import React, { useState, useCallback } from 'react';
import {Items} from '../models/Items';
import ListItem from './ListItem';
import { connect } from '../data/connect';
import { addToCart, removeFromCart } from '../data/sessions/sessions.actions';

interface OwnProps {
    itemDataset: Items
}

interface StateProps { 
    cartIems: number[];
}

interface DispatchProps {
    addToCart: typeof addToCart;
    removeFromCart: typeof removeFromCart;
 }

interface ListViewProps extends OwnProps, StateProps, DispatchProps { };

const ListView: React.FC<ListViewProps> = ({itemDataset, addToCart, removeFromCart, cartIems}) => {

    const [showAlert, setShowAlert] = useState(false);
    const [alertHeader, setAlertHeader] = useState('');
    const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

    const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header);
    setAlertButtons(buttons);
    setShowAlert(true);
    }, []);

    return (
        <IonPage>
            <IonContent fullscreen={true}>
                <IonList>
                    {itemDataset.dataset.map((item, index: number) => (
                        <IonItemGroup key={index}>
                            <ListItem
                            item = {item}
                            onShowAlert = {handleShowAlert}
                            onAddToCart = {addToCart}
                            onRemoveFromCart = {removeFromCart}
                            isInCart = {cartIems.indexOf(item.id) > -1}
                            />
                        </IonItemGroup>
                    ))}
                </IonList>
                <IonAlert
                    isOpen={showAlert}
                    header={alertHeader}
                    buttons={alertButtons}
                    onDidDismiss={() => setShowAlert(false)}
                ></IonAlert>
            </IonContent>
        </IonPage>
    )
}

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: (state) =>({
        cartIems: state.data.cart
    }),
    mapDispatchToProps: ({
        addToCart,
        removeFromCart
    }),
    component: ListView
})