"use client";

import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import { useState } from "react";
import NoteModal from "../../components/NoteModal/NoteModal";
import SearchBox from "../../components/SearchBox/SearchBox";
import { Note } from "../../types/note";

interface NotesClientProps {
  notes: Note[];
  totalPages: number;
}

export default function NotesClient({ notes, totalPages }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <header>
        <SearchBox value={searchText} onChange={setSearchText} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={totalPages}
            onPageChange={setPage}
          />
        )}
        <button onClick={() => setIsModalOpen(true)}>Create note +</button>
      </header>

      <NoteList notes={notes} />

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
