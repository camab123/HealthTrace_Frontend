import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Card, Col, ButtonGroup, Button } from 'react-bootstrap';
import {
    useParams
  } from "react-router-dom";
import DoctorSummaryView from "./summaryview";
import { getApi } from '../../utilities/api/fetchData';
import "./doctor.css";
import NotFoundContainer from '../infopages/NotFound';
import {
    useQuery,
  } from 'react-query';
import { GetSEO } from "../../utilities/SEO";

function DoctorContainer() {
    let { doctorid } = useParams();
    const {isLoading, error, data}  = useQuery(`DoctorContainer`, getApi("/doctor/overview/" + doctorid + "/"))
    if(error){
        return <NotFoundContainer/>;
    }
    else if(isLoading){
        return (
            <div className="MainBox">
                <h2 className="animate">Loading</h2>
            </div>
        )
    }
    else {
        const doctorName = data.FirstName + " " + data.MiddleName + " " + data.LastName
        let location;
        if (data.StreetAddress2) {
            location = data.StreetAddress1 + ", " + data.StreetAddress2 + ", " + data.City + ", " + data.State
        }
        else {
            location = data.StreetAddress1 + ", " + data.City + ", " + data.State
        }
        return (
            <>
            <GetSEO
            title={`${doctorName} | HealthTrace`}
            keywords={`pharmaceutical, doctors, ${doctorName}`}
            description={`${doctorName} has active transactions listed on HealthTrace. Visit our site to view more.`}
            />
            <div className="MainBox">
                <div className="doctorInfo">
                    <div className="InfoText">
                        {doctorName}
                    </div>
                    <div className="InfoText specialty color-2">
                        Specialty: {data.Specialty ? data.Specialty : "None Listed"}
                    </div>
                    <div className="InfoText location color-2">
                        Location: {location}
                    </div>
                </div>   
                <hr/>
                    <DoctorSummaryView data={doctorid}/>
                <div>
                    <hr/>
                </div>
            </div>
            </>
        );
    }
}

export default DoctorContainer;