import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import type { NoteDetailsPageProps } from "@/types/params";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";


export default async function NotePreviewPage({ params }: NoteDetailsPageProps) {
    const { id } = await params;
    const note = await fetchNoteById(id);
   
    return (
        <Modal>
            <NotePreview note={note} />
        </Modal>
    )
}



