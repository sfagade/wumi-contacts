import Head from 'next/head'
import Layout from '../components/layout'
import Container from '../components/container'

export default function Home({preview}) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Wumi's Contact Manager</title>
        </Head>
        <Container>
          <div>This is my content!!</div>
        </Container>
      </Layout>
    </>
  )
}
