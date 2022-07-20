import { useState } from "react";
import "../css/header.css";
import { useHistory } from "react-router-dom";

const HeaderLanding = () => {
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
      history.push("/");
    };
    const login=()=>
    {
      history.push("/adminSignin")
    }
    return ( 

 
    <div className="header-content">
      <input type="checkbox" id="check" onClick={isChecked}></input>
      <div className={isMobile ? "text" : "text-mobile"}>
        <h3 onClick={home}>Home</h3>
        <h3 onClick={login}>Log in</h3>
      </div>
      <label htmlFor="check">&#9776;</label>
    </div>
  );
     
}
export default HeaderLanding;