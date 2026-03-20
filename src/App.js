import './App.scss';
import Hearder from './compoents/Header/Header';
import { Link, Outlet } from 'react-router-dom';
const App = () => {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Hearder />
      </div>
      <div className='main-content'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          <Outlet />
        </div>
      </div>
    </div >
  );
}

export default App;
