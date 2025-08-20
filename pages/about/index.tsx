import Image from 'next/image'
import { useState } from 'react'
//import HeavyComponent from '@/components/HeavyComponent'
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import(`@/components/HeavyComponent`), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})
export default function About() {
  const [show, setShow] = useState(false)
  return (
    <div>
      About page<button onClick={() => setShow(true)}>Show Component</button>
      <Image
        src="/public/vercel.svg"
        width={'1000'}
        height={'1000'}
        alt=""
        sizes="100vw"
        priority
      />
      {show && <HeavyComponent />}
    </div>
  )
}
