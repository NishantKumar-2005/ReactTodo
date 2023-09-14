
import { useContext } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const {user} = useContext(Context);
    const {isAthenticated}=useContext(Context);

    if(!isAthenticated){
      return <Navigate to={"/loging"}/>
    }
  return (
    <div>
        <h1>{user?.name}</h1>
        <h1>{user?.email}</h1>
    </div>
  )
}

export default Profile