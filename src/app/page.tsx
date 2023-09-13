import styles from './page.module.css'
import { Metadata } from 'next'

async function getData() {
  const res = await fetch('https://api-staging.vfans.org/channel/short-link/brucejin')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function generateMetadata(): Promise<Metadata> {
  const channel = await fetch(`https://api-staging.vfans.org/channel/short-link/brucejin`).then(
    (res) => res.json()
  )

  return {
    title: channel.data.title,
    description: channel.data.intro2,
  }
}

export default async function Home() {
  const data = await getData()

  return (
    <main className={styles.main}>
      <h1>{data.data.title}</h1>
      <img style={{ maxWidth: '100%' }} src={data.data.signed_cover} alt="avatar" />
      <p>{data.data.intro2}</p>
    </main>
  )
}
