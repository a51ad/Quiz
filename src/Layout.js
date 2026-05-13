import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import User from './compoents/User/User';
import Admin from './compoents/Admin/Admin';
import HomePage from './compoents/Home/HomePage';
import ManageUser from './compoents/Admin/Content/ManageUser';
import DashBoard from './compoents/Admin/Content/DashBoard'
import Login from './compoents/Auth/Login';
import Register from './compoents/Auth/Register';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ListQuiz from './compoents/User/ListQuiz';
import DetailQuiz from './compoents/User/DetailQuiz'
import ManageQuiz from './compoents/Admin/Content/Quiz/ManageQuiz';
import Quesions from './compoents/Admin/Content/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';
import { Suspense } from 'react'


const NotFound = () => {
    return (
        <div className='container mt-3 alert alert-danger'>
            404.Not found data with your current URL
        </div>
    )
}

const Layout = (props) => {
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='users' element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />
                </Route>

                <Route path='quiz/:id' element={<DetailQuiz />} />

                <Route path='admin' element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                } >
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route path='manage-quizzes' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<Quesions />} />
                </Route>

                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Suspense>
    )
}

export default Layout;