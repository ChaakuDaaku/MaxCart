import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { home, cart, documentText } from 'ionicons/icons';
import Home from './Home';

import './MainTabs.scss';
import Cart from './Cart';
import ListView from '../components/ListView';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/home" render={() => <Home />} exact={true} />
        <Route path="/tabs/cart" render={() => <Cart />} exact={true} />
        <Route path="/tabs/home/:id" component={ListView} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="cart" href="/tabs/cart">
          <IonIcon icon={cart} />
          <IonLabel>Cart</IonLabel>
        </IonTabButton>
        <IonTabButton tab="orders" href="/orders">
          <IonIcon icon={documentText} />
          <IonLabel>Order</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;