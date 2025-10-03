'use client';

import css from './NotePreview.module.css';
import type { Note } from '@/types/note';
import { useRouter } from "next/navigation";

interface NotePreviewProps {
    note: Note;
}

export default function NotePreview ({ note }: NotePreviewProps) {
    const router = useRouter();   
    const handleClick = () => {
        router.back();
    }
    return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
        <h2>{note.title}</h2>
        <button onClick={handleClick} className={css.backBtn}>Back</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
        {note.tag && <span className={css.tag}>{note.tag}</span>}
      </div>
    </div>
  );
}

