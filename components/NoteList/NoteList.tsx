import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import type { Note } from "../../types/note";
import { deleteNote } from "../../lib/api";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.card}>
          <Link href={`/notes/${note.id}`}>
            <h3 className={css.title}>{note.title}</h3>
          </Link>
          <p className={css.content}>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
          <button
            className={css.delete}
            onClick={() => deleteMutation.mutate(note.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
