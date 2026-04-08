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
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='users' element={<User />} />
                </Route>
                <Route path='admin' element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                </Route>

                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
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
        </>
    )
}

export default Layout;