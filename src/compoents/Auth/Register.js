import { useState } from 'react';
import './Register.scss'
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiService';
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

function Register(props) {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [username, setUsername] = useState("")

    const [isShowPassword, setIsShowPassword] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        //validate
        const isValidateEmail = validateEmail(email)
        if (!isValidateEmail) {
            toast.error("Invalid email")
            return;
        }

        if (!password) {
            toast.error("Invalid password")
            return;
        }

        let data = await postRegister(email, password, username)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login')
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }

    }

    return (
        <div className="register-container">
            <div className='header'>
                <span>Already have an account?</span>
                <button onClick={() => navigate('/login')}>Log in</button>
            </div>

            <div className='title col-4 mx-auto'>Nam Dev</div>

            <div className='welcome col-4 mx-auto'>Start your journey?</div>

            <div className='form-content col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email (*)</label>
                    <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>

                <div className='form-group pass-group'>
                    <label>Password (*)</label>
                    <input type={isShowPassword ? 'text' : 'password'} className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    {

                        isShowPassword ?
                            <span className="icons-eye"
                                onClick={() => setIsShowPassword(false)}>
                                < VscEye />
                            </span>
                            :
                            <span className="icons-eye"
                                onClick={() => setIsShowPassword(true)}>
                                <VscEyeClosed />
                            </span>
                    }


                </div>

                <div className='form-group'>
                    <label>Username (*)</label>
                    <input type='text' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>

                <div>
                    <button className='btn-submit' onClick={() => handleRegister()}>Login</button>
                </div>
                <div >
                    <span className='back' onClick={() => { navigate('/') }}>&#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div >
    );
}

export default Register;