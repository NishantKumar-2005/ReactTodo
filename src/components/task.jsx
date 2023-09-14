const Task=({titel,Discribtion,id,isCompeleted,UpdateHandler,DeleteHandler})=>{
    return(
      <div className='Task'>
        <h1>Task</h1>
        <p>{titel}</p>
        <span>{Discribtion}</span>
        <input type="checkbox" onChange={()=>UpdateHandler(id)} value={isCompeleted} />
        <button type='submit' onClick={()=>DeleteHandler(id)}>REMOVE</button>
      </div>
      );
  }

export default Task