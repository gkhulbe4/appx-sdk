import { Database, getDatabase } from "firebase/database";
import { FirebaseApp, initializeApp } from "firebase/app";
import { fetchFirebaseConfig, type FirebaseConfig } from "./firebaseConfig";

export async function setupFirebase(
  domain: string
): Promise<{ app: FirebaseApp; db: Database }> {
  if (!domain) throw new Error("Domain is required for Firebase setup");

  const config: FirebaseConfig = await fetchFirebaseConfig(domain);
  if (!config) {
    throw new Error("Firebase config not returned from API");
  }

  const app = initializeApp(config);
  const db = getDatabase(app);

  console.log(" Firebase initialized successfully for domain:", domain);
  return { app, db };
}
