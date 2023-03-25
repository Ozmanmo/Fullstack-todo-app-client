
import { useEffect, useState } from 'react';
import { getAllToDo } from './components/utils/HandleApi';
import ToDo from '/Users/OZMANMO/Desktop/todo-app/client/src/components/ToDo.js'
import{addToDo} from './components/utils/HandleApi.js';
import { updateToDo, deleteToDo} from '/Users/OZMANMO/Desktop/todo-app/client/src/components/utils/HandleApi.js';

function App() {
  const [toDo, setToDo] = useState([])
  const [text, setText] = useState([])
  const [isUpdating, setIsUpdating]= useState(false)
  const [toDoId, setToDoId]= useState('')


  const updateMode = (_id, text)=>{
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }
  const onChange = (e)=> setText(e.target.value)

  useEffect(()=>{
  getAllToDo(setToDo)
  },[])
  return (
    <div className = 'App'>

    <div className = 'container'>

     <h1>ToDo App</h1>

     <div className='top'>

      <input type='text' 
              placeholder='Add ToDos...'
              value={text}
              onChange={onChange}/>

      <div className = 'add' 
        onClick={ isUpdating?()=> updateToDo(toDoId,text,setText, setIsUpdating):()=> 
        addToDo(text, setText, setToDo)}>
        {isUpdating ? 'Update' : 'Add'}</div>
      </div>

      <div className="list">
        {toDo.map((item)=> <ToDo 
        key = {item._id} 
        text = {item.text}
        updateMode ={() => updateMode(item._id, item.text)}
        deleteToDo = {()=> deleteToDo(item._id, setToDo)}/>)}
        
      </div>
     </div>
    </div>
   
    
  )
}

export default App;
