
import '../../App.css';
import {LinkContainer} from "react-router-bootstrap";
import React, {useEffect, useState} from "react";
import {getUser, loginUser, logoutUser} from "../../api/UserApi";
import {Button, ButtonGroup} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {getFavouriteBreweriesByUser} from "../../api/BreweryApi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import logo from "../../images/logo.png"

const Home = () => {
  let defaultUser = {
    'firsName': '',
    'lastName': '',
    'name': '',
    'token': '',
    'role': 'guest'
  };

  const [user, setUser] = useState(defaultUser);

  const [showModal, setShowModal] = useState(false);

  const handleShowModalOn = () => {
    setShowModal(true);
  };

  const handleRegister = () => {
    window.location.assign('/user')
  }

  const handleBeers = () => {
    window.location.assign('/beerlist')
  }

  const handleBreweries = () => {
    window.location.assign('/brewerylist')
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [breweries, setBreweries] = useState([]);

  const doSetUsername = (event) => {
    setUsername(event.target.value);
  };
  const doSetPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    // validate
    if (event !== undefined) event.preventDefault();
    const login = async () => {
      loginUser({ 'userName': username, 'password': password }).then(data=>{
        setUser(data);
        window.location.reload();
      });
    }
    login().then(data=>{
      setPassword('');
      setShowModal(false);
    });
  };

  const handleLogout = () => {
    const logout = async () => {
      logoutUser().then(data=>{
        setUser(data);
        setPassword('');
        setShowModal(false);
        window.location.reload();
      });
    }
    logout();
  };

  const handleCancel = () => {
    setPassword('');
    setShowModal(false);
  };


  useEffect(() => {
    const getUserFromCookie = async () => {
      getUser().then( user=> {
            setUser(user);
          }
      );
    }
    getUserFromCookie();
  }, []);

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const getAllBreweriesByUser = async() => {
      const data = await getFavouriteBreweriesByUser();
      setBreweries(data);
    }
    getAllBreweriesByUser();

  }, [user]);


  return (

      <body>

      {user.id !== 0 &&
        <div className="mainCard">
          <h2>Welcome back {user.firstName}!</h2>

          <ButtonGroup className="homeButtonsLoggedIn">
            <Button variant="outline-light" onClick={handleBreweries}>
              View all breweries!
            </Button>
            <Button variant="outline-light" onClick={handleBeers}>
              View all beers!
            </Button>
          </ButtonGroup>

          <div className="favouriteBreweriesHome">
            {breweries?.length !== 0 &&
            <div className="favBreweriesDiv">
              <h3>Your Favourite Breweries</h3>
              <Row xs={1} md={6} >
                {breweries?.map(brewery => (
                    <Col key={brewery.breweryId}>
                      <LinkContainer to={{pathname: `/brewery/detail/${brewery.breweryId}`}} >
                        <Card className="breweryListRow">
                          <Card.Img className="gridImgBreweriesBeer" variant="top" src={brewery.imgPath} />
                          <Card.Body>
                            <Card.Title className="beerBreweryCardTitle">{brewery.breweryName}</Card.Title>
                            <hr className="lineSeparatorNews"/>
                            {/*<div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>*/}
                            <Card.Text className = "newsText">
                              <h5>Updates</h5>
                              {brewery.brewerynews}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </LinkContainer>
                    </Col>
                ))}
              </Row>
            </div>
                }

          </div>
        </div>
      }
        {user.id === 0 &&
        <div className="mainCard">
          <h2>Welcome to <img className="homeLogo" src={logo} alt="Pint It Logo"/></h2>
          <br/>
          <p>Please login to have a look around</p>
          <br/>
          <ButtonGroup className="homeButtons">
            <Button variant="outline-light" onClick={handleRegister}>
              Register
            </Button>
            <Button variant="outline-light" onClick={handleShowModalOn}>
              Login
            </Button>
          </ButtonGroup>
        </div>
        }
        {user.id === 0 &&
        <Modal show={showModal} onHide={handleClose}>
          <Form onSubmit={handleLogin}>
            <Modal.Header closeButton>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter username"
                              value={username} onChange={doSetUsername} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                              value={password} onChange={doSetPassword} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                  <Button variant="outline-success" onClick={handleLogin} type="submit">
                    Login
                  </Button>
                  <Button variant="outline-danger" onClick={handleCancel}>
                    Cancel
                  </Button>
                </ButtonGroup>
            </Modal.Footer>
          </Form>
        </Modal>
        }

        {user.id !== 0 &&
        <Modal show={showModal} onHide={handleClose}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Log Out</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ButtonGroup>
                <Button variant="outline-success" onClick={handleLogout}  type="submit">
                  Logout
                </Button>
                <Button variant="outline-danger" onClick={handleClose}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Modal.Body>
          </Form>
        </Modal>
        }
      </body>
  );
}

export default Home;