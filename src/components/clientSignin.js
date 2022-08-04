import "../css/adminSignin.css";
import { useHistory, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";
function ClientSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const loginClick = () => {
    if (document.querySelector(".email").value === "") {
      document.querySelector(".emailError").style.display = "block";
    }
    if (document.querySelector(".password").value === "") {
      document.querySelector(".passError").style.display = "block";
    }
    //  {
    //     history.push("/clientHome");
    //  }
    else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          history.push("/clientHome");
        })
        .catch((error) => {
          alert("Error while logging in, Please check your email or password");
          console.log(error);
          setLoading("false")
          document.getElementById("loader").style.display = "none";
        });
    }
  };
//   console.log(loading);
  if (loading === true) {
    document.getElementById("loader").style.display = "block";
  }

  const emailKey = () => {
    document.querySelector(".emailError").style.display = "none";
  };
  const passKey = () => {
    document.querySelector(".passError").style.display = "none";
  };
  return (
    <div className="login-container">
      <div
        style={{
          width: "180px",
          height:"40px",
          paddingBottom:"10px",
          textAlign: "center",
          background: "orange",
          borderRadius: "5px",
          display: "none",
        }}
        id="loader"
      >
        <h3 >Loading...</h3>
      </div>
      <h1>Client Log in</h1>
      <input
        onKeyPress={emailKey}
        onChange={(e) => setEmail(e.target.value)}
        className="email"
        type="email"
        placeholder="Enter your email"
      />
      <span className="emailError">Enter your email or username!</span>
      <input
        onKeyPress={passKey}
        onChange={(e) => setPassword(e.target.value)}
        className="password"
        type="password"
        placeholder="Type your password"
      />
      <span className="passError">password can't be empty!</span>
      <Link className="link1" to="/forgotPassword">
        Forgot password?
      </Link>
      <Link className="link1" to="/clientSignup">
        Don't have an account? Click here to sign up
      </Link>
      <button className="login-btn" onClick={loginClick}>
        Login
      </button>
    </div>
  );
}
export default ClientSignIn;
