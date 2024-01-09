import TaskInterface from "../interfaces/TaskInterface";

export default class TaskFetcher {
  static url: string = 'http://localhost:5500/tasks';

  static loadTasks(): Promise<TaskInterface[]> {
    return fetch(this.url)
      .then((r: Response): Promise<TaskInterface[]> => {
        if (r.status === 200) return r.json();
        else throw new Error("Server didn't response excpectedly. Error: " + r.status)
      })
      .then((tasks: TaskInterface[]) => {
        return tasks;
      })
  }

  /**
   * Permet de modifier une tâche
   * @param {number} taskId 
   * @param {object} propertyToPatch 
   */
  static patchTask(taskId: number, propertyToPatch: Partial<TaskInterface>): Promise<void> {
    return fetch(`${this.url}/${taskId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(propertyToPatch)
      })
      .then((r: Response): void => {
        if (r.status === 200) console.log("Patched task with response ", r)
        else throw new Error(`Invalid HTTP request response: ${r.status}`);
      })
  }



  /**
   * Permet de ajouter une tâche
   * @param {object} task 
   */
  static postTask(task: Omit<TaskInterface, "id">): Promise<void> {
    return fetch(`${this.url}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(task)
      })
      .then((r: Response): void => {
        if (r.status === 200 || r.status === 201) console.log("Posted task with response", r)
        else throw new Error(`Invalid HTTP request response: ${r.status}`);
      })
      .catch((e: Error): void => {
        console.error("Fucking error in TaskFetcher.postTask ", e);
        //throw new Error (e);
      })
  }

  static deleteTask(taskId: number): Promise<void> {
    return fetch(`${this.url}/${taskId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE",
      })
      .then((r: Response): void => {
        if (r.status === 200) console.log("Deleted task with response ", r)
        else throw new Error(`Invalid HTTP request response: ${r.status}`);
      })
      .catch((e: Error): void =>  {
        console.error(e);
        //throw new Error(err);
      })
  }
}