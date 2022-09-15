import {useState} from "react";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import UploadFiles from "../upload/UploadFiles";
import {useParams} from "react-router-dom";
import {getUserDetail, saveUserDetail} from "../../api/UserApi";
import WebImage from "../webimage/WebImage";


const EditProfile = () => {
    let { userId } = useParams();
    const [user, setUser] = useState({});
    const [callingDetail, setCalling] = useState(false);

    const handleUpdateDetail = (event) => {
        if (event !== undefined) event.preventDefault();
        const updateDetail = async () => {
            saveUserDetail(user).then(data=>{
               setUser(data);
            });
        }
        updateDetail();
    };


    const uploadedProfilePic = (webImage) => {
        if (webImage!==undefined) {
            user.profileImageId = webImage.id;
            saveUserDetail(user).then(data=>{
                setUser(data);
            });
        }
    }

    const getDetail = () => {
        const userDetail = async () => {
            if (!callingDetail) {
                setCalling(true);
                getUserDetail(userId).then(data => {
                    setUser(data);
                });
            }
        }
        userDetail();
    };
    getDetail();

    return (
            <>
                {user !== undefined &&
                    <Form  className="form" onSubmit={handleUpdateDetail}>
                        <Form.Group className="mb-3" key="username">
                            <Form.Label htmlFor="exampleEmail">Username</Form.Label>
                            <Form.Control type="text" value={user?.userName} className="me-2"/>
                        </Form.Group>
                        <Form.Group className="mb-3" key="firstName">
                            <Form.Label htmlFor="exampleEmail">First Name</Form.Label>
                            <Form.Control type="text" value={user?.firstName} className="me-2"/>
                        </Form.Group>
                        <Form.Group className="mb-3" key="lastName">
                            <Form.Label htmlFor="exampleEmail">Last Name</Form.Label>
                            <Form.Control type="text" value={user?.lastName} className="me-2"/>
                        </Form.Group>
                        {user?.profileImageId > 0 &&
                            <WebImage cssClass="profileEditPic" imageId={user?.profileImageId} altText={user?.userName}/>
                        }
                        {user?.profileImageId === 0 &&
                            <UploadFiles parentCallback={uploadedProfilePic}></UploadFiles>
                        }
                        <br/>
                        <Button variant="outline-success" type="submit">Save</Button>

                    </Form>
                }
            </>

    );
};

export default EditProfile;
