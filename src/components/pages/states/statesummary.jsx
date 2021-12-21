import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Col, ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import HorizontalBarChart from "../../utilities/graph";
import PieChart from "../../utilities/piechart";
import { useLocation, Link } from "react-router-dom";
import { getApi } from '../../utilities/api/fetchData';
import "./state.css";
import {
    useQuery,
  } from 'react-query';
import {
    useParams
  } from "react-router-dom";

function StateSummary(props) {
    const state = props.state
    const summaryType = props.summary
    const [yearValue,setValue]=useState("All");
    const {isLoading, error, data}  = useQuery([`StateSummary`, yearValue, summaryType], getApi(`/state/${summaryType}/${state}/?format=json&year=${yearValue}`));
    const [yearValueSummary, setYearValueSummary]=useState("All Payments");
    const handleSelect=(e)=>{
        setValue(e)
        if (e != "All") {
            setYearValueSummary("Payments " + e)
        }
        else {
            setYearValueSummary("All Payments")
        }
      }
    if(error){
        return <p>ERROR</p>;
    }
    else if(isLoading){
        return (
            <div className="MainBox">
                <h2 className="animate">Loading</h2>
            </div>
        )
    }
    const SumPayments = data.Summary.Sum_Payments
    const TopManufacturers = data.Summary.Top_Manufacturers
    const TopItems = data.Summary.Top_Items
    const TopDocs = data.Summary.Top_Doctors
    const MostCommon = data.Summary.Most_Common_Items
    return (
        <div className="SummaryPage">
            <div className="summaryBox">
                <div className="row align-items-center">
                    <div className="col-5 col-sm-6 nopaddingright">
                        <Dropdown
                        as={ButtonGroup}
                        key="None"
                        id={`dropdown`}
                        onSelect={handleSelect}
                        >
                        <Button>
                            <strong className="summaryYear color-1">
                                <strong>
                                    {yearValueSummary}
                                </strong>
                            </strong>
                        </Button>
                        <Dropdown.Toggle split id="dropdown-split-basic" />
                        <Dropdown.Menu>
                        <Dropdown.Item eventKey="All">All</Dropdown.Item>
                        <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
                        <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
                        <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
                        <Dropdown.Item eventKey="2017">2017</Dropdown.Item>
                        <Dropdown.Item eventKey="2016">2016</Dropdown.Item>
                        <Dropdown.Item eventKey="2015">2015</Dropdown.Item>
                        <Dropdown.Item eventKey="2014">2014</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    <div className="col-7 col-sm-6 nopaddingleft">
                        <div className="InfoText pharmatotal">
                            <strong className="color-1">Total Payments:</strong> <span className="color-4">${SumPayments.toLocaleString("en",{minimumFractionDigits: 2})}</span>
                        </div>
                    </div>
                        
                    <div className="StatisticCardContainer">
                                <StatisticView
                                TopDoctors = {TopDocs}
                                MostCommonGoods = {MostCommon}
                                />         
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-12 col-md-6 col-xxl-6">
                                <HorizontalBarChart labels={TopManufacturers.slice(0,8).map(e => e.ManufacturerName.length > 24 ? e.ManufacturerName.substring(0,24)+"..." : e.ManufacturerName)} data={TopManufacturers.slice(0,8).map(e => e.PayAmount)} description="Total Dollars" title="Top Payments by Manufacturer"/>
                            </div>
                            <div className="col-12 col-md-6 col-xxl-6 PieChartContainer">
                                <PieChart labels={TopItems.slice(0,8).map(e => e.Name.substring(0,26))} data={TopItems.slice(0,8).map(e => e.TotalPay)} title="Top Drugs/Devices by Payment" description="Total $"/>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

function StatisticView({TopDoctors, MostCommonGoods}) {
    return (
        <div className="row StatisticCard">
            <div className="col-6 marginCol">
                <div className="TransactionCardText TransactionCardTitle">
                    <b><u>Top Paid Doctors</u></b>
                </div>
                {
                    TopDoctors.slice(0,5).map(e => (
                        <div className="TransactionCardText item">
                            <Link to={{
                                    pathname: "/Doctor/" + e.DoctorId + "/",
                                }}>
                                {e.DoctorName}
                            </Link>
                        </div>
                    ))
                }
            </div>
            <div className="col-6 marginCol">
                <div className="TransactionCardText TransactionCardTitle">
                    <b><u>Most Common Items</u></b>
                </div>
                {
                    MostCommonGoods.slice(0,5).map(e => (
                        <div className="TransactionCardText item">
                            {e.Type_Product.substring(0,22)}: {e.Name.substring(0,22)}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default StateSummary;