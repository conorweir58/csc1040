import { useState, useEffect } from "react";

function AllDegrees() {
    const [degrees, setDegrees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:8000/api/degree`)
            .then((res) => res.json())
            .then((data) => {
                setDegrees(data)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching degree:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
        <div className="container">
          <h1 className="text-primary text-center fw-bold m-4">All Degrees</h1>
          <div className="row">

            {degrees.map((degree, index) => (
              <div className="col-lg-4 mb-3" key={index}>
                
                <div className="container card">
                  
                  <div className="card-body">
                    <h4 className="card-title">{degree.full_name}</h4>
                    <h6 className="card-title">(Course Code: {degree.shortcode})</h6>
                    
                    <div className="">
                      <a href={`/degree/${degree.shortcode}`} className="btn btn-primary mr-2 w-100 mt-3">View Degree</a>
                    </div>
                  
                  </div>
                
                </div>

              </div>
            ))}

          </div>
        </div>
      );
}

export default AllDegrees;