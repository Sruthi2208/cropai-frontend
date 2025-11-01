import React from "react";
import CropForm from "./CropForm";
import farmImage from "./assets/farm.webp"; 

function App() {
  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #d4f1f9, #ffffff)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "700px",
        background: "#fff",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        padding: "30px"
      }}>
        {/* Header Image */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img 
            src={farmImage} 
            alt="Farm Header" 
            style={{ width: "100%", borderRadius: "12px", maxHeight: "250px", objectFit: "cover" }}
          />
        </div>

        <h1 style={{ textAlign: "center", color: "#2e7d32" }}>🌱 AI Crop Recommendation System</h1>
        <p style={{ textAlign: "center", color: "#555" }}>
          Enter the soil and weather parameters to get the best crop recommendation!
        </p>
        <CropForm />
      </div>
    </div>
  );
}

export default App;
