import { useState, useEffect } from "react";

function AllModules() {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:8000/api/module`)
            .then((res) => res.json())
            .then((data) => {
                setModules(data)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching module:', error);
                setLoading(false);
            });
            
    }, []);

    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
        <div className="container">
          <h1 className="text-primary text-center fw-bold m-4">All Modules</h1>
          <div className="row">

            {modules.map((module, index) => (
              <div className="col-lg-4 mb-3" key={index}>
                
                <div className="container card">
                  
                  <div className="card-body">
                    <h4 className="card-title">{module.code}</h4>

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><strong>Module Name:</strong> {module.full_name}</li>
                      <li className="list-group-item"><strong>Delivered to:</strong>

                      {module.delivered_to.length === 0 && <li className="list-group-item">No cohorts registered to this module!</li>}
                        <ul className="list-group list-group-flush">
                        {module.delivered_to.map((cohort, index) => (
                            <li className="list-group-item" key={index}>{cohort?.split("/").filter(Boolean).pop()}</li>
                            ))}
                        </ul>
                      </li>
                      
                      <li className="list-group-item"><strong>CA Split:</strong> {module.ca_split}% CA</li>
                  </ul>
                    
                    <div>
                      <a href={`/module/${module.code}`} className="btn btn-primary mr-2 w-100 mt-3">View Module</a>
                    </div>
                  
                  </div>
                
                </div>

              </div>
            ))}

          </div>
        </div>
      );
}

export default AllModules;