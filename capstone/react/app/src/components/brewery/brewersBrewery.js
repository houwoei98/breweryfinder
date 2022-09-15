import '../../App.css';
import React, {useEffect, useState} from "react";
import {updateBrewery, getBreweryByUserId, updateNewsDetail} from "../../api/BreweryApi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {
    getAllBeerForBreweryId,
    updateToActiveBeer,
    getAllBeers,
    addNewBeerForBreweryId,
    addExistingBeerForBreweryId
} from "../../api/BeerApi";
import {LinkContainer} from "react-router-bootstrap";
import beerpointer from "../../images/beerpointer.svg";
import { ReactBingmaps } from 'react-bingmaps';
import {getUser} from "../../api/UserApi";
import {updateToInactiveBeer} from "../../api/BeerApi";
import {ButtonGroup, Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import beerImageDefault from "../../images/beerImageDefault.png";
import WebImage from "../webimage/WebImage";


const BrewersBrewery = () => {

    const defaultBeer = {
        beerName:'',
        beerDescription:'',
        beerType:'',
        abv:'0',
        active: true,
        imgPath: beerImageDefault
    };

    const defaultBrewery = {
        breweryName:'',
        breweryHistory:'',
        breweryPhoneNum:'',
        openingHoursMonThur:'',
        openingHoursFriSun: '',
        imgPath: beerImageDefault
    };

    const defaultErrors = {
        beerName:'',
        beerId: '',
        breweryNews: '',
        breweryName: '',
    };

    const defaultValid = {
        beerName:false,
        beerId: false,
        breweryNews: false,
        breweryName: false
    };

    const [editBrewery, setEditBrewery] = useState(false);
    const [brewery, setBrewery] = useState(defaultBrewery);
    const [beers, setBeers] = useState([]);
    const [user, setUser] = useState([]);

    const [showDeleteBeerModal, setShowDeleteBeerModal] = useState(false);
    const [showAddBeerModal, setShowAddBeerModal] = useState(false);
    const [showUpdateBreweryModal, setShowUpdateBreweryModal] = useState(false);
    const [showAddCustomBeerModal, setShowAddCustomBeerModal] = useState(false);

    const [beerName, setBeerName] = useState([]);

    const [errors, setErrors] = useState(defaultErrors);
    const [validItems, setValidItems] = useState(defaultValid);

    const [customBeer, setCustomBeer] = useState(defaultBeer);
    const [beersOnDatabase, setBeersOnDatabase] = useState([]);
    const [beerId, setBeerId] = useState(0);
    const [abv, setAbv] = useState(0);
    const [beerType, setBeerType] = useState('');
    const [beerDescription, setBeerDescription] = useState('');

    const [breweryNews, setBreweryNews] = useState('');
    const [showEditNewsModal, setShowEditNewsModal] = useState(false);

    const [breweryName, setBreweryName] = useState('');
    const [breweryHistory, setBreweryHistory] = useState('');
    const [openingHoursMonThur, setOpeningHoursMonThur] = useState('');
    const [openingHoursFriSun, setOpeningHoursFriSun] = useState('');
    const [breweryPhoneNum, setBreweryPhoneNum] = useState('');

    useEffect(() => {
        const getUserFromCookie = async () => {
            getUser().then( user=> {
                    setUser(user);
                }
            );
        }
        getUserFromCookie();
    }, []);

    useEffect( () => {
        const breweryDetail = async () => {
                getBreweryByUserId(user.id).then(data => {
                    setBrewery(data);
                    {console.log(brewery)}
                    getAllBeerForBreweryId(data.breweryId).then(data => {
                        setBeers(data);
                    })

                })
        }
        breweryDetail();
    }, [user]);

    useEffect(() => {
        const getDatabaseBeers= async() => {
            const data = await getAllBeers();
            setBeersOnDatabase(data);
        }
        getDatabaseBeers();

    }, []);


    const handleClose = () => setShowDeleteBeerModal(false);
    const handleCloseCustomBeer = () => setShowAddCustomBeerModal(false);
    const handleCloseAddBeer = () => setShowAddBeerModal(false);
    const handleCloseUpdate = () => setShowUpdateBreweryModal(false);


    const handleEditBrewery = () => setEditBrewery(true);
    const handleEditBreweryClose = () => setEditBrewery(false);

    const handleShowAddCustomBeerModalOn = () => {
        setShowAddCustomBeerModal(true);
    };

    const handleNewsClose = () => setShowEditNewsModal(false);

    const reload=()=>window.location.reload();

    const handleUserBeerInput = (event) => {
        event.preventDefault();
        const {id,value} = event.target;
        switch (id) {
            case 'beerName':
                setBeerName(value);
                user.beerName = value;
                if (event.target.validationMessage == null) {
                    errors.beerName = (beerName.length < 5) ? 'Beer Name must be at least 5 characters' : '';
                } else {
                    errors.beerName = event.target.validationMessage;
                }
                validItems.beerName = (errors.beerName === '');
                break;
            case 'beerId':
                setBeerId(value);
                break;
            case 'breweryNews':
                setBreweryNews(value);
                break;
            default:
                break;
        }
        setErrors(errors);
        setValidItems(validItems);
    };

    const handleUserCustomBeerInput = (event) => {
        event.preventDefault();
        const {id,value} = event.target;
        switch (id) {
            case 'beerName':
                setBeerName(value);
                customBeer.beerName = value;
                if (event.target.validationMessage == null) {
                    errors.beerName = (beerName.length < 5) ? 'Beer Name must be at least 5 characters' : '';
                } else {
                    errors.beerName = event.target.validationMessage;
                }
                validItems.beerName = (errors.beerName === '');
                break;
            case 'beerDescription':
                setBeerDescription(value);
                customBeer.beerDescription = value;
                break;
            case 'abv':
                setAbv(value);
                customBeer.abv = value;
                break;
            case 'beerType':
                setBeerType(value);
                customBeer.beerType = value;
                break;
            default:
                break;
        }
        setCustomBeer(customBeer);
        setErrors(errors);
        setValidItems(validItems);
    };

    const handleUserBreweryUpdateInput = (event) => {
        event.preventDefault();
        const {id,value} = event.target;
        switch (id) {
            case 'breweryName':
                setBreweryName(value);
                brewery.breweryName = value;
                if (event.target.validationMessage == null) {
                    errors.breweryName = (beerName.length < 5) ? 'Brewery Name must be at least 5 characters' : '';
                } else {
                    errors.breweryName = event.target.validationMessage;
                }
                validItems.breweryName = (errors.breweryName === '');
                break;
            case 'breweryHistory':
                setBreweryHistory(value);
                brewery.breweryHistory = value;
                break;
            case 'openingHoursMonThur':
                setOpeningHoursMonThur(value);
                brewery.openingHoursMonThur = value;
                break;
            case 'openingHoursFriSun':
                setOpeningHoursFriSun(value);
                brewery.openingHoursFriSun = value;
                break;
            case 'breweryPhoneNum':
                setBreweryPhoneNum(value);
                brewery.breweryPhoneNum = value;
                break;
            default:
                break;
        }
        setBrewery(brewery);
        setErrors(errors);
        setValidItems(validItems);
    };

    const handleAddBeer = (event) => {
        event.preventDefault();
        const addBeer = async () => {
            addExistingBeerForBreweryId(beerId, brewery.breweryId).then(data => {
                setShowAddBeerModal(true);
            });
        }
        addBeer();
    };

    const handleDeleteBeer = (event) => {
        event.preventDefault();
        const deleteBeer = async () => {
            updateToInactiveBeer(event.target.id, brewery.breweryId).then(data => {
                setShowDeleteBeerModal(true);
            });
        }
        deleteBeer();
    };

    const handleActivateBeer = (event) => {
        event.preventDefault();
        const addBeer = async () => {
            updateToActiveBeer(event.target.id, brewery.breweryId).then(data => {
                setShowAddBeerModal(true);
            });
        }
        addBeer();
    };

    const handleUpdateBrewery = (event) => {
        event.preventDefault();
        const updateBreweryInfo = async () => {
            updateBrewery(brewery, brewery.breweryId).then(data => {
                setShowUpdateBreweryModal(true);
            });
        }
        updateBreweryInfo();
    };

    const handleAddCustomBeer = (event) => {
        event.preventDefault();
        const addBeer = async () => {
            addNewBeerForBreweryId(customBeer, brewery.breweryId).then(data => {
                setShowAddBeerModal(true);
            });
        }
        addBeer();
    };

    const handleEditNews = (event) => {
        event.preventDefault();
        const editNews = async () => {
            updateNewsDetail(breweryNews, brewery.breweryId).then(data => {
                setShowEditNewsModal(true);
            });
        }
        editNews();
    };


    return (

        <body>
        <div className="mainCard columns">
            <Modal show={showDeleteBeerModal} onHide={handleClose} onExit={reload}>
                <Modal.Header closeButton>
                    <Modal.Title>Awesome</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You successfully removed a beer from your list of beers!
                </Modal.Body>
            </Modal>

            <Modal show={showUpdateBreweryModal} onHide={handleCloseUpdate} onExit={reload}>
                <Modal.Header closeButton>
                    <Modal.Title>Awesome</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You successfully updated your brewery info!
                </Modal.Body>
            </Modal>

            <Modal show={showAddBeerModal} onHide={handleCloseAddBeer} onExit={reload}>
                <Modal.Header closeButton>
                    <Modal.Title>Awesome</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You successfully added a beer!
                </Modal.Body>
            </Modal>

            <Modal show={showAddCustomBeerModal} onHide={handleCloseCustomBeer} onExit={reload}>
                <Form onSubmit={handleAddCustomBeer}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Custom Beer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="beerName">Beer Name</Form.Label>
                                <Form.Control type="text" id="beerName" value={beerName}
                                              onChange={handleUserCustomBeerInput}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="beerDescription">Beer Description</Form.Label>
                                <Form.Control as="textarea" rows="4" type="text" id="beerDescription" value={beerDescription}
                                              onChange={handleUserCustomBeerInput}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="beerType">Beer Type</Form.Label>
                                <Form.Control type="text" id="beerType" value={beerType}
                                              onChange={handleUserCustomBeerInput}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="abv">ABV %</Form.Label>
                                <Form.Control type="number" id="abv" value={abv}
                                              onChange={handleUserCustomBeerInput}/>
                            </Form.Group>
                </Modal.Body>
                    <Modal.Footer>
                    <ButtonGroup>
                        <Button variant="outline-success" onClick={handleAddCustomBeer} type="submit">
                            Add Beer
                        </Button>
                        <Button variant="outline-danger" onClick={handleCloseCustomBeer}>
                            Close
                        </Button>
                    </ButtonGroup>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showEditNewsModal} onHide={handleNewsClose} onExit={reload}>
                <Modal.Header closeButton>
                    <Modal.Title>Awesome</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You successfully edit your news!
                </Modal.Body>
            </Modal>

            <div className="breweryNameDiv">
                {editBrewery !== true &&
                <Form  className="container deleteBeerButton" id="editBrewery" onSubmit={handleEditBrewery} onChange={reload}>
                    <Button variant="outline-light" type="submit">Edit my brewery</Button>
                </Form>
                }
                {editBrewery !== false &&
                <Form  className="container deleteBeerButton" id="editBrewery" onSubmit={handleEditBreweryClose} onChange={reload}>
                    <Button variant="outline-light" type="submit">Close edit  my brewery</Button>
                </Form>
                }
                <h1>{brewery?.breweryName}</h1>
            </div>

            <div className="breweryImageDiv">
                <WebImage imageId={brewery?.imgPath} altText={brewery?.breweryName} cssClass="breweryMainImage"/>
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
                    <p>Phone Number</p>
                    <p className="subText">{brewery?.breweryPhoneNum}</p>

                </div>
            </div>

            <div className="breweryLocationMap">
                {(brewery?.latitude !== undefined) &&
                <ReactBingmaps
                    bingmapKey = "AiLAGX6KhhdnCA80df2TnRtH-3jgPFr3Bh7ktsl79aqrVToP34AY9AGktCwSGkLL"
                    center = {[brewery.latitude, brewery.longitude]}
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

            {editBrewery !== false &&
            <div className="editBreweryForm">
                <h2>Update Brewery Info</h2>
                <Form className="container deleteBeerButton" onSubmit={handleUpdateBrewery}>
                    <div className="row mt-4">
                        <Form.Group className="col-6">
                            <Form.Label htmlFor="breweryName">Brewery Name</Form.Label>
                            <Form.Control type="text" id="breweryName" value={brewery.breweryName} onChange={handleUserBreweryUpdateInput}/>
                        </Form.Group>
                        <Form.Group className="col-6">
                            <Form.Label htmlFor="openingHoursMonThur">Opening Hours Mon-Thurs</Form.Label>
                            <Form.Control type="text" id="openingHoursMonThur" defaultValue={brewery.openingHoursMonThur} onChange={handleUserBreweryUpdateInput}/>
                        </Form.Group>
                    </div>
                    <div className="row mt-4">
                        <Form.Group className="col-6">
                            <Form.Label htmlFor="breweryHistory">Brewery History</Form.Label>
                            <Form.Control as="textarea" rows="4" id="breweryHistory" type="text" defaultValue={brewery.breweryHistory} onChange={handleUserBreweryUpdateInput}/>
                        </Form.Group>
                        <Form.Group className="col-6">
                            <Form.Label htmlFor="openingHoursFriSun">Opening Hours Fri-Sun</Form.Label>
                            <Form.Control type="text" id="openingHoursFriSun" defaultValue={brewery.openingHoursFriSun} onChange={handleUserBreweryUpdateInput}/>
                        </Form.Group>
                    </div>
                    <div className="row mt-4">
                        <Form.Group className="col-6">
                            <Form.Label htmlFor="breweryPhoneNum">Phone Number</Form.Label>
                            <Form.Control type="text" id="breweryPhoneNum" defaultValue={brewery.breweryPhoneNum} onChange={handleUserBreweryUpdateInput}/>
                        </Form.Group>
                    </div>
                    <div className="row mt-4">
                        <Button variant="outline-light" className="updateBreweryInfoButton" type="submit">Update Brewery
                            Info</Button>
                    </div>
                </Form>
            </div>
            }


            <div className="ourBeersDiv">
                {editBrewery !== true &&
                <h2>Our Beers</h2>}
                {editBrewery !== false &&
                <h2>Update Beers</h2>}

                <div className="addBeerDiv">
                    {editBrewery !== false &&
                    <Form className="container addExistingBeer leftAlignText whiteText" onSubmit={handleAddBeer}>
                        <div className="row mt-4">
                            <Form.Group className="col-4" key="role">
                                <Form.Label htmlFor="beerName" className="leftAlignText">Click below to add a new beer to
                                    your brewery</Form.Label>
                                <Form.Control
                                    as="select"
                                    id="beerId"
                                    onChange={handleUserBeerInput}
                                >
                                    {beersOnDatabase.map(databaseBeer => (
                                        <option id={databaseBeer.beerId}
                                                value={databaseBeer.beerId}>{databaseBeer.beerName}</option>
                                    ))}
                                </Form.Control>
                                <Form.Text className="error">{errors.beerId}</Form.Text>
                            </Form.Group>
                        </div>
                        <div className="row mt-4">
                            <ButtonGroup className="addCustomBeerButtons">
                                <Button variant="outline-light" onClick={handleAddBeer} type="submit">
                                    Add selected beer
                                </Button>
                                <Button variant="outline-light" onClick={handleShowAddCustomBeerModalOn}>
                                    Add a custom beer
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Form>
                    }
                </div>


                <Row xs={1} md={6} >
                    {beers.map(beer => (
                        <Col key={beer.beerId}>
                            {editBrewery !== false &&
                            <div>
                                <LinkContainer to={{pathname: `/beer/detail/${beer.beerId}`}} >
                                    <Card className="breweryListRow">
                                        {beer.active === true &&
                                        <Card.Img className="gridImgBreweriesBeer" variant="top" src={beer.imgPath}/>
                                        }
                                        {beer.active === false &&
                                        <div className="inactiveBeerContainer">
                                            <Card.Img className="gridImgBreweriesBeer grayImage" variant="top" src={beer.imgPath}/>
                                            <div className="inactiveBeerImgText">[ Inactive ]</div>
                                        </div>
                                        }
                                        <Card.Body>
                                            <Card.Title className="beerBreweryCardTitle">{beer.beerName}</Card.Title>
                                            <Card.Text>

                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </LinkContainer>
                                {beer.active === true &&
                                <Form className="container deleteBeerButton" id={beer.beerId} onSubmit={handleDeleteBeer}>
                                    <Button variant="outline-light" type="submit">Remove Beer</Button>
                                </Form>
                                }
                                {beer.active === false &&
                                <Form className="container deleteBeerButton" id={beer.beerId} onSubmit={handleActivateBeer}>
                                    <Button variant="outline-light" type="submit">Reactivate Beer</Button>
                                </Form>
                                }
                            </div>
                            }

                            {editBrewery !== true && beer.active === true &&
                            <div>
                                <LinkContainer to={{pathname: `/beer/detail/${beer.beerId}`}} >
                                    <Card className="breweryListRow">
                                        <Card.Img className="gridImgBreweriesBeer" variant="top" src={beer.imgPath}/>
                                        <Card.Body>
                                            <Card.Title className="beerBreweryCardTitle">{beer.beerName}</Card.Title>
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


            <div className="ourNewsDiv">
                <h2>News</h2>
                {editBrewery !== false &&
                <Form className="container editNewsButton" onSubmit={handleEditNews}>
                    <Form.Label htmlFor="breweryNews">Update brewery news below</Form.Label>
                    <Form.Control className="newsChangeBox" as="textarea" id="breweryNews" value={breweryNews}
                                  onChange={handleUserBeerInput}/>
                    <Button className="newsChangeBoxEdit" variant="light" type="submit">Edit News</Button>
                </Form>
                }
                <div className="beerDetailColumns">
                    <p>{brewery?.brewerynews}</p>
                </div>

            </div>

        </div>
        </body>
    );
}

export default BrewersBrewery;