// App.js
import React from 'react';
import PredictForm from './PredictForm';

function App() {
  const handleFormSubmit = (data) => {
    console.log('Prediction Data:', data);
    // Faites appel à votre API de modèle ML ici avec les données
  };

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '50px' }}>
      <PredictForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;