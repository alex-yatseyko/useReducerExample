import { useState, useReducer } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Action = {
  type: string;
  payload: { name?: string; id?: number };
};

const ACTIONS: { [key: string]: string } = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

function App() {
  const newTodo = (name: string): Todo => {
    return { id: Date.now(), text: name, completed: false };
  };

  const reducer = (todos: Todo[], action: Action): Todo[] => {
    switch (action.type) {
      case ACTIONS.ADD_TODO:
        return [...todos, newTodo(action.payload.name || "")];
      case ACTIONS.TOGGLE_TODO:
        return todos.map((todo: Todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });
      case ACTIONS.DELETE_TODO:
        return todos.filter((todo: Todo) => todo.id !== action.payload.id);
      default:
        return todos;
    }
  };

  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name } });
    setName("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo: Todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
            }
          />
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "" }}
          >
            {todo.text}
          </span>
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
            }
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
