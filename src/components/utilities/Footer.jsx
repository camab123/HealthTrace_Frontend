import React, { useState, useEffect } from "react";
import "./Footer.css"
function Footer() {
    return (
        <footer class="site-footer color-1-background">
        <div class="container">
            <div class="row">
            <div class="col-sm-12 col-md-6">
                <h6>About</h6>
                <p class="text-justify">All data used in application is from publicly released datasets. For further information please read About Us section. </p>
            </div>

            <div class="col-xs-6 col-md-3">
            </div>

            <div class="col-xs-6 col-md-3">
                <h6>Quick Links</h6>
                <ul class="footer-links">
                <li><a href="/About/">About Us</a></li>
                <li><a href="/Contact/">Contact Us</a></li>
                <li><a href="/Sitemap/">Sitemap</a></li>
                </ul>
            </div>
            </div>
            <hr id="footer-hr"/>
            <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
                <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by &nbsp;
                    <a href="#">WhatsUpDoc</a>.
                </p>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12">
                {/* <ul class="social-icons">
                <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
                <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
                </ul> */}
            </div>
            </div>
        </div>
    </footer>
    )
}
export default Footer;