import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { deleteQuiz } from '../../../../services/apiService';


const ModalDeleteUser = ({ show, setShow, dataDeleteQuiz, fetchQuiz }) => {

    const handleClose = () => setShow(false);

    const handleSubmitDeleteQuiz = async () => {
        const data = await deleteQuiz(dataDeleteQuiz.id)

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
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Comfirm delete user?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this Quiz id =
                    <b>{dataDeleteQuiz && dataDeleteQuiz.id ? dataDeleteQuiz.id : {}}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;