import TaskInterface from "../interfaces/TaskInterface";

interface TaskProps {
  task: TaskInterface;
  validateHandle: () => void;
  supprHandle: () => void;
}

const Task: React.FunctionComponent<TaskProps> = ({ task, validateHandle, supprHandle }) => {
  return (
    <section>
      <h2 className={task.done ? "crossed" : ""}>{task.label}</h2>
      <div className="control-panel">
        <button onClick={validateHandle}>{task.done ? "Invalider" : "Valider"}</button>
        <button onClick={supprHandle}>Supprimer</button>
      </div>
    </section>
  );
}

export default Task;