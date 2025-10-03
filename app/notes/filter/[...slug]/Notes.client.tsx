"use client"

import css from './NotesPage.module.css';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import { useDebounce } from 'use-debounce';
import type { PaginatedNotes } from '../../../../types/pagination';
import NoteList from '../../../../components/NoteList/NoteList';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../components/Pagination/Pagination';
import Modal from '../../../../components/Modal/Modal';

interface NotesClientProps {
    initialTag: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);

      const { data, isLoading, isError } = useQuery<PaginatedNotes>({
    queryKey: ['notes', page, initialTag, debouncedSearch],
    queryFn: () => fetchNotes(page, initialTag, debouncedSearch),
    placeholderData: keepPreviousData,
      });
    
    const handleSearch = (value: string) => {
  setSearch(value);
  setPage(1);
    }

      return (
    <div className={css.app}>
	<header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages}
            onPageChange={setPage} />
        )}
        <button className={css.button} onClick={openModal}>Create note +</button>
        </header>
        <NoteList
          notes={data?.notes || []}
          isLoading={isLoading}
          isError={isError} />
    {isModalOpen && (
        <Modal onClose={closeModal}>
      <NoteForm onClose={closeModal} />
        </Modal>  
  )}
</div> 
  );  
}
    
