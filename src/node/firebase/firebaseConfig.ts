// node/firebaseConfig.ts
import axios from "axios";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const fetchFirebaseConfig = async (
  domain: string,
  token: string,
  userId: string
) => {
  try {
    const res = await axios.get(
      `https://tempapi.classx.co.in/get/websiteconfig?domain=${domain}`,
      {
        headers: {
          "auth-key": "appxapi",
          authorization: token,
          "client-service": "Appx",
          "device-id": `WebBrowser${Date.now()}${Math.random()
            .toString(36)
            .slice(2, 8)}`,
          "device-type": "browser",
          source: "website",
          "user-id": userId,
          accept: "*/*",
        },
      }
    );

    return res.data.firebaseConfig as FirebaseConfig;
  } catch (err) {
    console.error("Failed to fetch Firebase config:", err);
    throw err;
  }
};
