import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import InitialContext from "./InitialContext";
import PubSubTest from "./PubSubTest";
import CapacitorPlugins from "./CapacitorPlugins";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import {
  informationCircleOutline,
  repeatOutline,
  logoCapacitor,
} from "ionicons/icons";

const PortalsDebug = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/initial-context" />
          <Route
            path="/initial-context"
            component={InitialContext}
            exact={true}
          />
          <Route
            path="/pub-sub"
            component={PubSubTest}
            exact={true}
          />
          <Route
            path="/plugins"
            component={CapacitorPlugins}
            exact={true}
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="initial-context" href="/initial-context">
            <IonIcon icon={informationCircleOutline} />
            <IonLabel>Initial Context</IonLabel>
          </IonTabButton>

          <IonTabButton tab="pub-sub" href="/pub-sub">
            <IonIcon icon={repeatOutline} />
            <IonLabel>Publish / Subscribe</IonLabel>
          </IonTabButton>

          <IonTabButton tab="plugins" href="/plugins">
            <IonIcon icon={logoCapacitor} />
            <IonLabel>Capacitor Plugins</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default PortalsDebug;
