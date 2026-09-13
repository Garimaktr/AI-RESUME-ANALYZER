// import React from 'react'
// import "../style/home.scss"

// const Home = () => {
//     return (
//         <main className="home">
//           <div className="interview-input-group">
//             <div className="left">
//               <label htmlFor='jobdescription'>Job Desctiption</label>
//                 <textarea name="jobdescription" id="jobdescription" placeholder="Enter job description heree"></textarea>
//             </div><div className="right">
//                        <div className="input-group">
//                         <p>Resume <small className="highlight">[Use Resume and Self Description together for best result]</small></p>
//                          <label className='button file-label' htmlFor="resume">Upload Resume</label>
//                          <input hidden type="file" id="resume" name="resume" accept=".pdf"/>
//                        </div>
//                        <div className="input-group">
//                          <label htmlFor="selfDescription">Self Description</label>
//                          <textarea id="selfDescription" name="selfDescription" placeholder="Describe yourself in a few sentence"></textarea>
//                        </div>
//                        <button className="button primary-button">Generate Interview Report</button>
//                 </div>

//           </div>
        
//         </main>
//     )
// }

// export default Home


import React,{useState, useRef, useEffect} from 'react'
import '../style/home.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {
  const {loading, generateReport, getReports, reports} = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [resumeFile, setResumeFile] = useState(null)
  const resumeInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    getReports()
  }, [])

  const handleGenerateReport = async () => {
    const selectedFile = resumeInputRef.current?.files?.[0]

    if (!jobDescription.trim()) {
      alert("Please paste a job description first.")
      return
    }

    if (!selectedFile && !selfDescription.trim()) {
      alert("Please upload a resume or add a self description.")
      return
    }

    const result = await generateReport(jobDescription, selfDescription, selectedFile)

    if (result?._id) {
      navigate(`/interview/${result._id}`)
    } else {
      alert("Could not generate the interview report. Please try again.")
    }
  }

  if(loading) {
    return (
      <div className="loading-screen">
        <h1>Generating Interview Report...</h1>
      </div>
    )
  }

  return (
    <main className="home">
      <section className="interview-plan">
        <header className="title-block">
          <h1>
            Create Your Custom <span>Interview Plan</span>
          </h1>
          <p>
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </header>

        <div className="interview-form">
          <div className="panel panel-left">
            <div className="panel-header">
              <span className="panel-icon">✦</span>
              <label htmlFor="jobDescription">Target Job Description</label>
              <span className="required-pill">Required</span>
            </div>

            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              id="jobDescription"
              name="jobDescription"
              placeholder="Paste the full job description here..."
            />

            <div className="char-counter">0 / 5000 chars</div>
          </div>

          <div className="panel panel-right">
            <div className="profile-header">
              <div className="profile-title">
                <span className="panel-icon">◌</span>
                <span>Your Profile</span>
              </div>

              <span className="best-results">BEST RESULTS</span>
            </div>

            <div className="upload-box">
              <label htmlFor="resume" className="upload-dropzone">
                <span className="upload-icon">⇪</span>
                <span className="upload-text">Click to upload or drag &amp; drop</span>
                <small>PDF, DOCX, or TXT (Max 5MB)</small>
              </label>
              <input ref={resumeInputRef} type="file" id="resume" name="resume" accept=".pdf,.doc,.docx,.txt" hidden />
            </div>

            <div className="self-description">
              <div className="mini-label">Quick Self-Description</div>
              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                id="selfDescription"
                name="selfDescription"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />
            </div>

            <div className="ai-note">
              <span className="checkmark">✓</span>
              <p>
                Either a resume or a self description is required to generate a
                personalized plan.
              </p>
            </div>
          </div>
        </div>

        {/* Recent report list */}
        <div className="recent-reports">
          <div className="recent-reports-header">
            <h3>Recent Reports</h3>
            <span className="report-count">{reports?.length || 0}</span>
          </div>

          {(!reports || reports.length === 0) ? (
            <p className="no-reports">No reports generated yet.</p>
          ) : (
            <ul className="report-list">
              {reports.map((report) => (
                <li
                  key={report._id}
                  className="report-item"
                  onClick={() => navigate(`/interview/${report._id}`)}
                  title={`Open ${report.title}`}
                >
                  <div className="report-main">
                    <span className="report-badge">Report</span>
                    <span className="report-title">{report.title}</span>
                  </div>
                  <span className="report-date">
                    {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "Recently"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="action-row">
          <p>AI-Powered Strategy Generation • Approx 30s</p>
          <button  
             onClick={handleGenerateReport}
             type="button" className="primary-button">
            ★ Generate My Interview Strategy
          </button>
        </footer>
      </section>
    </main>
  )
}

export default Home