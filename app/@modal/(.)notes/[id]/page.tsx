import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import type { NoteDetailsPageProps } from "@/types/params";
import { fetchNoteById } from "@/lib/api";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";


export default async function NotePreviewPage({ params }: NoteDetailsPageProps) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });
   
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreview />
        </HydrationBoundary>
    )
}



