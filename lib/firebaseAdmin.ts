import admin from "firebase-admin";

function getFirebasePrivateKey(): string {
  const rawKey = process.env.FIREBASE_PRIVATE_KEY;
  if (!rawKey) {
    throw new Error(
      "Missing FIREBASE_PRIVATE_KEY. Set it in .env.local as an escaped string, e.g. FIREBASE_PRIVATE_KEY=\"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\""
    );
  }

  let key = rawKey.trim();

  // Remove outer quotes if present from dotenv quoting behavior
  if (key.startsWith('"') && key.endsWith('"')) {
    key = key.slice(1, -1);
  }

  key = key.replace(/\\r/g, "").replace(/\\n/g, "\n");

  if (!key.includes("-----BEGIN PRIVATE KEY-----") || !key.includes("-----END PRIVATE KEY-----")) {
    throw new Error(
      "FIREBASE_PRIVATE_KEY does not contain a valid PEM private key. Ensure the value includes -----BEGIN PRIVATE KEY----- and -----END PRIVATE KEY-----."
    );
  }

  return key;
}

if (!admin.apps.length) {
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    throw new Error(
      "Missing required Firebase Admin environment variables: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY"
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: getFirebasePrivateKey(),
    }),
  });
}

export const adminFirestore = admin.firestore();
