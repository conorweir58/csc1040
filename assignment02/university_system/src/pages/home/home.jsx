function Home() {
  return (
    <div className="container p-4 card">
      <h1>Welcome to the Riften Univerisity Registration System!</h1>

    <div className="row mt-3 container card-body">
        <h4>Search the University</h4>
        <div className="col-md-6 mb-3">
            <a href="/degree" className="btn btn-primary btn-lg w-100">View Degrees</a>
        </div>
        <div className="col-md-6">
            <a href="/cohort" className="btn btn-primary btn-lg w-100">View Cohorts</a>
        </div>
        <div className="col-md-6">
            <a href="/module" className="btn btn-primary btn-lg w-100">View Modules</a>
        </div>
    </div>

    <div className="row mt-3 container card-body">
        <h4>Update University Information</h4>
        <div className="col-md-6 mb-3">
            <a href="/newdegree" className="btn btn-primary btn-lg w-100">Create Degree</a>
        </div>
        <div className="col-md-6">
            <a href="/newcohort" className="btn btn-primary btn-lg w-100">Create Cohort</a>
        </div>
        <div className="col-md-6">
            <a href="/newmodule" className="btn btn-primary btn-lg w-100">Create Modules</a>
        </div>
        <div className="col-md-6">
            <a href="/registration" className="btn btn-primary btn-lg w-100">Register Student</a>
        </div>
    </div>

    </div>
  );
}

export default Home;