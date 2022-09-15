import '../../App.css';
import {ButtonGroup, Modal} from "react-bootstrap";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {addUserDetail} from "../../api/UserApi";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


const Registration = () => {

    const defaultUser = {
        userName:'',
        password:'',
        confirmPassword:'',
        role:'BeerLover',
        lastName: '',
        dateOfBirth: '',
        firstName:''
    };
    const defaultErrors = {
        userName:'',
        password:'',
        confirmPassword:'',
        dateOfBirth:''
    };
    const defaultValid = {
        userName:false,
        password:false,
        dateOfBirth:false,
        confirmPassword:false
    };
    const [user, setUser] = useState(defaultUser);
    const [errors, setErrors] = useState(defaultErrors);
    const [validItems, setValidItems] = useState(defaultValid);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [role, setRole] = useState('BeerLover');

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleUserInput = (event) => {
        event.preventDefault();
        const {id,value} = event.target;
        switch (id) {
            case 'userName':
                setUserName(value);
                user.userName = value;
                if (event.target.validationMessage == null) {
                    errors.userName = (userName.length < 5) ? 'Username must be at least 5 characters' : '';
                } else {
                    errors.userName = event.target.validationMessage;
                }
                validItems.userName = (errors.userName === '');
                break;
            case 'password':
                setPassword(value);
                user.password = value;
                errors.password = (password.length < 7) ? 'Password must be at least 8 characters' : '';
                validItems.password = (errors.password === '');
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                user.confirmPassword = value;
                errors.confirmPassword = (value === password) ? '' : 'Passwords must match';
                validItems.confirmPassword = (errors.confirmPassword === '');
                break;
            case 'firstName':
                setFirstName(value);
                user.firstName = value;
                break;
            case 'lastName':
                setLastName(value);
                user.lastName = value;
                break;
            case 'dateOfBirth':
                setDateOfBirth(value);
                user.dateOfBirth = value;
               // var ageDifMs = Date.now() - Date(dateOfBirth);
               // var ageDate = new Date(ageDifMs); // miliseconds from epoch
               // var age = Math.abs(ageDate.getUTCFullYear() - 1970);
                var today = new Date();
                var birthDate = new Date(value);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                errors.dateOfBirth = (age < 18) ? 'You need to be 18+' : '';
                validItems.dateOfBirth= (errors.dateOfBirth === '');
                break;
            case 'role':
                setRole(value);
                user.role = value;
                break;
            default:
                break;
        }
        setUser(user);
        setErrors(errors);
        setValidItems(validItems);
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        const save = async () => {
            addUserDetail(user).then(data => {
                setUser(data);
                setShowModal(true);
                // navigate('/');
            });
        }
        save();
    };

    const handleClose = () => setShowModal(false);
    const handleLogin = () => navigate('/');

    return (
        <body>
            <div className="mainCard">
                <h2>Register</h2>
                <Modal show={showModal} onHide={handleClose}>
                     <Modal.Header closeButton>
                         <Modal.Title>Awesome</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                         You have registered!
                     </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup>
                            <Button variant="outline-success" onClick={handleLogin} type="submit">
                                Login Here
                            </Button>
                            <Button variant="outline-danger" onClick={handleClose}>
                                Close
                            </Button>
                        </ButtonGroup>
                    </Modal.Footer>
                 </Modal>
                <Form  className="container register" onSubmit={handleSubmit}>
                    <div className="row mt-4">
                        <Form.Group className="col-6" key="username">
                            <Form.Label htmlFor="userName">Username</Form.Label>
                            <Form.Control type="email"  id="userName" value={userName} onChange={handleUserInput} />
                            <Form.Text className="error">{errors.userName}</Form.Text>
                        </Form.Group>
                    </div>

                    <div className="row mt-4">
                        <Form.Group className="col-6" key="password">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control type="password"  id="password" value={password} onChange={handleUserInput}/>
                            <Form.Text className="error">{errors.password}</Form.Text>
                        </Form.Group>
                        <Form.Group className="col-6" key="confirmPassword">
                            <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                            <Form.Control type="password"  id="confirmPassword" value={confirmPassword} onChange={handleUserInput}/>
                            <Form.Text className="error">{errors.confirmPassword}</Form.Text>
                        </Form.Group>
                    </div>

                    <div className="row mt-4">
                        <Form.Group className="col-6" key="firstName">
                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                            <Form.Control type="text"  id="firstName" value={firstName} onChange={handleUserInput}/>
                        </Form.Group>
                        <Form.Group className="col-6" key="lastName">
                            <Form.Label htmlFor="lastName">Last Name</Form.Label>
                            <Form.Control type="text"  id="lastName" value={lastName} onChange={handleUserInput}/>
                        </Form.Group>
                    </div>
                    <div className="row mt-4">
                        <Form.Group className="col-6" key="dateOfBirth">
                            <Form.Label htmlFor="dateOfBirth">Date Of Birth</Form.Label>
                            <Form.Control type="date"  id="dateOfBirth" value={dateOfBirth} onChange={handleUserInput}/>
                            <Form.Text className="error">{errors.dateOfBirth}</Form.Text>
                        </Form.Group>
                    </div>
                    <div className="row mt-4">
                        <Form.Group className="col-4" key="role">
                            <Form.Label htmlFor="role">I am a (select from dropdown)</Form.Label>
                            <Form.Control
                                as="select"
                                id="role"
                                value={role}
                                onChange={handleUserInput}
                            >
                                <option selected value="BeerLover">Beer Lover</option>
                                <option value="Brewer">Brewer</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="row mt-4">
                    </div>
                    <Button disabled={!(validItems.password, validItems.confirmPassword, validItems.dateOfBirth, validItems.dateOfBirth)} className="center" variant="outline-light" onClick={handleSubmit}>
                        Register
                    </Button>
                </Form>
            </div>
        </body>

    );
}

export default Registration;