import React, { useState, useEffect } from 'react';
import "./about.css";

function AboutContainer() {
    return (
        <>
            <div className="AboutBanner color-5-background">
                <div className="AboutBannerText">
                    <div className="OurGoal">
                        Our Goal
                    </div>
                    <div className="GoalDetail">
                        To provide the public with data on the transactions from pharmaceutical companies
                    </div>
                </div>
            </div>
            <div className="AboutPage color-5-background">
                <div className="MainBox AboutBox">
                    <p>At WhatsUpDoc it is our goal to make the healthcare industry data more accessible and useable for every person. 
                        The data collected and used on this platform was collected from government datasets and was not altered in any.
                        Our data is up to date with the latest releases from <a href="https://www.cms.gov">cms.gov</a>.
                        This work started from a passion for data and the a curiosity for the healthcare industry. We have the upmost respect for
                        healthcare workers, doctors, and pharmaceutical companies that provide us with the many necessary and needed drugs. This website
                        is not meant to besmirch the name of any individual or company, but to help make this information public.
                    </p>
                </div>
            </div>
        </>
    )
}
export default AboutContainer;