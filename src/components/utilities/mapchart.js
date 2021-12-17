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


const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

// scale(, 3.66547) !important
const LinearGradient = props => {
  const { data } = props;
  const gradientStyle = {
    backgroundImage: 
      `linear-gradient(to bottom, ${data.fromColor} , ${data.toColor})`,
  };
  return (
    <div className="GridContainer">
      <div className="gridLayout">
        <div className="scaleMinData">
            {data.min}
        </div>
        <div className="MinMaxSpacer">

        </div>
        <div className="scaleMaxData">
          <span>
          {rounded(data.max)}
          </span>
        </div>
      </div>
      <div className="gradientMap" style={{...gradientStyle }}>
      </div>
    </div>
  );
};

const MapChart = ({setTooltipContent, state}) => {
  const {isLoading, error, data}  = useQuery([`MapView`], getApi("/state/map/"+ state + "/?format=json"))
  const [content, setContent] = useState("");
  if (isLoading){
    return <div className="mapContainer"/>
  }
  else {
    const mapStyle = {
      inner: {
        transform: data["Transformation"],
        stroke: '1px solid red'
      }
    }
    const colorScale = scaleQuantile()
      .domain(data["Map"]["features"].map(d => d.properties.TransactionSum))
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
      const maxData = data["Map"]["features"].map(d => d.properties).reduce((max, item) => (item.TransactionSum > max ? item.TransactionSum : max), 0);
      const gradientData = {
        fromColor: colorScale(0),
        toColor: colorScale(data["Map"]["features"].map(d => d.properties).reduce((max, item) => (item.TransactionSum > max ? item.TransactionSum : max), 0)),
        min: 0,
        max: (maxData)
      };  
    return (
      <div className="mapContainer">
        {/* <div className="mapTitle">
          Transactions in dollars by County
        </div> */}
        <ComposableMap data-tip="" className="mapOuter" projectionConfig={{ scale: 2000}} preserveAspectRatio={"xMidYMid meet"} projection="geoAlbersUsa">
          <Geographies geography={data["Map"]["features"]} style={mapStyle.inner}>
            {({ geographies }) =>
              geographies.map(geo => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={geo.properties.TransactionSum ? colorScale(geo.properties.TransactionSum) : "#fffff5"}
                    onMouseEnter={() => {
                      const { name, TransactionSum } = geo.properties;
                      setContent(`${name} — ${rounded(TransactionSum)}`);
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                  />
              );
            })
          }
          </Geographies>
        </ComposableMap>
      <LinearGradient data={gradientData}/>
      <ReactTooltip>{content}</ReactTooltip>
      </div>
    );
  };
  }
  

export default memo(MapChart);