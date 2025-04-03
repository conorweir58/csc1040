import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function SingleModule() {

    const { modulecode } = useParams();

    const [module, setModule] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      fetch(`http://localhost:8000/api/module/${modulecode}`)
          .then((res) => res.json())
          .then((data) => {
            setModule(data)
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching module:', error);
            setLoading(false);
        });
    }, [modulecode]);

    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
      <div className="container">
        <h1 className="text-primary text-center fw-bold mt-4">{module.code}</h1>
        <h2 className="text-secondary text-center fw-semibold mb-4">{module.full_name}</h2>

          <div className="container card">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><h4 className="card-title text-muted">Module Delivered to:</h4>
                  <ul className="list-group list-group-flush">
                    {module.delivered_to.length === 0 && <li className="list-group-item"><h5>No cohorts registered to this module!</h5></li>}
                    {module.delivered_to.map((module, index) => (
                      <li className="list-group-item" key={index}><h5>{module?.split("/").filter(Boolean).pop()}</h5></li>
                    ))}
                  </ul>
                </li>
                <li className="list-group-item"><h4 className="card-title text-muted">CA Split: </h4><h5>CA: {module.ca_split}%</h5><h5>Exam: {100 - module.ca_split}%</h5></li>
                <li className="list-group-item">
                  {module.delivered_to.length !== 0 &&
                    <div className="">
                      <a href={`/module-students/${module.code}`} className="btn btn-primary mr-2 w-100 mt-3">View Module Students</a>
                    </div>
                  }
                </li>
              </ul>
          </div>

        </div>
      </div>
    );
}

export default SingleModule;