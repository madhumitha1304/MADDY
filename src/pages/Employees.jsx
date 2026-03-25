import React, { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");

  // ✅ GET API - Fetch employees
  const fetchEmployees = () => {
    axios.get("http://localhost:8080/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ✅ POST API - Add employee
  const addEmployee = () => {
    if (!name) return alert("Enter employee name");

    axios.post("http://localhost:8080/employees", {
      name: name
    })
    .then(() => {
      alert("Employee Added");
      setName("");
      fetchEmployees(); // refresh list
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Employees</h2>

      {/* Add Employee */}
      <input
        type="text"
        placeholder="Enter employee name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addEmployee}>Add</button>

      <hr />

      {/* Display Employees */}
      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        employees.map(emp => (
          <p key={emp.id}>{emp.name}</p>
        ))
      )}
    </div>
  );
};

export default Employees;