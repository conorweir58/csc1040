import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewModule() {

    // All cohorts for checkbox
    const [all_cohorts, setAllCohorts] = useState([]);

    // Form data for new Module
    const [code, setCode] = useState('');
    const [full_name, setFullName] = useState('');
    const [delivered_to, setDeliveredTo] = useState([]);
    const [ca_split, setCaSplit] = useState('');
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(true);

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
            code: code.toUpperCase(),
            full_name: full_name,
            delivered_to: delivered_to.map(cohort => `http://localhost:8000/api/cohort/${cohort}`),
            ca_split: parseInt(ca_split),
        });
        

        const response = await fetch("http://localhost:8000/api/module/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify({ code: code.toUpperCase(), full_name, delivered_to: delivered_to.map(cohort => `http://127.0.0.1:8000/api/cohort/${cohort}/`), ca_split: parseInt(ca_split)}),

        });
        if (response.ok) {
            setCode('');
            setFullName('');
            setDeliveredTo([]);
            setCaSplit('');
            console.log("Cohort created successfully");
            navigate("/module");
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
            <h2 className="text-primary text-center fw-bold mt-4">Create A New Module</h2>

            <div className="col-md-6 mb-3">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-3">
                        <label htmlFor="code" className="text-secondary text-center fw-semibold mb-2">Module Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="code"
                            value={code}
                            placeholder="e.g. CA116"
                            maxLength={5}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="full_name" className="text-secondary text-center fw-semibold mb-2">Full Module Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="full_name"
                            value={full_name}
                            placeholder="e.g. Computer Programming I"
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3"> 
                        <label htmlFor="delivered_to" className="text-secondary text-center fw-semibold mb-2">Cohort of Module</label>
                        {all_cohorts.map((cohort, index) => (
                            <div key={index} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`${cohort.id}`}
                                    value={cohort.id}
                                    checked={delivered_to.includes(cohort.id)}
                                    onChange={(e) => {
                                        const selected = e.target.checked;
                                        setDeliveredTo((prev) =>
                                            selected ? [...prev, cohort.id] : prev.filter((id) => id !== cohort.id)
                                        );
                                    }}
                                />
                                <label className="form-check-label" htmlFor={`${cohort.id}`}>
                                    {cohort.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="ca_split" className="text-secondary text-center fw-semibold mb-2">CA Split</label>
                        <input
                            type="number"
                            className="form-control"
                            id="ca_split"
                            value={ca_split}
                            min="0"
                            max="100"
                            placeholder="e.g. 60"
                            onChange={(e) => setCaSplit(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2 w-25 mt-3">
                        Create Module
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

export default NewModule;