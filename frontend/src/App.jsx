import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://first-fullstack-57x3.onrender.com/api/students";

  // Get all students
  const getStudents = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      setStudents(data);

    } catch (error) {
      console.error(error);
      alert("Unable to load students");
    }
  };

  // Save student
  const saveStudent = async (e) => {

    e.preventDefault();

    if (name.trim() === "") {
      alert("Please enter name");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name: name
        })
      });

      if (!response.ok) {
        throw new Error("Failed to save student");
      }

      const savedStudent = await response.json();

      setStudents([...students, savedStudent]);

      setName("");

    } catch (error) {

      console.error(error);
      alert("Unable to save student");

    } finally {

      setLoading(false);

    }
  };

  // Run when page loads
  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="container">

      <div className="card">

        <h1>Student App</h1>

        <form onSubmit={saveStudent}>

          <input
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit" disabled={loading}>

            {loading ? "Saving..." : "Save"}

          </button>

        </form>

        <h2>Saved Students</h2>

        <div className="student-list">

          {students.length === 0 ? (

            <p>No students found.</p>

          ) : (

            students.map((student) => (

              <div className="student" key={student.id}>

                <span>{student.id}</span>

                <span>{student.name}</span>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default App;