import React, { useState, useEffect } from 'react';
import "./faqs.css"
function FaqsContainer() {
    return (
        <>
            <div className="AboutBanner color-5-background">
                <div className="AboutBannerText">
                    <div className="OurGoal">
                        FAQS
                    </div>
                </div>
            </div>
            <div className="AboutPage color-5-background">
                <div className="MainBox AboutBox">
                    <h4>Where do we gather this data?</h4>
                    <p>All data is gathered from The Center for Medicare and Medicaid Services</p>
                    <br></br>
                    <h4>Where can I found the data used on this site?</h4>
                    <p>Follow this link to <a href="https://www.cms.gov/openpayments"> Open Payments CMS</a></p>
                    <br></br>
                    <h4>Reporting errors in the data</h4>
                    <p>All data used is from Open Payments CMS, please contact them for resolutions with errors</p>
                    <br></br>
                    <h4>API Access</h4>
                    <p>Currently we do not offer a public API, if there is enough interest this will change</p>
                    <br></br>
                    <h4>Data Integrity</h4>
                    <p>All data is collected from Open Payments CMS, but we use data normalization to make the content more readable and minimize duplications. While we make every effort to ensure the accuracy of this data, do not assume all content is accurate.</p>
                    <br></br>
                    <h4>Contact Information</h4>
                    <p>For further inquiries and concerns please contact us at info@healthtrace.io</p>
                </div>
            </div>
        </>
    )
}

export default FaqsContainer;