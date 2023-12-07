import { getInitialContext } from "@ionic/portals";
import {
  IonItem,
  IonContent,
  IonPage,
  IonListHeader,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonList,
} from "@ionic/react";

const InitialContext = () => {
  const initialContext = getInitialContext<any>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Initial Context</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={true}>
          <IonItem color="light">
            <IonLabel style={{ whiteSpace: "pre-wrap" }}>
              <code>{JSON.stringify(initialContext, null, 2)}</code>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default InitialContext;
