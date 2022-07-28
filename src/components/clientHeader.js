import { useState } from "react";
import "../css/header.css";
import { useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
const ClientHeader = () => {
  const isMobile = useState(false);
  const isChecked = () => {
    document.querySelector(".text").style.display = "block";
    if (document.getElementById("check").checked === false) {
      document.querySelector(".text").style.display = "none";
      window.location.reload();
    }
  };
  let history = useHistory();

  const home = () => {
    history.push("/clientHome");
  };
  const out=()=>
  {
    signOut(auth)
    history.push("/")
  }
 
  
  const bookings=()=>{
    history.push("/clientBookings")
  }
  const profile=()=>
  {
    history.push("/profile")
  }
  return (
    <div className="header-content">
      <input type="checkbox" id="check" onClick={isChecked}></input>
      <div className={isMobile ? "text" : "text-mobile"}>
        <h3 onClick={home}>Home</h3>
        <h3 onClick={bookings}>Bookings </h3>
        <h3 onClick={profile}>Profile</h3>
        <h3 onClick={out}>Log out</h3>
      </div>
      <label htmlFor="check">&#9776;</label>
      
    </div>
  );
};

export default ClientHeader;
