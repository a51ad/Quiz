import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import _ from 'lodash';


const ModalViewUser = (props) => {

    const { show, setShow, dataUser } = props;


    const handleClose = () => {
        setShow(false)

    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='modal-add-user '>
                <Modal.Header closeButton>
                    <Modal.Title>Detail user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control disabled type="email" placeholder="Enter email" value={dataUser.email} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control disabled type="password" placeholder="Password" value={dataUser.password} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Username</Form.Label>
                                <Form.Control disabled value={dataUser.username} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Role</Form.Label>
                                <Form.Control disabled value={dataUser.role} />
                            </Form.Group>
                        </Row>


                        <div className='mb-3 img-preview'>
                            {dataUser.image ?
                                <img src={dataUser.image} />
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
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;