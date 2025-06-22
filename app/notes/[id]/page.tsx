import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const noteId = Number(params.id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
}
