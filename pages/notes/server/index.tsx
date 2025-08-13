import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/Link'
type Data = {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
}
type Meta = {
  limit: Number
  page: Number
  total: number
  total_pages: number
}
type Notes = {
  data: Data[]
  message: string
  meta?: Meta
  status: string
}

export const getServerSideProps = (async () => {
  const notes = await fetch('https://service.pace11.my.id/api/notes').then(
    (res) => res.json(),
  )
  return { props: { notes } }
}) satisfies GetServerSideProps<{ notes: Notes }>

export default function NoteServerPage({
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="grid grid-col-4 gap-4">
      {notes?.data.map((note: Data) => (
        <Link
          href={`/notes/server/${note.id}`}
          key={note.id}
          className="bg-gray-100 p-4 rounder"
        >
          <h2 className="text-xl font-bold">{note.title}</h2>
          <p className="text-gray-600">{note.description}</p>
          <p className="text-gray-600">{note.created_at}</p>
        </Link>
      ))}
    </div>
  )
}
