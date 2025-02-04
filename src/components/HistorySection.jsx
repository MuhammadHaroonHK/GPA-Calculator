import React from "react";

const HistorySection = ({ history, clearHistory }) => {
  return (
    <div id="history" className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800">Calculation History</h2>
      {history.length > 0 ? (
        history.map((item, index) => (
          <div key={index} className="mb-2 p-2 border rounded">
            <p><strong>{item.type}:</strong> {item.value}</p>
            <p className="text-sm text-gray-600">{item.details}</p>
          </div>
        ))
      ) : (
        <p>No history available.</p>
      )}
      {history.length > 0 && (
        <div className="text-center">
          <button
            onClick={clearHistory}
            className="bg-red-500 text-white px-6 py-2 rounded mt-5 hover:bg-red-600 transition-all"
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
};

export default HistorySection;