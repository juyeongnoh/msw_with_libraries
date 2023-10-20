import { useEffect, useState } from "react";
import "./App.css";
import { getData, postData } from "./apis/data";
import { useMutation, useQuery } from "react-query";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const { isLoading, data } = useQuery("todos", getData, {
    onSuccess: (data) => {
      setTodos(data.data);
    },
  });

  const mutation = useMutation(postData, {
    onSuccess: (data) => {
      setTodos((prev) => [...prev, data.config.data]);
    },
  });

  useEffect(() => {
    if (data) {
      setTodos(data.data);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ todo });
  };

  return (
    <div>
      <h2>할일 목록</h2>

      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>{todo}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="새로운 할일"
          disabled={isLoading}
          value={todo}
          onChange={({ target: { value } }) => setTodo(value)}
        />
        <button type="submit" disabled={!todo}>
          추가
        </button>
      </form>
    </div>
  );
}

export default App;
