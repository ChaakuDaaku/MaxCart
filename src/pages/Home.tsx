import React, { useState, useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  getConfig,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonToast,
  IonRouterOutlet
} from '@ionic/react';
import './Home.scss';
import { Items } from '../models/Items';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import ListView from '../components/ListView';
import { setSearchText } from '../data/sessions/sessions.actions';
import { search } from 'ionicons/icons';
import CardView from '../components/CardView';
import { Cards } from '../models/Cards';
import { Redirect, Route } from 'react-router';

interface OwnProps { }

interface StateProps {
  dataset: Items;
  cardDataset: Cards;
  mode: 'ios' | 'md'
}

interface DispatchProps { 
  setSearchText: typeof setSearchText;
}

type HomeProps = OwnProps & StateProps & DispatchProps;

const Home: React.FC<HomeProps> = ( { dataset, mode, setSearchText , cardDataset}) => {
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);

  const ios = mode === 'ios';

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500);
  };

  return (
    <IonPage ref={pageRef} id="home-page">
      <IonHeader translucent={false}>
        <IonToolbar>
          {!showSearchbar &&
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          }
          {!ios && !showSearchbar &&
            <IonTitle>MaxCart</IonTitle>
          }
          {showSearchbar &&
            <IonSearchbar showCancelButton="always" placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)} onIonCancel={() => setShowSearchbar(false)}></IonSearchbar>
          }
          
          <IonButtons slot="end">
            {!ios && !showSearchbar &&
              <IonButton onClick={() => setShowSearchbar(true)}>
                <IonIcon slot="icon-only" icon={search}></IonIcon>
              </IonButton>
            }
          </IonButtons>
        </IonToolbar>
        {ios &&
          <IonToolbar>

            <IonTitle size="large">MaxCart</IonTitle>
          </IonToolbar>
        }
        {ios &&

          <IonToolbar>
            <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
          </IonToolbar>
        }
      </IonHeader>
      
      <IonContent fullscreen={false}>
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        
        <IonRouterOutlet>
          <Redirect exact={true} path="/tabs/home" to="/tabs/home/cards" />
          
          <Route path="/tabs/home/cards" render={() => <CardView cardsDataset = {cardDataset} />} exact/>
          <Route path="/tabs/home/cards/items" render={() => <ListView itemDataset = {dataset}/>} exact/>
        </IonRouterOutlet>

        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    dataset: selectors.getListItems(state),
    mode: getConfig()!.get('mode'),
    cardDataset: selectors.getCardItems(state)
  }),
  mapDispatchToProps: {
    setSearchText
  },
  component: React.memo(Home)
})
