import { useEffect, useState } from "react";
import { getHistory } from "../../services/apiService";
import moment from 'moment';
const History = () => {

    const [listHistory, setListHistory] = useState([])

    const fetchListHistory = async () => {
        let res = await getHistory()
        if (res && res.EC === 0) {
            let newData = res.DT.data.map((item) => {
                return {
                    total_questions: item.total_questions,
                    total_correct: item.total_correct,
                    name: item.quizHistory.name,
                    id: item.id,
                    date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                }
            })
            if (newData.length > 7) {
                newData = newData.slice(newData.length - 7, newData.length)
            }
            setListHistory(newData)
        }

    }

    console.log(listHistory);




    useEffect(() => {
        fetchListHistory()
    }, [])

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Quiz Name</th>
                        <th scope="col">Total Question</th>
                        <th scope="col">Total Correct</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 && listHistory.map((item, index) => (
                        <tr key={item.id ?? index}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.total_questions}</td>
                            <td>{item.total_correct}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}

                    {listHistory && listHistory.length === 0 &&
                        <tr>
                            <td colSpan={'5'}>Not found data</td>
                        </tr>
                    }
                </tbody>
            </table >
        </>
    )
}


export default History;
