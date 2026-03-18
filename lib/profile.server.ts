import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { Profile } from "@/types/profile";

const PROFILE_DOC_ID = "main";

export async function getProfile(): Promise<Profile | null> {
  const ref = doc(db, "profile", PROFILE_DOC_ID);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data() as Profile;
}

