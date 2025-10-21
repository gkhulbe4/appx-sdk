import { initializeApp, type FirebaseApp } from "firebase/app";
import { getDatabase, type Database } from "firebase/database";

let firebaseApp: FirebaseApp | null = null;
let database: Database | null = null;

export const initFirebase = (config: Record<string, any>) => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(config);
    database = getDatabase(firebaseApp);
    console.log("Firebase initialized");
  }
  return database!;
};

export const getFirebaseDB = (): Database => {
  if (!database) throw new Error("Firebase not initialized yet!");
  return database;
};
