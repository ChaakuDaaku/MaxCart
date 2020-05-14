import React, { useState } from 'react';
import {
  AlertButton,
  IonToast,
  IonIcon,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/react';
import './ListItem.css';
import { Item } from '../models/Items';
import { removeCircleOutline, addCircleOutline } from 'ionicons/icons';
import { CartItem } from '../models/CartItems';

interface ListItemProps {
  item: Item;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  onAddToCart: (item: CartItem) => void;
  onRemoveFromCart: (id: number) => void;
  isInCart: boolean;
  qty: number;
}

const ListItem: React.FC<ListItemProps> = ({ item, onShowAlert, onAddToCart, onRemoveFromCart, isInCart, qty }) => {
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const addToCart = () => {
    var cartItem: CartItem = {itemId: item.id, itemQty: 1}
    onAddToCart(cartItem);
    setShowCompleteToast(true);

  };

  const removeFromCart = () => {
    onShowAlert('Remove from cart?', [
      {
        text: 'No',
      },
      {
        text: 'Remove',
        handler: () => {
          onRemoveFromCart(item.id);
        }
      }
    ])
  }

  return (
    <>
      <IonCard>
        <IonCardHeader className="ion-no-margin">
          <IonCardTitle>
            {item.item_name}
          </IonCardTitle>
          <IonCardSubtitle>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <h6 className="ion-text-center ion-no-margin">Weight: {item.item_weight}</h6>
                </IonCol>
                <IonCol>
                  <h6 className="ion-text-center ion-no-margin">₹ {item.item_price}</h6>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent className="ion-no-margin ion-no-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                {!isInCart ?
                  <IonButton fill="outline" color="success" className="ion-text-center" expand="block" onClick={addToCart}>Add to Cart</IonButton>
                  :
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonIcon icon={removeCircleOutline}
                          color="red"
                          size="large"
                          className="ion-float-right ion-padding-end ion-justify-content-end"
                          onClick={() => removeFromCart()} />
                      </IonCol>
                      <IonCol>
                        <IonInput
                          id="qtyInput"
                          type="number"
                          max="10"
                          inputMode="numeric"
                          value={qty}
                          className="ion-text-center" />
                      </IonCol>
                      <IonCol>
                        <IonIcon
                          icon={addCircleOutline}
                          color="green"
                          size="large"
                          className="ion-float-right ion-padding-end ion-justify-content-end"
                          onClick={addToCart}
                        />
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                }
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
      <IonToast
        isOpen={showCompleteToast}
        message="Cart Modified"
        duration={500}
        onDidDismiss={() => setShowCompleteToast(false)}
      />
    </>
  );
};

export default React.memo(ListItem);