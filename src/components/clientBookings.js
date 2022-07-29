import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { getDocs, deleteDoc } from "firebase/firestore";
import "../css/clientBooking.css";
import ClientHeader from "./clientHeader";
const ClientBookings = () => {
  const [booking, setBooking] = useState([]);
  const [searchItem, setSearchItem] = useState("");

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
  let book = [];
  let dat = "";
  for (let i = 0; i < booking.length; i++) {
    if (booking[i].userId === auth.currentUser.uid) {
      book.push(booking[i]);
      dat = booking[i];
    }
  }
  // console.log(auth.currentUser.uid)
  // console.log(booking);
  //   console.log(new Date(dat.date.slice(0,10)));
  //   if(Date.now()>new Date(dat.date.substring(0,10)))
  //   {
  //     console.log("passed")
  //   }
  //   else{
  //     console.log("not")
  //   }

  // console.log(new Date(dat.date));

  const cancel = async (id) => {
    const bookingDoc = doc(db, "bookings", id);
    await deleteDoc(bookingDoc).then(() => {});
    alert("Booking cancelled");
    // console.log(id)
  };

  // console.log(booking)
  // console.log("clicked")

  return (
    <div>
      <ClientHeader />

      <div className="booking-container">
        <h1>Bookings</h1>
        <div className="search-filter-container">
          <input
            placeholder="Search your bookings with the hotel name..."
            type="text"
             id="search"
            onChange={(e) => setSearchItem(e.target.value)}
          ></input>
        </div>
        {book
          .filter((book) => {
            if (searchItem === "") {
              return book;
            } else if (
              book.hotel.toLowerCase().includes(searchItem.toLowerCase())
            ) {
              return book;
            }
          })
          .map((inf, id) => (
            <div className="client-booking" key={id}>
              <p>Booking {id + 1}</p>
              <p>Hotel : {inf.hotel}</p>
              <p>Client : {inf.client}</p>
              <p>Date : {inf.date}</p>
              <p>Price : {inf.price}</p>
              <p id="cancelled" style={{ display: "none" }}>
                This booking was cancelled
              </p>
              <button
                className="cancel-booking"
                onClick={(e) => cancel(inf.id)}
              >
                Cancel booking
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ClientBookings;
