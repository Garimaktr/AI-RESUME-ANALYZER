import React, { useEffect, useMemo, useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useParams } from "react-router";


const navItems = [
  { label: "Technical Questions", key: "technical" },
  { label: "Behavioral Questions", key: "behavioral" },
  { label: "Road Map", key: "roadmap" }
];

const Interview = () => {
  const { report, getReportById, getReports, loading } = useInterview();
  const { interviewId } = useParams();
  const [activeTab, setActiveTab] = useState("technical");
  const [expandedIndex, setExpandedIndex] = useState(0);

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
        getReports();
    }
  }, [interviewId]);

  const activeQuestions = useMemo(() => {
    if (!report) return [];
    if (activeTab === "technical") return report.technicalQuestions || [];
    if (activeTab === "behavioral") return report.behaviouralQuestions || [];
    return [];
  }, [activeTab, report]);

  if (!report && loading) {
    return (
      <main className="interview-page">
        <div className="loading-screen">
          <h1>Loading Interview Report...</h1>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="interview-page">
        <div className="loading-screen">
          <h1>No interview report found.</h1>
        </div>
      </main>
    );
  }

  const scoreStyle = {
    background: `conic-gradient(#4ade80 ${report.matchScore * 3.6}deg, rgba(255,255,255,0.08) 0deg)`
  };

  const renderMainContent = () => {
    if (activeTab === "roadmap") {
      return (
        <div className="roadmap-panel">
          <div className="roadmap-header">
            <h3>Preparation Road Map</h3>
            <span>5-day plan</span>
          </div>

          <div className="roadmap-list">
            {report.preparationPlan.map((plan) => (
              <div key={plan.day} className="roadmap-item">
                <div className="day-pill">Day {plan.day}</div>
                <div className="roadmap-content">
                  <h4>{plan.focus}</h4>
                  <ul>
                    {plan.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="question-list">
        {activeQuestions.map((item, index) => {
          const isOpen = expandedIndex === index;
          const labelPrefix = activeTab === "technical" ? "Q" : "B";

          return (
            <div
              key={`${activeTab}-${item.question}`}
              className={`question-item ${isOpen ? "expanded" : ""}`}
            >
              <button
                type="button"
                className="question-toggle"
                onClick={() => setExpandedIndex(isOpen ? -1 : index)}
              >
                <span className="question-index">
                  {labelPrefix}
                  {index + 1}
                </span>

                <span className="question-text">{item.question}</span>

                <span className="chevron">{isOpen ? "⌃" : "⌄"}</span>
              </button>

              {isOpen && (
                <div className="question-details">
                  <div className="detail-block">
                    <span className="block-label">Intention</span>
                    <p>{item.intention}</p>
                  </div>

                  <div className="detail-block">
                    <span className="block-label">
                      {activeTab === "technical" ? "Answer" : "Sample answer"}
                    </span>
                    <p>{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main className="interview-page">
      <div className="interview-shell">
        <aside className="interview-sidebar">
          <div className="section-label">Sections</div>

          <nav className="interview-nav" aria-label="Interview sections">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.key}
                className={`nav-item ${activeTab === item.key ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(item.key);
                  setExpandedIndex(0);
                }}
              >
                <span className="nav-icon">
                  {item.key === "technical" && "⟡"}
                  {item.key === "behavioral" && "◧"}
                  {item.key === "roadmap" && "↳"}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="interview-main">
          <div className="main-header">
            <h2>
              {activeTab === "technical" && "Technical Questions"}
              {activeTab === "behavioral" && "Behavioral Questions"}
              {activeTab === "roadmap" && "Road Map"}
            </h2>

            {activeTab !== "roadmap" && (
              <span className="count">
                {activeQuestions.length} {activeQuestions.length > 1 ? "questions" : "question"}
              </span>
            )}
          </div>

          <div className="main-content">{renderMainContent()}</div>
        </section>

        <aside className="interview-aside">
          <div className="match-card">
            <div className="match-score-ring" style={scoreStyle}>
              <div className="score-inner">
                <span>{report.matchScore}</span>
              </div>
            </div>

            <p className="match-text">Strong match for this role</p>
          </div>

          <div className="skill-gaps">
            <h3>Skill Gaps</h3>

            <div className="skill-tags">
              {report.skillGaps.map((item) => (
                <span
                  key={item.skill}
                  className={`skill-tag severity-${item.severity}`}
                >
                  {item.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Interview;