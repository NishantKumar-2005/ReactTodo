import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'

const Header = () => {
  const { isAthenticated, setIsAthenticated } = useContext(Context)
  const [Loading, setLoading] = useState(false)
  const submitHandlerLogout = async () => {
    setLoading(true)
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true // Corrected syntax
      })
      toast.success("Nice Ho gya")
      setIsAthenticated(false)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAthenticated(true)
      setLoading(false)
    }
  }

  return (
    <div className='header'>
      <nav>
        <Link to="/">Home</Link>
        {isAthenticated ? (
          <button className='logout' disabled={Loading} onClick={submitHandlerLogout}>logout</button>
        ) : (
          <Link to="/loging">Login</Link>
        )}
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </div>
  )
}

export default Header
