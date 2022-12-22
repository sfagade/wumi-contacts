import Head from 'next/head'
import Layout from '../components/layout'
import Container from '../components/container'

export default function Home({preview}) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Wumi's Contact Manager</title>
          <link href="/dist/output.css" rel="stylesheet"></link>
        </Head>
        <Container>
          <div className="text-3xl font-bold underline">This is my content!!</div>
        </Container>
      </Layout>
    </>
  )
}
