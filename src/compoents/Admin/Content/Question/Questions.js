import { useState } from 'react';
import './Question.scss'
import Select from 'react-select'
import { BsFillPatchPlusFill } from 'react-icons/bs'
import { BsFillPatchMinusFill } from 'react-icons/bs'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const Quesions = () => {

    const options = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({})

    return (
        <div className="question-container">
            <div className="title">
                Manage Questions
            </div>

            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                        placeholder={"Quiz type"}
                    />
                </div>

                <div className='mt-3'><span>Add question: </span></div>
                <div>
                    <div className='questions-content'>

                        <div className="form-floating description ">
                            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label>Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-upload'>Upload Image</label>
                            <input type={'file'} hidden />
                            <span>MyImage.pnj</span>
                        </div>
                        <div className='btn-add'>
                            <span>
                                <BsFillPatchPlusFill className='icon-add' />
                            </span>

                            <span>
                                <BsFillPatchMinusFill className='icon-remove' />
                            </span>
                        </div>
                    </div>

                    <div className='answers-content'>
                        <input
                            className="form-check-input iscorrect"
                            type="checkbox"
                        />
                        <div className="form-floating answer-name ">
                            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label>Answer 1</label>
                        </div>
                        <div className='btn-group'>
                            <span>
                                <AiOutlinePlusCircle className='icon-add' />
                            </span>

                            <span>
                                <AiOutlineMinusCircle className='icon-remove' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quesions