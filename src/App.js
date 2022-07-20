
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Landing from './components/landing';
import Manage from './components/manage';
import AdminSignIn from './components/adminSignin';
import AdminSignUp from './components/adminSignup';

function App() {
  return (
    
       <Router>
         <Switch>
         <Route exact path="/" component={Landing}></Route>
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
