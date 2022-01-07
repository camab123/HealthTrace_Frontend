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
                        To present individuals and researchers with as much information as possible
                    </div>
                </div>
            </div>
            <div className="AboutPage color-5-background">
                <div className="MainBox AboutBox">
                    <p>
                    &emsp;&emsp;At HealthTrace it is our goal to make the healthcare industry's data more accessible and useable for every person. 
                        This work started from a passion for research and the a curiosity for the healthcare industry. We have the upmost respect for
                        healthcare workers, doctors, and pharmaceutical companies that provide us with the many necessary and needed drugs and devices. It is our hope that through this data
                        we can find faults in our current system that might lead to learning more about drug targeting and pharmaceutical marketing strategies. The data collected and used on this platform was collected from government datasets and only contains changes to normalize the data or remove duplicates.
                        Our data is up to date with the latest releases from <a href="https://www.cms.gov">cms.gov</a>. All pages for Doctors, Companies,
                        and States were created through the database of data gathered from CMS. No individual page or information has been altered in a way to mislead
                        users. Any discrepancies in the data should be reported to Centers for Medicare and Medicaid Services to update their records.
                    </p>
                        <div className='right'>Thank you for your support</div>
                </div>
            </div>
        </>
    )
}
export default AboutContainer;