import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonItem,
  IonLabel,
  IonListHeader,
  IonPage,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import CallMethodModal from "./CallMethodModal";

interface Plugin {
  name: string;
  methods: Method[];
  isDisabled?: boolean;
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

  const defaultPlugins = ["CapacitorCookies", "CapacitorHttp", "WebView"];

  const handleDisabledPlugins = () => {
    const capacitorCookiesPlugin = plugins.find(
      (plugin) => plugin.name === "CapacitorCookies"
    );
    const capacitorHttpPlugin = plugins.find(
      (plugin) => plugin.name === "CapacitorHttp"
    );

    // @ts-ignore
    if (window.Capacitor.getPlatform() == "ios") {
      capacitorCookiesPlugin!.isDisabled =
        prompt(JSON.stringify({ type: "CapacitorCookies.isEnabled" })) ===
        "false";
      capacitorHttpPlugin!.isDisabled =
        prompt(JSON.stringify({ type: "CapacitorHttp" })) === "false";
    } else {
      capacitorCookiesPlugin!.isDisabled =
        // @ts-ignore
        !window.CapacitorCookiesAndroidInterface.isEnabled();
      capacitorHttpPlugin!.isDisabled =
        // @ts-ignore
        !window.CapacitorHttpAndroidInterface.isEnabled();
    }
  };

  useEffect(() => {
    handleDisabledPlugins();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonListHeader>
          <h3 style={{ fontWeight: 700 }}>Capacitor Plugins</h3>
        </IonListHeader>
        <IonAccordionGroup expand="inset">
          {plugins.map((plugin) => (
            <IonAccordion
              key={plugin.name}
              disabled={Boolean(plugin.isDisabled)}
            >
              <IonItem slot="header" color="light">
                {plugin.name}
                {defaultPlugins.includes(plugin.name) && (
                  <IonText color="medium" style={{ margin: 5 }}>
                    {`(Default)`}
                  </IonText>
                )}
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
