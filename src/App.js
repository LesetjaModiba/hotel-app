
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Landing from './components/landing';
import Manage from './components/manage';
import AdminSignIn from './components/adminSignin';
import AdminSignUp from './components/adminSignup';
import LoginAs from './components/loginas';
import ClientSignIn from './components/clientSignin';
import ClientSignUp from './components/clientSignup';
function App() {
  return (
    
       <Router>
         <Switch>
           <Route exact path="/" component={Landing}></Route>
           <Route path="/loginas" component={LoginAs}></Route>
           <Route path="/clientSignin" component={ClientSignIn}></Route>
           <Route path="/clientSignup" component={ClientSignUp}></Route>
           <Route path="/adminSignin" component={AdminSignIn}></Route>
           <Route path="/adminSignup" component={AdminSignUp}></Route>
           <Route path="/home" component={Home}></Route>
           <Route path="/manage" component={Manage}></Route>
           <Home/>
         </Switch>
       </Router>

  );
}

export default App;
