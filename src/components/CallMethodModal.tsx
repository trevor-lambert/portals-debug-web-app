import {
  IonContent,
  IonButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import {
  alertCircleOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import Editor, { useMonaco } from "@monaco-editor/react";

interface CallMethodModalProps {
  pluginName: string;
  methodName: string;
}

const darkModeMatch = window.matchMedia("(prefers-color-scheme: dark)");

const CallMethodModal: React.FC<CallMethodModalProps> = ({
  pluginName,
  methodName,
}) => {
  const codeRef = useRef("{}");
  const monaco = useMonaco();
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    monaco?.editor.setTheme(darkModeMatch.matches ? "vs-dark" : "vs")
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (_e) => {
      monaco?.editor.setTheme(darkModeMatch.matches ? "vs-dark" : "vs")
    });
  }, []);

  const handleCallMethod = async () => {
    setResult("");
    setError("");
    try {
      // @ts-ignore
      const res = await window.Capacitor.Plugins[pluginName][methodName](JSON.parse(codeRef.current));
      setResult(JSON.stringify(res, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <IonContent className="ion-padding">
      <IonHeader>Argument:</IonHeader>
      <Editor
        onMount={(_editor, monaco) => {
          monaco.editor.setTheme(darkModeMatch.matches ? "vs-dark" : "vs")
        }}
        height="200px"
        defaultLanguage="json"
        defaultValue={codeRef.current}
        onChange={(e) => codeRef.current = e ?? ""}
        options={{
          accessibilitySupport: "off",
          theme: darkModeMatch.matches ? "vs-dark" : "vs",
          lineDecorationsWidth: 0,
          glyphMargin: false,
          inlineSuggest: {
            enabled: false
          },
          quickSuggestions: false,
          suggestOnTriggerCharacters: false,
          parameterHints: {
            enabled: false
          },
          inlayHints: {
            enabled: "off"
          },
          lineNumbersMinChars: 2,
          folding: false,
          lineNumbers: "on",
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
          },
          minimap: {
            enabled: false,
          },
        }}
      />
      <IonButton
        expand="block"
        onClick={handleCallMethod}
        size="small"
        style={{ padding: 10 }}
      >
        Execute {methodName}
      </IonButton>
      <IonList lines="inset">
        {error && (
          <IonItem color="light">
            <IonIcon icon={alertCircleOutline} slot="start" color="danger" />
            <IonLabel color="danger" class="ion-text-wrap">
              {error}
            </IonLabel>
          </IonItem>
        )}
        {result && (
          <>
            <IonItem color="light">
              <IonIcon
                icon={checkmarkCircleOutline}
                color="success"
                slot="start"
              />
              <IonLabel>Success</IonLabel>
            </IonItem>
            <IonItem color="light">
              <IonLabel style={{ whiteSpace: "pre-wrap" }}>
                <code>{result}</code>
              </IonLabel>
            </IonItem>
          </>
        )}
      </IonList>
    </IonContent>
  );
};

export default CallMethodModal;
