import "../css/remove.css";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db,storage } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Remove = () => {
  const [details, setDetails] = useState([]);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [hotelId,setHotelId]=useState("");
  const [hotelName,setHotelName]=useState("");
  const [map,setMap]=useState("");
 
  const [form, setForm] = useState({
      
    image: "",

});

const handleChange = (e) => {
  setForm( {...form,image:e.target.files[0]});
};

  useEffect(() => {
    const hotelCollectionRef = collection(db, "hotelDetails");

    const getDetails = async () => {
      const data = await getDocs(hotelCollectionRef);
      setDetails(
        data.docs.map((doc) => ({
          name: doc.data().name,
          location: doc.data().location,
          price: doc.data().price,
          image: doc.data().image,
          id: doc.id,
          
        }))
      );
    };
    getDetails();
  }, []);


  const deleteHotel = async (id) => {
    const hotelDoc = doc(db, "hotelDetails", id);
    await deleteDoc(hotelDoc);
    alert("Deleted Successfully");
    // console.log(id)
  };
  const editHotel = async (id,name) => {
    document.querySelector(".edit").style.display = "block";
    
    setHotelId(id)
    setHotelName(name)
    console.log(id)  
    console.log(name)
  };
 
  const close = () => {
    document.querySelector(".edit").style.display = "none";
  };
  // const updateHotel = async () => {
  //   const hotelDoc = doc(db, "hotelDetails", (JSON.stringify({hotelId})).substring(12,32));
  //   const newHotelDetails = {
  //     name: name,
  //     location: location,
  //     map:map,
  //     price: price,
  //     image: file.name,
  //   };
  //   await updateDoc(hotelDoc, newHotelDetails)
  //     .then(() => {
  //       alert("Updated Successfully");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   //  console.log((JSON.stringify({hotelId})).substring(12,32))
  // };

  const [percent,setPercent]=useState(0)
const updateHotel = () => {
  const storageRef = ref(
      storage,
      `/images/${Date.now()}${form.image.name}`
  );
  const uploadImage = uploadBytesResumable(storageRef, form.image);
  uploadImage.on(
      "state_changed",
      (snapshot) => {
          const progressPercent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(progressPercent)
      },
      (err) => {
          console.log(err);
      },
      () => {
          setForm({
        
              image: "",
          });

          getDownloadURL(uploadImage.snapshot.ref).then((url) => {
              const hotelDoc = doc(db, "hotelDetails",(JSON.stringify({hotelId})).substring(12,32));
              const newHotelDetails={
                  name:name,
                  location:location,
                  map:map,
                  price:price,
                  image:url
                  
              };

              updateDoc(hotelDoc, newHotelDetails)
                  .then(() => {
                      alert("updated successfully", { type: "success" });

                  })
                  .catch((err) => {
                      alert("Error updating hotel", { type: "error" });
                  });
          });
      }
  );

};

  return (
    <div className="remove-container">
       <p style={{position:"absolute",top:"2",color:"white"}}>{percent}</p>   
      <h2 className="remove">Manage Hotels</h2>
     
      {details.map((hotel, id) => (
        <div className="remove-card" key={id}>
          <div className="edit">
            <h2 className="close" onClick={close}>
              x
            </h2>{" "}
            <br></br> 
            <h2>Editing {hotelName}</h2>
            <br></br>
            <input
              placeholder="Hotel Name"
              onChange={(e) => setName(e.target.value)}
            />{" "}
            <br></br>
            <input
              placeholder="Location" 
              onChange={(e) => setLocation(e.target.value)}
            />
            <br></br>
            <input
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            ></input>{" "}
             <br></br> <input
              placeholder="Link from Google maps..."
              onChange={(e) => setMap(e.target.value)}
            ></input>{" "}
            <br></br>
            <br></br>
            <br></br>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleChange}
            />
            <button
              className="btn-update"
              onClick={updateHotel}
            >
              Update
            </button>
          </div>

          <div className="img-remove-div">
            <img
              className="hotel-pic-remove"
              // src={require(`../Assets/images/${hotel.image}`)}
              src={hotel.image}
              alt={hotel.name}
            />
          </div>
          <div className="details">
            <p className="hotel-name">{hotel.name}</p>
            <p>{hotel.location}</p>
            <p>R {hotel.price}.00</p>
          </div>
          <div className="options">
            <button className="edit-btn" onClick={(e) => editHotel(hotel.id,hotel.name)}>
              Edit
            </button>
            <button
              className="remove-btn"
              onClick={() => deleteHotel(hotel.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Remove;
