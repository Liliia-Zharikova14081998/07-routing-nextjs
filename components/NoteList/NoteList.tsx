import css from "./NoteList.module.css" 
import type { Note } from "../../types/note"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "../../lib/api"
import Link from "next/link"

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
  isError: boolean;
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    }
  });  
  
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (!notes.length) {
    return <p className={css.noNotes}>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <Link href={`/notes/${note.id}`}>View details</Link>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}