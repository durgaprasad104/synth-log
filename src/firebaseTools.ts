import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "./firebase";

const toolsCollection = collection(db, "tools");

// Fetch all tools
export async function fetchTools() {
  const querySnapshot = await getDocs(toolsCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add a new tool
export async function addTool(tool) {
  await addDoc(toolsCollection, tool);
}

// Update a tool by id
export async function updateTool(id, updatedFields) {
  const docRef = doc(db, "tools", id);
  await updateDoc(docRef, updatedFields);
}

// Delete a tool by id
export async function deleteTool(id) {
  const docRef = doc(db, "tools", id);
  await deleteDoc(docRef);
}
