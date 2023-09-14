import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const  server="https://todoapp-a2m8.onrender.com";
export const Context=createContext({isAthenticated:false});

const AppWrapper=()=>{
  const [isAthenticated,setIsAthenticated]=useState(false);
  const [user,setUser]=useState({});
  
  return(
    <Context.Provider value={{isAthenticated,setIsAthenticated,user,setUser}}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
