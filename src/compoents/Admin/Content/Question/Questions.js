import { useState, useEffect } from 'react';
import './Question.scss';
import Select from 'react-select';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { BsFillPatchMinusFill } from 'react-icons/bs';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const Quesions = () => {
    const options = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            imagePreview: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                },
            ]
        },
    ]);

    const [openLightbox, setOpenLightbox] = useState(false);
    const [lightboxSlides, setLightboxSlides] = useState([]);

    useEffect(() => {
        return () => {
            questions.forEach(question => {
                if (question.imagePreview) {
                    URL.revokeObjectURL(question.imagePreview);
                }
            });
        };
    }, []);

    const handleAddRemoveQuesion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                imagePreview: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: ' ',
                        isCorrect: false
                    }
                ]
            };
            setQuestions([...questions, newQuestion]);
        }

        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            const removedQuestion = questionClone.find(item => item.id === id);
            if (removedQuestion?.imagePreview) {
                URL.revokeObjectURL(removedQuestion.imagePreview);
            }
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }
    };

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions);

        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: ' ',
                isCorrect: false
            };
            const index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers.push(newAnswer);
            setQuestions(questionClone);
        }

        if (type === 'REMOVE') {
            const index = questionClone.findIndex(item => item.id === questionId);
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionClone);
        }
    };

    const handleOnchange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionClone = _.cloneDeep(questions);
            const index = questionClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionClone[index].description = value;
                setQuestions(questionClone);
            }
        }
    };

    const handleOnchangeFileQuestion = (questionId, e) => {
        let questionClone = _.cloneDeep(questions);
        const index = questionClone.findIndex(item => item.id === questionId);

        if (index > -1 && e.target && e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (questionClone[index].imagePreview) {
                URL.revokeObjectURL(questionClone[index].imagePreview);
            }

            questionClone[index].imageFile = file;
            questionClone[index].imageName = file.name;
            questionClone[index].imagePreview = URL.createObjectURL(file);
            setQuestions(questionClone);
        }
    };

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionClone = _.cloneDeep(questions);
        const index = questionClone.findIndex(item => item.id === questionId);

        if (index > -1) {
            questionClone[index].answers = questionClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            });
            setQuestions(questionClone);
        }
    };

    const handleOpenImage = (imageUrl) => {
        setLightboxSlides([{ src: imageUrl }]);
        setOpenLightbox(true);
    };

    const handleSubmitQuestionForQuiz = () => { };

    return (
        <div className="question-container">
            <div className="title">Manage Questions</div>
            <hr />
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                        placeholder={"Quiz type"}
                    />
                </div>

                <div className='mt-3 mb-2'>
                    <span>Add question: </span>
                </div>

                {questions && questions.length > 0 && questions.map((question, index) => {
                    return (
                        <div key={question.id} className='question-main mb-4'>
                            <div className='questions-content'>
                                <div className="form-floating description ">
                                    <input
                                        type="text"
                                        value={question.description}
                                        className="form-control"
                                        placeholder="name@example.com"
                                        onChange={(e) => handleOnchange('QUESTION', question.id, e.target.value)}
                                    />
                                    <label>Question {index + 1} description</label>
                                </div>

                                <div className='group-upload'>
                                    <label htmlFor={`${question.id}`}>
                                        <RiImageAddFill className='label-upload' />
                                    </label>
                                    <input
                                        id={`${question.id}`}
                                        onChange={(e) => handleOnchangeFileQuestion(question.id, e)}
                                        type={'file'}
                                        hidden
                                    />
                                    <span
                                        onClick={() => question.imagePreview && handleOpenImage(question.imagePreview)}
                                        style={{ cursor: question.imagePreview ? 'pointer' : 'default' }}
                                    >
                                        {question.imageName ? question.imageName : '0 file is uploaded'}
                                    </span>
                                </div>

                                {/* {question.imagePreview && (
                                    <div className="image-preview">
                                        <img
                                            src={question.imagePreview}
                                            alt={question.imageName}
                                            onClick={() => handleOpenImage(question.imagePreview)}
                                            style={{ width: 120, height: 80, objectFit: 'cover', cursor: 'pointer' }}
                                        />
                                    </div>
                                )} */}

                                <div className='btn-add'>
                                    <span onClick={() => handleAddRemoveQuesion('ADD', '')}>
                                        <BsFillPatchPlusFill className='icon-add' />
                                    </span>
                                    {questions.length > 1 && (
                                        <span onClick={() => handleAddRemoveQuesion('REMOVE', question.id)}>
                                            <BsFillPatchMinusFill className='icon-remove' />
                                        </span>
                                    )}
                                </div>
                            </div>

                            {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                                return (
                                    <div key={answer.id} className='answers-content'>
                                        <input
                                            checked={answer.isCorrect}
                                            onChange={(e) =>
                                                handleAnswerQuestion('CHECKBOX', answer.id, question.id, e.target.checked)}
                                            className="form-check-input iscorrect"
                                            type="checkbox"
                                        />
                                        <div className="form-floating answer-name ">
                                            <input
                                                value={answer.description}
                                                onChange={(e) =>
                                                    handleAnswerQuestion('INPUT', answer.id, question.id, e.target.value)}
                                                type="text"
                                                className="form-control"
                                                placeholder="name@example.com"
                                            />
                                            <label>Answer {index + 1}</label>
                                        </div>
                                        <div className='btn-group'>
                                            <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                <AiOutlinePlusCircle className='icon-add' />
                                            </span>
                                            {question.answers.length > 1 && (
                                                <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                    <AiOutlineMinusCircle className='icon-remove' />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}

                {questions && questions.length > 0 && (
                    <div>
                        <button
                            onClick={() => handleSubmitQuestionForQuiz()}
                            className='btn btn-warning'
                        >
                            Save Questions
                        </button>
                    </div>
                )}
            </div>

            <Lightbox
                open={openLightbox}
                close={() => setOpenLightbox(false)}
                slides={lightboxSlides}
            />
        </div>
    );
};

export default Quesions;