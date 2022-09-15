import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { ButtonGroup, Button } from 'react-bootstrap';
import './App.css';
import Home from './components/home/Home';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import {getUser, loginUser, logoutUser} from './api/UserApi';
import Beerlist from "./components/BeerList/beerlist";
import Brewerylist from "./components/breweryList/brewerylist";
import Beer from "./components/beers/beers";
import Brewery from "./components/brewery/brewery";
import Footer from "./components/Footer/footer";
import Registration from "./components/user/registration";
import BrewersBrewery from "./components/brewery/brewersBrewery";
import ManageBrewery from "./components/brewery/manageBrewery";
import Location from "./components/brewery/Location"
import MyPlanner from "./components/brewery/MyPlanner";
import ManageUsers from "./components/user/ManageUsers";
import logo from "../src/images/logo.png";
import MyAccount from "./components/user/MyAccount";


window.ADMIN = "Admin";
window.VIP = "Vip"
window.STANDARD = "Standard"
window.GUEST = "GUEST";
window.BEERLOVER = "BeerLover";
window.BREWER = "Brewer";

function BeerList() {
  return null;
}

function App() {

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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        window.location.assign('/home')
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

  return (

      <div className="wrapper">
        <Router>
          <Nav>
            <Navbar fixed="top" className="NavigationBar">
              <Container>
                <Navbar.Brand>
                  <LinkContainer to="/home">
                    <img
                        src={logo}
                        width="100"
                        height="40"
                        className="d-inline-block align-top"
                        alt="Pint it Logo"
                    />
                  </LinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="justify-content-end" style={{width: "100%"}}>
                    <LinkContainer to="/home">
                      <Nav.Link className="navText">Home</Nav.Link>
                    </LinkContainer>
                    {user.id !== 0 &&
                    <LinkContainer to="/beerlist">
                      <Nav.Link className="navText">Beers</Nav.Link>
                    </LinkContainer> }
                    {user.id !== 0 &&
                      <LinkContainer to="/brewerylist">
                      <Nav.Link className="navText">Breweries</Nav.Link>
                      </LinkContainer> }
                    {user.id !== 0 &&
                      <LinkContainer to="/location">
                      <Nav.Link className="navText">Location</Nav.Link>
                      </LinkContainer>
                    }
                    {user.role === window.BEERLOVER &&
                    <NavDropdown id="navDropdown" className="navText" title="Profile">
                      <LinkContainer to="/myPlanner">
                        <NavDropdown.Item>My Planner</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/myAccount">
                        <NavDropdown.Item>My Account</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                    }
                    {user.role === window.BREWER &&
                    <NavDropdown id="navDropdown" className="navText" title="Profile" >
                      <LinkContainer to="/MyBrewery">
                        <NavDropdown.Item>My Brewery</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <LinkContainer to="/myPlanner">
                        <NavDropdown.Item>My Planner</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/myAccount">
                        <NavDropdown.Item>My Account</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                    }
                    }
                    {user.role === window.ADMIN &&
                    <NavDropdown id="navDropdown" className="navText" title="Profile" >
                      <LinkContainer to="/manageBrewery">
                        <NavDropdown.Item>Manage Breweries</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/manageUsers">
                        <NavDropdown.Item>Manage Users</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <LinkContainer to="/myPlanner">
                        <NavDropdown.Item>My Planner</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/myAccount">
                        <NavDropdown.Item>My Account</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                    }
                  </Nav>
                </Navbar.Collapse>

                {user.id === 0 &&
                <Button className="navButtons" variant="outline-light" onClick={handleShowModalOn}>Login</Button>
                }
                {user.id !== 0 &&
                <Button className="navButtons" variant="outline-light" show={showModal} onClick={handleLogout}>Log out</Button>
                }
                {user.id === 0 &&
                <LinkContainer to="/user">
                  <Button className="navButtons" variant="outline-light">Register</Button>
                </LinkContainer>
                }

              </Container>
            </Navbar>
          </Nav>
          {user.id === 0 &&
          <Modal show={showModal} onHide={handleCancel}>
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
          <Modal show={showModal} onHide={handleCancel}>
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Log Out</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ButtonGroup>
                  <Button variant="outline-success" onClick={handleLogout}  type="submit">
                    Logout
                  </Button>
                  <Button variant="outline-danger" onClick={handleCancel}>
                    Cancel
                  </Button>
                </ButtonGroup>
              </Modal.Body>
            </Form>
          </Modal>
          }

          <div>
            <Routes>
              <Route
                  path="/" exact
                  element={<Home />} />
              <Route
                  path="/home" exact
                  element={<Home />} />
              <Route
                  path="/beerlist" exact
                  element={<Beerlist />} />
              <Route
                  path="/brewerylist" exact
                  element={<Brewerylist />} />
              <Route
                  path="/beer/detail/:id"
                  element={<Beer />} />
              <Route
                  path="/brewery/detail/:id"
                  element={<Brewery />} />
              <Route
                  path="/user"
                  element={<Registration />} />
              <Route
                  path="/MyBrewery"
                  element={<BrewersBrewery />} />
              <Route
                  path="/manageBrewery"
                  element={<ManageBrewery />} />
              <Route
                  path="/location"
                  element={<Location />} />
              <Route
                  path="/myPlanner"
                  element={<MyPlanner />} />
              <Route
                path="/manageUsers"
                element={<ManageUsers />}/>
              <Route
                  path="/myAccount"
                  element={<MyAccount />}/>
            </Routes>
          </div>
        </Router>
        <Footer/>
      </div>
  );
}

export default App;