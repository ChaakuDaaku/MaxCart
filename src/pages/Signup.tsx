import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonSelect, IonSelectOption } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<number>();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }
    if(!name) {
      setNameError(true);
    }
    if(!number) {
      setNumberError(true);
    }

    if(username && password && name && number) {
      await setIsLoggedIn(true);
      await setUsernameAction(username);
      history.push('/tabs', {direction: 'none'});
    }
  };

  return (
    <IonPage id="signup-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        {/* <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div> */}

        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Email</IonLabel>
              <IonInput name="username" type="email" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setUsername(e.detail.value!);
                setUsernameError(false);
              }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => {
                setPassword(e.detail.value!);
                setPasswordError(false);
              }}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Name</IonLabel>
              <IonInput name="name" type="text" value={name} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setName(e.detail.value!);
                setNameError(false);
              }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && nameError && <IonText color="danger">
              <p className="ion-padding-start">
                Name is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Number</IonLabel>
              <IonInput name="tel" type="tel" pattern="[0-9]{10}" value={number} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setNumber(parseInt(e.detail.value!, 10));
                setNumberError(false);
              }}
                required>
              </IonInput> 
            </IonItem>

            {formSubmitted && numberError && <IonText color="danger">
              <p className="ion-padding-start">
                Number is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Address</IonLabel>
              <IonInput placeholder="Address Line 1"></IonInput>
              <IonInput placeholder="Address Line 2"></IonInput>
              <IonInput placeholder="City"></IonInput>
              <IonInput placeholder="State"></IonInput>
              <IonInput placeholder="Zip Code"></IonInput>
            </IonItem>

          </IonList>
          
          <IonItem>
            <IonLabel position="stacked" color="primary">Select Account Type</IonLabel>
            <IonSelect>
              <IonSelectOption>Customer</IonSelectOption>
              <IonSelectOption>Merchant</IonSelectOption>
            </IonSelect>
          </IonItem>


          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Create</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})