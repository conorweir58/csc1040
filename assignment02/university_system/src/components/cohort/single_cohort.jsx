import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function SingleCohort() {

    const { cohortcode } = useParams();

    const [cohort, setCohort] = useState({});
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log('Cohort Code:', cohortcode);
      fetch(`http://localhost:8000/api/cohort/${cohortcode}`)
          .then((res) => res.json())
          .then((data) => {
            setCohort(data)
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching Cohort:', error);
            setLoading(false);
        });
      
      fetch(`http://localhost:8000/api/student/?cohort=${cohortcode}`)
          .then((res) => res.json())
          .then((data) => {
            setStudents(data)
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching cohort:', error);
            setLoading(false);
          });

    }, [cohortcode]);

    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
      <div className="container">
        <h1 className="text-primary text-center fw-bold m-4">{cohort.id}</h1>
            
        <ul className="list-group list-group-flush">
            <li className="list-group-item"><h3><strong>Degree:</strong> {cohort.degree?.split("/").filter(Boolean).pop()}</h3></li>
            <li className="list-group-item"><h3><strong>Year:</strong> {cohort.year}</h3></li>
            <li className="list-group-item text-muted"><h3><strong>Description:</strong> {cohort.name}</h3></li>
        </ul>

        <div className="mb-4">
            <a href={`/cohort-module/${cohort.id}`} className="btn btn-primary mr-2 w-25 mt-3">View Cohort Modules</a>
        </div>

        <h2>Students of {cohort.id}</h2>
        <div className="row mt-3">
            {students.length === 0 && <h3 className="">No students registered to this cohort!</h3>}

            {students.map((students, index) => (
                <div className="col-lg-4 mb-3" key={index}>

                    <div className="container card">

                        <h4><strong>Name: </strong>{students.first_name} {students.last_name}</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Student ID: {students.student_id}</li>
                        </ul>

                        <div>
                            <a href={`/student/${students.student_id}`} className="btn btn-primary mr-2 w-100 mt-3">View Student</a>
                        </div>

                    </div>
                </div>
            ))}

        </div>
      </div>
    );
}

export default SingleCohort;