import Link from 'next/link'

export default function ContactsDisplay({ contacts }) {
    return (
      <>
        <ul className="list-group mt-2" id="contacts_ul">
            {contacts.map(contact => {
                return (
                    <li key={contact.id}>
                        <div>
                            <div>{contact.fullName}</div>
                            <div>{contact.emailAddress} | Email</div>
                            <div>{contact.phoneNumber} | Call | Text</div>
                            <div>Update | Delete</div>
                        </div>
                    </li>
                    )
                })
            }
        </ul>
      </>
    )
  }