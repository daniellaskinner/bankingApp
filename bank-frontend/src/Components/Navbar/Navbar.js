import React from 'react';
import './Navbar.css';
import {Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom';
import App from "../../App";
import NotFound from "../NotFound/NotFound";

class Navbar extends React.Component {
    render() {
        return (
           <nav>
               <Router>
                   <div>
                       <ul>
                           <li>
                               <Link to="/">Home</Link>
                           </li>
                           <li>
                               <Link to="/accounts">Accounts</Link>
                           </li>
                       </ul>
                   </div>
                   <div>
                       <Switch>
                           {/*<Route exact path="/" component={App}/>*/}
                           {/*<Route path="/accounts" component={Accounts}/>*/}
                           <Route component={NotFound}/>
                       </Switch>
                   </div>
               </Router>
           </nav>
        )
    }
}

export default Navbar;