import React, { useEffect, useState } from "react";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // ✅ GET API - Fetch tasks
  const fetchTasks = () => {
    axios.get("http://localhost:8080/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ POST API - Add task
  const addTask = () => {
    if (!title) return alert("Enter task title");

    axios.post("http://localhost:8080/tasks", {
      title: title
    })
      .then(() => {
        alert("Task Added");
        setTitle("");
        fetchTasks(); // refresh list
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Tasks</h2>

      {/* Add Task */}
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <hr />

      {/* Display Tasks */}
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map(task => (
          <p key={task.id}>{task.title}</p>
        ))
      )}
    </div>
  );
};

export default Tasks;