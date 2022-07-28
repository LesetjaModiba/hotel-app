import '../css/adminSignin.css'
import { useHistory, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
function ForgotPassword()
{  
    const [email,setEmail]=useState('');


    let history=useHistory();
    
    const submit=(()=>
    {
       sendPasswordResetEmail(auth,email).then(()=>{
        alert("Password reset email was sent")
    }).catch((error)=>{alert("Error while veryfying email")})
    });
    return(
        <div className="login-container">
            <h1>Forgot password</h1>
            <input onChange={(e)=>setEmail(e.target.value)} className="email" type="email" placeholder="Enter your email"/>
            <Link to="/clientSignin" style={{color:"black",textDecoration:"none" }}>Back</Link>
            <button className='login-btn' onClick={submit}>Submit</button>

        </div>
    )

}
export default ForgotPassword;