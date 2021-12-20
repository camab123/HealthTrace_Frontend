import React, { useState, useEffect } from 'react';
import StateMapChart from '../../utilities/StateMap';
import "./home.css";
import DocSymbol from "../../../assets/images/DocSymbol.png";
import CompanySymbol from "../../../assets/images/CompanySymbol.png";
import CashSymbol from "../../../assets/images/CashSymbol.png";
import StateSearch from '../../utilities/StateSearch';
function Home() {
    return (
        <>
            <div className='WelcomeBox color-4-background'>
                    <div className='center color-3 WelcomeBoxText1'>Search for your hometown Doctor's Transactions</div>
                    <div className='center color-5 WelcomeBoxText2'>See what companies they have been taking money from</div>
            </div>

            <div className="MainBox HomePage">
                <div className='HomeSectionMargin'>
                    <div className='GeneralStats NormPadding color-1'>
                        <div className='col-12 center'>
                            Opening Up Our Healthcare System With HealthTrace
                        </div>  
                    </div>
                    <div className='GeneralStats NormPadding row color-1'>
                        <div className='col-12 col-sm-4 center'>
                            <img src={DocSymbol} className='StatImages' alt='DocSymbol'></img>
                            <div className='color-4 mobileMargin'>Over 1 Million Doctors</div>
                        </div>
                        <div className='col-12 col-sm-4 center'>
                            <img src={CompanySymbol} className='StatImages2' alt='CompanySymbol'></img>
                            <div className='color-4 mobileMargin'>2,748 Companies</div>
                        </div>
                        <div className='col-12 col-sm-4 center'>
                            <img src={CashSymbol} className='StatImages3' alt='CashSymbol'></img>
                            <div className='color-4 mobileMargin'>72.9 Million Transactions</div>
                        </div>
                    </div>
                </div>

                <div className='ExampleDoc color-4-background'>
                    <div className='GeneralStats NormPadding row'>
                        <div className='col-12 center color-5'>Better Understand Big Pharma's Tactics</div>
                    </div>
                    <div className='GeneralStats NormPadding row justify-content-center'>
                        <div className='col-6 col-sm-4 mobileMargin'>
                            <div className='HomeCard color-5-background'>
                                <div className='center color-4 HomeCardTitle'>Doctors</div>
                                <div className='center color-1 HomeCardText'>Discover the transactions and drugs your Doctor has taken money from</div>
                            </div>
                        </div>
                        <div className='col-6 col-sm-4 mobileMargin'>
                            <div className='HomeCard color-5-background'>
                                <div className='center color-4 HomeCardTitle'>Companies</div>
                                <div className='center color-1 HomeCardText'>Find out what Drugs and Devices companies pay to Doctors</div>
                            </div>
                        </div>
                        <div className='col-6 col-sm-4 mobileMargin'>
                            <div className='HomeCard color-5-background'>
                                <div className='center color-4 HomeCardTitle'>States</div>
                                <div className='center color-1 HomeCardText'>Learn more more about the companies involved with your State</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='HomeSectionMargin'>
                    <div className='GeneralStats NormPadding row'>
                        <div className='col-12 col-sm-5 color-1 center'>
                            <div className='StateList'>
                                <div className='StateBanner color-4'>
                                    <div className='HeatMapTitle'>Heatmap of United States</div>
                                    <div className='byTransaction'>By Transactions</div>
                                </div>
                                <StateSearch/>    
                            </div>     
                        </div>
                        <div className='col-12 col-sm-7'>
                            <StateMapChart/>
                        </div>
                       
                    </div>
                </div>
                
            </div>
        </>
    )
    }
export default Home;