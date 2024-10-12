import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import SocialSignup from './pages/auth/SocialSignup';
import axiosInstance from './components/auth/AxiosProvider';

function App() {
  return (
    <Router>
      <axiosInstance/>
      <div className='w-[600px] h-screen mx-auto font-[Pretendard]'>
        <div className="h-full border border-custom-softgrey">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/social/sign-up" element={<SocialSignup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
