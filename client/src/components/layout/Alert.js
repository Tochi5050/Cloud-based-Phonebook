import React, {useContext} from 'react'
import AlertContext from '../../context/alert/alertContext'

function Alert() {
    
    const alertContext = useContext(AlertContext)

    const{alerts} = alertContext
    
    return (
     alerts.length > 0 && alerts.map( alert => (
              <div key={alert.id} className={`alert-${alert.type}`}>
                {alert.msg}
              </div>
          ))
          
          
          
        
    )
}

export default Alert
