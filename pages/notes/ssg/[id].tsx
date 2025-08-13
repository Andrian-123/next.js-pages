import { GetServerSideProps, InferGetStaticPropsType } from 'next'

type Data = {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
}
type Meta = {
  limit: number
  page: number
  total: number
  total_pages: number
}
type Notes = {
  data: Data
  message: string
  meta?: Meta
  status: string
}

export const getStaticPaths = async () => {
  const notes = await fetch(`https://service.pace11.my.id/api/notes`).then(
    (res) => res.json(),
  )
  const paths = notes.data.map((note: Data) => ({ params: { id: note.id } }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = (async (context) => {
  const { params } = context
  const notes = await fetch(
    `https://service.pace11.my.id/api/notes/${params?.id || ''}`,
  ).then((res) => res.json())
  return { props: { notes } }
}) satisfies GetServerSideProps<{ notes: Notes }>

export default function NoteSSGDetail({
  notes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="bg-gray-100 p-4 rounder">
      <h2 className="text-xl font-bold">{notes.title}</h2>
      <p className="text-gray-600">{notes.description}</p>
      <p className="text-gray-600">{notes.created_at}</p>
    </div>
  )
}
