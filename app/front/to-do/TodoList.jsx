// pages/index.js
import { useState } from 'react';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [text, setText] = useState('');

  const addTodo = (todo) => {
    const newTodos = [...todos, todo];
    setHistory([...history, todos]);
    setTodos(newTodos);
    setRedoStack([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const previousTodos = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setRedoStack([...redoStack, todos]);
    setTodos(previousTodos);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const nextTodos = redoStack[redoStack.length - 1];
    setRedoStack(redoStack.slice(0, -1));
    setHistory([...history, todos]);
    setTodos(nextTodos);
  };

  return (
    <>
      <input type="text" id="new-todo" onInput={(e) => setText(e)} />
      <button onClick={() => addTodo(document.getElementById('new-todo').value)}>Add Todo</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </>
  );
}
