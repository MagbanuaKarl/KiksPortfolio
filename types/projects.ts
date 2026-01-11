import { Timestamp } from "firebase/firestore";

export type Project = {
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt?: Timestamp;
};
