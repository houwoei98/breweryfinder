import '../../App.css';
import React, {useEffect, useState} from "react";
import {getAllBreweries, getBreweryById} from "../../api/BreweryApi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {LinkContainer} from "react-router-bootstrap";
import beerpointer from "../../images/beerpointersmall.svg";
import {ReactBingmaps} from "react-bingmaps";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../auth/LoadingSpinner";


const Location = () => {
    const navigate = useNavigate();


    const [breweries, setBreweries] = useState([]);
    const [infoBoxes, setInfoBoxes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");



    const getBreweryDetail = () => {
        // setIsLoading(true);
        const breweryDetail = async () => {

            getAllBreweries().then(data => {
                setBreweries(data);
                setIsLoading(false);
            });

        }
        breweryDetail();
    };
    getBreweryDetail();

    useEffect(() => {
        const getInfoBoxes = async() => {
            breweries.map(brewery => {
                infoBoxes.push(
                    {
                        "location":[brewery?.latitude, brewery?.longitude],
                        "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
                        "infoboxOption": { title: brewery.breweryName, description: brewery.breweryDescription },
                        "pushPinOption":{ title: brewery.breweryName, description: 'Pushpin', icon:beerpointer },
                        "pushPinAddHandler": {"type" : "click", callback: function () {
                                navigate('/brewery/detail/' + brewery.breweryId)
                            }
                        },
                        "infoboxAddHandler": {"type" : "click", callback: function () {
                                navigate('/brewery/detail/' + brewery.breweryId)
                            }
                        }
                    },
                )
            })
        }
        getInfoBoxes();

    }, [breweries]);

    return (

        <body>
        <div className="mainCard">
            <h1>Location</h1>
            <p>See all our breweries location here!</p>
            {isLoading ? <LoadingSpinner/> : ''}
                <div className="location">
                    {(infoBoxes.length > 0) &&
                    <ReactBingmaps
                        bingmapKey="AiLAGX6KhhdnCA80df2TnRtH-3jgPFr3Bh7ktsl79aqrVToP34AY9AGktCwSGkLL"
                        center={
                            // [brewery?.latitude, brewery?.longitude]
                            [51.49443479764914, -0.07005123896129444]
                        }
                        zoom={15}
                        infoboxesWithPushPins={infoBoxes}
                    >
                    </ReactBingmaps>
                    }
                </div>


        </div>
        </body>
    );
}

export default Location;