import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NewGrades() {

    const {studentcode} = useParams();

    const [student, setStudent] = useState({});
    // All modules for dropdown
    const [student_modules, setStudentModules] = useState([]);

    // Form data for new Grade
    const [module, setModule] = useState('');
    const [ca_mark, setCaMark] = useState(0);
    const [exam_mark, setExamMark] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Get all student details
    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:8000/api/student/${studentcode}`)
            .then((res) => res.json())
            .then((data) => {
                setStudent(data)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching student:', error);
                setLoading(false);
            });
    }, [studentcode]);

    // // Get all student modules for dropdown
    useEffect(() => {
        if (!student.cohort) return; // Ensure student cohort is available before running
        setLoading(true);

        fetch(`http://localhost:8000/api/module/?delivered_to=${student.cohort?.split('/').filter(Boolean).pop()}`)
        .then((res) => res.json())
        .then((data) => {
            setStudentModules(data)
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching student modules:', error);
            setLoading(false);
        });
    }, [student.cohort]);

    async function handleSubmit(event) {
        event.preventDefault();

        console.log({
            module: `http://127.0.0.1:8000/api/module/${module}/`,
            ca_mark: ca_mark,
            exam_mark: exam_mark,
            cohort: `http://127.0.0.1:8000/api/cohort/${student.cohort?.split("/").filter(Boolean).pop()}/`,
            student: `http://127.0.0.1:8000/api/student/${studentcode}/`,
        });
        
        const response = await fetch("http://localhost:8000/api/grade/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify({
            module: `http://127.0.0.1:8000/api/module/${module}/`,
            ca_mark: ca_mark,
            exam_mark: exam_mark,
            cohort: `http://127.0.0.1:8000/api/cohort/${student.cohort?.split("/").filter(Boolean).pop()}/`,
            student: `http://127.0.0.1:8000/api/student/${studentcode}/`,
          }),

        });
        if (response.ok) {
            setModule('');
            setCaMark(0);
            setExamMark(0);
            console.log("Grade created successfully");
            navigate(`/student/${studentcode}`);
        }
        else {
            const errorData = await response.json();
            console.log(errorData.message);
            setError(errorData.message);
        }

        setLoading(false);
    }

    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
        <div className="container p-4 card d-flex justify-content-center align-items-center"> 
            <h2 className="text-primary text-center fw-bold mt-4">Create A New Grade</h2>

            <div className="col-md-6 mb-3">
                <form onSubmit={handleSubmit}>
                    {/* Module Selection drop down */}
                    <div className="form-group mt-3"> 
                        <label htmlFor="module" className="text-secondary text-center fw-semibold mb-2">Module For New Grade</label>
                        <select
                            className="form-control"
                            id="module"
                            value={module}
                            onChange={(e) => setModule(e.target.value)}
                            required
                        >
                            <option value="">Select Module</option>
                            {student_modules.map((module, index) => (
                                <option key={index} value={module.code}>{module.full_name} ({module.code})</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="ca_mark" className="text-secondary text-center fw-semibold mb-2">CA Mark</label>
                        <input
                            type="number"
                            min={0}
                            max={100}
                            className="form-control"
                            id="ca_mark"
                            value={ca_mark}
                            placeholder="e.g. 45"
                            onChange={(e) => setCaMark(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="exam_mark" className="text-secondary text-center fw-semibold mb-2">Exam Mark</label>
                        <input
                            type="number"
                            min={0}
                            max={100}
                            className="form-control"
                            id="exam_mark"
                            value={exam_mark}
                            placeholder="e.g. 60"
                            onChange={(e) => setExamMark(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2 w-25 mt-3">
                        Create Grade
                    </button>
                </form>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {/* {loading && (
                <div className="mt-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            )} */}
        </div>
    )
}

export default NewGrades;