import { useState } from "react";
import "../css/header.css";
import { useHistory } from "react-router-dom";
const Header = () => {
  const isMobile = useState(false);
  const isChecked = () => {
    document.querySelector(".text").style.display = "block";
    if (document.getElementById("check").checked === false) {
      document.querySelector(".text").style.display = "none";
      window.location.reload();
    }
  };
  let history = useHistory();

  const manage = () => {
    history.push("/manage");
  };
  const home = () => {
    history.push("/home");
  };
  const out=()=>
  {
    history.push("/")
  }
  return (
    <div className="header-content">
      <input type="checkbox" id="check" onClick={isChecked}></input>
      <div className={isMobile ? "text" : "text-mobile"}>
        <h3 onClick={home}>Home</h3>
        <h3 onClick={manage}>Manage</h3>
        <h3>Bookings</h3>
        <h3>Contact</h3>
        <h3 onClick={out}>Log out</h3>
      </div>
      <label htmlFor="check">&#9776;</label>
    </div>
  );
};

export default Header;
