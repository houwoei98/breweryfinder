import '../../App.css';
import React, {useEffect, useState} from "react";
import {deleteUser, getUserSingleUser, logoutUser} from "../../api/UserApi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {LinkContainer} from "react-router-bootstrap";
import {ButtonGroup, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";


const MyAccount = () => {

    const defaultUser = {
        userName:'',
        password:'',
        confirmPassword:'',
        role:'BeerLover',
        lastName: '',
        dateOfBirth: '',
        firstName:''
    };

    const [user, setUser] = useState(defaultUser);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

    const [password, setPassword] = useState('');

    const handleDeleteAccountModalOn = () => setShowDeleteAccountModal(true);
    const handleDeleteClose = () => setShowDeleteAccountModal(false);
    const handleCancel = () => setShowDeleteAccountModal(false);

    const reload=()=>window.location.reload();

    const handleDeleteAccount = () => {
        deleteUser(user.id).then(data=>{
        logoutUser().then(data=>{
            setUser(data);
            setPassword('');
            window.location.assign('/home')
        });
        });
    };


    const handleDeleteAccountClose = () => {
        setShowDeleteAccountModal(false);
        window.location.assign('/home')
    };

    useEffect(() => {
        const getAllUserInfo = async () => {
            getUserSingleUser().then( user=> {
                    setUser(user);
                }
            );
        }
        getAllUserInfo();
    }, []);


    return (

        <body>
        <div className="mainCard">
            <Modal show={showDeleteAccountModal} onHide={handleDeleteClose} onExit={reload}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete your account?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button variant="outline-dark" onClick={handleDeleteAccount}>
                            Yes, delete my account
                        </Button>
                        <Button variant="outline-dark" onClick={handleCancel}>
                            No, I want to stay!
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteConfirmationModal} onHide={handleDeleteAccountClose} onExit={reload}>
                <Modal.Header closeButton>
                    <Modal.Title>You deleted your account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sorry to see you go!
                </Modal.Body>
            </Modal>

            <h1>My Account</h1>
            <p>View your account details here!</p>
            <Container fluid>
                <Row xs={1} md={4} className="justify-content-center breweriesList">
                        <Col key={user.id}>
                            <Card className="breweryListRow changeUserRoleContainer">
                                <Card.Body>
                                    <Card.Title className="cardTitle">{user.firstName} {user.lastName}</Card.Title>
                                    <Card.Text>
                                        <p className="leftAlignText">User id: {user.id}</p>
                                        <p className="leftAlignText">Date of birth: {user.dateOfBirth}</p>
                                        <p className="leftAlignText">Role: {user.role}</p>

                                        {user.role === 'Brewer' &&
                                            <LinkContainer to="/MyBrewery">
                                                <p className="leftAlignText">My Brewery: {user.breweryname}</p>
                                            </LinkContainer>
                                        }
                                        <div className="">
                                            <Button className="deleteMyAccountButton" variant="outline-danger" onClick={handleDeleteAccountModalOn}>
                                                Delete my account
                                            </Button>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                </Row>
            </Container>
        </div>
        </body>
    );
}

export default MyAccount;