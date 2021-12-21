import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";
import {useHistory} from 'react-router-dom';
import "./mapstyle.css"
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3.0.0/states-10m.json";

const StateMapChart = ({summary}) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  
  const StatesNames = {
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
  const mapStyle = {
    outer: {
      width: "95%",
      height: "auto",
      marginLeft: "10%",
      marginRight: "5%"
    },
  }
  useEffect(() => {
    csv("/StateMapData.csv").then(states => {
      setData(states);
    });
  }, []);

  const colorScale = scaleQuantile()
    .domain(data.map(d => d[summary]))
    .range([
      "#fdfdec",
      "#ffffd9",
      "#e0efca",
      "#c1debe",
      "#a2ceb4",
      "#85bcad",
      "#6baba6",
      "#53999f",
      "#408697",
      "#367180",
    ]);

  return (
    <ComposableMap className="mapStyling" data-tip="" projectionConfig={{ scale: 1000 }} projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const cur = data.find(s => s.State === geo.properties.name);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur ? colorScale(cur[summary]) : "#fffff5"}
                onClick={() => {
                  history.push('/State/' + StatesNames[geo.properties["name"]]);
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default StateMapChart;