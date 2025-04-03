import { useState, useEffect } from "react";

function AllCohorts() {
    const [cohorts, setCohorts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:8000/api/cohort`)
            .then((res) => res.json())
            .then((data) => {
                setCohorts(data)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching cohorts:', error);
                setLoading(false);
            });
            
    }, []);

    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
        <div className="container">
          <h1 className="text-primary text-center fw-bold m-4">All Cohorts</h1>
          <div className="row">

            {cohorts.map((cohort, index) => (
              <div className="col-lg-4 mb-3" key={index}>
                
                <div className="container card">
                  
                  <div className="card-body">
                    <h4 className="card-title">{cohort.id}</h4>

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><strong>Degree:</strong> {cohort.degree?.split("/").filter(Boolean).pop()}</li>
                      <li className="list-group-item"><strong>Year:</strong> {cohort.year}</li>
                      <li className="list-group-item text-muted"><strong>Description:</strong> {cohort.name}</li>
                  </ul>
                    
                    <div>
                      <a href={`/cohort/${cohort.id}`} className="btn btn-primary mr-2 w-100 mt-3">View Cohort</a>
                    </div>
                  
                  </div>
                
                </div>

              </div>
            ))}

          </div>
        </div>
      );
}

export default AllCohorts;