import '../css/adminSignup.css';
import { useHistory, Link} from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useState } from 'react';
import { collection } from 'firebase/firestore';
import { db } from '../config/firebase';
function AdminSignUp()
{
    const UsersCollectionRef=collection(db,"users")
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [adminId,setAdminId]=useState('');
    const [full_name,setFullName]=useState("");
    const [location,setLocation]=useState("");
    let history=useHistory();
    const signUpClick=(()=>
    {
        if(document.querySelector("#admin").value==="")
        {
            document.querySelector(".adminError").style.display='block';
        }
        if(document.querySelector("#name").value==="")
        {
            document.querySelector(".nameError").style.display='block';
        }
        if(document.querySelector("#email").value==="")
        {
            document.querySelector(".emailError").style.display='block';
        }
        if(document.querySelector("#password").value==="")
        {
            document.querySelector(".passError").style.display='block';
        }
        if(document.querySelector("#cPassword").value==="")
        {
            document.querySelector(".cPassError").style.display='block';
        }
        else
        // {
        //     history.push("/adminSignin")
        // }
    //  history.push("/home")
    {createUserWithEmailAndPassword(auth, email, password).then(()=>{
        



        history.push("/home")
    }).catch((error)=>{console.log(error)})
    }
    });

    const adminKey=(()=>
    {
        document.querySelector(".adminError").style.display='none';
    });
    const nameKey=(()=>
    {
       document.querySelector(".nameError").style.display='none';
    });
    const emailKey=(()=>
    {
       document.querySelector(".emailError").style.display='none';
    });
    const passKey=(()=>
    {
        document.querySelector(".passError").style.display='none';
    });
    const cPassKey=(()=>
    {
        document.querySelector(".cPassError").style.display='none';
    });
    return(
        <div className='sign-container'>
        <h1>Admin Sign Up</h1>
        <input onKeyPress={adminKey} onChange={(e)=>setAdminId(e.target.value)} className='input1' id='admin' type="text" placeholder="Admin ID"/>
        <span className='adminError'>Enter the Admin ID !</span>
        <input onKeyPress={nameKey} className='input1' id='name' type="text" placeholder="Name and Surname" onChange={(e)=>setFullName(e.target.value)}/>
        <span className='nameError' >Enter your name and surname !</span>
        <input onKeyPress={emailKey} onChange={(e)=>setEmail(e.target.value)} className='input1' id='email' type="email" placeholder="email example@gmail.com"/>
        <span className='emailError'>Enter your email !</span>
        <input onKeyPress={passKey} onChange={(e)=>setPassword(e.target.value)} className='input1' id='password' type="password" placeholder="Password"/>
        <span className='passError'>Enter your password !</span>
        <input onKeyPress={cPassKey} className='input1' id='cPassword' type="password" placeholder="Confirm password"/>
        <span className='cPassError'>Confirm your password !</span>
        <imput className="check" type="checkbox"/>
        <label for="check">Show password</label> 
        <Link className='link2' to="/adminSignin">Already have and account? Log in here</Link>
        <button onClick={signUpClick}>Sing up</button>
        </div>
    )

}
export default AdminSignUp;