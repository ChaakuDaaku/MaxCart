import {
  IonItemGroup,
  IonList,
  IonAlert,
  AlertButton,
  IonPage,
  IonContent,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonFooter
} from '@ionic/react';
import React, { useState, useCallback } from 'react';
import { Items, Item } from '../models/Items';
import ListItem from './ListItem';
import { connect } from '../data/connect';
import { addToCart, removeFromCart } from '../data/sessions/sessions.actions';
import * as selectors from '../data/selectors';
import { CartItem } from '../models/CartItems';

interface OwnProps { }

interface StateProps {
  cartItems: CartItem[];
  itemDataset: Items;
  cart: Items
}

interface DispatchProps {
  addToCart: typeof addToCart;
  removeFromCart: typeof removeFromCart;
}

interface ListViewProps extends OwnProps, StateProps, DispatchProps {
  data: Items
};

const ListView: React.FC<ListViewProps> = ({ itemDataset, addToCart, removeFromCart, cartItems, cart, data }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

  const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header);
    setAlertButtons(buttons);
    setShowAlert(true);
  }, []);

  const isCartPage = window.location.href.indexOf("/tabs/cart") > 0;

  if (isCartPage) {
    data = cart
  } else {
    data = itemDataset
  }

  const calcTotal = (dataset: Array<Item>): number => {
    if (dataset === undefined || dataset.length === 0) {
      return 0;
    }
    else {
      var total: number = 0;
      for (const item of dataset) {
        var price = Number(item.item_price);
        var qty = cartItems.find(cI => cI.itemId === item.id)?.itemQty;
        if (qty === undefined) qty = 0;
        total += price * qty;
      }
      return Number(total.toFixed(2));
    }
  }

  const findQty = (item: Item): number => {
    var index: number = cartItems.findIndex(cartItem => cartItem.itemId === item.id)
    if (index === -1) {
      return 0;
    }
    else {
      return cartItems[index].itemQty
    }
  }

  return (
    <>
      {!isCartPage ?
        <IonPage>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/home"></IonBackButton>
            </IonButtons>
            <IonButtons slot="end"></IonButtons>
          </IonToolbar>

          <IonContent fullscreen={true}>
            <IonList>
              {data.dataset.map((item, index: number) => (
                <IonItemGroup key={index}>
                  <ListItem
                    item={item}
                    onShowAlert={handleShowAlert}
                    onAddToCart={addToCart}
                    onRemoveFromCart={removeFromCart}
                    isInCart={cartItems.findIndex(cartItem => cartItem.itemId === item.id) > -1}
                    qty={findQty(item)}
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
        :
        <>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/home"></IonBackButton>
            </IonButtons>
            <IonButtons slot="end"></IonButtons>
          </IonToolbar>
          <IonContent fullscreen={true}>
            <IonList>
              {data.dataset.map((item, index: number) => (
                <IonItemGroup key={index}>
                  <ListItem
                    item={item}
                    onShowAlert={handleShowAlert}
                    onAddToCart={addToCart}
                    onRemoveFromCart={removeFromCart}
                    isInCart={cartItems.findIndex(cartItem => cartItem.itemId === item.id) > -1}
                    qty={findQty(item)}
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
            <IonFooter translucent={true} className="ion-padding-bottom ion-margin-bottom">
              <IonToolbar color="success">
                <h3 className="ion-float-right ion-padding-end ion-justify-content-end"> Total: ₹ {calcTotal(data.dataset)} </h3>
              </IonToolbar>
            </IonFooter>
          </IonContent>
        </>
      }
    </>
  )
}

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    cartItems: state.data.cart,
    cart: selectors.getCartItems(state),
    itemDataset: selectors.getListItems(state)
  }),
  mapDispatchToProps: ({
    addToCart,
    removeFromCart
  }),
  component: ListView
})