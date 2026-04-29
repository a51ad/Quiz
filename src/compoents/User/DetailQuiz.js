import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import './DetailQuiz.scss'
import _ from 'lodash'
import Question from "./Question";
import ModalResult from "./ModalResult";

const DetailQuiz = () => {

    const params = useParams();
    const quizId = params.id
    const locaotion = useLocation

    const [dataQuiz, setDataQuiz] = useState([])
    const [showModalResult, setShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})
    const [index, setIndex] = useState(0)

    useEffect(() => {
        fetchQuestions()
    }, [quizId])

    const testFunc = () => {
        console.log(test);

    }

    testFunc()

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId)
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `id` property
                .groupBy("id")
                // `key` is group's name (id), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers)
                    })
                    return { questionId: key, answers, questionDescription, image }
                }
                )
                .value()
            setDataQuiz(data)
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }

    const handleFinish = async () => {
        let payload = {
            quizId: +quizId,
            answers: []

        }

        let answers = []
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = item.questionId
                let userAnswerId = []

                item.answers.forEach(answer => {
                    if (answer.isSelected === true)
                        userAnswerId.push(answer.id)
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })

            })
            payload.answers = answers
            //submit api
            let res = await postSubmitQuiz(payload)
            console.log(res);
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setShowModalResult(true)
            } else {

            }

        }

    }


    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question) {
            let b = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            question.answers = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
    }

    return (
        <div className="detail-quiz-container">

            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {locaotion?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>

                <div className="q-content">
                    <Question index={index} data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} handleCheckBox={handleCheckBox} />
                </div>

                <div className="footer">

                    <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
                    <button className="btn btn-warning" onClick={() => handleFinish()}>Finish</button>
                </div>
            </div>

            <div className="right-content">

            </div>
            <ModalResult show={showModalResult}
                setShow={setShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}

export default DetailQuiz;