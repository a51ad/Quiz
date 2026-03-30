import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FcPlus } from "react-icons/fc";
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";


const ModalCreateUser = (props) => {
    // const [show, setShow] = useState(false);
    const { show, setShow } = props;


    const handleClose = () => {
        setShow(false)
        setEmail("")
        setPasword("")
        setUsername("")
        setRole("USER")
        setImage("")
        setPreviewImage("")
    };
    // const handleShow = () => setShow(true);

    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("USER");
    const [previewImage, setPreviewImage] = useState("")


    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {
            setPreviewImage("")
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const handleSubmitCreateUser = async () => {
        //validate
        const isValidateEmail = validateEmail(email)
        if (!isValidateEmail) {
            toast.error("Invalid email")
            return;
        }

        if (!password) {
            toast.error("Invalid password")
            return;
        }

        //submit data
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('username', username);
        data.append('role', role);
        data.append('userImage', image);

        let res = await axios.post('http://localhost:8081/api/v1/participant', data);

        if (res.data && res.data.EC === 0) {
            toast.success(res.data.EM);
            handleClose();
        }

        if (res.data && res.data.EC !== 0) {
            toast.error(res.data.EM);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='modal-add-user '>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPasword(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Username</Form.Label>
                                <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Role</Form.Label>
                                <Form.Select defaultValue="Choose..." onChange={(e) => setRole(e.target.value)}>
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <label className='mb-3 label-upload' htmlFor='labelUpload' >
                            <FcPlus /> Upload File Image
                            <Form.Control type="file" hidden id='labelUpload'

                                onChange={(e) => handleUploadImage(e)} />
                        </label>

                        <div className='mb-3 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>review img</span>
                            }
                        </div>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;