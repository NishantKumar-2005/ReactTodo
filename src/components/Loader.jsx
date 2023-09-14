import React, { useContext } from 'react'
import { Context } from '../main';
import { Navigate } from 'react-router-dom';

const Loader = () => {
    const {isAthenticated}=useContext(Context);
    if(isAthenticated===true){
        return <Navigate to={"/"}/>
      }
  return (
    <div className='Loader'>
        <h1>loader</h1>
    </div>
  )
}

export default Loader