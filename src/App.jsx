import './App.css';
import Header from './components/header';
import Container from './components/container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loging from './components/Loging';
import Register from './components/Register';
import Profile from './components/Profile';
import { Toaster } from 'react-hot-toast';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { Context, server } from './main';
import Loader from './components/loader';

function App() {
  const { user,setUser} = useContext(Context);
  const {setIsAthenticated}=useContext(Context);

  useEffect(() => {
    axios.get(`${server}/users/usersid`, {
      withCredentials: true
    }).then((res) => {
      setUser(res.data.user);
      setIsAthenticated(true);
    }).catch(() => {
      setUser({});
      setIsAthenticated(false);
    });
  }, [setUser,user,setIsAthenticated]); // Include setUser and setIsAuthenticated in the dependency array
  

  return (
    <>
      <div className="body">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" className="inputarea" element={<Container />} />
            <Route path="/register" element={<Register/>} />
            <Route path='/loging' element={<Loging />} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/loader' element={<Loader/>}/>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
