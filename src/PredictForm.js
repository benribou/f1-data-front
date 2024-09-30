// PredictForm.js
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

// Composant principal
const PredictForm = ({ onSubmit }) => {
  // États pour les champs de formulaire
  const [driver, setDriver] = useState('');
  const [circuit, setCircuit] = useState('');
  const [startingPosition, setStartingPosition] = useState('');
  const [constructor, setConstructor] = useState('');
  const [constructors, setConstructors] = useState([]);

  // Récupérer la liste des constructeurs via l'API
  useEffect(() => {
    fetch('http://localhost:8000/constructors/')
      .then((response) => response.json())
      .then((data) => {
        console.log('Données récupérées :', data);  // Vérifiez que "constructors" est bien présent
        if (data && Array.isArray(data.constructors)) {
          setConstructors(data.constructors);  // Utilisez data.constructors
        } else {
          console.error('Format de données inattendu :', data);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des constructeurs :', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ driver, circuit, startingPosition, constructor });
  };

  return (
    <FormContainer>
      {/* Insérer le logo F1 ici */}
      <Logo src="f1_logo2.png" alt="F1 Logo" />
      <Title>F1 Position Prediction</Title>
      <form onSubmit={handleSubmit}>
              {/* Ajouter le sélecteur pour le constructeur */}
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
          {/* Ajoutez plus de circuits ici */}
        </Select>

        <Label htmlFor="startingPosition">Starting Position</Label>
        <Input
          type="number"
          id="startingPosition"
          value={startingPosition}
          onChange={(e) => setStartingPosition(e.target.value)}
          placeholder="Enter starting position (1-20)"
          min="1"  // Limite minimum
          max="20" // Limite maximum
        />

        <Button type="submit">Predict Position</Button>
      </form>
    </FormContainer>
  );
};

export default PredictForm;