import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const data = await fetchNotes();

  return <NotesClient notes={data.notes} totalPages={data.totalPages} />;
}
