import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import SGPACalculator from "./components/SGPACalculator";
import CGPACalculator from "./components/CGPACalculator";
import HistorySection from "./components/HistorySection";
import Footer from "./components/Footer";

const GPACalculator = () => {
  const [sgpaSubjects, setSgpaSubjects] = useState([{ grade: "", credit: "" }]);
  const [cgpaDetails, setCgpaDetails] = useState([{ sgpa: "", credits: "" }]);
  const [sgpaResult, setSgpaResult] = useState(null);
  const [cgpaResult, setCgpaResult] = useState(null);
  const [sgpaCalculation, setSgpaCalculation] = useState("");
  const [cgpaCalculation, setCgpaCalculation] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [showResetCgpa, setShowResetCgpa] = useState(false);
  const [sgpaError, setSgpaError] = useState("");
  const [cgpaError, setCgpaError] = useState("");
  const [history, setHistory] = useState([]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("gpaHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("gpaHistory", JSON.stringify(history));
  }, [history]);

  const handleSgpaChange = (index, field, value) => {
    const newSubjects = [...sgpaSubjects];
    newSubjects[index][field] = value;
    setSgpaSubjects(newSubjects);
  };

  const handleCgpaChange = (index, field, value) => {
    const newDetails = [...cgpaDetails];
    newDetails[index][field] = value;
    setCgpaDetails(newDetails);
  };

  const addSgpaSubject = () => {
    setSgpaSubjects([...sgpaSubjects, { grade: "", credit: "" }]);
  };

  const addCgpaDetail = () => {
    setCgpaDetails([...cgpaDetails, { sgpa: "", credits: "" }]);
  };

  const validateInputs = (type, data) => {
    if (type === "sgpa") {
      for (const subject of data) {
        if (subject.grade < 0 || subject.grade > 4 || isNaN(subject.grade)) {
          setSgpaError("Grades must be between 0 and 4.");
          return false;
        }
        if (subject.credit <= 0 || isNaN(subject.credit)) {
          setSgpaError("Credits must be positive numbers.");
          return false;
        }
      }
      setSgpaError("");
      return true;
    } else if (type === "cgpa") {
      for (const detail of data) {
        if (detail.sgpa < 0 || detail.sgpa > 4 || isNaN(detail.sgpa)) {
          setCgpaError("SGPA must be between 0 and 4.");
          return false;
        }
        if (detail.credits <= 0 || isNaN(detail.credits)) {
          setCgpaError("Credits must be positive numbers.");
          return false;
        }
      }
      setCgpaError("");
      return true;
    }
  };

  const calculateSGPA = () => {
    if (!validateInputs("sgpa", sgpaSubjects)) return;

    let totalPoints = 0,
      totalCredits = 0;
    let calculationDetails = "SGPA = (";

    sgpaSubjects.forEach(({ grade, credit }, index) => {
      const points = parseFloat(grade || 0) * parseFloat(credit || 0);
      totalPoints += points;
      totalCredits += parseFloat(credit || 0);
      calculationDetails += `${grade} × ${credit}`;
      if (index < sgpaSubjects.length - 1) calculationDetails += " + ";
    });

    calculationDetails += `) / ${totalCredits}`;
    const result = (totalPoints / totalCredits).toFixed(2);

    setSgpaResult(result);
    setSgpaCalculation(`Formula: SGPA = (Σ(Gi × Ci)) / Σ(Ci)\n${calculationDetails} = ${result}`);
    setShowReset(true);

    // Add to history
    setHistory([...history, { type: "SGPA", value: result, details: calculationDetails }]);
  };

  const calculateCGPA = () => {
    if (!validateInputs("cgpa", cgpaDetails)) return;

    let totalPoints = 0,
      totalCredits = 0;
    let calculationDetails = "CGPA = (";

    cgpaDetails.forEach(({ sgpa, credits }, index) => {
      const points = parseFloat(sgpa || 0) * parseFloat(credits || 0);
      totalPoints += points;
      totalCredits += parseFloat(credits || 0);
      calculationDetails += `${sgpa} × ${credits}`;
      if (index < cgpaDetails.length - 1) calculationDetails += " + ";
    });

    calculationDetails += `) / ${totalCredits}`;
    const result = (totalPoints / totalCredits).toFixed(2);

    setCgpaResult(result);
    setCgpaCalculation(`Formula: CGPA = (Σ(SGPAi × Ci)) / Σ(Ci)\n${calculationDetails} = ${result}`);
    setShowResetCgpa(true);

    // Add to history
    setHistory([...history, { type: "CGPA", value: result, details: calculationDetails }]);
  };

  const resetSgpa = () => {
    setSgpaSubjects([{ grade: "", credit: "" }]);
    setSgpaResult(null);
    setSgpaCalculation("");
    setShowReset(false);
  };

  const resetCgpa = () => {
    setCgpaDetails([{ sgpa: "", credits: "" }]);
    setCgpaResult(null);
    setCgpaCalculation("");
    setShowResetCgpa(false);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("gpaHistory");
  };

  const deleteSgpaSubject = (index) => {
    const newSubjects = [...sgpaSubjects];
    newSubjects.splice(index, 1); // Remove the subject at the specified index
    setSgpaSubjects(newSubjects);
  };
  
  const deleteCgpaDetail = (index) => {
    const newDetails = [...cgpaDetails];
    newDetails.splice(index, 1); // Remove the semester at the specified index
    setCgpaDetails(newDetails);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* SEO Optimization with Helmet */}
      <Helmet>
        <title>GPA Calculator - Calculate SGPA and CGPA Online</title>
        <meta
          name="description"
          content="Calculate your SGPA and CGPA easily with this online GPA calculator. Perfect for students to track their academic performance."
        />
        <meta
          name="keywords"
          content="GPA calculator, SGPA calculator, CGPA calculator, online GPA calculator, academic calculator"
        />
        <meta name="author" content="Muhammad Haroon" />
        <meta property="og:title" content="GPA Calculator - Calculate SGPA and CGPA Online" />
        <meta
          property="og:description"
          content="Calculate your SGPA and CGPA easily with this online GPA calculator. Perfect for students to track their academic performance."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:image" content="https://.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GPA Calculator - Calculate SGPA and CGPA Online" />
        <meta
          name="twitter:description"
          content="Calculate your SGPA and CGPA easily with this online GPA calculator. Perfect for students to track their academic performance."
        />
        <meta name="twitter:image" content="https://yourwebsite.com/og-image.jpg" />
      </Helmet>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="vsm:p-0 sm:p-8 md:p-8 xl:p-8">
        {/* SGPA Calculator */}
        <SGPACalculator
          sgpaSubjects={sgpaSubjects}
          handleSgpaChange={handleSgpaChange}
          addSgpaSubject={addSgpaSubject}
          calculateSGPA={calculateSGPA}
          sgpaError={sgpaError}
          sgpaResult={sgpaResult}
          sgpaCalculation={sgpaCalculation}
          showReset={showReset}
          resetSgpa={resetSgpa}
          deleteSgpaSubject={deleteSgpaSubject}
        />

        {/* CGPA Calculator */}
        <CGPACalculator
          cgpaDetails={cgpaDetails}
          handleCgpaChange={handleCgpaChange}
          addCgpaDetail={addCgpaDetail}
          calculateCGPA={calculateCGPA}
          cgpaError={cgpaError}
          cgpaResult={cgpaResult}
          cgpaCalculation={cgpaCalculation}
          showResetCgpa={showResetCgpa}
          resetCgpa={resetCgpa}
          deleteCgpaDetail={deleteCgpaDetail}
        />

        {/* History Section */}
        <HistorySection history={history} clearHistory={clearHistory} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GPACalculator;