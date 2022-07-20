import "../css/loginas.css"
import { useHistory } from "react-router-dom"
const LoginAs = () => {
    let history=useHistory();
    const client=()=>
    {
        history.push("/clientHome")
    }
    const admin=()=>
    {
        history.push("/AdminHome")
    }
    return ( 
        <div className="login-container">
        <h1>Log in as</h1>
        
        <button className='login-btn' onClick={client}>Client</button>
        <button className='login-btn' onClick={admin}>Admin</button>

    </div>
     );
}
 
export default LoginAs;