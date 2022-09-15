import '../../App.css';
import React, {useEffect, useState} from "react";
import {getAllBeers} from "../../api/BeerApi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {LinkContainer} from "react-router-bootstrap";

const Beerlist = () => {


    const [beers, setBeers] = useState([]);

    useEffect(() => {
        const getBeers= async() => {
            const data = await getAllBeers();
            setBeers(data);
        }
        getBeers();

    }, []);

    return (

        <body>
            <div className="mainCard">
                <h1>Beers</h1>
                <p>Click a picture for more details</p>
                <Row xs={1} md={5} className="breweriesList">
                    {beers.map(beer => (
                        <Col key={beer.beerId}>
                            <LinkContainer to={{pathname: `/beer/detail/${beer.beerId}`}} >
                                <Card className="breweryListRow">
                                    <Card.Img className="gridImgBeers" variant="top" src={beer.imgPath} />
                                    <Card.Body>
                                        <Card.Title className="cardTitle">{beer.beerName}</Card.Title>
                                        <Card.Text>

                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </LinkContainer>
                        </Col>
                    ))}
                </Row>
            </div>
        </body>
    );
}

export default Beerlist;