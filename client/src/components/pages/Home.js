import React, {useEffect, useContext} from 'react'
import Contactform from '../contacts/Contactform'
import Contacts from '../contacts/Contacts'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'

 const Home = () => {
     const authContext = useContext(AuthContext)

     const{loadUser} = authContext

     useEffect(() => {
       if(localStorage.token){
           loadUser()
       }  
    //eslint-disable-next-line
     }, [])
    return (
        <div className="grid-2">
            <div>
            <Contactform/>
            </div>
            <div>
            <ContactFilter />
            <Contacts />
            </div>
        </div>
    )
}

export default Home