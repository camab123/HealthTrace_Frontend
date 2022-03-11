import React, { useState, useRef } from 'react';
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { getApi } from '../../utilities/api/fetchData';
import { useLocation, Link } from "react-router-dom";
import HorizontalBarChart from "../../utilities/graph";
import {
    useQuery,
    useInfiniteQuery
  } from 'react-query'
import {
    useParams
  } from "react-router-dom";
  import "./doctor.css";

function addZeroes(num) {
    const dec = num.split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
  }

function DoctorSummaryView(doctorid){
    const [id, setId] = useState(doctorid.data);
    const [yearValue,setValue]=useState("");
    const [yearValueSummary, setYearValueSummary]=useState("All Payments");
    const {isLoading, error, data}  = useQuery([`DoctorSummaryView`, yearValue, id], getApi("/doctor/summary/" + id + "/?year=" + yearValue))
    const handleSelect=(e)=>{     
        setValue(e)
        if (e != "All") {
            setYearValueSummary("Payments " + e)
            
        }
        else {
            setYearValueSummary("All Payments")
            setValue("")
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
        const TopByPay = data.Top_Paid_Items
        const transaction = data.Transactions
        const TopManu = data.Top_Manufacturers
        const TopPayouts = data.Top_Payment
        let sumPayment = data.Sum_Payment.Pay_Amount__sum
        if (sumPayment){
            sumPayment = sumPayment.toLocaleString("en",{minimumFractionDigits: 2})
        }
        else {
        sumPayment = 0.00
        }
        const TopItems = data.Top_Drugs
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
                                <strong className="color-1">Pay From Pharma:</strong> <span className="color-4">${sumPayment}</span>
                            </div>
                        </div>
                    </div>
                    <div className="StatisticCardContainer">
                            <StatisticView
                            TopItemsByPay = {TopByPay}
                            TopItems = {TopItems}
                            LargestPayoffs= {TopPayouts}
                            />         
                    </div>
                    <hr/>
                    <div className="summaryTitle">
                        Transactions in {yearValue ? yearValue : "All Years"}
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <HorizontalBarChart labels={TopManu.slice(0,8).map(e => e.Manufacturer__Name.length > 26 ? e.Manufacturer__Name.substring(0,26)+"..." : e.Manufacturer__Name)} data={TopManu.slice(0,8).map(e => e.top_manu)} description="Total Transactions"/>
                        </div>
                        <Transactions yearValue={yearValue} id={id}/>
                    </div>
                </div>
            </div>
        )
    }
}

function Transactions({yearValue, id}) {
    const scrollArea = useRef(null)
    const {
        isLoading, 
        error, 
        data,
        hasNextPage,
        fetchNextPage
        }  = useInfiniteQuery(
            [`DoctorTransactions`, yearValue], 
            ({pageParam = 1}) => getApi(`/doctor/transactions/${id}/?page=${pageParam}&year=${yearValue}`)(pageParam),
            {
                getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
            }
            );
    return (
        
        <div className="col-12 col-sm-6 TransactionCardContainer" id="scrollableDiv"> 
            {!(isLoading) && !(error) &&
                data.pages.map((page) => 
                    page.Transactions.map(e => 
                        <LatestTransactions
                            MyDate = {e.Date}
                            Payment = {e.Pay_Amount}
                            Company = {e.Manufacturer}
                            CompanyId = {e.ManufacturerId}
                            TransactionItems = {e.transactions}
                            NaturePayment = {e.Nature_Payment}
                        />
                        )      
                )
            }
            {hasNextPage && 
                <button className="button3" onClick={fetchNextPage}>Load More</button>
            }
            
            {isLoading && <p>Loading...</p>}
            {error && <p>Error!</p>}
        </div>
    )
}

function LatestTransactions({MyDate, Company, CompanyId, Payment, TransactionItems, NaturePayment}){
        var options = { year: '2-digit', month: 'numeric', day: 'numeric' };
        const DateValue = new Date(MyDate).toLocaleDateString("en-US", options);
        return ( 
                <div className="TransactionCard">
                    <div className="row">
                        <div className="col-9">
                            <div className="TransactionCardText Company">
                                <Link to={{
                                            pathname: "/Manufacturers/" + CompanyId + "/",
                                        }}>
                                        <b><u>{Company.substring(0,36)}</u></b>
                                </Link>
                            </div>
                        </div>
                        
                    <div className="col-3">
                        <div className="TransactionCardText CardDate">
                            {DateValue}
                        </div>
                    </div>
                </div>
                    {
                        TransactionItems.slice(0,2).map(e => (
                            <div className="listview">
                                <div className="TransactionItemType">
                                    {e.Type_Product}
                                </div>
                                <div className="TransactionItemCategory">
                                    {e.Category}
                                </div>
                                <div className="TransactionItemName">
                                    {e.Name}
                                </div>
                            </div>
                        ))
                    }
                    <div className="row">
                        <div className="TransactionCardText">
                            <div className="NaturePayment">
                                 Context: {NaturePayment}
                            </div>
                            <div className="CardPayAmount">
                                ${Payment.toLocaleString("en",{minimumFractionDigits: 2})}
                            </div>
                        </div>
                    </div>            
                </div>
                
        )
}

function StatisticView({TopItemsByPay, TopItems, LargestPayoffs}) {
    return (
        <div className="row StatisticCard">
                <div className="col-6 col-sm-4 marginCol">
                    <div className="TransactionCardText">
                            <b><u>Top Items by Payment</u></b>
                        </div>
                            {
                                TopItemsByPay.length > 0 ?
                                TopItemsByPay.map(e => (
                                    <div className="TransactionCardText item">
                                        <div className="Transactionitemname">
                                            {e.transactionitems__Name.substring(0,22)}:&nbsp;
                                        </div>
                                            ${e.total.toLocaleString("en",{minimumFractionDigits: 2})}
                                    </div>
                                )) :
                                <div className="TransactionCardText item">
                                    No Transaction Items
                                </div>
                            }
                </div>
                <div className="col-sm-4 marginCol d-none d-sm-block">
                    <div className="TransactionCardText">
                            <b><u>Largest Payments Received</u></b>
                    </div>
                    {
                        LargestPayoffs.length > 0 ?
                        LargestPayoffs.map(e => (
                            <div className="TransactionCardText item">
                                ${e.Pay_Amount.toLocaleString("en",{minimumFractionDigits: 2})}
                            </div>
                        )) :
                        <div className="TransactionCardText item">
                            No Transaction Items
                        </div>
                    }
                </div>
                <div className="col-6 col-sm-4 marginCol">
                    <div className="TransactionCardText">
                        <b><u>Top Transaction Items</u></b>
                    </div>
                    
                    {   
                        TopItems.length > 0 ? 
                        TopItems && TopItems.map(e => (
                            <div className="TransactionCardText item">
                               {e.transactionitems__Type_Product ? e.transactionitems__Type_Product.substring(0,22) + ":" : ""} {e.transactionitems__Name ? e.transactionitems__Name.substring(0,22): ""}
                            </div>
                        )) :
                        <div className="TransactionCardText item">
                            No Transaction Items
                        </div>
                    }
                </div> 
        </div>
    )
}

export default DoctorSummaryView;