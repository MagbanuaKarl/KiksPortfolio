"use client";

import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Profile } from "@/types/profile";

const PROFILE_DOC_ID = "main";

export async function getProfile(): Promise<Profile | null> {
  const ref = doc(db, "profile", PROFILE_DOC_ID);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data() as Profile;
}

export async function updateProfile(
  data: Partial<Profile>
): Promise<void> {
  const ref = doc(db, "profile", PROFILE_DOC_ID);
  await updateDoc(ref, data);
}
