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

export const fetchFirebaseConfig = async (domain: string) => {
  try {
    const res = await axios.get(
      `https://tempapi.classx.co.in/get/websiteconfig?domain=${domain.replace(
        "https://",
        ""
      )}`,
      {
        headers: {
          "auth-key": "appxapi",
        },
      }
    );

    return res.data.data as FirebaseConfig;
  } catch (err) {
    console.error("Failed to fetch Firebase config:", err);
    throw err;
  }
};
