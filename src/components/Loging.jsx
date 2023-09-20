import axios from 'axios';
import  {useContext, useState} from 'react';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';



const Loging = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const {isAthenticated,setIsAthenticated}=useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const[Loading,setLoading]=useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
    const submitHandler = async(e) => {
        await e.preventDefault();
        setLoading(true);
        try {
          const{data}=await axios.post(`${server}/users/login`,{
        email,
        password,
      },{headers:{
        "Content-Type": "application/json",
      },
      withCredentials:true
    }
    );
    toast.success(data.message);
    setIsAthenticated(true);
    setLoading(false);
        
      } catch (error) {
        toast.error(error.response.data.message);
        setIsAthenticated(false);
        setLoading(false);
        
      }
        
      }
    const handleTitleChange = (e) => {
        setemail(e.target.value);
    }
    const handleDescriptionChange = (e) => {
    setPassword(e.target.value);
    }
    if(Loading===true){
      return <Navigate to={"/loader"}/>
    }
    if(isAthenticated===true){
      return <Navigate to={"/"}/>
    }
    
  return (
    <>
    <div className='inputarea'>
    <div className="Write">
      <h1>Login</h1>
      <form className="form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder='email'
          value={email}
          onChange={handleTitleChange}
          required // Add this onChange handler
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          value={password}
          onChange={handleDescriptionChange}
          required // Add this onChange handler
        />
        {/* Corrected typo */}
        <button disabled={Loading} type='submit'>Login</button>
        <button
  type="button"
  onClick={togglePasswordVisibility}
  style={{
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    position: 'absolute',
    top: '60%',
    right: '-18%',
    zIndex:'1',
    transform: 'translateY(-50%)',
  }}
>
  {showPassword ? 'Hide' : 'Show'}
</button>

      </form>   
    </div>
    </div>
    </>
   
  )
}

export default Loging