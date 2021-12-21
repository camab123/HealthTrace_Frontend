import React, { useState, useEffect } from 'react';
import MapChart from "../../utilities/mapchart";
import StateSummary from './statesummary';
import { getApi } from '../../utilities/api/fetchData';
import "./state.css";
import {
    useQuery,
  } from 'react-query';
import {
    useParams
  } from "react-router-dom";

function StateContainer() {
    let { state } = useParams();
    const [summary, setSummary] = useState("summary");
    const [mapSummary, setMapSummary] = useState("TransactionSum")
    const [buttonText, setbuttonText] = useState("View Opioids");
    const {isLoading, error, data}  = useQuery(`StateRank`, getApi("/state/ranking/" + state + "/?format=json"));
    const handleClick = () => {
        if (summary == "summary") {
            setSummary("summaryopioids")
            setbuttonText("View All")
            setMapSummary("OpioidSum")
        } else {
            setSummary("summary")
            setbuttonText("View Opioids")
            setMapSummary("TransactionSum")
        }
    }
    if(error){
        return <p>ERROR</p>;
    }
    else if(isLoading){
        return (
            <div className="MainBox">
            </div>
        )
    }
    return (
        <div className="MainBox">
            <div className="row align-items-end">
                <div className="col-12 col-md-6">
                    <div className="StateInfo">
                            <div className="InfoText StateInfoText color-1">
                                {data.Name}
                            </div>
                            <StateRankings ranks={data}/>
                    </div>
                    <button className='button3 opioidButton' onClick={handleClick}>{buttonText}</button>
                </div>
                <div className="col-7 col-md-6 mapcolumn d-none d-sm-block">
                    <MapChart state={state} summary={mapSummary}/>
                </div>
            </div>
            <hr id="StateHr"/>
            <StateSummary state={state} summary={summary}/>
            <hr/>
        </div>
        
        
    )
}
function StateRankings(ranks) {
    return (
        <div className="RankContainer">
            <div className="RankText">
            <b className="color-4">#{ranks.ranks.Ranking.Rank}</b><span className="color-2"> in <b>Transactions</b></span>
            </div>
            <div className="RankText">
                <b className="color-4">#{ranks.ranks.Ranking.OpioidRank}</b><span className="color-2"> in <b>Opioid Transactions</b></span>
            </div>
        </div>
    )
}

export default StateContainer;