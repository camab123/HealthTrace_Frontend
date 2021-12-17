import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Col, ButtonGroup, Button } from 'react-bootstrap';
import {
    useParams
  } from "react-router-dom";
import ManufacturerSummaryView from "./summaryview";
import { getApi } from '../../utilities/api/fetchData';
import "./manufacturer.css";
import {
    useQuery,
  } from 'react-query'

  function ManufacturerContainer() {
    let { manufacturerid } = useParams();
    const {isLoading, error, data}  = useQuery(`ManufacturerContainer`, getApi("/manufacturer/overview/" + manufacturerid + "/"));
    if(error){
        return <p>ERROR</p>;
    }
    else if(isLoading){
        return (
            <div className="MainBox">
            </div>
        )
    }
    else {
        return (
            <div className="MainBox">
                <div className="manufacturerInfo">
                    <div className="InfoText color-1">
                        {data.Name}
                    </div>
                    <div className="InfoText location color-2">
                        {data.State}, {data.Country}
                    </div>
                </div>   
                <hr/>
                    <ManufacturerSummaryView data={manufacturerid}/>
                <hr/>
                
            </div>
            
        );
    }
}

export default ManufacturerContainer;