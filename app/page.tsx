import { fetchNotes } from "../lib/api";
import NotesClient from "./notes/Notes.client";

export default async function NotesPage() {
  const data = await fetchNotes();

  return <NotesClient notes={data.notes} totalPages={data.totalPages} />;
}
