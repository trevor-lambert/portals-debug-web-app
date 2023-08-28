import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonItem,
  IonLabel,
  IonListHeader,
  IonPage,
} from "@ionic/react";
import { useState } from "react";
import CallMethodModal from "./CallMethodModal";

interface Plugin {
  name: string;
  methods: Method[];
}

interface Method {
  name: string;
  rtype?: string;
}

const CapacitorPlugins = () => {
  // @ts-ignore
  const plugins: Plugin[] = window.Capacitor.PluginHeaders;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [methodName, setMethodName] = useState<string>("");
  const [pluginName, setPluginName] = useState<string>("");

  const ignoredMethods = [
    "addListener",
    "removeAllListeners",
    "removeListener",
    "checkPermissions",
    "requestPermissions",
  ];

  return (
    <IonPage>
      <IonContent>
        <IonListHeader>
          <h3 style={{ fontWeight: 700 }}>Capacitor Plugins</h3>
        </IonListHeader>
        <IonAccordionGroup expand="inset">
          {plugins.map((plugin) => (
            <IonAccordion key={plugin.name}>
              <IonItem slot="header" color="light">
                <IonLabel>{plugin.name}</IonLabel>
              </IonItem>
              <div slot="content">
                {plugin.methods.map(
                  (method) =>
                    !ignoredMethods.includes(method.name) && (
                      <IonItem
                        key={method.name}
                        detail={true}
                        onClick={() => {
                          setMethodName(method.name),
                            setPluginName(plugin.name);
                          setShowModal(true);
                        }}
                      >
                        <IonLabel>{method.name}</IonLabel>
                      </IonItem>
                    )
                )}
              </div>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
        <CallMethodModal
          showModal={showModal}
          methodName={methodName}
          pluginName={pluginName}
          onCloseModal={() => setShowModal(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default CapacitorPlugins;
