
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
    } from '../types';

    const ContactReducer = (state, action) => {
        switch (action.type) {
        case ADD_CONTACT:
        return {
            ...state,
            contacts : [...state.contacts, action.payload]
        };

        case CONTACT_ERROR:
        return {
            ...state,
            error : action.payload
        };

        case GET_CONTACT:
        return{
           ...state,
            contacts : action.payload
        }

        case LOSE_CONTACT:
        return{
           ...state,
            error: action.payload
        }

        case DELETE_CONTACT:
        return {
            ...state,
            contacts : state.contacts.filter(contact => contact._id !== action.payload)
        };

        case SET_CURRENT:
        return {
            ...state,
            current : action.payload
        };

        case CLEAR_CONTACTS:
            return{
                ...state,
                contacts : null,
                current : null,
                filtered : null,
                error : null
            }

        case CLEAR_CURRENT:
        return {
            ...state,
            current : null
           
        };

        case UPDATE_CONTACT:
        return {
            ...state,
            contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact)
           
        };

        case FILTER_CONTACTS:
        return {
            ...state,
            filtered : state.contacts.filter(contact => {
                const regex = new RegExp(`${action.payload}`, 'gi')
                return contact.name.match(regex) || contact.email.match(regex)
            })
           
        };

        case CLEAR_FILTER:
        return {
            ...state,
            filtered : null
            }
           
        

        default: 
        return state;
    
        }
    }

      export default ContactReducer