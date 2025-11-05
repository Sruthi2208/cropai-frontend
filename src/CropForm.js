import React, { useState } from "react";
import axios from "axios";
import Result from "./Result";

function CropForm() {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
    language: "en",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // optional — for clean handling

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      N: parseFloat(formData.N),
      P: parseFloat(formData.P),
      K: parseFloat(formData.K),
      temperature: parseFloat(formData.temperature),
      humidity: parseFloat(formData.humidity),
      ph: parseFloat(formData.ph),
      rainfall: parseFloat(formData.rainfall),
    };

    try {
      setError(null); // clear previous errors

      const res = await axios.post(
        "https://cropai-backend-7.onrender.com/predict",
        payload
      );

      setResult(res.data);

      // ✅ Voice output (only if supported)
      if (res.data.output_text && "speechSynthesis" in window) {
        const msg = new SpeechSynthesisUtterance(res.data.output_text);
        msg.lang = formData.language;
        msg.pitch = 1;
        msg.rate = 1;
        window.speechSynthesis.speak(msg);
      }
    } catch (err) {
      console.error("Backend connection failed:", err);
      // Removed alert, just store error if needed
      setError("⚠️ Unable to connect to backend at the moment.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
        {["N", "P", "K", "temperature", "humidity", "ph", "rainfall"].map((key) => (
          <div key={key}>
            <input
              type="number"
              name={key}
              placeholder={key.toUpperCase()}
              value={formData[key]}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>
        ))}

        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "8px", fontSize: "16px" }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="te">Telugu</option>
          <option value="ta">Tamil</option>
          <option value="kn">Kannada</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#2e7d32",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1b5e20")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2e7d32")}
        >
          🌾 Predict Crop
        </button>
      </form>

      {/* ✅ Optional: Only show error if truly failed */}
      {error && !result && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {error}
        </p>
      )}

      {result && <Result result={result} />}

      {/* Contact Information Section */}
      <div
        style={{
          marginTop: "25px",
          padding: "15px",
          borderRadius: "10px",
          backgroundColor: "#f1f8e9",
          border: "1px solid #c5e1a5",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "#33691e", marginBottom: "10px" }}>
          📞 For Assistance
        </h3>
        <p style={{ fontSize: "16px", margin: "5px 0" }}>
          <strong>Helpline 1:</strong> +91 7815914779
        </p>
        <p style={{ fontSize: "16px", margin: "5px 0" }}>
          <strong>Helpline 2:</strong> +91 8919494005
        </p>
        <p
          style={{
            color: "#558b2f",
            fontStyle: "italic",
            marginTop: "10px",
          }}
        >
          Available from 9 AM to 6 PM (Mon–Sat)
        </p>
      </div>
    </div>
  );
}

export default CropForm;
