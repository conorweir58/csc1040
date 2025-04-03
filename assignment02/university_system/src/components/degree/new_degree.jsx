import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewDegree() {

    const [fullname, setFullName] = useState("");
    const [shortcode, setShortcode] = useState("");
    const [error, setError] = useState("");
    // const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();


        const response = await fetch("http://localhost:8000/api/degree/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ full_name: fullname, shortcode: shortcode }),
        });
        if (response.ok) {
            setFullName('');
            setShortcode('');
            console.log("Degree created successfully");
            navigate("/degree");
        }
        else {
            const errorData = await response.json();
            console.log(errorData.message);
            setError(errorData.message);
        }

        // setLoading(false);
    }

    return (
        <div className="container p-4 card d-flex justify-content-center align-items-center"> 
            <h2 className="text-primary text-center fw-bold mt-4">Create A New Degree</h2>

            <div className="col-md-6 mb-3">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-3">
                        <label htmlFor="fullname" className="text-secondary text-center fw-semibold mb-2">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullname"
                            value={fullname}
                            placeholder="e.g. Computer Science"
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="shortcode" className="text-secondary text-center fw-semibold mb-2">ShortCode</label>
                        <input
                            type="text"
                            className="form-control"
                            id="shortcode"
                            value={shortcode}
                            maxLength={6}
                            placeholder="e.g. COMSCI"
                            onChange={(e) => setShortcode(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2 w-25 mt-3">
                        Create Degree
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

export default NewDegree;