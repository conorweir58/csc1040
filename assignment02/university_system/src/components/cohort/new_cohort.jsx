import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewCohort() {

    // All degrees for dropdown
    const [all_degrees, setAllDegrees] = useState([]);

    // Form data for new Cohort
    const [id, setId] = useState('');
    const [year, setYear] = useState('');
    const [degree, setDegree] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Get all degrees for dropdown
    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:8000/api/degree`)
            .then((res) => res.json())
            .then((data) => {
                setAllDegrees(data)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching degree:', error);
                setLoading(false);
            });
            
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        console.log({
            id: id.toUpperCase(),
            year: parseInt(year),
            degree: `http://localhost:8000/api/degree/${degree}`,
            name,
        });
        

        const response = await fetch("http://localhost:8000/api/cohort/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify({ id: id.toUpperCase(), year: parseInt(year), degree: `http://127.0.0.1:8000/api/degree/${degree}/`, name}),
        });
        if (response.ok) {
            setId('');
            setYear('');
            setDegree('');
            setName('');
            console.log("Cohort created successfully");
            navigate("/cohort");
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
            <h2 className="text-primary text-center fw-bold mt-4">Create A New Cohort</h2>

            <div className="col-md-6 mb-3">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-3">
                        <label htmlFor="id" className="text-secondary text-center fw-semibold mb-2">Cohort ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="id"
                            value={id}
                            placeholder="e.g. COMSCI1"
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="year" className="text-secondary text-center fw-semibold mb-2">Year of Cohort</label>
                        <input
                            type="number"
                            className="form-control"
                            id="year"
                            value={year}
                            min="1"
                            placeholder="e.g. 1"
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                    </div>
                    {/* Degree Selection drop down */}
                    <div className="form-group mt-3"> 
                        <label htmlFor="degree" className="text-secondary text-center fw-semibold mb-2">Degree of Cohort</label>
                        <select
                            className="form-control"
                            id="degree"
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            required
                        >
                            <option value="">Select Degree</option>
                            {all_degrees.map((degree, index) => (
                                <option key={index} value={degree.shortcode}>{degree.full_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="name" className="text-secondary text-center fw-semibold mb-2">Cohort Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            placeholder="e.g. 1st Year Computer Science"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2 w-25 mt-3">
                        Create Cohort
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

export default NewCohort;