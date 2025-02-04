import React from "react";
import { FaTrash } from "react-icons/fa"; // Import a trash icon from react-icons

const SGPACalculator = ({
  sgpaSubjects,
  handleSgpaChange,
  addSgpaSubject,
  calculateSGPA,
  sgpaError,
  sgpaResult,
  sgpaCalculation,
  showReset,
  resetSgpa,
  deleteSgpaSubject, // Add this prop for deleting a subject
}) => {
  return (
    <div id="sgpa" className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800">SGPA Calculator</h2>
      {sgpaSubjects.map((subject, index) => (
        <div key={index} className="flex gap-4 mb-2 items-center">
          <input
            type="number"
            placeholder="Subject GPA"
            value={subject.grade}
            onChange={(e) => handleSgpaChange(index, "grade", e.target.value)}
            className="p-2 border rounded w-1/2 hover:border-blue-500 transition-all"
          />
          <input
            type="number"
            placeholder="Credits"
            value={subject.credit}
            onChange={(e) => handleSgpaChange(index, "credit", e.target.value)}
            className="p-2 border rounded w-1/2 hover:border-blue-500 transition-all"
          />
          {/* Delete button */}
          <button
            onClick={() => deleteSgpaSubject(index)} // Call delete function with the index
            className="text-red-500 hover:text-red-700 transition-all"
          >
            <FaTrash className="text-lg" />
          </button>
        </div>
      ))}
      <button
        onClick={addSgpaSubject}
        className="vsm:w-[100%] sm:w-[130px] md:w-[130px] xl:w-[130px] bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition-all"
      >
        Add Subject
      </button>
      <button
        onClick={calculateSGPA}
        className="vsm:w-[100%] sm:w-[140px] md:w-[140px] xl:w-[140px] bg-green-500 text-white px-4 py-2 rounded mt-2 vsm:ml-0 sm:ml-2 md:ml-2 xl:ml-2 hover:bg-green-600 transition-all"
      >
        Calculate SGPA
      </button>
      {sgpaError && <p className="text-red-500 mt-2">{sgpaError}</p>}
      {sgpaResult && (
        <div className="mt-4 text-lg">
          <p>SGPA: {sgpaResult}</p>
          <p className="text-sm text-gray-600 whitespace-pre-line">{sgpaCalculation}</p>
        </div>
      )}
      {showReset && (
        <div className="text-center">
          <button
            onClick={resetSgpa}
            className="bg-red-500 text-white px-6 py-2 rounded mt-5 hover:bg-red-600 transition-all"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default SGPACalculator;