import "../css/viewhotel.css";
import { useParams } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useState,useEffect } from "react";
const ViewHotel = (props) => {
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
  const [items,setItems]=useState("")
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
      const userCollectionRef=collection(db,"users");
      const getItems=async ()=>{
        const snap=await getDocs(userCollectionRef)
        snap.docs.map((doc)=>(
          setItems(doc.data())
        ))
        // .where('userId','=',hotel.userId).onSnapshot((querySnapshot)=>{
          // querySnapshot.forEach((doc)=>{
        
          // }) 
        //  })
      }
      
       getItems()
    },[])
    console.log(items.full_name)

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
    setTotal(((obj.price)*diff))
   },[checkout,checkin])
    
     

   
// console.log(hotel[0])

let today=JSON.stringify(Date()).slice(5,17);
// console.log(today);
// console.log(auth.currentUser.email)
props.add(obj)
  return (
    <div>
      <div className="view-content-container">
        <h2>welcome to {obj.name}</h2>
        <div className="photos">
          <div className="room-div">
            <img src={require("../Assets/images/room1.jfif")} alt="room" />
          </div>
          <div className="room-div">
            <img src={require("../Assets/images/room3.jfif")} alt="room" />
          </div>
          <div className="room-div">
            <img src={require("../Assets/images/room2.jfif")} alt="room" />
          </div>
          <div className="room-div">
            <img src={require("../Assets/images/room6.jfif")} alt="room" />
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
              <input type="date" min={today} className="checkin" onChange={(e)=>setCheckin(e.target.value)}></input>
              <input type="date" className="checkout" onChange={(e)=>setCheckout(e.target.value)}></input>
              <p>Days: {days}</p>
              <p>Total: R {total}</p>
              <button className="book-btn">book</button>
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
