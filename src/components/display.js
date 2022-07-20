import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import "../css/display.css";
const Display = () => {
  const [details, setDetails] = useState([]);
  useEffect(()=>
  {
  const hotelCollectionRef=collection(db,"hotelDetails")

  const getDetails=async()=>{
    const data=await getDocs(hotelCollectionRef);
        setDetails(
        data.docs.map((doc) => ({
          name: doc.data().name,
          location: doc.data().location,
          price: doc.data().price,
          image: doc.data().image,
        }))
      );
  }
  getDetails();
  },[]);
  // useEffect(() => {
  //   onSnapshot(collection(db, "hotelDetails"), (snapshot) => {
  //     setDetails(
  //       snapshot.docs.map((doc) => ({
  //         name: doc.data().name,
  //         location: doc.data().location,
  //         price: doc.data().price,
  //         image: doc.data().image,
  //       }))
  //     );
  //   });
  // }, []);

  //   let img=details.image;

  return (
    <div className="disp-content">
      {details.map((hotel, id) => (
        <div className="hotel-card" key={id}>
          <div className="img-div">
            <img
              className="hotel-pic"
              src={require(`../Assets/images/${hotel.image}`)}
              alt={hotel.name}
            />
          </div>
          {/* <img className="hotel-pic" src={require("../Assets/images/hotel1.jfif")} alt="1"/> */}
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
      ))}
    </div>
  );
};

export default Display;
