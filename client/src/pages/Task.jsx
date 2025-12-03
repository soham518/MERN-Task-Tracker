import { useEffect, useState } from "react";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:1000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setTasks(data.tasks || []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!taskName || !description) return alert("All fields required");

    await fetch("http://localhost:1000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskName, description }),
    });

    setTaskName("");
    setDescription("");
    fetchTasks();
  };

  // Toggle Completion
  const toggleComplete = async (id, current) => {
    await fetch(`http://localhost:1000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isCompleted: !current }),
    });

    fetchTasks();
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:1000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Your Task Tracker</h1>

      <div className="add-section">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task" key={task._id}>
            <div>
              <h3 className={task.isCompleted ? "completed" : ""}>
                {task.taskName}
              </h3>
              <p>{task.description}</p>
            </div>

            <div className="actions">
              <button
                className="complete-btn"
                onClick={() => toggleComplete(task._id, task.isCompleted)}
              >
                {task.isCompleted ? "Undo" : "Complete"}
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;