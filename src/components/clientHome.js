import ClientHeader from "./clientHeader";
import "../css/landing.css";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useHistory } from "react-router-dom";
import { auth } from "../config/firebase";
const ClientHome = () => {
    const [details, setDetails] = useState([]);
    const [searchItem,setSearchItem]=useState("");
    const [hotelId,setHotelId]=useState("");

  //   const [loading,setLoading]=useState("");
    useEffect(() => {
      const hotelCollectionRef = collection(db, "hotelDetails");
  
      const getDetails = async () => {
        const data = await getDocs(hotelCollectionRef);
        setDetails(
          data.docs.map((doc) => ({
            name: doc.data().name,
            location: doc.data().location,
            price: doc.data().price,
            id:doc.id,
            image: doc.data().image,
          }))
        );
      };
      getDetails();
    }, []);

    let history=useHistory()

    const view=(id)=>
    {
        //  props.add(hotelId)
        setHotelId(id)
       history.push(`/viewhotel/${id}`)
    }
        return ( 
        <div className="main-div-container">
            <ClientHeader/>
            <div className="header-img-div">
         <img
                className="wall-pic"
                src={require('../Assets/images/hotel1.jfif')}
                alt="wallpaper"
              />
         </div>
         <div className="special">
             <p className="offer">Special offer on booking</p>
             <p><span className="fifty">50%</span>OFF</p>
         </div>
         <div className="badge">.</div>
         <h1 className="welcome">Welcome to Hotels South Africa </h1>
         
         <div className="search-container">
          <input placeholder="Where do you want to go?..." type="text" className="where" onChange={(e)=>setSearchItem(e.target.value)}></input>
          <img
                className="search-icon"
                src={require('../Assets/icons/search.png')}
                alt="search"
              />
         {/* <input type="date" className="checkin"></input> 
         <input type="date" className="checkout"></input> 
         <input type="submit" className="search-btn"/> */}

         </div>
        
      <div className="content-container">
        {details.filter((hotel)=>{
          if (searchItem==="")
          {
            return hotel
          }
          else if(hotel.location.toLowerCase().includes(searchItem.toLowerCase()))
          {
            return hotel
          }
        }).map((hotel, id) => (
          <div className="landing-hotel-card" onClick={(e)=>view(hotel.id)} key={id}>
            <div className="hotel-img-div">
              <img
                className="hotel-pic"
                src={require(`../Assets/images/${hotel.image}`)}
                alt={hotel.name}
              />
            </div>
            {/* <img className="hotel-pic" src={require("../Assets/images/hotel1.jfif")} alt="1"/> */}
            <div className="details-div">
              {" "}
              <p className="name">{hotel.name}</p>
              <p className="location">
                <img
                  className="location-pic"
                  alt="pin"
                  src={require("../Assets/icons/pin.png")}
                />
                {hotel.location}
              </p>
              <p className="price">R {hotel.price}.00</p>
            </div>
            <div className="icons">
              <div className="icon-div">
                {" "}
                <img
                  className="icon"
                  alt="bath"
                  src={require("../Assets/icons/bath-tub.png")}
                />
              </div>
              <div className="icon-div">
                {" "}
                <img
                  className="icon"
                  alt="bed"
                  src={require("../Assets/icons/bed.png")}
                />
              </div>
              <div className="icon-div">
                {" "}
                <img
                  className="icon"
                  alt="family"
                  src={require("../Assets/icons/family-silhouette.png")}
                />
              </div>
              <div className="icon-div">
                {" "}
                <img
                  className="icon"
                  alt="food"
                  src={require("../Assets/icons/cutlery.png")}
                />
              </div>
              <div className="icon-div">
                {" "}
                <img
                  className="icon"
                  alt="parking"
                  src={require("../Assets/icons/parked-car.png")}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
        </div>
     );
}
 
export default ClientHome;