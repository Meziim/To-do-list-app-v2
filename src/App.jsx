import './App.scss';
import { useReducer, useState } from 'react';

const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE: 'toggle',
  DELETE: 'delete'
}

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TOGGLE:
      return todos.map(todo => {
        if (todo.id === action.id) {
          return {...todo, isComplete: !todo.isComplete}
        } else {return todo}
      });
    case ACTIONS.DELETE:
      return todos.filter(todo => todo.id !== action.id)
    default:
      break
  }
}
function error(prop) {
  return (
    <div className='error'>
      <p>{prop}</p>
    </div>
  )
}

function TodoItem({ todo, dispatch }) {
  return (
    <div className={todo.isComplete ? 'item complete' : 'item'}>
      <p>{todo.name}</p>
      <div className='buttons'>
        <button onClick={() => dispatch({ type: ACTIONS.TOGGLE, id: todo.id})}>{todo.isComplete ? <i className="fas fa-reply"></i> : <i className="fas fa-check"></i>}</button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE, id: todo.id})}><i className="far fa-trash-alt"></i></button>
      </div>
    </div>
  )
}

function newTodo(Name) {
  return { id: Date.now(), name: Name, isComplete: false};
}
function App() {
  const [todos, dispatch] = useReducer(reducer, []);


  function Form() {
    const [Name, setName] = useState('');
    const [isEmpty, setEmpty] = useState(false);
    

    function handleSubmit(e) {
      if (Name.length === 0) {
        setEmpty(true)
        e.preventDefault()
        return
      } else {
        setEmpty(false)
        e.preventDefault();
        dispatch({ type: ACTIONS.ADD_TODO, payload: { name: Name} });
        setName('');
      }
    }

    return (
      <>
        {isEmpty ? error('Input field is empty') : <></>}
        <form onSubmit={handleSubmit}>
          <input autoFocus placeholder='Type your todo name here...' type="text" onChange={(e) => setName(e.target.value)} value={Name}/>
          <button onClick={handleSubmit}><i className="fas fa-plus"></i></button>
        </form>
      </>
    )
  }



  return (
    <div className="App">
      <div className="main">
        <Form />
        <div className='list'>
          {todos.map(todo => {
            return <TodoItem key={todo.id} todo={todo} dispatch={dispatch}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
