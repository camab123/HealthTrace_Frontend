import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Col, ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { getApi } from '../../utilities/api/fetchData';
import { useLocation, Link } from "react-router-dom";
import HorizontalBarChart from "../../utilities/graph"
import PieChart from "../../utilities/piechart";
import {
    useQuery,
  } from 'react-query';
import {
    useParams
  } from "react-router-dom";
  import "./manufacturer.css";

function ManufacturerSummaryView(manufacturerid){
    manufacturerid = manufacturerid.data
    const [yearValue,setValue]=useState("All");
    const [yearValueSummary, setYearValueSummary]=useState("All Payments");
    let url = "/manufacturer/summary/" + manufacturerid + "/?year=" + yearValue;
    const {isLoading, error, data}  = useQuery([`ManufacturerSummaryView`, yearValue], getApi(url))
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
    else {
        const TopDocs = data["Summary Data"].Top_Doctors
        const MostCommon = data["Summary Data"].Most_Common_Items
        const LargestPayments = data["Summary Data"].Largest_Payments
        const TopItems = data["Summary Data"].Top_Items
        const TopStates = data["Summary Data"].Top_States
        let sum_payment = data["Summary Data"].Sum_Payments
            if (sum_payment){
                sum_payment = sum_payment.toLocaleString("en",{minimumFractionDigits: 2})
            }
            else {
                sum_payment = 0.00
            }  
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
                                <div className="summaryYear color-1">
                                    <strong>
                                        {yearValueSummary}
                                    </strong>
                                </div>
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
                                <strong className="color-1">Total Payments:</strong> <span className="color-4">${sum_payment}</span>
                            </div>
                        </div>
                    </div>
                    <div className="StatisticCardContainer">
                            <StatisticView
                            TopDoctors = {TopDocs}
                            MostCommonGoods = {MostCommon}
                            LargestPayments= {LargestPayments}
                            />         
                    </div>
                    <hr/>
                    <div className="row">
                    <div className="col-12 col-md-6 col-xxl-6">
                            <HorizontalBarChart labels={TopStates.map(e => e.State)} data={TopStates.map(e => e.Amount)} description="Total Dollars" title="Top Payments by State"/>
                        </div>
                        <div className="col-12 col-md-6 col-xxl-6 PieChartContainer">
                            <PieChart labels={TopItems.slice(0,8).map(e => e.Name.substring(0,26))} data={TopItems.slice(0,8).map(e => e.TotalPay)} title="Top Drugs/Devices by Payment" description="Total $"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function StatisticView({TopDoctors, MostCommonGoods, LargestPayments}) {
    return (
        <div className="row StatisticCard">
            <div className="col-6 col-sm-4 marginCol">
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
            <div className="col-sm-4 marginCol d-none d-sm-block">
                <div className="TransactionCardText TransactionCardTitle">
                        <b><u>Largest Payments</u></b>
                </div>
                {
                    LargestPayments.slice(0,5).map(e => (
                        <div className="TransactionCardText item">
                            ${e.PayAmount.toLocaleString("en",{minimumFractionDigits: 2})}
                        </div>
                    ))
                }
            </div>
            <div className="col-6 col-sm-4 marginCol">
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

export default ManufacturerSummaryView;