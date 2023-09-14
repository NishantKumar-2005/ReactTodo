
import { useContext } from 'react'
import { Context } from '../main'

const Profile = () => {
    const {user} = useContext(Context);
    console.log(user);
  return (
    <div>
        <h1>{user?.name}</h1>
        <h1>{user?.email}</h1>
    </div>
  )
}

export default Profile