
import "../css/add.css"
import { useState } from "react";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
const Add = () => {
    const [file, setFile] = useState("");
    const [name,setName]=useState("");
    const [location,setLocation]=useState("");
    const [price,setPrice]=useState("");
    const [map,setMap]=useState("");
// Handles input change event and updates state
function handleChange(event) {
    setFile(event.target.files[0]);
}
const upload=(()=>
{
    const collectionRef=collection(db, "hotelDetails")
    const hotelDetails={
        name:name,
        location:location,
        map:map,
        price:price,
        image:file.name
        
    };
    addDoc(collectionRef, hotelDetails).then(()=>{
        alert("added successfully")
    }).catch((error)=>{console.log(error);alert("Error while adding")})
    // props.Add(amount, item, transactionType);
})
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
                 <label htmlFor="file">Choose imag</label>
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


