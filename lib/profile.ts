"use client";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getProfile() {
  const ref = doc(db, "profile", "main");
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data();
}
