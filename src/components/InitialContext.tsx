import { getInitialContext } from "@ionic/portals";
import {
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import TabPage from "./TabPage";

const InitialContext = () => {
  const initialContext = getInitialContext<any>();

  return (
    <TabPage title="Initial Context">
      <IonList inset={true}>
        <IonItem color="light">
          <IonLabel style={{ whiteSpace: "pre-wrap" }}>
            {initialContext ? <code>{JSON.stringify(initialContext, null, 2)}</code> : "No initial context found"}
          </IonLabel>
        </IonItem>
      </IonList>
    </TabPage>
  );
};

export default InitialContext;
