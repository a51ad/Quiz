import { useState } from 'react'
import './ChangePassword.scss'
import { toast } from "react-toastify";
import { postChangePassword } from '../../services/apiService';

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewOldPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {

            toast.error("Error password not same")
            return;
        }
        let data = await postChangePassword(oldPassword, newPassword)
        if (data && data.EC === 0) {
            toast.success(data.EM)
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    }


    return (
        <div className="change-password-container">
            <div className="change-password-card">
                <form>

                    <div className="form-group">
                        <label>Old Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewOldPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" onClick={(e) => handleChangePassword(e)}>
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword