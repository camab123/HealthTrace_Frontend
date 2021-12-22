import React, { useState, useEffect, Component } from 'react';
import { getApi } from '../../utilities/api/fetchData';
import { useLocation, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./searchpage.css";
import {
    useQuery,
  } from 'react-query'

function AddressFormatter(data) {
    data = data.data
    const street1 = data.StreetAddress1;
    const street2 = data.StreetAddress2;
    const city = data.City;
    const state = data.State;
    let address;
    if (street2) {
        address = street1 + ", " + street2 + ", " + city + " " + state
    }
    else {
        address = street1 + ", " + city + " " + state
    }
    return address
}

function SearchResultPage() {
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');
    const [page, setPage] = useState(1);
    const {isLoading, isError, data, isFetching, isPreviousData} = useQuery(['SearchResultPage', page, name], getApi("/doctor/search/?name=" + name + "&page=" + page), {keepPreviousData: true})
    if(isError){
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
        return (
            <div className="searchField">
                <div className="SearchHeading color-1">
                        Search Results
                    </div>
                <hr/>
                <div className="searchResultBox">
                    {
                        data.Doctors.slice(0,15).map(item => (
                            <Link to={{
                                pathname: "/Doctor/" + item.DoctorId + "/",
                             }} id="SearchLinks">
                                <div className="searchResult">
                                    <div className="ResultName">
                                        {item.FirstName} {item.MiddleName ? item.MiddleName.substring(0,1) + ".": " "} {item.LastName}
                                    </div>
                                    <div className="ResultAddress">
                                        <AddressFormatter data={item}/>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }   
                    
                        <div className="searchPagination">
                            <button id="pageNav" onClick={() => setPage(old => Math.max(old - 1, 0))}
                                disabled={page === 1} class="previous round">&#8249;</button>
                            <button id="pageNav" onClick={() => {
                                if (!isPreviousData && data.Pages > page) {
                                    setPage(old => old + 1)
                                }
                            }} class="next round" disabled={isPreviousData || !data.Pages > page}>&#8250;</button>
                        </div>
                </div>
            </div>
        )
}
}

export default SearchResultPage;