import { useContext, useState } from "react";
import axios from "axios";
import{Context, server} from "../main"
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Register = () => {
  // Declare state variables and their setter functions
  const {isAthenticated,setIsAthenticated}=useContext(Context);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
        const{data}=await axios.post(`${server}/users/new`,{
      name,
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
      
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAthenticated(false);
      
    }
  
  
    // Add code to handle form submission
  };
  if(isAthenticated===true){
    return <Navigate to={"/"}/>
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className="inputarea">
        <div className="Write">
          <h1>Register</h1>
          <form className="form" onSubmit={submitHandler}>
          <input
              type="text"
              placeholder="Name" // Changed placeholder text
              value={name}
              onChange={handleNameChange}
              required
            />
            <input
              type="text"
              placeholder="Email" // Changed placeholder text
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              type="password" // Changed input type to password for the password field
              placeholder="Password" // Changed placeholder text
              value={password}
              onChange={handlePasswordChange}
              required
            />
            
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
