import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewStudent() {

    // All cohorts for checkbox
    const [all_cohorts, setAllCohorts] = useState([]);

    // Form data for new Module
    const [student_id, setStudentId] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [cohort, setCohort] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // const [created, setCreated] = useState(false);

    const navigate = useNavigate();


    // Get all cohorts for checkbox
    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:8000/api/cohort`)
            .then((res) => res.json())
            .then((data) => {
                setAllCohorts(data)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching cohorts:', error);
                setLoading(false);
            });
            
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        console.log({
            student_id: student_id,
            first_name: first_name,
            last_name: last_name,
            cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
            email: email
        });
        

        const response = await fetch("http://localhost:8000/api/student/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify({student_id, first_name, last_name, cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`, email}),

        });
        if (response.ok) {
            setStudentId('');
            setFirstName('');
            setLastName('');
            setCohort('');
            setEmail('');
            console.log("Student created successfully");
            // setCreated(true);
            navigate(`/student/${student_id}`)
        }
        else {
            const errorData = await response.json();
            console.log(errorData.message);
            setError(errorData.message);
        }

        // setLoading(false);
    }

    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
        <div className="container p-4 card d-flex justify-content-center align-items-center"> 
            <h2 className="text-primary text-center fw-bold mt-4">Register New Student</h2>

            <div className="col-md-6 mb-3">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-3">
                        <label htmlFor="student_id" className="text-secondary text-center fw-semibold mb-2">Student ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="student_id"
                            value={student_id}
                            placeholder="e.g. 12345678"
                            minLength={8}
                            maxLength={8}
                            onChange={(e) => setStudentId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="first_name" className="text-secondary text-center fw-semibold mb-2">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            value={first_name}
                            placeholder="e.g. John"
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="last_name" className="text-secondary text-center fw-semibold mb-2">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            value={last_name}
                            placeholder="e.g. Doe"
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3"> 
                        <label htmlFor="cohort" className="text-secondary text-center fw-semibold mb-2">Select Students Cohort</label>
                        <select
                            className="form-control"
                            id="cohort"
                            value={cohort}
                            onChange={(e) => setCohort(e.target.value)}
                            required
                        >
                            <option value="">Select Cohort</option>
                            {all_cohorts.map((cohort, index) => (
                                <option key={index} value={cohort.id}>{cohort.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email" className="text-secondary text-center fw-semibold mb-2">Student Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={email}
                            placeholder="e.g. john.doe@dcu.ie"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2 w-25 mt-3">
                        Register Student
                    </button>
                </form>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {/* {created &&
                <div>
                    <h2>Student Successfully Created</h2>
                    <a href={`/`} className="btn btn-primary mr-2 w-100 mt-3">Return Home</a>
                    <a href={`/registration`} className="btn btn-primary mr-2 w-100 mt-3">Register Another Student</a>
                </div>
            } */}

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

export default NewStudent;