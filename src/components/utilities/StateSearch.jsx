import { useState, useEffect } from "react";
import "./SearchStyle.css"
import { getApi } from '../utilities/api/fetchData';
import React from "react";
import { FormControl, InputGroup, Dropdown } from "react-bootstrap";
import {AiOutlineSearch} from "react-icons/ai";
import { useLocation, Link } from "react-router-dom";
import "./StateSearch.css";

function StateSearch() {
    const statesData = {
        "Alabama": "AL",
        "Alaska": "AK",
        "Arizona": "AZ",
        "Arkansas": "AR",
        "California": "CA",
        "Colorado": "CO",
        "Connecticut": "CT",
        "Delaware": "DE",
        "Florida": "FL",
        "Georgia": "GA",
        "Hawaii": "HI",
        "Idaho": "ID",
        "Illinois": "IL",
        "Indiana": "IN",
        "Iowa": "IA",
        "Kansas": "KS",
        "Kentucky": "KY",
        "Louisiana": "LA",
        "Maine": "ME",
        "Maryland": "MD",
        "Massachusetts": "MA",
        "Michigan": "MI",
        "Minnesota": "MN",
        "Mississippi": "MS",
        "Missouri": "MO",
        "Montana": "MT",
        "Nebraska": "NE",
        "Nevada": "NV",
        "New Hampshire": "NH",
        "New Jersey": "NJ",
        "New Mexico": "NM",
        "New York": "NY",
        "North Carolina": "NC",
        "North Dakota": "ND",
        "Ohio": "OH",
        "Oklahoma": "OK",
        "Oregon": "OR",
        "Pennsylvania": "PA",
        "Rhode Island": "RI",
        "South Carolina": "SC",
        "South Dakota": "SD",
        "Tennessee": "TN",
        "Texas": "TX",
        "Utah": "UT",
        "Vermont": "VT",
        "Virginia": "VA",
        "Washington": "WA",
        "West Virginia": "WV",
        "Wisconsin": "WI",
        "Wyoming": "WY",
        "District of Columbia": "DC"
    }
    const [showDrop, setshowDrop] = useState(false);
    const [states, setStates] = useState(statesData)
    const [state, setState] = useState("")
    const handleChange = (e) => {
        setStates(Object.fromEntries(Object.entries(statesData).filter(([k,v]) => k.includes(e.target.value))));
    }
    function handleClick() {
        if (showDrop) {
            setshowDrop(false)
        }
        else {
            setshowDrop(true)
        }
    }
    return (   
        <div className="statesearchbar">
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search your State"
                    aria-label="Search Doctor"
                    aria-describedby="basic-addon2"
                    onChange={handleChange}
                    onClick={handleClick}
                    className="customsearchbar"
                />
            </InputGroup>
            <Dropdown.Menu className="DropDownContent" show={showDrop}>
                {
                    Object.entries(states).map(([key,value]) => {
                        return (
                            <Dropdown.Item href={`/State/${value}/`} style={{overflow: "hidden",textOverflow : "ellipsis"}}>{key}</Dropdown.Item>
                        )    
                    })
                }
            </Dropdown.Menu>
        </div>
    );
}
export default StateSearch;