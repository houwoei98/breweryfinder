import '../../App.css';
import React, {useEffect, useState} from "react";
import {
    addFavBreweryByBreweryId,
    deleteFavBreweryByBreweryId,
    getBreweryById,
    getFavouriteBreweriesByUser
} from "../../api/BreweryApi";
import {useNavigate, useParams} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {addExistingBeerForBreweryId, getAllBeerForBreweryId} from "../../api/BeerApi";
import * as PropTypes from "prop-types";
import {LinkContainer} from "react-router-bootstrap";
import BingMapsReact from "bingmaps-react";
import beerpointer from "../../images/beerpointer.svg";
import { ReactBingmaps } from 'react-bingmaps';
import Button from "react-bootstrap/Button";
import {Form, Modal} from "react-bootstrap";
import {getUser} from "../../api/UserApi";
import WebImage from "../webimage/WebImage";



const Brewery = () => {

    let {id} = useParams();
    const [brewery, setBrewery] = useState({});
    const [callingDetail, setCalling] = useState(false);
    const [beers, setBeers] = useState([]);
    const [user, setUser] = useState([]);
    const [showFavBreweryModal, setShowFavBreweryModal] = useState(false);
    const [showDeleteBreweryModal, setShowDeleteBreweryModal] = useState(false);
    const [breweries, setBreweries] = useState([]);
    const [showFavBreweryButton ,setShowFavBreweryButton] = useState(true);
    const [showDeleteBreweryButton ,setShowDeleteBreweryButton] = useState(false);
    const [showNewsModal, setShowNewsModal] = useState(true);


    const getBreweryDetail = () => {
        const breweryDetail = async () => {
            if (!callingDetail) {
                setCalling(true);
                getBreweryById(id).then(data => {
                    setBrewery(data);
                });
            }
        }
        breweryDetail();
    };
    getBreweryDetail();

    useEffect(() => {
        const getBeers = async() => {
            const data = await getAllBeerForBreweryId(id);
            setBeers(data);
        }
        getBeers();

    }, []);

    useEffect(() => {
        const getUserFromCookie = async () => {
            getUser().then( user=> {
                    setUser(user);
                    window.scrollTo(0, 0);
                }
            );
        }
        getUserFromCookie();
    }, []);

    const pushPin = {
        center: {
            latitude: 51.49993479764914,
            longitude: -0.07505123896129444,
        },
        options: {
            title: brewery.breweryName,
            icon: beerpointer,
        },

    }

    useEffect(() => {
        // const getAllBreweriesByUser = async() => {
        //     const data = await getFavouriteBreweriesByUser();
        //     setBreweries(data);
        // }
        const getAllBreweriesByUser = () => {
            getFavouriteBreweriesByUser().then(data => {
                setBreweries(data);
            })
        }
        getAllBreweriesByUser();


    }, [user]);

    useEffect( () => {
        for (let i = 0; i < breweries.length; i++) {
            if (breweries[i].breweryId === parseInt(id)) {
                setShowFavBreweryButton(false);
            }
        }
    }, [breweries])


    const pushPins = [pushPin];

    const reload=()=>window.location.reload();

    const handleAddFavouriteBrewery = (event) => {
        event.preventDefault();
        const addFavouriteBrewery = async () => {
            addFavBreweryByBreweryId(Number(id)).then(data => {
                setShowFavBreweryModal(true);
            });
        }
        addFavouriteBrewery();
    };




    const handleDeleteFavouriteBrewery = (event) => {
        event.preventDefault();
        const deleteFavouriteBrewery = async () => {
            deleteFavBreweryByBreweryId(Number(id)).then(data => {
                setShowDeleteBreweryModal(true);
            });
        }
        deleteFavouriteBrewery();
    };


    const handleClose = () => {
        setShowFavBreweryModal(false);
        setShowFavBreweryButton(false);
        window.scrollTo(0,0);
    };
    const handleCloseDelete = () => {
        setShowDeleteBreweryModal(false);
        setShowFavBreweryButton(true);
        window.scrollTo(0,0);
    };
    const handleCloseForNews = () => setShowNewsModal(false);



    return (

        <body>
            <div className="mainCard columns">
                <Modal show={showFavBreweryModal} onHide={handleClose}
                       // onExit={reload}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Awesome</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You have successfully added this brewery as your favourite! You can now go to your homepage to see their latest news
                    </Modal.Body>
                </Modal>

                <Modal show={showDeleteBreweryModal} onHide={handleCloseDelete}
                       // onExit={reload}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Awesome</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You have successfully deleted this brewery as your favourite!
                    </Modal.Body>
                </Modal>

                <div className="breweryNameDiv">
                    <h1>{brewery?.breweryName}</h1>
                </div>

                <div className="breweryImageDiv">
                    <WebImage imageId={brewery?.imgPath} altText={brewery?.breweryName} cssClass="breweryMainImage"/>
                    {/*<img className="breweryMainImage" src={brewery?.imgPath} alt="image of beer"/>*/}
                </div>

                <div className="whiteText breweryInfoDiv">
                    <p id="breweryDescription" className="leftAlignText">{brewery?.breweryHistory}</p>
                    <br/>
                    <div id="beerDetailColumns">
                        <p>Opening Hours</p>
                        <p className="subText">Mon-Thur:</p>
                        <p className="subText">{brewery?.openingHoursMonThur}</p>
                    <br/>
                        <p className="subText">Fri-Sun:</p>
                        <p className="subText">{brewery?.openingHoursFriSun}</p>
                    </div>
                    <div id="beerDetailColumns">
                        <p>Address</p>
                        <p className="subText">{brewery?.breweryAddress}</p>
                    </div>
                    <div id="beerDetailColumns">
                        <p>Telephone Number</p>
                        <p className="subText">{brewery?.breweryPhoneNum}</p>
                    </div>
                </div>

                {(showFavBreweryButton && user.role === 'BeerLover') &&
                <div id="addAsFavouriteBrewery">
                    <Form  className="container"
                           onSubmit={handleAddFavouriteBrewery}
                           onChange={reload}
                    >
                        <Button variant="outline-light" type="submit">Add as Favourite Brewery</Button>
                    </Form>
                </div>
                }
                {(!showFavBreweryButton && user.role === 'BeerLover') &&
                <div id="addAsFavouriteBrewery">
                    <Form  className="container"
                           onSubmit={handleDeleteFavouriteBrewery}
                           onChange={reload}
                    >
                        <Button variant="outline-light" type="submit">Delete this brewery as your favourite brewery</Button>
                    </Form>
                </div>
                }

                <div className="breweryLocationMap">
                    {brewery.latitude !== undefined &&
                <ReactBingmaps
                    bingmapKey = "AiLAGX6KhhdnCA80df2TnRtH-3jgPFr3Bh7ktsl79aqrVToP34AY9AGktCwSGkLL"
                    center = {[brewery?.latitude, brewery?.longitude]}
                    zoom = {17}
                    infoboxesWithPushPins = {[
                        {
                            "location":[brewery?.latitude, brewery?.longitude],
                            "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
                            "infoboxOption": { title: brewery.breweryName, description: brewery.breweryHistory },
                            "pushPinOption":{ title: brewery.breweryName, description: 'Pushpin', icon:beerpointer },
                        }
                    ]
                    }
                >
                </ReactBingmaps>
                    }
                </div>

                <div className="ourBeersDiv">
                        <h2>Our Beers</h2>
                        <Row xs={1} md={6} >
                            {beers.map(beer => (
                                <Col key={beer.beerId}>
                                    {beer.active === true &&
                                    <div>
                                        <LinkContainer to={{pathname: `/beer/detail/${beer.beerId}`}}>
                                            <Card className="breweryListRow">
                                                <Card.Img className="gridImgBreweriesBeer" variant="top"
                                                          src={beer.imgPath}/>
                                                <Card.Body>
                                                    <Card.Title
                                                        className="beerBreweryCardTitle">{beer.beerName}</Card.Title>
                                                    <Card.Text>

                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </LinkContainer>
                                    </div>
                                    }
                                </Col>
                            ))}
                        </Row>
                </div>
                <div>
                    <Modal show={showNewsModal} onHide={handleCloseForNews}>
                        <Modal.Header closeButton>
                            <Modal.Title>Latest News</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {brewery.brewerynews}
                        </Modal.Body>
                    </Modal>
                </div>


            </div>
        </body>
    );
}

export default Brewery;