import React from "react";

function Result({ result }) {
  if (!result) return null;

  return (
    <div style={{
      marginTop: "25px",
      padding: "20px",
      borderRadius: "12px",
      backgroundColor: "#e8f5e9",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ color: "#2e7d32" }}>✅ Recommended Crop: {result.crop}</h2>
      <p><strong>Reason:</strong> {result.reason}</p>
      <p><strong>Fertilizer Suggestions:</strong></p>
      <ul>
        {result.fertilizers.map((fert, idx) => <li key={idx}>🌱 {fert}</li>)}
      </ul>
      <p><strong>Full Output:</strong></p>
      <pre style={{ whiteSpace: "pre-line", backgroundColor: "#c8e6c9", padding: "10px", borderRadius: "8px" }}>
        {result.output_text}
      </pre>
    </div>
  );
}

export default Result;

