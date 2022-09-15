import '../../App.css';
import React, {useEffect, useState} from "react";
import {getAllBreweries, getBreweryById} from "../../api/BreweryApi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {ReactBingmaps} from "react-bingmaps";
import Form from 'react-bootstrap/Form';
import WebImage from "../webimage/WebImage";


const MyPlanner = () => {

    const [breweries, setBreweries] = useState([]);
    const [infoBoxes, setInfoBoxes] = useState([]);
    const [wayPoint, setWayPoint] = useState([]);
    const [renderMap, setRenderMap] = useState([]);
    const [showMap, setShowMap] = useState(true);

    useEffect(() => {
        const getBreweries = async() => {
            const data = await getAllBreweries();
            setBreweries(data);
        }
        getBreweries();

    }, [renderMap]);


    const handleUserInput = (event) => {
        const {id,value} = event.target;
        if (event.target.checked) {
            wayPoint.push({
                "location": value.split(",").map(Number)
            })
            setRenderMap(value);
        } else {

            const newArray = wayPoint.filter(function( obj ) {
                return (obj.location[0] !== value.split(",").map(Number)[0] && obj.location[1] !== value.split(",").map(Number)[1]);
            });
            setWayPoint([]);
            setSecondaryWayPoint(newArray);
        }
    };
    const [secondaryWayPoint, setSecondaryWayPoint] = useState([]);
    useEffect(() => {
        setWayPoint(secondaryWayPoint);
    }, [secondaryWayPoint])
    useEffect(() => {
        setShowMap(showMap);
    }, [showMap])


    return (

        <body>
        <div className="mainCard">
            <h1>My Planner</h1>
            <p>Plan your trip here!</p>

            <Form>
                <Row xs={1} md={4} className="breweriesList">
                    {breweries.map(brewery => (
                        <Col key={brewery.breweryId}>
                            <Card className="breweryListRow">
                                <WebImage imageId={brewery.imgPath} altText={brewery.breweryName} cssClass="gridImgBreweries card-img-top"/>
                                <Card.Body className="plannerCardText">
                                    <Form.Check
                                        onChange={handleUserInput}
                                        type={'checkbox'}
                                        id={brewery.breweryId}
                                        label={brewery.breweryName}
                                        value={[brewery.latitude, brewery.longitude]}
                                    />
                                </Card.Body>
                            </Card>

                        </Col>
                    ))}
                </Row>
            </Form>
        </div>
            <div className="row mt-4 mainLocation">

                {(wayPoint.length > 1) &&
                <div className="direction-container col-3">
                    <div className="input-panel" id='inputPanel'></div>
                    <div className="itinerary-container" id='itineraryContainer'></div>
                </div>
                }

                {(showMap) && (wayPoint.length > 1) &&
                <div className="col-9 map-three">

                    <ReactBingmaps
                        NavigationBarMode = {"compact"}
                        bingmapKey="AiLAGX6KhhdnCA80df2TnRtH-3jgPFr3Bh7ktsl79aqrVToP34AY9AGktCwSGkLL"
                        center={[51.49993479764914, -0.07505123896129444]}
                        zoom={15}
                        directions={{
                            "inputPanel": "inputPanel",
                            "renderOptions": {"itineraryContainer": "itineraryContainer"},
                            "requestOptions": {"routeMode": "walking", "maxRoutes": 1},
                            "wayPoints": wayPoint
                        }}
                    >
                    </ReactBingmaps>

                </div>
                }
        </div>
        </body>
    );
}

export default MyPlanner;