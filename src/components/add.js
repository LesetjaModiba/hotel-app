
import "../css/add.css"
import { useState } from "react";
import { db,storage } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const Add = () => {
 
    const [name,setName]=useState("");
    const [location,setLocation]=useState("");
    const [price,setPrice]=useState("");
    const [map,setMap]=useState("");

    const [form, setForm] = useState({
      
        image: "",

    });

    
    // const [file, setFile] = useState("");

// Handles input change event and updates state
// function handleChange(event) {
//     setForm( {...form,image:event.target.files[0]});
    
// }

const handleChange = (e) => {
    setForm( {...form,image:e.target.files[0]});
  };


const upload = () => {



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
        },
        (err) => {
            console.log(err);
        },
        () => {
            setForm({
          
                image: "",
            });
            getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                const collectionRef = collection(db, "hotelDetails");
                const hotelDetails={
                    name:name,
                    location:location,
                    map:map,
                    price:price,
                    image:url
                    
                };
                addDoc(collectionRef, hotelDetails)
                    .then(() => {
                        alert("Hotel added successfully", { type: "success" });

                    })
                    .catch((err) => {
                        alert("Error adding hotel", { type: "error" });
                    });
            });
        }
    );
};

    return ( 
        <>
    
        <div className="add-content">
            <div className='card'>
                <h2 className="add">Add Hotel</h2>
                <div className="form">
                 <input required placeholder="Hotel name" onChange={(e)=>setName(e.target.value)}/>
                 <input required placeholder="Location" onChange={(e)=>setLocation(e.target.value)}/>
                 <input required placeholder="Link from Google maps..." onChange={(e)=>setMap(e.target.value)}/>
                 <input required placeholder="Price" onChange={(e)=>setPrice(e.target.value)}/>            
                 <label htmlFor="file">Choose image</label>
                 <input type="file" id ="file" accept="image/*" onChange={handleChange}/>
                 <br></br>
                 <button className="btn-upload" onClick={upload}>Upload</button>
                </div>
            </div>
            
        </div>
        </>
     );
}
 
export default Add;


