import Head from 'next/head'
import Layout from '../components/layout'
import Container from '../components/container'
import Header from '../components/header'
import ContactsDisplay from '../components/contacts-display'

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

export async function getServerSideProps() {

  console.log('Static props called')
  let contacts_list = [
    {
      "id": 1,
      "fullName": "Adam Mckay",
      "firstName": "Adam",
      "lastName": "Mckay",
      "phoneNumber": "+44703493283",
      "emailAddress": "adam.mckay@office.com"
    },
    {
      "id": 2,
      "fullName": "Kelvin McLoad",
      "firstName": "Kelvin",
      "lastName": "McLoad",
      "phoneNumber": "+447034933253",
      "emailAddress": "kelwin.mclord@office.com"
    }
  ]

  return {
    props: {
      contacts_list
    }, // will be passed to the page component as props
  }
}
