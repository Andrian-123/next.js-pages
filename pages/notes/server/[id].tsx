import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

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
  data: Data
  message: string
  meta?: Meta
  status: string
}

export const getServerSideProps = (async (context) => {
  const { params } = context
  const notes = await fetch(
    `https://service.pace11.my.id/api/notes/${params?.id || ''}`,
  ).then((res) => res.json())
  return { props: { notes } }
}) satisfies GetServerSideProps<{ notes: Notes }>

export default function NoteServerPage({
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="bg-gray-100 p-4 rounder">
      <h2 className="text-xl font-bold">{notes.title}</h2>
      <p className="text-gray-600">{notes.description}</p>
      <p className="text-gray-600">{notes.created_at}</p>
    </div>
  )
}
