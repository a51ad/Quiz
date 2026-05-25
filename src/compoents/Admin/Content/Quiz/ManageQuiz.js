import { useState } from 'react';
import './ManageQuiz.scss'
import Select from "react-select"
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from "react-toastify";
import TableQuiz from './TableQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ManageQuiz = () => {

    const options = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
    ];

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [image, setImage] = useState(null)

    const handleChangeFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleSubmitQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/Description is required')
            return;
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName("")
            setDescription("")
            setImage(null)

        } else {
            toast.error(res.EM)
        }
    }


    return (
        <div className="quiz-container">
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                justify
            >
                <Tab className='p-3 pt-0' eventKey="manage" title="Manage Quiz">
                    <div className="add-new">
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">Add New Quiz:</legend>
                            <div className="form-floating mb-3">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    placeholder='your name quiz' />
                                <label >Name</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    placeholder='description' />
                                <label >Desscripton</label>
                            </div>

                            <div className='my-3'>
                                <Select
                                    value={type}
                                    defaultValue={type}
                                    onChange={setType}
                                    options={options}
                                    placeholder={"Quiz type"}
                                />

                            </div>

                            <div className='more-actions  form-group'>
                                <label className='mb-1'>Upload Image</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    onChange={(e) => handleChangeFile(e)}
                                />
                            </div>

                            <div className='mt-3'>
                                <button onClick={() => handleSubmitQuiz()} className='btn btn-warning'>Save</button>
                            </div>
                        </fieldset>
                    </div>
                    <div className="list-detail">
                        <TableQuiz />
                    </div>
                </Tab>

                <Tab className='p-3 pt-0' eventKey="update" title="Update Q/A Quiz">
                    <QuizQA />
                </Tab>

                <Tab className='p-3 pt-0' eventKey="assign" title="Assign to Users">
                    <AssignQuiz />
                </Tab>


            </Tabs>


        </div>
    )
}

export default ManageQuiz;