import React,{useContext, useState, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext'

function Contactform() {
const contactContext = useContext(ContactContext)

const {addContact, current, clearCurrent, updateContact, contacts} = contactContext


useEffect(() => {
    if(current !== null){
        setContact(current)
    }
    else{
        setContact({
          name : '',
          email : '',
          phone : '',
          type : 'Personal'
        })}
    
}, [contactContext, current])


const [contact, setContact] = useState({
    name : '',
    email : '',
    phone : '',
    type : 'Personal'

      })

     
    
const {name, email, phone, type} = contact

const onSubmit = e => {
    e.preventDefault()
    if(current !== null){
        updateContact(contact)   
    }else if(contacts){
        addContact(contact)
    }
    else{
        setContact({
            name : '',
            email : '',
            phone : '',
            type : 'Personal' 
        }) 
    }
    
}

const clearAll = (e) => {
    e.preventDefault()
    clearCurrent()
}

const onChange = (e) => setContact({...contact, [e.target.name] : e.target.value})




    return (
        <form >
        <h2 className="text-primary">{current ? 'Update Contact' : 'Add Contact'}</h2>

        <input type="text" 
        name="name" 
        placeholder="Name" 
        onChange={onChange} 
        value={name}
        />

       <input type="text" 
        name="email" 
        placeholder="Email" 
        onChange={onChange} 
        value={email}
        />

       <input type="text" 
        name="phone" 
        placeholder="Phone" 
        onChange={onChange} 
        value={phone} 
        />
    
    <h5>Contact Type </h5>

       <input type="radio" 
        name="type" 
        value='Personal'
        onChange={onChange} 
        checked={type === 'Personal'}
        /> Personal {' '}

        <input type="radio" 
        name="type"  
        value='Professional'
        onChange={onChange} 
        checked={type === 'Professional'}
        /> Professional {' '}

       <div>
       <button className="btn btn-primary btn-block" onClick={onSubmit}>{current ? 'Update Contact' : 'Add Contact'}</button> 
       </div>

       {current &&
       <div>
       <button className="btn btn-light btn-block" onClick={clearAll}>Clear All</button> 
       </div>}
       </form>
       
    )
}

export default Contactform
