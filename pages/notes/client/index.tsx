import useSWR from 'swr'
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
  data: Data[]
  message: string
  meta?: Meta
  status: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function NoteClientPage() {
  const { data, isLoading, error } = useSWR(
    `https://service.pace11.my.id/api/notes`,
    fetcher,
    { revalidateOnFocus: true },
  )

  if (isLoading) return <div>...Loading</div>

  if (error) return <div>Error...</div>

  return (
    <div className="grid grid-col-4 gap-4">
      {data?.data?.map((note: Data) => (
        <div key={note.id} className="bg-gray-100 p-4 rounder">
          <h2 className="text-xl font-bold">{note.title}</h2>
          <p className="text-gray-600">{note.description}</p>
          <p className="text-gray-600">{note.created_at}</p>
        </div>
      ))}
    </div>
  )
}
