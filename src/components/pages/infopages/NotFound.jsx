import React, { useState, useEffect } from 'react';
import "./faqs.css"
function NotFoundContainer() {
    return (
        <>
            <div className="AboutBanner color-5-background">
                <div className="AboutBannerText">
                    
                </div>
            </div>
            <div className="AboutPage color-5-background">
                <div className="MainBox">
                    <h1 className="text-center">
                        Sorry Page Not Found
                    </h1>
                    <br/>
                    <h5 className="text-center">
                        It might be on our end but please check for typos
                    </h5>
                </div>
            </div>
        </>
    )
}
export default NotFoundContainer;