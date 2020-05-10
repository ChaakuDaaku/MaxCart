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
  IonToast
} from '@ionic/react';
import './Home.scss';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import { setSearchText } from '../data/sessions/sessions.actions';
import { search } from 'ionicons/icons';
import CardView from '../components/CardView';
import { Cards } from '../models/Cards';

interface OwnProps { }

interface StateProps {
  cardDataset: Cards;
  mode: 'ios' | 'md'
}

interface DispatchProps { 
  setSearchText: typeof setSearchText;
}

type HomeProps = OwnProps & StateProps & DispatchProps;

const Home: React.FC<HomeProps> = ({ mode, setSearchText , cardDataset}) => {
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
      
      <IonContent fullscreen={true}>
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        
        <CardView
          cardsDataset={cardDataset}
        />
        
        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={500}
          onDidDismiss={() => setShowCompleteToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    cardDataset: selectors.getCardItems(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText
  },
  component: React.memo(Home)
})
