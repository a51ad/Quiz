import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import './UserInfo.scss'
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { postUpdateProfile } from '../../services/apiService';


const UserInfo = (props) => {

    const account = useSelector((state) => state.user.account)

    const [email, setEmail] = useState("");

    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("USER");
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setEmail(account.email)
            setUsername(account.username)
            setRole(account.role)
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`)
            }

        }
    }, [account])

    const handleUploadImage = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        } else {
            setPreviewImage("")
        }
    }

    const handleUpdateProfile = async (e) => {

        let data = await postUpdateProfile(username, image)


        if (data && data.EC === 0) {
            toast.success(data.EM)
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }



    }

    return (
        <div className='modal-profile-user'>
            <Form>




                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} disabled />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Role</Form.Label>
                        <Form.Control value={role} disabled />
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

                <Button variant="primary" type="button" onClick={() => handleUpdateProfile()}>
                    Update
                </Button>
            </Form>
        </div>
    )
}


export default UserInfo