import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = ({ dataQuiz, handleFinish, setIndex }) => {

    const refDiv = useRef([])

    const onTimeUp = () => {
        handleFinish()
    }

    const getClassQuestion = (index, question) => {
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(answer => answer.isSelected === true)
            if (isAnswered) {
                return "question selected"
            }
            return "question "
        }
    }

    const handleClickQuestion = (index, question) => {
        setIndex(index)
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question"
                }
            })
        }

        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(answer => answer.isSelected === true)
            if (isAnswered) {
                return;
            }
        }
        refDiv.current[index].className = "question clicked"
    }

    return (
        <>
            <div className="main-timer">
                <CountDown onTimeUp={onTimeUp} />
            </div>

            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={index}
                                onClick={() => handleClickQuestion(index, item)}
                                ref={element => refDiv.current[index] = element}
                                className={getClassQuestion(index, item)}>{index + 1}</div>

                        )
                    })
                }
            </div>
        </>
    )
}

export default RightContent;