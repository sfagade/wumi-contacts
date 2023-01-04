import Link from 'next/link'

export default function ContactsDisplay({ contacts }) {
    return (
      <>
        <ul className="list-group mt-2" id="contacts_ul">
            {contacts.map(contact => {
                return (
                    <li key={contact.id}
                        className="mb-6 mt-3 border border-solid ">
                        <div className="p-10 border-2 border-solid">
                                <div className="p-10">{contact.fullName}</div>
                                <div className="p-10">{contact.emailAddress} | Email</div>
                                <div className="p-10">{contact.phoneNumber} | Call | Text</div>
                                <div className="p-10">Update | Delete</div>
                            </div>

                    </li>
                    )
                })
            }
        </ul>
      </>
    )
  }