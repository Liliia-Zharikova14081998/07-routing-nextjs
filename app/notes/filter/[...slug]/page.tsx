import { fetchNotes } from '../../../../lib/api';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';  
import NotesClient from './Notes.client';
import type { NotesFilterPageProps } from '../../../../types/params';

export default async function NotesPage({ params }: NotesFilterPageProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const tag = slug?.[0] ?? "";
  const normalizedTag = tag === "All" ? "" : tag;
 
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, normalizedTag, ""],
    queryFn: () => fetchNotes(1, normalizedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={normalizedTag}/>
    </HydrationBoundary>
  )
}