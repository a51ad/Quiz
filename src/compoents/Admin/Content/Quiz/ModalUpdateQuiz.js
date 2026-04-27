import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import Select from "react-select"
import _ from 'lodash';
import { putUpdateQuiz } from '../../../../services/apiService';


const ModalUpdateQuiz = (props) => {

    const { show, setShow, dataUpdateQuiz, setDataUpdateQuiz, fetchQuiz } = props;


    const handleClose = () => {
        setShow(false)
        setName("");
        setDescription("");
        setType("");
        setImage("");
        setPreviewImage("");
        setDataUpdateQuiz({});

    };

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("")
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        //nếu object ko rỗng thì thay đổi giá trị
        if (!_.isEmpty(dataUpdateQuiz)) {
            setDescription(dataUpdateQuiz.description)
            setName(dataUpdateQuiz.name)
            setType(dataUpdateQuiz.difficulty)
            setImage("")
            if (dataUpdateQuiz.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`)
            }
        }

    }, [dataUpdateQuiz])

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {
            setPreviewImage("")
        }
    }


    const handleUpdateQuiz = async () => {
        if (!name) {
            toast.error('Invalid name')
            return;
        }
        if (!description) {
            toast.error('Invalid description')
            return;
        }

        const data = await putUpdateQuiz(dataUpdateQuiz.id, description, name, type, image)

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            fetchQuiz()


        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }


    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' backdrop="static" className='modal-add-user '>
                <Modal.Header closeButton>
                    <Modal.Title>Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="email" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <div className="col-md-4">
                            <label className="form-label">Difficulty</label>
                            <select className="form-select"
                                onChange={(event) => setType(event.target.value)}
                                value={type}
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>


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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz;