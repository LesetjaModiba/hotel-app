import "../css/viewhotel.css";
import { useParams } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { addDoc } from "firebase/firestore";
import { useState,useEffect } from "react";
import ClientHeader from "./clientHeader";
const ViewHotel = () => {
  const [hotel, setHotel] = useState([]);
  // const [thisHotel,setThisHotel]=([]);
  let obj=""
  // console.log(props)
  const param = useParams();

  // console.log(param.id);
  // const querySnapshot = await getDocs(collection(db, "hotelDetails"));
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  // db.collection("hoteldetails")
  //   .where("id", "=", param.id)
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => setHotel(doc));
  //   });
  const [users,setUsers]=useState([])
    useEffect(() => {
      const hotelCollectionRef = collection(db, "hotelDetails");
      
      const getDetails = async () => {
        const querySnapshot = await getDocs(hotelCollectionRef);
        querySnapshot.forEach((doc)=>{
          setHotel(
            querySnapshot.docs.map((doc) => ({
              name: doc.data().name,
              location: doc.data().location,
              map:doc.data().map,
              price: doc.data().price,
              id:doc.id,
              userId: auth.currentUser.uid,
              email:auth.currentUser.email
            }))
          );
        })
     
      };

    

      getDetails();
    }, []);
    useEffect(()=>{
      const usersCollectionRef = collection(db, "users");
      const getItems = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => doc.data()));
      };
        // .where('userId','=',hotel.userId).onSnapshot((querySnapshot)=>{
          // querySnapshot.forEach((doc)=>{
        
          // }) 
        //  })
      
      
       getItems()
    },[])
    
    let user ="";
    for (let i = 0; i < users.length; i++) {
      if (users[i].userId === auth.currentUser.uid) {
        user=users[i];
      }
    }
    console.log(user.full_name)

    for(let i=0;i<hotel.length;i++)
    {
      if(hotel[i].id===param.id)
      {
        //  setThisHotel(hotel[i].name)
        obj=hotel[i]
        // console.log(hotel[i].id)
      }
    }
    // console.log(obj)


    const [days,setDays]=useState(0)
    const [checkin,setCheckin]=useState(Date())
    const [checkout,setCheckout]=useState(Date())
    const [total,setTotal]=useState(0)
   useEffect(()=>{
   
    let diff = (new Date(checkout) - new Date(checkin))/(1000*60*60*24)
    setDays(diff)
    setTotal(parseInt((obj.price)*diff))
   },[checkout])
    
     

   
// console.log(hotel[0])

let today=JSON.stringify(Date()).slice(5,17);
// console.log(today);
// console.log(auth.currentUser.email)
    // hotel name,location,client name, date, day, price
    const book= async ()=>{
      const collectionRef=collection(db, "bookings")
      const bookings={
          hotel_name:obj.name,
          location:obj.location,
          price:total,
          date:checkin+' to '+checkout,
          days:days,
          client_name:user.full_name,
          client_email:auth.currentUser.email,
          client_user_id:auth.currentUser.uid
      };
      addDoc(collectionRef, bookings).then(()=>{
          alert("Booked successfully")
      }).catch((error)=>{console.log(error);alert("Error while booking")})
    }

  return (
    <div>
      <ClientHeader/>
      <div className="view-content-container">
        <h2>welcome to {obj.name}</h2>
        <div className="photos">
          <div className="room-div">
            {/* <img src={require("../Assets/images/room1.jfif")} alt="room" /> */}
            <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="room" /> 
          </div>
          <div className="room-div">
          <img src="https://images.unsplash.com/photo-1585821569331-f071db2abd8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="room" />
          </div>
          <div className="room-div">
          <img src="https://images.unsplash.com/photo-1595526051245-4506e0005bd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkJTIwcm9vbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60" alt="room" />
          </div>
          <div className="room-div">
          <img src="https://media.istockphoto.com/photos/scandinavian-bedroom-in-a-luxurious-cottage-house-picture-id1355535668?b=1&k=20&m=1355535668&s=170667a&w=0&h=krCm8csbEYHGaquaq7QTQ2rOyBRQmL2i-MG6Zce9xpg=" alt="room" />
          </div>
        </div>
        <div className="more-details">
          <h3>More about {obj.name} </h3>
          <div className="description"><p>{obj.name} offers four star accommodation in {obj.location}. Choose from our en-suite bedrooms 
          with either a queen size or a single bed. loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non consectetur felis.
           Donec urna dui, faucibus in hendrerit sed, pharetra quis dolor. Quisque nulla lectus, semper non sapien eu, scelerisque laoreet lectus.
           Duis interdum, urna eget dictum eleifend</p>
          </div>
          <div className="low-description">
            <div className="calculate">
              <p>Price per day: R{obj.price} </p>
              <p>Checkin:</p><input type="date" min={today} className="checkin" onChange={(e)=>setCheckin(e.target.value)}></input>
              <p>Checkout:</p><input type="date" className="checkout" onChange={(e)=>setCheckout(e.target.value)}></input>
              <p>Days: {days}</p>
              <p>Total: R {total}</p>
              <button className="book-btn" onClick={book}>book</button>
            </div>
            <div className="map">
              <iframe
                src={obj.map}
                width="310"
                height="270"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHotel;
