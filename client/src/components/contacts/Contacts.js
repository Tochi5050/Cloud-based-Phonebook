import React, {useContext, Fragment, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItems from './ContactItems';
import Spinner from '../layout/Spinner';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';


function Contacts() {
    const contactContext = useContext(ContactContext)

    const { contacts, filtered, loading, getContacts} = contactContext

    useEffect(() => {
      getContacts()
      //eslint-disable-next-line
    }, [])
      
    if(contacts !==null && contacts.length === 0 && !loading  ){
      return <h3>Please add a contact</h3>
    }
       
   

    
      
      


    return (
        <Fragment>
            {!loading && contacts!==null ? (
              <TransitionGroup>
              {
            (filtered ? filtered.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                <ContactItems  contact={contact} />
                </CSSTransition>
                ))  : contacts.map(contact => (
                <CSSTransition
              key={contact._id}
              timeout={500}
              classNames="item"
            >
                <ContactItems  contact={contact} />
               </CSSTransition>
             )) )
          }
              </TransitionGroup>

            ): <Spinner/>}
        

           

            



        </Fragment>
    )
}


export default Contacts 
