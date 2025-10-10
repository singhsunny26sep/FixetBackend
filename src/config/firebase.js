import admin from "firebase-admin";
import path from "path";

const serviceAccount = path.resolve("src/config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
