import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/pages/home/index";
import CustomNavbar from "./components/utilities/CustomNav";
import DoctorContainer from "./components/pages/doctor";
import ManufacturerContainer from "./components/pages/manufacturer"
import SearchResultsPage from "./components/pages/search";
import StateContainer from "./components/pages/states";
import AboutContainer from "./components/pages/infopages/about";
import ContactContainer from "./components/pages/infopages/contact";
import React, {Component} from "react";
import Footer from "./components/utilities/Footer";
import "./App.css"
function App() {
  return (
    <Router>
      <CustomNavbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Home" component={Home} />
        <Route path="/Doctor/:doctorid" component={DoctorContainer} />
        <Route path="/Search/" component={SearchResultsPage} />
        <Route path="/Manufacturers/:manufacturerid" component={ManufacturerContainer} />
        <Route path="/State/:state" component={StateContainer}/>
        <Route path="/About/" component={AboutContainer}/>
        <Route path="/Contact/" component={ContactContainer}/>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
