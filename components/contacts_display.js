import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ContactsDisplay({ contacts }) {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/api/v.0.1/vehicles?last_id=0')
      .then((res) => res.json())
      .then((data) => {
        console.log('received data ', data)
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

    return (
      <>
        <ul className="list-group mt-2" id="contacts_ul">
            {data[0].map(contact => {
                return (
                    <li key={contact.record_id}
                        className="mb-6 mt-3 border border-solid ">
                        <div className="p-10 border-2 border-solid">
                                <div className="p-10">{contact.make} {contact.model}</div>
                                <div className="p-10">{contact.price}</div>
                                <div className="p-10">{contact.year}</div>
                                <div className="p-10">{contact.views}</div>
                                <div className="p-10">{contact.created_at['$date']}</div>
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