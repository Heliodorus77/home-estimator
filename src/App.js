import React from 'react';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🏠 Home Estimator</h1>
      <p>Welcome! Let’s estimate the cost of building your dream home.</p>
      <button onClick={() => alert("We're building now!")}>Start Now</button>
    </div>
  );
}

export default App;