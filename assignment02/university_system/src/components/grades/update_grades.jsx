import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateGrades() {
    const { studentcode, gradecode } = useParams();

    const [student, setStudent] = useState({});

    // Form data for Grade update
    const [module, setModule] = useState('');
    const [ca_mark, setCaMark] = useState(0);
    const [exam_mark, setExamMark] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Fetch existing grade details to pre-fill form
    useEffect(() => {
        fetch(`http://localhost:8000/api/grade/${gradecode}/`)
            .then((res) => res.json())
            .then((data) => {
                setModule(data.module?.split("/").filter(Boolean).pop() || '');
                setCaMark(data.ca_mark || 0);
                setExamMark(data.exam_mark || 0);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching grade:", error);
                setLoading(false);
            });
    }, [gradecode]);

    // Fetch student details
    useEffect(() => {
        fetch(`http://localhost:8000/api/student/${studentcode}`)
            .then((res) => res.json())
            .then((data) => setStudent(data))
            .catch((error) => console.error("Error fetching student:", error));
    }, [studentcode]);

    // Handle form submission with PATCH request
    async function handleSubmit(event) {
        event.preventDefault();

        const updatedGrade = {
            module: `http://127.0.0.1:8000/api/module/${module}/`,
            ca_mark: ca_mark,
            exam_mark: exam_mark,
            cohort: `http://127.0.0.1:8000/api/cohort/${student.cohort?.split("/").filter(Boolean).pop()}/`,
            student: `http://127.0.0.1:8000/api/student/${studentcode}/`,
        };

        console.log("New Grade Data:", updatedGrade)

        try {
            const response = await fetch(`http://localhost:8000/api/grade/${gradecode}/`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedGrade),
            });

            if (response.ok) {
                console.log("Grade updated successfully");
                navigate(`/student/${studentcode}`);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error("Error updating grade:", error);
            setError("An error occurred while updating the grade.");
        }
    }

    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
        <div className="container p-4 card d-flex justify-content-center align-items-center">
            <h2 className="text-primary text-center fw-bold mt-4">Update Grade</h2>

            <div className="col-md-6 mb-3">
                <form onSubmit={handleSubmit}>
                    {/* Module Selection dropdown */}
                    <div className="form-group mt-3">
                        <h4 className="text-secondary text-center mb-2"><strong>Module:</strong> {module}</h4>
                    </div>

                    {/* CA Mark Input */}
                    <div className="form-group mt-3">
                        <label htmlFor="ca_mark" className="text-secondary text-center fw-semibold mb-2">
                            CA Mark
                        </label>
                        <input
                            type="number"
                            min={0}
                            max={100}
                            className="form-control"
                            id="ca_mark"
                            value={ca_mark}
                            onChange={(e) => setCaMark(e.target.value)}
                            required
                        />
                    </div>

                    {/* Exam Mark Input */}
                    <div className="form-group mt-3">
                        <label htmlFor="exam_mark" className="text-secondary text-center fw-semibold mb-2">
                            Exam Mark
                        </label>
                        <input
                            type="number"
                            min={0}
                            max={100}
                            className="form-control"
                            id="exam_mark"
                            value={exam_mark}
                            onChange={(e) => setExamMark(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-25 mt-3">
                        Update Grade
                    </button>
                </form>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}

export default UpdateGrades;
