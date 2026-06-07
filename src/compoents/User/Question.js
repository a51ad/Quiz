import _ from 'lodash'
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';
import { useState } from 'react';
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
const Question = ({ data, index, handleCheckbox, isShowAnswer }) => {

    const [openLightbox, setOpenLightbox] = useState(false)
    const [lightboxSlides, setLightboxSlides] = useState([]);
    if (_.isEmpty(data)) {
        return (
            <>

            </>
        )
    }

    const handleChildCheckBox = (e, answerId, questionId) => {
        handleCheckbox(answerId, questionId)
    }

    const handleOpenImage = (imageUrl) => {
        setLightboxSlides([{ src: imageUrl }]);
        setOpenLightbox(true);
    };

    return (

        <>
            {data.image ?
                <div className='q-image'>
                    <img onClick={() => handleOpenImage(`data:image/jpeg;base64, ${data.image}`)}
                        style={{ cursor: 'pointer' }}
                        src={`data:image/jpeg;base64, ${data.image}`} />
                    <Lightbox
                        open={openLightbox}
                        close={() => setOpenLightbox(false)}
                        slides={lightboxSlides}
                    />
                </div>
                :
                <div className='q-image'>

                </div>
            }
            <div className="question">Question {index + 1}: {data.questionDescription}</div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((item, index) => {
                        return (
                            <div key={index} className="a-child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={item.isSelected}
                                        onChange={(e) => handleChildCheckBox(e, item.id, data.questionId)}
                                    />
                                    <label className="form-check-label" >
                                        {item.description}
                                    </label>
                                    {isShowAnswer === true &&
                                        <>
                                            {item.isSelected === true && item.isCorrect === false
                                                && <IoIosClose className='incorrect' />
                                            }

                                            {item.isCorrect === true
                                                && <IoIosCheckmark className='correct' />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })
                }

            </div >
        </>
    )
}

export default Question;