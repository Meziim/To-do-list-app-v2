import './App.css';
import { useReducer, useState, useRef } from 'react';

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

function TodoItem({ todo, dispatch }) {
  return (
    <div className='item'>
      <p style={{ color: todo.isComplete ? "gray" : "black"}}>{todo.name}</p>
      <button onClick={() => dispatch({ type: ACTIONS.TOGGLE, id: todo.id})}>Toggle</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE, id: todo.id})}>Delete</button>
    </div>
  )
}

function newTodo(Name) {
  return { id: Date.now(), name: Name, isComplete: false};
}
function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [Name, setName] = useState('');
  const isEmpty = useRef(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (Name.length === 0) {
      return 'Input field must not be empty'
    }
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: Name} });
    setName('');
  }
  return (
    <div className="App">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e) => setName(e.target.value)} value={Name}/>
          <button onClick={handleSubmit}>Submit</button>
        </form>
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
