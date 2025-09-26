// src/firebaseTools.ts
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData
} from "firebase/firestore";
import { db } from "./firebase";
import { Tool } from "../types/Tool";

const toolsCollection = collection(db, "tools");

// Convert Firestore document to Tool type
function docToTool(doc: QueryDocumentSnapshot<DocumentData>): Tool {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    url: data.url,
    category: data.category,
    rating: data.rating,
    dateAdded: data.dateAdded?.toDate?.() || null,
  };
}

// Fetch all tools from Firestore
export async function fetchTools(): Promise<Tool[]> {
  try {
    const querySnapshot = await getDocs(toolsCollection);
    return querySnapshot.docs.map(docToTool);
  } catch (error) {
    console.error("Failed to fetch tools from Firestore:", error);
    return [];
  }
}

// Add a new tool to Firestore with timestamp
export async function addTool(tool: Omit<Tool, "id" | "dateAdded">): Promise<void> {
  try {
    await addDoc(toolsCollection, {
      ...tool,
      dateAdded: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to add tool to Firestore:", error);
    throw error;
  }
}

// Update a tool by id in Firestore
export async function updateTool(id: string, updatedFields: Partial<Tool>): Promise<void> {
  try {
    const docRef = doc(db, "tools", id);
    await updateDoc(docRef, updatedFields);
  } catch (error) {
    console.error("Failed to update tool in Firestore:", error);
    throw error;
  }
}

// Delete a tool by id from Firestore
export async function deleteTool(id: string): Promise<void> {
  try {
    const docRef = doc(db, "tools", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Failed to delete tool from Firestore:", error);
    throw error;
  }
}
