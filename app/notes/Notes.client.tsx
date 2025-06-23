"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import NoteModal from "../../components/NoteModal/NoteModal";
import SearchBox from "../../components/SearchBox/SearchBox";
import { fetchNotes } from "../../lib/api";
import { type Note } from "../../types/note";

interface NotesClientProps {
  notes: Note[];
  totalPages: number;
}

export default function NotesClient({ notes, totalPages }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const trimmedSearch = debouncedSearchText.trim();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", trimmedSearch, page],
    queryFn: () => fetchNotes(trimmedSearch, page),
    placeholderData: keepPreviousData,
    initialData: {
      notes,
      page: 1,
      totalPages,
      totalResults: notes.length,
    },
  });

  return (
    <div>
      <header>
        <SearchBox
          value={searchText}
          onChange={(value: string) => {
            setSearchText(value);
            setPage(1);
          }}
        />
        {!!data?.totalPages && data.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button onClick={() => setIsModalOpen(true)}>Create note +</button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes.</p>}

      {data?.notes && <NoteList notes={data.notes} />}

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
