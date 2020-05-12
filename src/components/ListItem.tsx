import React, { useRef, useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonNote,
  IonItemOptions,
  IonItemSliding,
  IonItemOption,
  AlertButton,
  IonToast
  } from '@ionic/react';
import './ListItem.css';
import { Item } from '../models/Items';

interface ListItemProps {
  item: Item;
  onShowAlert: (header: string, buttons: AlertButton[]) => void;
  onAddToCart: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
  isInCart: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ item, onShowAlert, onAddToCart, onRemoveFromCart, isInCart }) => {

  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null)
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  }

  const addToCart = () => {
    if (isInCart) {
      removeFromCart();
    } else {
      onAddToCart(item.id);
      setShowCompleteToast(true);
      dismissAlert();
    }
  };

  const removeFromCart = () => {
    onAddToCart(item.id);
    onShowAlert('Remove from cart?', [
      {
        text: 'No',
        handler: dismissAlert
      },
      {
        text: 'Remove',
        handler: () =>{
          onRemoveFromCart(item.id);
          dismissAlert();
        }
      }
    ])
  }

  return (
    <>
      <IonItemSliding ref={ionItemSlidingRef}>
          <IonItem>
            <IonLabel className="ion-text-wrap">
              <h2>
                {item.item_name}
                <span className="date">
                <IonNote>Rs {item.item_price}
                </IonNote>
                </span>
              </h2>
              <h3>{item.item_weight}</h3>
            </IonLabel>
          </IonItem>
          <IonItemOptions>
            {isInCart ?
              <IonItemOption color="danger" onClick={() => removeFromCart()}>
                Remove
              </IonItemOption>:
              <IonItemOption color="favorite" onClick={addToCart}>
                Add to Cart
              </IonItemOption>
            }
          </IonItemOptions>
      </IonItemSliding>
      
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