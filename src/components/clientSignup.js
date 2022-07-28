import '../css/adminSignup.css';
import { useHistory, Link} from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { useState } from 'react';
function ClientSignUp()
{
    const UsersCollectionRef=collection(db,"users")
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [full_name,setFullName]=useState("");
    const [location,setLocation]=useState("");
    const [file, setFile] = useState("");

    function handleChange(event) {
        setFile(event.target.files[0]);
        
    }
    let history=useHistory();
    const signUpClick=(()=>
    {
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
        //     history.push("/clientSignin")
        // }
    //  history.push("/home")
    {createUserWithEmailAndPassword(auth, email, password).then(()=>{
        const userDetails={
            full_name:full_name,
            email:email,
            location:location,
            userId:auth.currentUser.uid,
            profile_pic:file.name
        };
        addDoc(UsersCollectionRef, userDetails).then(()=>{
            alert("added successfully")
        }).catch((error)=>{console.log(error);})

        history.push("/clientHome")
    }).catch((error)=>{console.log(error)})
    }
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
    console.log(file.name);
    return(
        <div className='sign-container'>
        <h1>Client Sign Up</h1>
        <input onKeyPress={nameKey} className='input1' id='name' type="text" placeholder="Name and Surname" onChange={(e)=>setFullName(e.target.value)}/>
        <span className='nameError' >Enter your name and surname !</span>
        <input onKeyPress={emailKey} onChange={(e)=>setEmail(e.target.value)} className='input1' id='email' type="email" placeholder="email example@gmail.com"/>
        <span className='emailError'>Enter your email !</span>
        <input className='input1'  type="text" placeholder="Location" onChange={(e)=>setLocation(e.target.value)}/>
        <input onKeyPress={passKey} onChange={(e)=>setPassword(e.target.value)} className='input1' id='password' type="password" placeholder="Password"/>
        <span className='passError'>Enter your password !</span>
        <input onKeyPress={cPassKey} className='input1' id='cPassword' type="password" placeholder="Confirm password"/>
        <span className='cPassError'>Confirm your password !</span>
        <label htmlFor="file">Choose image</label>
                 <input type="file" id ="file" accept="image/*" onChange={handleChange}/>
        <Link className='link2' to="/clientSignin">Already have and account? Log in here</Link>
        <button onClick={signUpClick}>Sign up</button>
        </div>
    )

}
export default ClientSignUp;