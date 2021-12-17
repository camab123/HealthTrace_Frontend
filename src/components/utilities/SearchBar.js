import { useState, useEffect } from "react";
import "./SearchStyle.css"
import { getApi } from '../utilities/api/fetchData';
import React, {Component} from "react";
import { FormControl, InputGroup, Form, Dropdown, DropdownButton } from "react-bootstrap";
import { useQuery } from "react-query";
import {AiOutlineSearch} from "react-icons/ai";
import { useLocation, Link } from "react-router-dom";
  
function SearchBar() {
    const [name, setName] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const {isLoading, data} = useQuery(['SearchBarResults', name], getApi("/doctor/autofillsearch/?search=" + name), {enabled: name.length > 1, staleTime: 10 * 1000, onSuccess: (data) => {setData(data)}});
    const [showDrop, setshowDrop] = useState(false);
    const setData = (data) => {
        setDoctors(data.Doctors.map(e => ({
            "Id": e.DoctorId,
            "Name": e.FirstName + " " + e.MiddleName + " " + e.LastName
        })
        ))
        setManufacturers(data.Manufacturers.map(e => ({
            "Id": e.ManufacturerId,
            "Name": e.Name
        })
        ))
    }
    const handleChange = (e) => {
        setName(e.target.value)
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
        <>
            <InputGroup className="mb-3">
            <FormControl
                placeholder="Search Doctors/Companies"
                aria-label="Search Doctor"
                aria-describedby="basic-addon2"
                onChange={handleChange}
                onClick={handleClick}
            />
            
                <InputGroup.Text id="basic-addon2">
                    <Link to={`/Search/?name=${name}`}><AiOutlineSearch/></Link>
                </InputGroup.Text>
                </InputGroup>
            
        
            <Dropdown.Menu className="dropdown-menu-search" show={showDrop}>
                <Dropdown.Header>Doctors</Dropdown.Header>
                {
                    doctors.map(doctor => {
                        return (
                            <Dropdown.Item href={`/Doctor/${doctor.Id}/`} style={{overflow: "hidden",textOverflow : "ellipsis"}}>{doctor.Name}</Dropdown.Item>
                        )    
                    })
                }
                <Dropdown.Divider />
                <Dropdown.Header>Manufacturers</Dropdown.Header>
                {
                    manufacturers.map(manufacturer => {
                        return (
                            <Dropdown.Item href={"/manufacturers/" + manufacturer.Id} style={{overflow: "hidden",textOverflow : "ellipsis"}}>{manufacturer.Name}</Dropdown.Item>
                        )    
                    })
                }
            </Dropdown.Menu>
        
        </>
    );
}
export default SearchBar;