"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { Project } from "@/types/projects";

const COLLECTION = "projects";

/**
 * READ
 */
export async function getProjects(): Promise<Project[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));

  return snapshot.docs.map((snap) => ({
    id: snap.id,
    ...(snap.data() as Omit<Project, "id">),
  }));
}

/**
 * CREATE
 */
export async function addProject(
  data: Omit<Project, "id" | "createdAt">
): Promise<void> {
  await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/**
 * UPDATE
 */
export async function updateProject(
  id: string,
  data: Partial<Omit<Project, "id" | "createdAt">>
): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, data);
}

/**
 * DELETE
 */
export async function deleteProject(id: string): Promise<void> {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
}
