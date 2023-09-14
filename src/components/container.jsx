import  { useContext, useEffect, useState } from 'react';
import Task from './task';
import {  Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';


const Container = () => {
  const [titel, setTitle] = useState("");
  const [Discribtion, setdescription] = useState("");
  const [task,settask]=useState([]);
  const [loading,setLoading]=useState(false);
  const[refesh,setRefesh]=useState(false);
  const {isAthenticated}=useContext(Context);

  const UpdateHandler=async(id)=>{
    try {
      const {data}=await axios.put(`${server}/task/${id}`,{
  },{
  withCredentials:true
}
);
toast.success(data.message);
setRefesh(true);

    
  } catch (error) {
    toast.error(error.response.data.message);    
    }
    
  }
  const DeleteHandler=async(id)=>{
    try {
      const {data}=await axios.delete(`${server}/task/${id}`,{
  withCredentials:true
}
);
  toast.success(data.message);
  setRefesh(true);

    
  } catch (error) {
    toast.error(error.response.data.message); 
    }
  }

  const submitHandler = async(e) => {

    e.preventDefault();
    setLoading(true)
    try {
      const{data}=await axios.post(`${server}/task/taskadd`,{
        titel,
        Discribtion,
  },{headers:{
    "Content-Type": "application/json",
  },
  withCredentials:true
}
);
toast.success(data.message);
setTitle("");
setdescription("");
// settask([...task,{titel,Discribtion}])
setRefesh(true)
setLoading(false);
    
  } catch (error) {
    toast.error(error.response.data.message);
    setTitle("");
    setLoading(false);
    
    }
    
    
    // You can access the 'title' state here and perform any necessary actions with it
  }
  // useEffect(() => {
  //   localStorage.setItem("task", JSON.stringify(task));
  // },[task]);
  useEffect(() => {
    axios.get(`${server}/task/my`,{
      withCredentials: true
    }).then((res) => {
      settask(res.data.task);
    }).catch(() => {
      settask([]);
    });
  }, [refesh]);

  

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleDescriptionChange = (e) => {
    setdescription(e.target.value);
  }

  if(!isAthenticated){
    return <Navigate to={"/loging"}/>
  }

  return (
    <>
    <div className="inputarea">
    <div className="Write">
      <h1>Write Tasks</h1>
      <form className="form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder='Title'
          value={titel}
          onChange={handleTitleChange}
          required // Add this onChange handler
        />
        <textarea placeholder='Description' onChange={handleDescriptionChange} required></textarea> {/* Corrected typo */}
        <button disabled={loading} type='submit'>ADD</button>
      </form>
  
      
    </div>
    
    {task.map((item)=>(
        <Task key={item._id} titel={item.titel} Discribtion={item.Discribtion} id={item._id} isCompeleted={item.isCompeleted} UpdateHandler={UpdateHandler} DeleteHandler={DeleteHandler}/>
      ))}
      </div>
    </>
  )
}

export default Container; // Note: Component names should start with an uppercase letter