"use client";

import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Project } from "@/types/project";

export async function getPublicProjects(): Promise<Project[]> {
  const q = query(
    collection(db, "projects"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Project),
  }));
}
