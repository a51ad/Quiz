import './App.scss';
import Hearder from './compoents/Header/Header';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
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
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div >
  );
}

export default App;
