import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const FormContainer = styled.div`
  background-color: #1c1c1c;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  margin: 50px auto;
  box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.5);
  text-align: center;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #e10600;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #ffffff;
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #e10600;
  border-radius: 5px;
  background-color: #2c2c2c;
  color: #ffffff;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #e10600;
  border-radius: 5px;
  background-color: #2c2c2c;
  color: #ffffff;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #e10600;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff4500;
  }
`;

const PredictionResult = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #e10600;
  border-radius: 5px;
  background-color: #2c2c2c;
  color: #ffffff;
  box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.5);
`;

const PredictedPositionText = styled.p`
  font-size: 48px; /* Augmenter la taille du texte */
  font-weight: bold;
  color: #e10600; /* Couleur rouge */
  margin: 0;
  text-shadow: 0 0 4px rgba(255, 0, 0, 0.8), 0 0 8px rgba(255, 0, 0, 0.6), 0 0 12px rgba(255, 0, 0, 0.4); /* Effet néon */
`;

// Composant principal
const PredictForm = ({ onSubmit }) => {
  const [circuit, setCircuit] = useState('');
  const [startingPosition, setStartingPosition] = useState('');
  const [constructor, setConstructor] = useState('');
  const [year, setYear] = useState('2024');
  const [constructors, setConstructors] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [predictedPosition, setPredictedPosition] = useState(null); // Nouvel état pour stocker la position prédite

  // Récupérer la liste des constructeurs via l'API
  useEffect(() => {
    fetch('http://localhost:8000/constructors/')
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.constructors)) {
          setConstructors(data.constructors);
        } else {
          console.error('Format de données inattendu :', data);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des constructeurs :', error);
      });
  }, []);

  // Récupérer la liste des circuits via l'API
  useEffect(() => {
    fetch('http://localhost:8000/circuits/')
      .then((response) => response.json())
      .then((data) => {
        console.log('Données récupérées :', data);
        if (data && Array.isArray(data.circuits)) {
          setCircuits(data.circuits);
        } else {
          console.error('Format de données inattendu :', data);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des circuits :', error);
      });
  }, []);

  // Générer une liste d'années de 1950 à 2024
  const years = [];
  for (let i = 1950; i <= 2024; i++) {
    years.push(i);
  }

  // Gérer l'envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Créer l'objet à envoyer à l'API
    const predictData = {
      grid: startingPosition,
      circuit: circuit,
      constructor: constructor,
      year: year,
    };

    console.log('Données envoyées:', predictData);

    // Envoyer la requête POST à l'API /predict
    fetch('http://localhost:8000/predict/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(predictData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Réponse de l\'API :', data);
        // Mettre à jour l'état avec la position prédite
        setPredictedPosition(data.predicted_position); // Stocker la position prédite dans l'état
      })
      .catch((error) => {
        console.error('Erreur lors de la requête à l\'API /predict :', error);
      });

    onSubmit({ circuit, startingPosition, constructor, year });
  };

  return (
    <FormContainer>
      <Logo src="f1_logo2.png" alt="F1 Logo" />
      <Title>F1 Position Prediction</Title>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="constructor">Constructor</Label>
        <Select id="constructor" value={constructor} onChange={(e) => setConstructor(e.target.value)}>
          <option value="">Select Constructor</option>
          {constructors.map((constructor) => (
            <option key={constructor.id} value={constructor.name}>
              {constructor.name}
            </option>
          ))}
        </Select>

        <Label htmlFor="circuit">Circuit</Label>
        <Select id="circuit" value={circuit} onChange={(e) => setCircuit(e.target.value)}>
          <option value="">Select Circuit</option>
          {circuits.map((circuit) => (
            <option key={circuit.id} value={circuit.name}>
              {circuit.name}
            </option>
          ))}
        </Select>

        <Label htmlFor="year">Year</Label>
        <Select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </Select>

        <Label htmlFor="startingPosition">Starting Position</Label>
        <Input
          type="number"
          id="startingPosition"
          value={startingPosition}
          onChange={(e) => setStartingPosition(e.target.value)}
          placeholder="Enter starting position (1-20)"
          min="1"
          max="20"
        />

        <Button type="submit">Predict Position</Button>
      </form>

      {/* Afficher le résultat de la prédiction */}
      {predictedPosition !== null && (
        <PredictionResult>
          <h2>Predicted Position</h2>
          <PredictedPositionText>{predictedPosition}</PredictedPositionText>
        </PredictionResult>
      )}
    </FormContainer>
  );
};

export default PredictForm;