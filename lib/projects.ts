"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { Project } from "@/types/project";

const PROJECTS_COLLECTION = "projects";

export async function getProjects(): Promise<Project[]> {
  const snapshot = await getDocs(collection(db, PROJECTS_COLLECTION));

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Project),
  }));
}

export async function addProject(project: Omit<Project, "createdAt">) {
  await addDoc(collection(db, PROJECTS_COLLECTION), {
    ...project,
    createdAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string) {
  await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
}
