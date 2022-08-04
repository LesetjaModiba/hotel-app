import "../css/adminSignup.css";
import { useHistory, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc} from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { auth } from "../config/firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ClientSignUp() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [state,setState]=useState(false)

  const [form, setForm] = useState({
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };
  let history = useHistory();
  const signUpClick = () => {
    if (document.querySelector("#name").value === "") {
      document.querySelector(".nameError").style.display = "block";
    }
    if (document.querySelector("#email").value === "") {
      document.querySelector(".emailError").style.display = "block";
    }
    if (document.querySelector("#password").value === "") {
      document.querySelector(".passError").style.display = "block";
    }
    if (document.querySelector("#cPassword").value === "") {
      document.querySelector(".cPassError").style.display = "block";
    }
    // {
    //     history.push("/clientSignin")
    // }
    //  history.push("/home")
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          const storageRef = ref(
            storage,
            `/Profile_photos/${Date.now()}${form.image.name}`
          );
          const uploadImage = uploadBytesResumable(storageRef, form.image);
          uploadImage.on(
            "state_changed",
            (snapshot) => {
              // const progressPercent = Math.round(
              //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              // );
              setState(true)
            },
            (err) => {
              console.log(err);
            },
            () => {
              setForm({
                image: "",
              });
              getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                const UsersCollectionRef = collection(db, "users");
                const userDetails = {
                  full_name: full_name,
                  email: email,
                  location: location,
                  userId: auth.currentUser.uid,
                  profile_pic: url,
                };
                addDoc(UsersCollectionRef, userDetails)
                  .then(() => {
                    alert("signed up successfully", { type: "success" });
                    history.push("/clientHome");
                  })
                  .catch((err) => {
                    alert("Error signing up", { type: "error" });
                  });
              });
            }
          );

        //   const userDetails = {
        //     full_name: full_name,
        //     email: email,
        //     location: location,
        //     userId: auth.currentUser.uid,
        //     profile_pic: file.name,
        //   };
        //   addDoc(UsersCollectionRef, userDetails)
        //     .then(() => {
        //       alert("added successfully");
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });

        //   history.push("/clientHome");
        })
        // .catch((error) => {
        //   console.log(error);
        // });
    }
  };

  const nameKey = () => {
    document.querySelector(".nameError").style.display = "none";
  };
  const emailKey = () => {
    document.querySelector(".emailError").style.display = "none";
  };
  const passKey = () => {
    document.querySelector(".passError").style.display = "none";
  };
  const cPassKey = () => {
    document.querySelector(".cPassError").style.display = "none";
  };
  // console.log(file.name);
  if (state===true)
  {
    document.getElementById("loading").style.display="block"
  }
  return (
    <div className="sign-container">
      <h1>Client Sign Up</h1>
      <p id="loading" style={{display:"none"}}>Loading...</p>
      <input
        onKeyPress={nameKey}
        className="input1"
        id="name"
        type="text"
        placeholder="Name and Surname"
        onChange={(e) => setFullName(e.target.value)}
      />
      <span className="nameError">Enter your name and surname !</span>
      <input
        onKeyPress={emailKey}
        onChange={(e) => setEmail(e.target.value)}
        className="input1"
        id="email"
        type="email"
        placeholder="email example@gmail.com"
      />
      <span className="emailError">Enter your email !</span>
      <input
        className="input1"
        type="text"
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        onKeyPress={passKey}
        onChange={(e) => setPassword(e.target.value)}
        className="input1"
        id="password"
        type="password"
        placeholder="Password"
      />
      <span className="passError">Enter your password !</span>
      <input
        onKeyPress={cPassKey}
        className="input1"
        id="cPassword"
        type="password"
        placeholder="Confirm password"
      />
      <span className="cPassError">Confirm your password !</span>
      <label htmlFor="file">Choose image</label>
      <input type="file" id="file" accept="image/*" onChange={handleChange} />
      <Link className="link2" to="/clientSignin">
        Already have and account? Log in here
      </Link>
      <button onClick={signUpClick}>Sign up</button>
    </div>
  );
}
export default ClientSignUp;
