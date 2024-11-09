// components/TodoList.js
import { useState } from 'react';
import CommandInvoker from './commands/CommandInvoker';
import AddTaskCommand from './commands/AddTaskCommand';
import DeleteTaskCommand from './commands/DeleteTaskCommand';
import CompleteTaskCommand from './commands/CompleteTaskCommand';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const invoker = new CommandInvoker();

  const addTask = (task) => {
    const command = new AddTaskCommand({ add: addTaskDirect, remove: removeTaskDirect }, task);
    invoker.executeCommand(command);
    console.log('addTask', tasks);
  };

  const deleteTask = (taskId) => {
    const command = new DeleteTaskCommand({ remove: removeTaskDirect, add: addTaskDirect }, taskId);
    invoker.executeCommand(command);
  };

  const toggleTaskCompletion = (taskId) => {
    const command = new CompleteTaskCommand({ toggleComplete: toggleCompleteDirect }, taskId);
    invoker.executeCommand(command);
  };

  const undo = () => {
    invoker.undo();
    setTasks([...tasks]);
  };

  const redo = () => {
    invoker.redo();
    setTasks([...tasks]);
  };

  // Direct task manipulation methods
  const addTaskDirect = (task) => setTasks((prevTasks) => [...prevTasks, task]);
  const removeTaskDirect = (taskId) => setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  const toggleCompleteDirect = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <button onClick={() => addTask({ id: Date.now(), text: "New Task", completed: false })}>
        Add Task
      </button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button onClick={() => toggleTaskCompletion(task.id)}>Complete</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
