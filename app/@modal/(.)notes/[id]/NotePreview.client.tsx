'use client';

import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from "next/navigation";
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';


export default function NotePreview () {
  const router = useRouter();   
  const params = useParams();
  const { id } = params as { id: string };
  
  const handleClick = () => {
    router.back();
  }

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading, please wait...</p>
      </Modal>
    );
  }

if (error || !note) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Something went wrong.</p>
      </Modal>
    );
  }

  return (
      <Modal onClose={handleClick}>
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
      </Modal>
  );
}

