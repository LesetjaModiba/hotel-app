import '../css/adminSignin.css'
import { useHistory, Link } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../config/firebase';
import { useState } from 'react';
function AdminSignIn()
{  
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    let history=useHistory();
    
    const loginClick=(()=>
    {
        if(document.querySelector(".email").value==="")
        {
            document.querySelector(".emailError").style.display='block';
        }
        if(document.querySelector(".password").value==="")
        {
            document.querySelector(".passError").style.display='block';
        }
         else
         {
            history.push("/home");
         }
        // {
        //     signInWithEmailAndPassword(auth, email, password).then(()=>{
        //         history.push("/home");
        //     }).catch((error)=>{console.log(error)})

        // }
         
    });
    const emailKey=(()=>
    {
       document.querySelector(".emailError").style.display='none';
    });
    const passKey=(()=>
    {
        document.querySelector(".passError").style.display='none';
    });
    return(
        <div className="login-container">
            <h1>Admin Log in</h1>
            <input onKeyPress={emailKey} onChange={(e)=>setEmail(e.target.value)} className="email" type="email" placeholder="Enter your email"/>
            <span className="emailError">Enter your email or username!</span>
            <input onKeyPress={passKey} onChange={(e)=>setPassword(e.target.value)} className="password" type="password" placeholder="Type your password"/>
            <span  className="passError">password can't be empty!</span>
            <Link className='link1' to="/adminSignup">Don't have an account? Click here to sign up</Link>
            <button className='login-btn' onClick={loginClick}>Login</button>

        </div>
    )

}
export default AdminSignIn;