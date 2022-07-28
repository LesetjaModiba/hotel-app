import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { getDocs,deleteDoc,doc } from "firebase/firestore";
import "../css/clientBooking.css";
import Header from "./header";

const AdminBookings = () => {
  const [booking, setBooking] = useState([]);
  const [searchItem,setSearchItem]=useState("")
  useEffect(() => {
    const bookingCollectionRef = collection(db, "bookings");
    const getBookings = async () => {
      const data = await getDocs(bookingCollectionRef);
      setBooking(
        data.docs.map((doc) => ({
          hotel: doc.data().hotel_name,
          client: doc.data().client_name,
          date: doc.data().date,
          price: doc.data().price,
          userId: doc.data().client_user_id,
          id: doc.id,
        }))
      );
    };
    getBookings();
  }, []);
//   }
  // console.log(auth.currentUser.uid)
  // console.log(booking);
//   console.log(booking);
const decline = async (id) => {
  const bookingDoc = doc(db, "bookings", id);
  await deleteDoc(bookingDoc).then(() => {});
  alert("Booking removed");
  // console.log(id)
};
  return (
    <div>
      <Header/>
      
      <div className="booking-container">
        <h1>Bookings</h1>
        <div className="search-filter-container">
        <input
          placeholder="Search bookings with client name..."
          type="text"
          className="where"
          onChange={(e) => setSearchItem(e.target.value)}
        ></input>
      </div>
        {booking.filter((book)=>{
           if (searchItem === "") {

              return book
              
          } else if (
            book.client.toLowerCase().includes(searchItem.toLowerCase())
          ) 
          {
            return book;
          }
        }).map((inf, id) => (
          <div className="client-booking" key={id}>
            <p>Booking {id + 1}</p>
            <p>Hotel : {inf.hotel}</p>
            <p>Client : {inf.client}</p>
            <p>Date : {inf.date}</p>
            <p>Price : {inf.price}</p>
            <button className="cancel-booking" onClick={(e)=>decline(inf.id)}>Decline booking</button>
            <button className="cancel-booking">Accept booking</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
