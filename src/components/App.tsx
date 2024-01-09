import { useEffect, useState } from 'react';
import './App.css';
import TaskInterface from '../interfaces/TaskInterface';
import Task from './Task';
import TaskFetcher from '../services/TaskFetcher';

function App() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  useEffect((): void => {
    TaskFetcher.loadTasks()
      .then((loadedTasks: TaskInterface[]): void => {
        setTasks(loadedTasks);
      })
      .catch((e: Error): void => {
        console.error(e);
      })
  })

  function validateTask(taskId: number): void {
    const copy: TaskInterface[] = [...tasks];
    const propertyToPatch: Partial<TaskInterface> = {};
    copy.forEach((task) => {
      if (taskId === task.id) {
        task.done = !task.done;
        propertyToPatch.done = task.done;
      }
    });
    console.log(propertyToPatch);
    setTasks(copy);
    if (propertyToPatch) {
      TaskFetcher.patchTask(taskId, propertyToPatch)
        .catch((e: Error): void => {
          console.error("Fucking error in TaskFetcher.patchTask ", e);
        });
    }
  }

  function deleteTask(task: TaskInterface): void {
    if (!window.confirm("supprimer la tâche ?")) return;
    const copy: TaskInterface[] = [...tasks];
    const index: number = tasks.indexOf(task);
    if (index > -1) {
      // retire l'élément d'index 1 sans modifier l'array tasks original
      copy.splice(index, 1);
      setTasks(copy);
    }
  }

  return (
    <main>
      <h1>Todo LIST</h1>
      {tasks.map((task: TaskInterface) => <Task
        key={task.id}
        task={task}
        validateHandle={() => { validateTask(task.id) }}
        supprHandle={() => { deleteTask(task) }}
      />)}
    </main>
  );
}

export default App;
