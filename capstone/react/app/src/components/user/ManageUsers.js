import '../../App.css';
import React, {useEffect, useState} from "react";
import {getAllBreweries} from "../../api/BreweryApi";
import {deleteUser, getAllUsers, updateUserRole} from "../../api/UserApi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {LinkContainer} from "react-router-bootstrap";
import {ButtonGroup, Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {updateToActiveBeer} from "../../api/BeerApi";


const ManageUsers = () => {

    const defaultUser = {
        userName:'',
        password:'',
        confirmPassword:'',
        role:'BeerLover',
        lastName: '',
        dateOfBirth: '',
        firstName:''
    };

    // const defaultErrors = {
    //     userName:'',
    //     password:'',
    //     confirmPassword:'',
    //     dateOfBirth:''
    // };
    //
    // const defaultValid = {
    //     userName:false,
    //     password:false,
    //     dateOfBirth:false,
    //     confirmPassword:false
    // };

    const [userToChange, setUserToChange] = useState(defaultUser);
    const [role, setRole] = useState('');
    const [users, setUsers] = useState([]);

    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [showChangeUserRoleModal, setShowChangeUserRoleModal] = useState(false);
    const [showDeleteUserConfirmationModal, setShowDeleteUserConfirmationModal] = useState(false);
    const [showChangeUserRoleConfirmationModal, setShowChangeUserRoleConfirmationModal] = useState(false);

    const handleDeleteClose = () => setShowDeleteUserModal(false);
    const handleRoleClose = () => setShowChangeUserRoleModal(false);
    const handleDeleteConfirmationClose = () => setShowDeleteUserConfirmationModal(false);
    const handleDeleteThisUser = () => setShowDeleteUserModal(true);
    const handleRoleConfirmationClose = () => setShowChangeUserRoleConfirmationModal(false);

    const reload=()=>window.location.reload();

    useEffect(() => {
        const getUsers = async() => {
            const data = await getAllUsers();
            setUsers(data);
        }
        getUsers();

    }, []);

    const handleDeleteUser = (event) => {
        event.preventDefault();
        const deleteSelectedUser = async () => {
            deleteUser(Number(event.target.id)).then(data => {
                setShowDeleteUserConfirmationModal(true);
            });
        }
        deleteSelectedUser();
    };

    const handleChangeRole = (event) => {
        event.preventDefault();
        const changeRole = async () => {
            updateUserRole(role, Number(event.target.id)).then(data => {
                setShowChangeUserRoleConfirmationModal(true);
            });
        }
        changeRole();
    };

    const handleUserInput = (event) => {
        event.preventDefault();
        const {id,value} = event.target;
        switch (id) {
            case 'role':
                setRole(value);
                break;
            default:
                break;
        }
    };


    return (

        <body>
        <div className="mainCard">

            <Modal show={showDeleteUserConfirmationModal} onHide={handleDeleteConfirmationClose} onExit={reload}>
                <Modal.Header closeButton>
                    <Modal.Title>Awesome</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You deleted a user!
                </Modal.Body>
            </Modal>

            <Modal show={showChangeUserRoleConfirmationModal} onHide={handleRoleConfirmationClose} onExit={reload}>
                <Modal.Header closeButton>
                    <Modal.Title>Awesome</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You updated a user's role!
                </Modal.Body>
            </Modal>

            <h1>Manage Users</h1>
            <p>View, delete and change user roles below</p>
            <Row xs={1} md={4} className="breweriesList">
                {users.map(user => (
                    <Col key={user.userId}>
                            <Card className="breweryListRow changeUserRoleContainer">
                                <Card.Body>
                                    <Card.Title className="cardTitle">{user.firstName} {user.lastName}</Card.Title>
                                    <Card.Text>
                                        <div className="allUsers">
                                            <p className="leftAlignText">User id: {user.id}</p>
                                            <p className="leftAlignText">Date of birth: {user.dateOfBirth}</p>
                                            <p className="leftAlignText">Role: {user.role}</p>
                                            {user.role === 'Brewer' &&
                                            <p className="leftAlignText">Brewery: {user.breweryname}</p>
                                            }
                                        </div>

                                        <Form className="container separateForm deleteBeerButton" id={user.id} value={user.id} onSubmit={handleChangeRole}>
                                            <div>
                                                <Form.Group className="leftAlignText" key="role">
                                                    <Form.Label htmlFor="role">Change User Role to:</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        id="role"
                                                        defaultValue={user.role}
                                                        onChange={handleUserInput}
                                                    >
                                                        <option value="BeerLover">Beer Lover</option>
                                                        <option value="Brewer">Brewer</option>
                                                        <option value="Admin">Admin</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                        <br/>
                                        <ButtonGroup>
                                            <Button variant="outline-success" type="submit">
                                                Submit Change
                                            </Button>
                                            <Button variant="outline-danger" id={user.id}
                                                    onClick={handleDeleteUser}
                                            >
                                                Delete User
                                            </Button>
                                        </ButtonGroup>
                                        </Form>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                    </Col>
                ))}
            </Row>
        </div>
        </body>
    );
}

export default ManageUsers;