import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalDeleteQuiz from "./ModalDeleteQuiz"
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = (props) => {

    const [listQuiz, setListQuiz] = useState([])

    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false)

    const [dataDeleteQuiz, setDataDeleteQuiz] = useState({})

    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false)

    const [dataUpdateQuiz, setDataUpdateQuiz] = useState({})


    const handleDeleteQuiz = (item) => {
        setShowModalDeleteQuiz(true)
        setDataDeleteQuiz(item)
    }

    const handleUpdateQuiz = (item) => {
        setShowModalUpdateQuiz(true)
        setDataUpdateQuiz(item)
    }

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }

    }

    useEffect(() => {
        fetchQuiz()
    }, [])

    return (
        <>
            <div>List Quiz: </div>

            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button onClick={() => handleUpdateQuiz(item)} className="btn btn-warning">Edit</button>
                                    <button onClick={() => handleDeleteQuiz(item)} className="btn btn-danger">Delete</button>

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDeleteQuiz={dataDeleteQuiz}
                fetchQuiz={fetchQuiz}
            />

            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdateQuiz={dataUpdateQuiz}
                setDataUpdateQuiz={setDataUpdateQuiz}
                fetchQuiz={fetchQuiz}
            />
        </>
    )
}

export default TableQuiz;