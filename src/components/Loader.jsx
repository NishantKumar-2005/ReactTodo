import React, { useContext } from 'react'
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import videoSource from '/src/components/Fading line.gif';



const Loader = () => {
    const {isAthenticated}=useContext(Context);
    if(isAthenticated===true){
        return <Navigate to={"/"}/>
      }
  return (
    <div className='Loader'>
        <img src={videoSource} alt="Loading GIF" />
    </div>
  )
}

export default Loader