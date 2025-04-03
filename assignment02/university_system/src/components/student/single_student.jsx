import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function SingleStudent() {

    const { studentcode } = useParams();

    const [student, setStudent] = useState({});
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      fetch(`http://localhost:8000/api/student/${studentcode}`)
          .then((res) => res.json())
          .then((data) => {
            setStudent(data)
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching student:', error);
            setLoading(false);
        });

        fetch(`http://localhost:8000/api/grade/?student=${studentcode}`)
        .then((res) => res.json())
        .then((data) => {
          setGrades(data)
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching cohort:', error);
          setLoading(false);
        });
    }, [studentcode]);

    if (loading) return <h2 className="text-center mt-5">Loading...</h2>

    if (!loading) {
        
        return (
        <div className="container">
            <h1 className="text-primary text-center fw-bold mt-4">Student Information</h1>


            <div className="container card">
                <h3 className="text-center fw-bold mb-4">{student.first_name} {student.last_name}</h3>
                <h4 className="text-center mb-4"><strong>ID: </strong> {student.student_id}</h4>
                <h5 className="text-center mb-4"><strong>Email:</strong> {student.email}</h5>
                <h5 className="text-center"><strong>Cohort:</strong> {student.cohort?.split("/").filter(Boolean).pop()}</h5>
            </div>

            <h2 className="text-secondary text-center fw-bold mt-4 mb-2">Student Modules & Grades</h2>

            {/* If student is registered and has no grades set display this message and provide link to view their modules */}
            {grades.length === 0 &&
                <div className="container card">
                    <h4 className="text-center fw-bold m-2">Student has No grades!</h4>
                    <h5 className="text-secondary text-center fw-bold mb-4 mt-4">View Students Modules or Create Grades for Student</h5>
                    <div>
                        <a href={`/cohort-module/${student.cohort?.split("/").filter(Boolean).pop()}`} className="btn btn-primary">View Students Modules</a>
                    </div>

                </div>
            }
            
            {grades.length > 0 &&
                <div className="container card">
                    <table className="table table-striped table-hover table-bordered">
                        <thead className="table-primary">
                            <tr className="text-center">
                                <th>Module</th>
                                <th>Grade ID</th>
                                <th>CA Mark</th>
                                <th>Exam Mark</th>
                                <th>Total Grade</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {grades.map((grade, index) => (
                                <tr key={index} className="align-middle">
                                    <td>
                                        <a 
                                            href={`/module/${grade.module?.split("/").filter(Boolean).pop()}`} 
                                            className="btn btn-primary btn-sm">
                                            {grade.module?.split("/").filter(Boolean).pop()}
                                        </a>
                                    </td>
                                    <td className="text-center">{grade.id}</td>
                                    <td className="text-center">{grade.ca_mark}</td>
                                    <td className="text-center">{grade.exam_mark}</td>
                                    <td className="text-center">{grade.total_grade}</td>
                                    <td className="text-center">
                                        <a 
                                            href={`/student/${student.student_id}/set-grade/${grade.id}`} 
                                            className="btn btn-warning btn-sm">
                                            Update
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <a href={`/cohort-module/${student.cohort?.split("/").filter(Boolean).pop()}`} className="btn btn-primary mt-4">View All Student Modules</a>

                </div>
            }

            <h2 className="text-secondary text-center fw-bold mt-4 mb-2">Create New Student Grades</h2>

            <div className="container card mt-2 mb-2">
                <a href={`/student/${student.student_id}/set-grade/`} className="btn btn-primary mr-2 w-100 mt-3">Create New Grade</a>
            </div>


        </div>
        );
    }
}

export default SingleStudent;