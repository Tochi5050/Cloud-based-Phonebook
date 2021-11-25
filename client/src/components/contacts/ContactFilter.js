import React, {useEffect, useRef, useContext} from 'react'
import ContactContext from '../../context/contact/contactContext'

function ContactFilter() {
    const contactContext =  useContext(ContactContext)

    const {filterContact, clearContact, filtered} = contactContext

    const text = useRef('')

    useEffect(() => {
        if(filtered === null){
            text.current.value = ''
        }
    })


    const onChange = e => {
        if(text.current.value !== "") {
            filterContact(e.target.value)
        }else{
            clearContact()
        }
    }
    
    return (
        <div>
            <input 
            type="text" 
            placeholder="filter contacts..." 
            ref={text} 
            onChange={onChange}
            />
        </div>
    )
}

export default ContactFilter
