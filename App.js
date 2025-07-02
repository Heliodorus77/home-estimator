import React, { useState } from "react";

const Card = ({ children }) => <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", marginTop: "20px" }}>{children}</div>;
const Button = ({ children, ...props }) => (
  <button style={{ background: "#2563eb", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }} {...props}>
    {children}
  </button>
);

function App() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState("mid");
  const [zip, setZip] = useState("");
  const [buildType, setBuildType] = useState("custom_home");
  const [estimate, setEstimate] = useState(null);

  const handleUpload = () => {
    if (!file || !zip) return alert("Upload a file and enter ZIP");
    const sqft = 2100;
    const base = quality === "basic" ? 120 : quality === "mid" ? 145 : 180;
    const multiplier = buildType === "build_to_rent" ? 0.95 : 1;
    const costPerSqft = base * multiplier;
    const total = sqft * costPerSqft;
    const breakdown = {
      siteWork: total * 0.05,
      foundation: total * 0.09,
      framing: total * 0.17,
      exterior: total * 0.16,
      plumbing: total * 0.07,
      electrical: total * 0.06,
      hvac: total * 0.05,
      drywall: total * 0.06,
      interior: total * 0.15,
      appliances: total * 0.03,
      fireplace: total * 0.02,
      permits: total * 0.02,
      contingency: total * 0.03,
    };
    setEstimate({ sqft, costPerSqft, total, breakdown });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Home Cost Estimator</h1>
      <Card>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          placeholder="ZIP code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
        />
        <select value={quality} onChange={(e) => setQuality(e.target.value)} style={{ padding: "8px", width: "100%", marginBottom: "10px" }}>
          <option value="basic">Basic</option>
          <option value="mid">Mid-grade</option>
          <option value="high">High-end</option>
        </select>
        <select value={buildType} onChange={(e) => setBuildType(e.target.value)} style={{ padding: "8px", width: "100%", marginBottom: "10px" }}>
          <option value="custom_home">Custom Home</option>
          <option value="build_to_rent">Build to Rent (Investor)</option>
        </select>
        <Button onClick={handleUpload}>Estimate Cost</Button>
      </Card>

      {estimate && (
        <Card>
          <h2>Estimated Total: ${estimate.total.toLocaleString()}</h2>
          <ul>
            {Object.entries(estimate.breakdown).map(([k, v]) => (
              <li key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{k}</span>
                <span>${v.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

export default App;