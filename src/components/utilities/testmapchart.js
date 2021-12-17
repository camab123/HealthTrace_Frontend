import React, { useState, useEffect, memo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";
import { useQuery } from "react-query";
import { getApi } from '../utilities/api/fetchData';
import ReactDOM from "react-dom";
import { useLocation, Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import "./mapstyle.css"

const TestChart = ({state}) => {
  const {isLoading, error, data}  = useQuery([`MapView`], getApi("/statemap/"+ state + "/?format=json"))
  if (isLoading){
    return "loading.."
  }
  else {
      console.log(data)
    const colorScale = scaleQuantile()
      .domain(data["Map"]["features"].map(d => d.properties.TransactionSum))
      .range([
        "#ffedea",
        "#ffcec5",
        "#ffad9f",
        "#ff8a75",
        "#ff5533",
        "#e2492d",
        "#be3d26",
        "#9a311f",
        "#782618"
      ]);
      const maxData = data["Map"]["features"].map(d => d.properties).reduce((max, item) => (item.TransactionSum > max ? item.TransactionSum : max), 0);
      const gradientData = {
        fromColor: colorScale(0),
        toColor: colorScale(data["Map"]["features"].map(d => d.properties).reduce((max, item) => (item.TransactionSum > max ? item.TransactionSum : max), 0)),
        min: 0,
        max: (maxData)
      };  
    return (
        <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200}} preserveAspectRatio={"xMidYMid meet"} projection="geoAlbersUsa">
        <Geographies geography={data["Map"]["features"]} >
          {({ geographies }) =>
            geographies.map(geo => {
              console.log(geo)
              console.log(geographies)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={geo.properties.TransactionSum ? colorScale(geo.properties.TransactionSum) : "#EEE"}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      </>
    );
  };
  }
  

export default memo(TestChart);