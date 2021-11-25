import React,{Fragment, useContext} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

function Navbar({title, icon}) {

const authContext = useContext(AuthContext)

const{isAuthenticated, loading, logOut, user} = authContext

const contactContext = useContext(ContactContext)

const {clearContacts} = contactContext


const logout = ()=>{
  logOut()
  clearContacts()
}

const NavLinks = (
    <Fragment>
        <li>Hello {user && user.name}</li>
        <li><a onClick={logout} href='#!'><span >Logout</span></a><i class="bi bi-arrow-left-square-fill"/></li>
    </Fragment>
)

const oNavLinks = (
    <Fragment>
       <li>
           <Link to="/register">Register</Link>
           </li>
           <li>
           <Link to="/login">Login</Link>
           </li>
    </Fragment>
)


    return (
        <div className="navbar bg-primary">
           <h1>
           <i class="bi bi-journal-plus"></i>
           {title}
           </h1>
           <ul> 
           {isAuthenticated ? NavLinks : oNavLinks}
           </ul>
        </div>
    )
}


Navbar.propTypes = {
title : PropTypes.string.isRequired,

}


Navbar.defaultProps = {
    title : "Contacts Keeper"
    
}



export default Navbar
