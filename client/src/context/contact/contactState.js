import React, {useReducer} from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
ADD_CONTACT,
GET_CONTACT,
LOSE_CONTACT,
CONTACT_ERROR,
DELETE_CONTACT,
SET_CURRENT,
CLEAR_CURRENT,
UPDATE_CONTACT,
FILTER_CONTACTS,
CLEAR_FILTER,
CLEAR_CONTACTS
} from '../types'




function ContactState(props) {
   const initialState = {
     contacts : null,
     current : null,
     filtered : null,
     error : null
   } 

    const [state , dispatch] =  useReducer(ContactReducer, initialState)  

    const addContact = async FormData => {
         const config = {
          header : {
             'Content-Type' : 'application/json'
           }
         }

      try {
        
        const res = await axios.post('/api/contacts', FormData, config)
        
        dispatch({
          type : ADD_CONTACT,
          payload : res.data
        })

      } catch (error) {
        dispatch({
          type : CONTACT_ERROR,
          payload: error.response.msg
        })
      }
      
}

const getContacts = async() => {
  try {
    
   const res = await axios.get('/api/contacts')
    
   dispatch({
     type : GET_CONTACT,
     payload : res.data
   })

  } catch (error) {
    
    dispatch({
      type : LOSE_CONTACT,
      payload : error.response.data.msg
    })

  }
}

const updateContact = async(contact) => {
      
  const config = {
    header : {
       'Content-Type' : 'application/json'
     }
   }

try {
  
  const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
  
  dispatch({
    type : UPDATE_CONTACT,
    payload : res.data
  })

} catch (error) {
  dispatch({
    type : CONTACT_ERROR,
    payload: error.response.msg
  })
}

}

const clearContacts = () => {
  dispatch({
    type : CLEAR_CONTACTS
    })
}



    const onDeleteContact = async _id => {

      try {
         await axios.delete(`/api/contacts/${_id}`)

        dispatch({
          type : DELETE_CONTACT,
          payload : _id
        })
  
        
      } catch (error) {
        
      }



     
    }

    const onEditContact = (contact) => {
      dispatch({
        type : SET_CURRENT,
        payload : contact
      })
    }

    const clearCurrent = () => {
      
      
      dispatch({
        type : CLEAR_CURRENT
      })
    }

    

    const filterContact = (text) => {
      
      dispatch({
        type : FILTER_CONTACTS,
        payload : text
      })
    }

    const clearContact = () => {
      
      dispatch({
        type : CLEAR_FILTER
      })
    }


    return (
        <ContactContext.Provider value={{
            contacts : state.contacts,
            current : state.current,
            filtered : state.filtered,
            error : state.error,
            addContact,
            onDeleteContact,
            onEditContact,
            clearCurrent,
            updateContact,
            filterContact,
            clearContact,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
