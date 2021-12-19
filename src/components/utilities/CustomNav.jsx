import "./CustomNav.css";
import SearchBar from "./SearchBar";
import React from "react";
{/* <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="/home">WhatsUpDoc</Navbar.Brand>
                <div className="col-2 col-lg-2 col-xl-3 d-none d-sm-block"></div>
                <div className="col-12 col-md-4 col-lg-4 col-xl-3 searchbar">
                    <SearchBar/>
                </div>     
            </Container>
        </Navbar> */}
function CustomNavbar (props) {
    return (
        <div className="NavBar color-1-background">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <a className="navBrand color-5" href="/home">HealthTrace</a>
                    </div>
                    <div className="col-2 col-xl-3 d-none d-sm-block"></div>
                    <div className="col-12 col-md-4 col-lg-4 col-xl-3 searchbar">
                        <SearchBar/>
                    </div>     
                </div>
               
            </div>
           
        </div>
        
    )
}

export default CustomNavbar;
