import { useState } from "react";
import "./styles.css";
import TaskForm from "./TaskForm";
import TasksHeader from "./TasksHeader";
import TasksList from "./TasksList";
import useLocalStorage from 'use-local-storage';
export default function App() {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light'); 

  const switchTheme = () =>{
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }


  const [tasks, setTasks] = useState([
    { id: 1, text: "Faire les courses", done: false },
    { id: 2, text: "Ménage !", done: true },
  ]);

  const addTask = (text) => {
    const newTask = {
      text,
      id: Date.now(),
      done: false,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  };

  const toggleTask = (id) => {
    const realTask = tasks.find((t) => t.id === id);
    const index = tasks.findIndex((t) => t.id === id);
    const taskCopy = { ...realTask };
    const tasksListCopy = [...tasks];

    taskCopy.done = !taskCopy.done;
    tasksListCopy[index] = taskCopy;
    setTasks(tasksListCopy);
  };

  return (
    <div className="container" data-theme ={theme} >
      <button onClick={switchTheme}>
      <i><strong>It's</strong></i><span/> {theme} <i><strong>Mode</strong></i>
      </button>
      <article>
        <TasksHeader tasks={tasks} />
        <TasksList
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
        <footer>
          <TaskForm addTask={addTask} />
        </footer>
      </article>
    </div>
  );
}
