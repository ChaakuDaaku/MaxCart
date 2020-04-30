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
import { Items } from '../models/Items';
import { connect } from '../data/connect';
import * as selectors from '../data/selectors';
import ListView from '../components/ListView';
import { setSearchText } from '../data/sessions/sessions.actions';
import { options, search } from 'ionicons/icons';

interface OwnProps { }

interface StateProps {
  dataset: Items;
  mode: 'ios' | 'md'
}

interface DispatchProps { 
  setSearchText: typeof setSearchText;
}

type HomeProps = OwnProps & StateProps & DispatchProps;

const Home: React.FC<HomeProps> = ( { dataset, mode, setSearchText }) => {
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
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
      <IonHeader translucent={true}>
        <IonToolbar>
          {!showSearchbar &&
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          }
          {!ios && !showSearchbar &&
            <IonTitle>Items</IonTitle>
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
            {!showSearchbar &&
              <IonButton onClick={() => setShowFilterModal(true)}>
                {mode === 'ios' ? 'Filter' : <IonIcon icon={options} slot="icon-only" />}
              </IonButton>
            }
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Items</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />
        <ListView itemDataset = {dataset}/>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    dataset: selectors.getListItems(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText
  },
  component: React.memo(Home)
})
