import Head from 'next/head'
import Layout from '../components/layout'
import Container from '../components/container'
import Header from '../components/header'
import ContactsDisplay from '../components/contacts_display'

export default function Home({contacts_list}) {
  return (
    <>
      <Layout>
        <Head>
          <title>Wumi's Contact Manager</title>
          <link href="/dist/output.css" rel="stylesheet"></link>
        </Head>
        <Header />
        <Container>
          <ContactsDisplay contacts={contacts_list} />
        </Container>
      </Layout>
    </>
  )
}
