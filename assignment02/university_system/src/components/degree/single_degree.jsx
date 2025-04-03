import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function SingleDegree() {

    const { shortcode } = useParams();

    const [degree, setDegree] = useState({});
    const [cohorts, setCohorts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      fetch(`http://localhost:8000/api/degree/${shortcode}`)
          .then((res) => res.json())
          .then((data) => {
            setDegree(data)
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching degree:', error);
            setLoading(false);
        });
      
      fetch(`http://localhost:8000/api/cohort/?degree=${shortcode}`)
          .then((res) => res.json())
          .then((data) => {
            setCohorts(data)
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching cohort:', error);
            setLoading(false);
          });

    }, [shortcode]);

    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
      <div className="container">
        <h1 className="text-primary text-center fw-bold mt-4">{degree.full_name}</h1>
        <h2 className="text-secondary text-center fw-semibold mb-4">Course Code: {shortcode}</h2>
        <div className="row">

          {cohorts.map((cohorts, index) => (
            <div className="col-lg-4 mb-3" key={index}>
              
              <div className="container card">
                
                <div className="card-body">
                  <h4 className="card-title">Cohort: {cohorts.id}</h4>
                  <h6 className="card-title">Cohort Description:</h6>
                  <p>{cohorts.name}</p>                    
                  <div className="">
                    <a href={`/cohort/${cohorts.id}`} className="btn btn-primary mr-2 w-100 mt-3">View Cohort</a>
                  </div>
                
                </div>
              
              </div>

            </div>
          ))}

        </div>
      </div>
    );
}

export default SingleDegree;