import '../../App.css';
import React, {useEffect, useState} from "react";
import {
    addNewBrewery,
    getAllBreweries, updateBreweryAsActive,
    updateBreweryAsInactive
} from "../../api/BreweryApi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {addUserDetail, getUsersWithoutBrewery} from "../../api/UserApi";
import {Form, Modal} from "react-bootstrap";
import WebImage from "../webimage/WebImage";
import UploadFiles from "../upload/UploadFiles";
import beerImageDefault from "../../images/beerImageDefault.png";


const ManageBrewery = () => {


    const [breweries, setBreweries] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getBreweries = async () => {
            const data = await getAllBreweries();
            setBreweries(data);
        }
        getBreweries();

    }, []);

    useEffect(() => {

        const getUsersWithoutBreweryForAdd = () => {
            getUsersWithoutBrewery().then(data => {
                setUsers(data);
            })
        }
        getUsersWithoutBreweryForAdd();

    }, [breweries]);


        const defaultUser = {
            breweryName: '',
            userId: 0,
            breweryPhoneNum: '',
            breweryAddress: '',
            breweryHistory: '',
            openingHoursMonThur: '',
            openingHoursFriSun: '',
            imgPath: 'https://media.istockphoto.com/photos/draught-beer-in-glasses-picture-id1040303026?k=20&m=1040303026&s=612x612&w=0&h=Unc2RVn4j35mk_9kZDrfrfFCBV6JlfTJlso3brooCV4='
        };
        const defaultErrors = {
            breweryName: 'Brewery name cannot be empty',
            userId: 'Please choose a brewer',
            breweryPhoneNum: 'Your phone number should be 10 digits or more',
            breweryAddress: 'Your address cannot be empty',
            breweryHistory: 'Please enter your brewery history',
            openingHoursMonThur: 'Please enter your opening hours',
            openingHoursFriSun: 'Please enter your opening hours',
        };
        const defaultValid = {
            breweryName: false,
            userId: false,
            breweryPhoneNum: false,
            breweryAddress: false,
            breweryHistory: false,
            openingHoursMonThur: false,
            openingHoursFriSun: false
        };
        const [addBrewery, setAddBrewery] = useState(false);
        const handleAddBrewery = () => setAddBrewery(true);
        const [newBrewery, setNewBrewery] = useState(defaultUser);
        const handleAddBreweryClose = () => setAddBrewery(false);
        const reload=()=>window.location.reload();
        const [errors, setErrors] = useState(defaultErrors);
        const [validItems, setValidItems] = useState(defaultValid);

        const [breweryName, setBreweryName] = useState('');
        const [userId, setUserId] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('');
        const [address, setAddress] = useState('');
        const [breweryHistory, setBreweryHistory] = useState('');
        const [openingHoursWeekdays, setOpeningHoursWeekdays] = useState('');
        const [openingHoursWeekends, setOpeningHoursWeekends] = useState('');
        const [image, setImageUpload] = useState('');

        const [showModal, setShowModal] = useState(false);
        const [showModalDelete, setShowModalDelete] = useState(false);
        const [showModalReactive, setShowModalReactive] = useState(false);

        const handleUserInput = (event) => {
            event.preventDefault();
            const {id, value} = event.target;
            switch (id) {
                case 'breweryName':
                    setBreweryName(value);
                    newBrewery.breweryName = value;
                    errors.breweryName = (breweryName.length < 1) ? 'Brewery name cannot be empty' : '';
                    validItems.breweryName = (errors.userName === '');
                    break;
                case 'userId':
                    setUserId(value);
                    newBrewery.userId = value;
                    errors.userId = (value == 0) ? 'Please choose a brewer' : '';
                    validItems.breweryName = (errors.userId === '');
                    break;
                case 'breweryphonenum':
                    setPhoneNumber(value);
                    newBrewery.breweryPhoneNum = value;
                    errors.breweryPhoneNum = (value.length < 10) ? 'Your phone number should be 10 digits or more' : '';
                    validItems.breweryPhoneNum = (errors.breweryPhoneNum === '');
                    break;
                case 'address':
                    setAddress(value);
                    newBrewery.breweryAddress = value;
                    errors.breweryAddress = (value.length < 1) ? 'Your address cannot be empty' : '';
                    validItems.breweryAddress = (errors.breweryAddress === '');
                    break;
                case 'breweryHistory':
                    setBreweryHistory(value);
                    newBrewery.breweryHistory = value;
                    errors.breweryHistory = (value.length < 1) ? 'Please enter your brewery history' : '';
                    validItems.breweryHistory = (errors.breweryHistory === '');
                    break;
                case 'openingHoursWeekdays':
                    setOpeningHoursWeekdays(value);
                    newBrewery.openingHoursMonThur = value;
                    errors.openingHoursMonThur = (value.length < 1) ? 'Please enter your opening hours' : '';
                    validItems.openingHoursMonThur = (errors.openingHoursMonThur === '');
                    break;
                case 'openingHoursWeekends':
                    setOpeningHoursWeekends(value);
                    newBrewery.openingHoursFriSun = value;
                    errors.openingHoursFriSun = (value.length < 1) ? 'Please enter your opening hours' : '';
                    validItems.openingHoursFriSun = (errors.openingHoursFriSun === '');
                    break;
                default:
                    break;
            }
            setNewBrewery(newBrewery);
            setErrors(errors);
            setValidItems(validItems);
        };


        const handleSubmit = (event) => {
            event.preventDefault();
            const save = async () => {
                addNewBrewery(newBrewery).then(data => {
                    setNewBrewery(data);
                    setShowModal(true);
                });
            }
            save();
        };
        const uploadedBreweryPic = (webImage) => {
            if (webImage !== undefined) {
                newBrewery.imgPath = webImage.id;
            }
        }
        const handleDeleteBrewery = (event) => {
            event.preventDefault();
            const {id, value} = event.target;
            const deleteBrewery = async () => {
                updateBreweryAsInactive(Number(id)).then(data => {
                        setShowModalDelete(true);
                });
            }
            deleteBrewery();
        };

    const handleReactivateBrewery = (event) => {
        event.preventDefault();
        const {id, value} = event.target;
        const reactiveBrewery = async () => {
            updateBreweryAsActive(Number(id)).then(data => {
                setShowModalReactive(true);
            });
        }
        reactiveBrewery();
    };

    const handleClose = () => setShowModal(false);
    const handleCloseDelete = () => setShowModalDelete(false);
    const handleCloseReactive = () => setShowModalReactive(false);

    return (

            <body>

            <div className="mainCard">
                <Modal show={showModal} onHide={handleClose} onExit={reload}>
                    <Modal.Header closeButton>
                        <Modal.Title>Awesome</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You added a new brewery!
                    </Modal.Body>
                </Modal>
                <Modal show={showModalDelete} onHide={handleCloseDelete} onExit={reload}>
                    <Modal.Header closeButton>
                        <Modal.Title>Awesome</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You deleted this brewery!
                    </Modal.Body>
                </Modal>
                <Modal show={showModalReactive} onHide={handleCloseReactive} onExit={reload}>
                    <Modal.Header closeButton>
                        <Modal.Title>Awesome</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You reactivated this brewery!
                    </Modal.Body>
                </Modal>
                <h1>Manage Breweries</h1>
                {addBrewery !== true &&
                <Form  className="container deleteBeerButton" id="editBrewery" onSubmit={handleAddBrewery} onChange={reload}>
                    <Button variant="outline-light" type="submit">Add brewery</Button>
                </Form>
                }
                {addBrewery !== false &&
                <Form  className="container deleteBeerButton" id="editBrewery" onSubmit={handleAddBreweryClose} onChange={reload}>
                    <Button variant="outline-light" type="submit">Cancel add brewery</Button>
                </Form>
                }
                {addBrewery !== false &&
                <Form className="container-newBrewery" onSubmit={handleSubmit}>
                    <div className="row mt-4 leftAlignText" >
                        <Form.Group className="newBreweryForm col-6" key="breweryName">
                            <Form.Label htmlFor="breweryName" >Brewery name</Form.Label>
                            <Form.Control type="text" id="breweryName" value={breweryName} onChange={handleUserInput}/>
                            <Form.Text className="errorText">{errors.breweryName}</Form.Text>
                        </Form.Group>
                        <Form.Group className="newBreweryForm col-6" key="userId">
                            <Form.Label htmlFor="userId" >Click below to add a new brewer to
                                this brewery</Form.Label>
                            <Form.Control
                                as="select"
                                id="userId"
                                onChange={handleUserInput}
                            >
                                <option id={0}
                                        value={0}>Please choose a brewer</option>
                                {users?.map(user => (
                                    <option id={user.id}
                                            value={user.id}>{user.firstName} {user.lastName}</option>
                                ))}
                            </Form.Control>
                            <Form.Text className="errorText">{errors.userId}</Form.Text>
                        </Form.Group>
                        <Form.Group className="newBreweryForm col-6" key="breweryphonenum">
                            <Form.Label htmlFor="breweryphonenum">Phone number</Form.Label>
                            <Form.Control type="text" id="breweryphonenum" value={phoneNumber} onChange={handleUserInput}/>
                            <Form.Text className="errorText">{errors.breweryPhoneNum}</Form.Text>
                        </Form.Group>
                        <Form.Group className="newBreweryForm col-6" key="address">
                            <Form.Label htmlFor="address">Address</Form.Label>
                            <Form.Control type="text" id="address" value={address} onChange={handleUserInput}/>
                            <Form.Text className="errorText">{errors.breweryAddress}</Form.Text>
                        </Form.Group>
                        <Form.Group className="newBreweryForm col-6" key="breweryHistory">
                            <Form.Label htmlFor="breweryHistory">Brewery history</Form.Label>
                            <Form.Control type="text" id="breweryHistory" value={breweryHistory}
                                          onChange={handleUserInput}/>
                            <Form.Text className="errorText">{errors.breweryHistory}</Form.Text>
                        </Form.Group>
                        <Form.Group className="newBreweryForm col-6" key="openingHoursWeekdays">
                            <Form.Label htmlFor="openingHoursWeekdays">Opening hours Mon-Thur</Form.Label>
                            <Form.Control type="text" id="openingHoursWeekdays" value={openingHoursWeekdays}
                                          onChange={handleUserInput}/>
                            <Form.Text className="errorText">{errors.openingHoursMonThur}</Form.Text>
                        </Form.Group>
                        <Form.Group className="newBreweryForm col-6" key="openingHoursWeekends">
                            <Form.Label htmlFor="openingHoursWeekends">Opening hours Fri-Sun</Form.Label>
                            <Form.Control type="text" id="openingHoursWeekends" value={openingHoursWeekends}
                                          onChange={handleUserInput}/>
                            <Form.Text className="errorText">{errors.openingHoursFriSun}</Form.Text>
                        </Form.Group>
                        <Form.Group className="newBreweryForm col-6" key="image">
                            <Form.Label htmlFor="image">Image</Form.Label>
                            {/*<Form.Control type="file" id="image" value={image} onChange={handleUserInput}/>*/}
                            <UploadFiles parentCallback={uploadedBreweryPic}></UploadFiles>
                        </Form.Group>
                        <br/>
                        <Button disabled={!(validItems.breweryName, validItems.breweryAddress, validItems.breweryHistory, validItems.breweryPhoneNum, validItems.userId, validItems.openingHoursMonThur, validItems.openingHoursFriSun)} className="submitNewBrewery" variant="outline-success" type="submit">Add new brewery</Button>
                    </div>
                </Form>
                }
                {/*<p>Click to delete brewery.</p>*/}
                <Row xs={1} md={4} className="breweriesList">
                    {breweries.map(brewery => (
                        <Col key={brewery.breweryId}>

                                <Card className="breweryListRow">
                                    {brewery.active === true &&
                                        <WebImage imageId={brewery.imgPath} altText={brewery.breweryName} cssClass="gridImgBreweries card-img-top"/>
                                    }
                                    {brewery.active === false &&
                                        <div className="inactiveBeerContainer">
                                            {/*<Card.Img className="gridImgBreweries grayImage" variant="top" src={brewery.imgPath}/>*/}
                                            <WebImage imageId={brewery.imgPath} altText={brewery.breweryName} cssClass="gridImgBreweries grayImage card-img-top"/>
                                        <div className="inactiveBreweryImgText">[ Inactive ]</div>
                                        </div>
                                    }
                                    <Card.Body>
                                        <Card.Title className="cardTitle">{brewery.breweryName}</Card.Title>
                                        <Card.Text className="deleteMyAccountButton">
                                            {brewery.active &&
                                            <Form className="container" onSubmit={handleDeleteBrewery}
                                                  id={brewery.breweryId} value={brewery.breweryId}
                                            >
                                                <Button variant="outline-danger" type="submit">Delete
                                                    brewery</Button>
                                            </Form>
                                            }

                                            {!brewery.active &&
                                            <Form className="container" onSubmit={handleReactivateBrewery}
                                                  id={brewery.breweryId} value={brewery.breweryId}
                                            >
                                                <Button variant="outline-success" type="submit">Reactivate brewery</Button>
                                            </Form>
                                            }
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                        </Col>
                    ))};
                </Row>
            </div>
            </body>
        );
}

export default ManageBrewery;



