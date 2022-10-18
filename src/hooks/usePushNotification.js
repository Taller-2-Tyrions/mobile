import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
  useRef,
} from "react";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const PushNotificationContext = createContext({});

export function PushNotificationProvider({ children }) {
  const [expoToken, setExpoToken] = useState(null);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const navigation = useNavigation();

  const requestPermission = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        throw new Error("Permission not granted!");
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      //const token = (await Notifications.getDevicePushTokenAsync()).data;
      setExpoToken(token);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!expoToken) {
      requestPermission();
    }

    console.log("Expo token: ", expoToken);

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const {
          notification: {
            request: {
              content: {
                data: { screen },
              },
            },
          },
        } = response;
        if (screen) {
          navigation.navigate(screen);
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [expoToken]);

  const memoedValue = useMemo(
    () => ({
      requestPermission,
      expoToken,
      notification,
      setNotification,
    }),
    [requestPermission, expoToken, notification, setNotification]
  );

  return (
    <PushNotificationContext.Provider value={memoedValue}>
      {children}
    </PushNotificationContext.Provider>
  );
}

export default function usePushNotification() {
  return useContext(PushNotificationContext);
}
