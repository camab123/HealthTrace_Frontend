import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/pages/home/index";
import CustomNavbar from "./components/utilities/CustomNav";
import DoctorContainer from "./components/pages/doctor";
import ManufacturerContainer from "./components/pages/manufacturer"
import SearchResultsPage from "./components/pages/search";
import StateContainer from "./components/pages/states";
import AboutContainer from "./components/pages/infopages/about";
import PrivacyContainer from "./components/pages/infopages/privacy";
import React, {Component} from "react";
import Footer from "./components/utilities/Footer";
import "./App.css";
import ReactGA from 'react-ga';
import FaqsContainer from "./components/pages/infopages/faqs";
import NotFoundContainer from "./components/pages/infopages/NotFound";
import {GetSEO} from "./components/utilities/SEO";

function App() {
  const TRACKING_ID = "UA-215782983-1";
  ReactGA.initialize(TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
  return (
    <>
        <GetSEO
            title="HealthTrace"
            keywords="pharmaceutical, doctors, drugs"
            description="HealthTrace is a open database giving users access to Doctors transactions with pharmaceutical companies. Find out more about your doctor."
          />
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
            <Route path="/Privacy/" component={PrivacyContainer}/>
            <Route path="/FAQS/" component={FaqsContainer}/>
            <Route component={NotFoundContainer} />
          </Switch>
        <Footer/>
      </Router>
      </>
  );
}

export default App;
