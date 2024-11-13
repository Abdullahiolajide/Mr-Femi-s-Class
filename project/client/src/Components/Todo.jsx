import axios from 'axios';
import React, { useEffect, useState } from 'react'; 

const Todo = () => {
const [item, setItem] = useState('');
const [description, setDescription] = useState('')
const [todoArray, setTodoArray] = useState([])

const endpoint = 'http://localhost:3000/retrieve';

useEffect(()=>{
    gettingData()
 }, [])

 function gettingData(){
    axios.get(endpoint)
    .then((result)=>{
        const retrievedTodo = result.data
        console.log(retrievedTodo)
        setTodoArray(retrievedTodo)

        
    }).catch((err)=>{
        console.log(err)
    })
 }
 

function addTodo (){
    const url = "http://localhost:3000/save";
    let obj ={item, description}

    // gettingData()
    setTodoArray([...todoArray, {item, description}])
    axios.post(url, obj)
    .then((result)=>{
        console.log(result, "this result")
       
    })
    .catch((err)=>{
        console.log('Abdullahi' + err)
    })
    
}



 const del=(id)=>{
    // console.log(id)
    // todoArray.splice(1, id)
    // console.log(todoArray, "del")
    const url = "http://localhost:3000/del/" + id;
    axios.post(url)

        gettingData();
    
 }


  return (
    <div>
       <div className='form container col-6' >
        <input className='form-control my-2' placeholder='Todo' type="text" name='item' onChange={(e)=>{setItem(e.target.value)}}/>
        <textarea className='form-control my-2' placeholder='Description' name="description" id="" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
        <button onClick={addTodo} className='btn btn-outline-dark container'>Add</button>
       </div>

       <div className='container border'>
            <h1 className='text-center'>Your Todo List</h1>
            {todoArray.map((nTodo, i)=>(
                <div key={i}>
                    <details>
                    <summary>{nTodo.item} <button onClick={()=> del(nTodo._id)} className='btn btn-primary'>Delete</button></summary> 
                    <p><i>{nTodo.description}</i></p>
                    </details>
                    <hr />
                </div>
            ))}

            
       </div>
    </div>
  )
}

export default Todo


