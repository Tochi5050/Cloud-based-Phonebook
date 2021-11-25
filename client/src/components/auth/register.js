import React, {useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'


function Register(props) {
    
  const [user, setUser] = useState({
        name : '',
        email : '',
        password : '',
        password2 : ''
    })

    const {name, email, password, password2} = user

    const onChange = e => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    const alertContext  = useContext(AlertContext)

    const {setAlert} = alertContext  

    const authContext  = useContext(AuthContext)

    const {register, error, isAuthenticated} =  authContext
    
useEffect(() => {
   if(isAuthenticated){
     props.history.push('/')
   }

   if(error){
        setAlert(error, 'danger')
    }
    //eslint-disable-next-line
}, [error, isAuthenticated, props.history])


    const onSubmit = e => {
        e.preventDefault()
        if(name === '' || email === '' || password === ''){
            setAlert("Please input your biodata", 'danger')
        }else if(password !== password2){
            setAlert('Both passwords do not match', 'danger')
        }else{
           register({
               name,
               email,
               password
           })
        }
    }

    

     const onClick = e => {
        e.preventDefault()
        setUser({
            name : '',
            email : '',
            password : '',
            password2 : ''
        })
    }

    return (
        <div className="form-container">
           <h1>Account <span className="text-primary">Register</span></h1>
           <form onSubmit={onSubmit}>
            <div className="form-group">
             <label htmlFor="name">Name</label>
             <input type="text" name="name" value={name} onChange={onChange}/>
            </div>

            <div className="form-group">
             <label htmlFor="name">Email Address</label>
             <input type="email" name="email" value={email} onChange={onChange}/>
            </div>

            <div className="form-group">
             <label htmlFor="password">Password</label>
             <input type="password" name="password" value={password} onChange={onChange}/>
            </div>

            <div className="form-group">
             <label htmlFor="password2">Confirm Password</label>
             <input type="password" name="password2" value={password2} onChange={onChange}/>
            </div>

            <div>
            <input type="submit" value = "Register" className="btn btn-primary btn-block" />
            </div>
             
             <div>
            <input type="submit" value = "Clear" className="btn btn-light btn-block" onClick={onClick} />
            </div>
           </form> 
        </div>
    )
}

export default Register