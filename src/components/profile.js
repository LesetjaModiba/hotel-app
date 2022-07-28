import "../css/profile.css"
import { useState, useEffect} from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import {auth} from "../config/firebase"
import ClientHeader from "./clientHeader";
const Profile = () => {
    const [users, setUsers] = useState([]);
 
    useEffect(() => {
      const usersCollectionRef = collection(db, "users");
      const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => doc.data()));
      };
      getUsers();
    }, []);
    let user = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].userId === auth.currentUser.uid) {
        user.push(users[i]);
      }
    }
    // console.log(auth.currentUser.uid)
    // console.log(booking);
  return (
    <div className="profile-contianer">
        <ClientHeader/>
        {user.map((inf,id)=>
        (
            <div className="profile" key={id}>
            <div className="left-div">
            <div className="profile-pic-div">
            <img
                className="hotel-pic"
                src={require(`../Assets/images/${inf.profile_pic}`)}
                alt="profile pic"
              />
            </div>
           
            </div>
            <div className="right-div">
             
            <div className="username"><h3>{inf.full_name}</h3></div>
            <div className="username"><h3>{inf.email}</h3></div>
            <div className="username"><h3>{inf.location}</h3></div>
            <div className="username"><h3>Address</h3></div>
                
            </div>

        </div>
        ))}

      
    </div>
  );
};

export default Profile;
