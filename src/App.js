
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './components/home';
import Landing from './components/landing';
import Manage from './components/manage';
import AdminSignIn from './components/adminSignin';
import LoginAs from './components/loginas';
import ClientSignIn from './components/clientSignin';
import ClientSignUp from './components/clientSignup';
import ClientHome from './components/clientHome';
import ViewHotel from './components/viewhotel';
import ClientBookings from './components/clientBookings';
function App() {
  // const [clickedHotel,setClickedHotel]=useState([])
  // const addHotel=((details)=>
  // setClickedHotel((details)=>[...details,{
  // name:details.name,
  // location:details.location,
  // price:details.price
  // }]))
  // console.log(clickedHotel)
  // const [hotelId,setHotelId]=useState("");
  // let addHotel=((hot)=>
  // setHotelId(hot)
  // )
  const [objdata,setObjData]=useState("")
  let obj=((dat)=>(setObjData(dat)))

  console.log(objdata)
  return (
    
       <Router>
         <Switch>
           <Route exact path="/" component={Landing}></Route>
           <Route path="/clientHome" component={ClientHome}></Route>
           <Route path="/viewhotel/:id" children={<ViewHotel add={obj}/>}></Route>
           <Route path="/clientBookings" children={<ClientBookings get={objdata}/>}></Route>
           <Route path="/loginas" component={LoginAs}></Route>
           <Route path="/clientSignin/" component={ClientSignIn}></Route>
           <Route path="/clientSignup" component={ClientSignUp}></Route>
           <Route path="/adminSignin" component={AdminSignIn}></Route>
           <Route path="/home" component={Home}></Route>
           <Route path="/manage" component={Manage}></Route>
           <Home/>
         </Switch>
       </Router>

  );
}

export default App;
