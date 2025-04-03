import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/home/home';
import Header from './pages/base/header';
import Footer from './pages/base/footer';

import AllDegrees from './components/degree/all_degrees';
import SingleDegree from "./components/degree/single_degree";
import NewDegree from "./components/degree/new_degree";

import AllCohorts from "./components/cohort/all_cohorts";
import SingleCohort from "./components/cohort/single_cohort";
import NewCohort from "./components/cohort/new_cohort";

import AllModules from "./components/module/all_modules";
import SingleModule from "./components/module/single_module";
import CohortModule from "./components/module/cohort_modules";
import NewModule from "./components/module/new_module"

import ModuleStudents from "./components/student/module_students";
import SingleStudent from "./components/student/single_student";
import NewStudent from "./components/student/new_student";

import NewGrades from "./components/grades/new_grades";
import UpdateGrades from "./components/grades/update_grades";

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
          <Header />

          <div className="flex-grow-1">
            
              <Routes>
                <Route path="/" element={<Home/>} />
                  <Route index element={<Home/>} />
                  <Route path="degree" element={<AllDegrees/>} />
                  <Route path="degree/:shortcode" element={<SingleDegree/>} />
                  <Route path="newdegree" element={<NewDegree/>} />

                  <Route path="cohort" element={<AllCohorts/>} />
                  <Route path="cohort/:cohortcode" element={<SingleCohort/>} />
                  <Route path="newcohort" element={<NewCohort/>} />

                  <Route path="module" element={<AllModules/>} />
                  <Route path="module/:modulecode" element={<SingleModule/>} />
                  <Route path="cohort-module/:cohortcode" element={<CohortModule/>} />
                  <Route path="newmodule" element={<NewModule/>} />

                  <Route path="module-students/:modulecode" element={<ModuleStudents/>}></Route>
                  <Route path="student/:studentcode" element={<SingleStudent/>}></Route>
                  <Route path="registration" element={<NewStudent/>}></Route>

                  <Route path="student/:studentcode/set-grade/" element={<NewGrades/>}></Route>
                  <Route path="student/:studentcode/set-grade/:gradecode" element={<UpdateGrades/>}></Route>

              </Routes>

          </div>

          <Footer />
      </div>
    </Router>
      
  );
}

export default App;
