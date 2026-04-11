import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import videoHomePage from "../../assets/video-homepage.mp4"

const HomePage = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()

    return (
        <div className="homepage-container">
            <video autoPlay loop muted >
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title-1">Welcome to my project - Nam Dev</div>
                <div className="title-2">
                    This is a project that I created to practice ReactJS and Redux. I hope you like it.
                </div>
                <div className="title-3">
                    {isAuthenticated === false ?
                        <button onClick={() => navigate('/login')}>Get Started</button>
                        :
                        <button onClick={() => navigate('/users')} > Doing Quiz Now</button>
                    }

                </div>
            </div>
        </div >
    )
}

export default HomePage;