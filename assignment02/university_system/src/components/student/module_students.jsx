import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';



function ModuleStudents() {

    const { modulecode } = useParams();

    const [module, setModule] = useState({});
    const [cohorts, setCohorts] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      setLoading(true);
      fetch(`http://localhost:8000/api/module/${modulecode}`)
          .then((res) => res.json())
          .then((data) => {
            setModule(data)
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching Module:', error);
            setLoading(false);
        });
        
        
    }, [modulecode]);

    useEffect(() => {
        setLoading(true);

        if (module.delivered_to) {
            setCohorts(module.delivered_to.map(path => path.split("/").filter(Boolean).pop())); // Split all cohorts down to just their code
        }
        setLoading(false);
      }, [module.delivered_to]);


    useEffect(() => {
        if (cohorts.length === 0) return; // Avoids unnecessary fetches

        setLoading(true);

        for (const cohort of cohorts) { // loop through all cohort codes
            fetch(`http://localhost:8000/api/student/?cohort=${cohort}`) // fetch all students by cohort
            .then((res) => res.json())
            .then((data) => {
                setStudents(prevStudents => [...prevStudents, ...data]); // set students as all previously added students with newly fetched students
            })
        }
        setLoading(false);
    }, [cohorts]);


    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
      <div className="container">
        <h1 className="text-primary text-center fw-bold m-4">Students of {modulecode}</h1>
        <div className="container mb-4">
            <h3 className="text-secondary text-center fw-semibold">From:</h3>
            <ul className="list-group list-group-flush">
                {cohorts.map((cohort, index) => (
                    <li className="list-group-item text-secondary" key={index}>{cohort}</li>
                ))}
            </ul>
        </div>
            
        <div className="row mt-3">
            {students.length === 0 && <h3 className="">No students registered to {modulecode}!</h3>}

            {students.length >= 0 && students.map((student, index) => (
                <div className="col-lg-4 mb-3" key={index}>

                    <div className="container card">

                        <h4><strong>Name: </strong>{student.first_name} {student.last_name}</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Student ID: {student.student_id}</li>
                        </ul>

                        <div>
                            <a href={`/student/${student.student_id}`} className="btn btn-primary mr-2 w-100 mt-3">View Student</a>
                        </div>

                    </div>
                </div>
            ))}

        </div>
      </div>
    );
}

export default ModuleStudents;