import React from "react";
import { FaTrash } from "react-icons/fa"; // Import a trash icon from react-icons

const CGPACalculator = ({
  cgpaDetails,
  handleCgpaChange,
  addCgpaDetail,
  calculateCGPA,
  cgpaError,
  cgpaResult,
  cgpaCalculation,
  showResetCgpa,
  resetCgpa,
  deleteCgpaDetail, // Add this prop for deleting a semester
}) => {
  return (
    <div id="cgpa" className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800">CGPA Calculator</h2>
      {cgpaDetails.map((detail, index) => (
        <div key={index} className="flex gap-4 mb-2 items-center">
          <input
            type="number"
            placeholder="SGPA"
            value={detail.sgpa}
            onChange={(e) => handleCgpaChange(index, "sgpa", e.target.value)}
            className="p-2 border rounded w-1/2 hover:border-blue-500 transition-all"
          />
          <input
            type="number"
            placeholder="Credits"
            value={detail.credits}
            onChange={(e) => handleCgpaChange(index, "credits", e.target.value)}
            className="p-2 border rounded w-1/2 hover:border-blue-500 transition-all"
          />
          {/* Delete button */}
          <button
            onClick={() => deleteCgpaDetail(index)} // Call delete function with the index
            className="text-red-500 hover:text-red-700 transition-all"
          >
            <FaTrash className="text-lg" />
          </button>
        </div>
      ))}
      <button
        onClick={addCgpaDetail}
        className="vsm:w-[100%] sm:w-[140px] md:w-[140px] xl:w-[140px] bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition-all"
      >
        Add Semester
      </button>
      <button
        onClick={calculateCGPA}
        className="vsm:w-[100%] sm:w-[140px] md:w-[140px] xl:w-[140px]  bg-green-500 text-white px-4 py-2 rounded mt-2 vsm:ml-0 sm:ml-2 md:ml-2 xl:ml-2 hover:bg-green-600 transition-all"
      >
        Calculate CGPA
      </button>
      {cgpaError && <p className="text-red-500 mt-2">{cgpaError}</p>}
      {cgpaResult && (
        <div className="mt-4 text-lg">
          <p>CGPA: {cgpaResult}</p>
          <p className="text-sm text-gray-600 whitespace-pre-line">{cgpaCalculation}</p>
        </div>
      )}
      {showResetCgpa && (
        <div className="text-center">
          <button
            onClick={resetCgpa}
            className="bg-red-500 text-white px-6 py-2 rounded mt-5 hover:bg-red-600 transition-all"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default CGPACalculator;