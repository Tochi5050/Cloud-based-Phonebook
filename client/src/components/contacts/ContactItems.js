import React, {useContext} from 'react'
import ContactContext from '../../context/contact/contactContext'

function ContactItems({contact}) {
    const {name, _id, email, phone, type} = contact

    const contactContext = useContext(ContactContext)

    const {onDeleteContact, onEditContact, contacts} = contactContext

    const onDelete = () => {
        onDeleteContact(_id)
       
    }

    const onEdit = () => {
        onEditContact(contact)
    }

    return (
        <div className="card bg-light">
            
            
            <h3 className="text-primary text-left">
               {name}{' '} <span style={myStyle} className={type === 'Professional' ? 'badge-successs' : 'badge-primaryy'}>{type}</span>
            </h3>
            <ul className="list text-primary">
            {email && (<li>
            <i class="bi bi-envelope-fill"></i>{email}
            </li>)}

            {phone && (<li>
            <i class="bi bi-telephone-fill"></i>{phone}
            </li>)}
            </ul>
            
            <button className="btn btn-dark btn-sm" onClick={onEdit}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
        </div>
    )
}

const myStyle = {
    display: 'inline-block',
    fontSize: '0.8rem',
    padding: '0.2rem 0.7rem',
    margin: '0.3rem',
    textAlign: 'center',
    float : 'right'
}

export default ContactItems
