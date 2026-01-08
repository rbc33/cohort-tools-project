import { useState, useEffect } from "react";
import axios from "axios";

import StudentCard from "../components/StudentCard";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [programQuery, setProgramQuery] = useState("");

  const handleChange = (event) => {
    setProgramQuery(event.target.value);
  }

  useEffect(() => {
    let queryString = "";
    if (programQuery) queryString = `program=${encodeURIComponent(programQuery)}`;

    axios
      .get(`${API_URL}/api/students${queryString ? `?${queryString}` : ""}`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log(error));
  }, [programQuery]);

  return (
    <div className="StudentListPage">
      <label htmlFor="program" className="flex items-center ml-5 my-2 w-fit">
          <span className="mr-2">Program:</span>
          <select
            name="program"
            id="program"
            value={programQuery}
            onChange={(e) => handleChange(e)}
            className="p-1 w-fit"
          >
            <option value="">All</option>
            <option value="Web Dev">Web Development</option>
            <option value="UX/UI">UX/UI</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </label>
      <div className="flex justify-between items-center p-2 font-bold border-b">
        <span className="flex items-center justify-center" style={{ flexBasis: "20%" }}>Image</span>
        <span style={{ flexBasis: "20%" }}>Name</span>
        <span style={{ flexBasis: "20%" }}>Program</span>
        <span style={{ flexBasis: "20%" }}>Email</span>
        <span style={{ flexBasis: "20%" }}>Phone</span>
      </div>

      {students && students.map((student, index) => (
          <StudentCard key={student._id} {...student} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"} />
      ))}
    </div>
  );
}

export default StudentListPage;
