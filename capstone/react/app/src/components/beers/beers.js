import '../../App.css';
import React, {useEffect, useState} from "react";
import {getBeerById} from "../../api/BeerApi";
import {getAllBreweryForBeerId} from "../../api/BreweryApi";
import {getReviewByBeerId} from "../../api/ReviewApi";
import {getAvgBeerRating} from "../../api/ReviewApi";
import {useParams} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {Button, ButtonGroup} from "react-bootstrap";
import StarRating from "./starRating";
import {LinkContainer} from "react-router-bootstrap";
import {addReviewDetail} from "../../api/ReviewApi";
import {getUser, saveUserDetail} from "../../api/UserApi";
import WebImage from "../webimage/WebImage";
import UploadFiles from "../upload/UploadFiles";


const Beer = () => {

    let {id} = useParams();
    const [beer, setBeer] = useState([]);
    const [beerReview, setBeerReview] = useState([]);
    const [avgRating, setAvgRating] = useState([]);

    const [callingDetail, setCalling] = useState(false);
    const [breweries, setBreweries] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const [user, setUser] = useState([]);
    const [userId, setUserId] = useState();
    const [image, setImageUpload] = useState('');

    const getBeerDetail = () => {
        const beerDetail = async () => {
            if (!callingDetail) {
                setCalling(true);
                getBeerById(id).then(data => {
                    setBeer(data);
                });
            }
        }
        beerDetail();
    };
    getBeerDetail();

    const getAvgRating = () => {
        const beerAvgRating = async () => {
            if (!callingDetail) {
                setCalling(true);
                getAvgBeerRating(id).then(data => {
                    setAvgRating(data);
                });
            }
        }
        beerAvgRating();
    };
    getAvgRating();

    const getBeerReviews = () => {
        const beerReviews = async () => {
            if (!callingDetail) {
                setCalling(true);
                getReviewByBeerId(id).then(data => {
                    setBeerReview(data);
                });
            }
        }
        beerReviews();
    };
    getBeerReviews();

    useEffect(() => {
        const getBreweries = async() => {
            const data = await getAllBreweryForBeerId(id);
            setBreweries(data);
        }
        getBreweries();

    }, []);

    useEffect(() => {
        const getUserFromCookie = async () => {
            getUser().then( user=> {
                    review.userId = user.id;
                    setUser(user);
                    window.scrollTo(0, 0);
                }
            );
        }
        getUserFromCookie();
    }, []);

    const defaultReview = {
        titleOfReview:'',
        rating: 1,
        mainText:'',
        beerId: Number(id),
        userId: user.id,
        reviewDate: new Date().toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric" }) + ""
    };

    const defaultErrors = {
        titleOfReview:'',
        mainText:'',
        rating: 'Please insert a rating',
    };
    const defaultValid = {
        titleOfReview:false,
        mainText:false,
        rating: false,
    };

    const [review, setReview] = useState(defaultReview)
    const [errors, setErrors] = useState(defaultErrors);
    const [validItems, setValidItems] = useState(defaultValid);

    const [titleOfReview, setTitleOfReview] = useState('');
    const [mainText, setMainText] = useState('');

    const [showModal, setShowModal] = useState(false);

    const handleUserInput = (event) => {
        event.preventDefault();
        const {id,value} = event.target;
        switch (id) {
            case 'titleOfReview':
                setTitleOfReview(value);
                review.titleOfReview = value;
                // if (event.target.validationMessage == null) {
                    errors.titleOfReview = (titleOfReview.length < 5 || titleOfReview.length > 20) ? 'Review title must be between 5 & 20 characters' : '';
                    // errors.titleOfReview = (titleOfReview.length > 20) ? 'Review title cannot be at greater than 20 characters' : '';
                // } else {
                //     errors.titleOfReview = event.target.validationMessage;
                // }
                validItems.titleOfReview = (errors.titleOfReview === '');
                break;
            case 'mainText':
                setMainText(value);
                review.mainText = value;
                // if (event.target.validationMessage == null) {
                    errors.mainText = (mainText.length < 5) ? 'Review must be at least 5 characters' : '';
                // } else {
                //     errors.mainText = event.target.validationMessage;
                // }
                validItems.mainText = (errors.mainText === '');
                break;
            case 'rating':
                setRating(value);
                review.rating = value;
                errors.rating = (value > 0) ? '' : 'Please insert a rating';
                validItems.rating = (errors.rating === '');
                break;
            default:
                break;
        }
        setReview(review);
        setErrors(errors);
        setValidItems(validItems);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const save = async () => {
            addReviewDetail(review, id).then(data => {
                setReview(data);
                setShowModal(true);
            });
        }
        save();
    };

    useEffect(() => {
        review.rating = rating;
        setReview(review);
    }, [rating]);

    const handleClose = () => setShowModal(false);
    const reload=()=>window.location.reload();

    const uploadedBreweryPic = (webImage) => {
        if (webImage !== undefined) {
            review.imgPath = webImage.id;
        }
    }

    return (

        <body>
            <div className="mainCard columns">

                    <div className="beerImageDiv">
                        <img className="gridImgBeer" src={beer?.imgPath} alt="image of beer"/>
                    </div>

                    <div className="beerInfoDiv">
                        <h1>{beer?.beerName}</h1>

                        <div className="row">
                            <div id="beerDetailColumns">
                                <p>Beer Type</p>
                                <p className="subText">{beer?.beerType}</p>
                            </div>
                            <div id="beerDetailColumns">
                                <p>Average Rating</p>
                                <div className="beerRating">
                                    <StarRating rating={avgRating?.avgRating}/>
                                </div>
                            </div>
                            <div id="beerDetailColumns">
                                <p>ABV</p>
                                <p className="subText">{beer?.abv}%</p>
                            </div>
                        </div>

                        <p id="beerDescription">{beer?.beerDescription}</p>
                    </div>




                    <div className="beerBreweries">
                        <h2>Where to find it</h2>
                        <Row xs={1} md={6} className="breweriesList">
                            {breweries.map(brewery => (
                                <Col key={brewery?.breweryId}>
                                    <LinkContainer to={{pathname: `/brewery/detail/${brewery?.breweryId}`}} >
                                        <Card className="breweryListRow">
                                            <Card.Img className="gridImgBeerBreweries" variant="top" src={brewery?.imgPath} />
                                            <Card.Body>
                                                <Card.Title className="breweryBeerCardTitle">{brewery?.breweryName}</Card.Title>
                                                <Card.Text>

                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </LinkContainer>
                                </Col>
                            ))}
                        </Row>
                    </div>

                <div className="beerReviews">
                    <h2>Reviews</h2>
                    {user.role == 'BeerLover' &&
                    <div className="addReview">

                        <Modal show={showModal} onHide={handleClose} onExit={reload}>
                            <Modal.Header closeButton>
                                <Modal.Title>Awesome</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                You left a review!
                            </Modal.Body>
                        </Modal>
                        <Form className="container register" onSubmit={handleSubmit}>
                            <div className="row mt-4">
                                <Form.Group className="col-6" key="titleOfReview">
                                    <Form.Label htmlFor="titleOfReview">Title of Review</Form.Label>
                                    <Form.Control type="titleOfReview"  id="titleOfReview" value={titleOfReview} onChange={handleUserInput} />
                                    <Form.Text className="errorText">{errors.titleOfReview}</Form.Text>
                                </Form.Group>
                            </div>

                            <div className="row mt-4">
                                <Form.Label htmlFor="rating">Rating</Form.Label>
                                {/*<InputStarRating/>*/}
                                <div className="star-rating">
                                    {[...Array(5)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={index <= (hover || rating) ? "on" : "off"}
                                                onClick={() => {
                                                    setRating(index);
                                                    errors.rating = (index > 0) ? '' : 'Please insert a rating';
                                                    validItems.rating = (errors.rating === '');
                                                }}
                                                onMouseEnter={() => setHover(index)}
                                                onMouseLeave={() => setHover(rating)}
                                            >
                                                <span className="star">&#9733;</span>
                                            </button>

                                        );
                                    })}
                                </div>
                                <Form.Text className="ratingPadding col-6 errorText">{errors.rating}</Form.Text>

                            </div>

                            <div className="row mt-4">
                                <Form.Group className="col-6" key="mainText">
                                    <Form.Label htmlFor="mainText">Review</Form.Label>
                                    <Form.Control type="mainText"  id="mainText" value={mainText} onChange={handleUserInput} />
                                    <Form.Text className="errorText">{errors.mainText}</Form.Text>
                                </Form.Group>
                            </div>
                            <div className="row mt-4">
                                <Form.Group className="col-6" key="image">
                                    <Form.Label htmlFor="image">Image</Form.Label>
                                    <UploadFiles parentCallback={uploadedBreweryPic}/>
                                </Form.Group>
                            </div>

                            <div className="row mt-4 padding">
                                <Button className="col-2" variant="light" type="submit"
                                        disabled={!(validItems.titleOfReview && validItems.mainText && validItems.rating)}
                                >Leave Review</Button>
                            </div>
                        </Form>
                    </div>
                    }

                    <Row xs={1} md={3} className="breweriesList">
                        {beerReview.map(review => (
                            <Col key={review.ratingId}>
                                <Card className="breweryListRow">
                                    <WebImage imageId={review.imgPath} altText={review.titleOfReview} cssClass="gridImgBeerList card-img-top"/>
                                    <Card.Body className="cardReviews">
                                        <Card.Title className="breweryBeerCardTitle">{review.titleOfReview}</Card.Title>
                                        <Card.Text className="cardText">
                                            <StarRating rating={review.rating}/>
                                            <p className="reviewDate">(Reviewed on {review.reviewDate})</p>
                                            <p className="leftAlignText">{review.mainText}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

            </div>
        </body>
    );
}

export default Beer;