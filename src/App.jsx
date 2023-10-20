import { useEffect, useState } from "react";
import "./App.css";
import { getData, postData } from "./apis/data";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData().then((res) => {
      setTodos(res.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    postData(todo).then((res) => {
      console.log(res);
      setTodos((prev) => [...prev, res.config.data]);
      setLoading(false);
    });
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
          disabled={loading}
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
