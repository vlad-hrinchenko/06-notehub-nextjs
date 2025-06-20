"use client";

import { useParams } from "next/navigation";

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params?.id;

  return <div>Note ID: {id}</div>;
}
