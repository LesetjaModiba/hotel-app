import "../css/loginas.css"
import { useHistory } from "react-router-dom"
const LoginAs = () => {
    let history=useHistory();
    const client=()=>
    {
        history.push("/clientSignin")
    }
    const admin=()=>
    {
        history.push("/adminSignin")
    }
    return ( 
        <div className="loginas-container">
        <h1>Log in as</h1>
        
        <button className='login-btn' onClick={client}>Client</button>
        <button className='login-btn' onClick={admin}>Admin</button>

    </div>
     );
}
 
export default LoginAs;