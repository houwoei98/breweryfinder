import '../../App.css';
import React, {useEffect, useState} from "react";
import {getAllActiveBreweries} from "../../api/BreweryApi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {LinkContainer} from "react-router-bootstrap";
import WebImage from "../webimage/WebImage";


const Brewerylist = () => {


    const [breweries, setBreweries] = useState([]);

    useEffect(() => {
        const getBreweries = async() => {
            const data = await getAllActiveBreweries();
            setBreweries(data);
        }
        getBreweries();

    }, []);

    return (

        <body>
            <div className="mainCard">
                <h1>Breweries</h1>
                <p>Click a picture for more details</p>
                <Row xs={1} md={4} className="breweriesList">
                    {breweries.map(brewery => (
                        <Col key={brewery.breweryId}>
                            {brewery.active &&
                            <LinkContainer to={{pathname: `/brewery/detail/${brewery.breweryId}`}}>
                                <Card className="breweryListRow">
                                    <WebImage imageId={brewery.imgPath} altText={brewery.breweryName} cssClass="gridImgBreweries card-img-top"/>
                                    <Card.Body>
                                        <Card.Title className="cardTitle">{brewery.breweryName}</Card.Title>
                                        <Card.Text>

                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </LinkContainer>
                            }
                        </Col>

                    ))}
                </Row>
            </div>
        </body>
    );
}

export default Brewerylist;