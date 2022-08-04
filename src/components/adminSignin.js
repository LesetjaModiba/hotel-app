import '../css/adminSignin.css'
import { useHistory} from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useState } from 'react';
function AdminSignIn()
{  
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [adminId,setAdminId]=useState("");
    const [loading, setLoading] = useState(false);

    let history=useHistory();
    console.log("email :", "admin@gmail.com")
    console.log("Password :", "123456")
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
        //  {
        //     history.push("/home");
        //  }
        {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password).then(()=>{ 
                history.push("/home");
            }).catch((error)=>{console.log(error);
                setLoading("false")
                document.getElementById("loader").style.display = "none";
            })

        }
         
    });

    if (loading === true) {
        document.getElementById("loader").style.display = "block";
      }

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
             <div
        style={{
          width: "180px",
          height:"40px",
          paddingBottom:"10px",
          textAlign: "center",
          background: "orange",
          borderRadius: "8px",
          display: "none",
        }}
        id="loader"
      >
        <h3>Loading...</h3>
      </div>
            <h1>Admin Log in</h1>
            <input onKeyPress={emailKey} onChange={(e)=>setAdminId(e.target.value)} className="adminId" value="212" type="text" placeholder="admin ID"/>
            <span className="adminError">Enter your email or username!</span>
            <input onKeyPress={emailKey} onChange={(e)=>setEmail(e.target.value)} className="email" type="email" placeholder="Enter your email"/>
            <span className="emailError">Enter your email or username!</span>
            <input onKeyPress={passKey} onChange={(e)=>setPassword(e.target.value)} className="password" type="password" placeholder="Type your password"/>
            <span  className="passError">password can't be empty!</span>
            <button className='login-btn' onClick={loginClick}>Login</button>

        </div>
    )

}
export default AdminSignIn;