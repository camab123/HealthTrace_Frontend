import { Helmet } from 'react-helmet';
import React from 'react';

export function GetSEO(props){
    return (
        <Helmet>
            <title>{props.title}</title>
            <meta name="description" content={props.description} data-react-helmet="true"/>
            <meta name="keywords" content={props.keywords} data-react-helmet="true"/>
        </Helmet>
    );
}
