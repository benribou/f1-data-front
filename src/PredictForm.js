// PredictForm.js
import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const FormContainer = styled.div`
  background-color: #1c1c1c;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  margin: 50px auto;
  box-shadow: 0px 0px 10px rgba(255, 0, 0, 0.5);
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
  const [driver, setDriver] = useState('');
  const [circuit, setCircuit] = useState('');
  const [startingPosition, setStartingPosition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ driver, circuit, startingPosition });
  };

  return (
    <FormContainer>
      {/* Insérer le logo F1 ici */}
      <Logo src="f1_logo2.png" alt="F1 Logo" />
      <Title>F1 Position Prediction</Title>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="driver">Driver</Label>
        <Select id="driver" value={driver} onChange={(e) => setDriver(e.target.value)}>
          <option value="">Select Driver</option>
          <option value="Hamilton">Lewis Hamilton</option>
          <option value="Verstappen">Max Verstappen</option>
          <option value="Leclerc">Charles Leclerc</option>
          {/* Ajoutez plus de pilotes ici */}
        </Select>

        <Label htmlFor="circuit">Circuit</Label>
        <Select id="circuit" value={circuit} onChange={(e) => setCircuit(e.target.value)}>
          <option value="">Select Circuit</option>
          <option value="Monaco">Monaco</option>
          <option value="Silverstone">Silverstone</option>
          <option value="Spa">Spa</option>
          {/* Ajoutez plus de circuits ici */}
        </Select>

        <Label htmlFor="startingPosition">Starting Position</Label>
        <Input
          type="number"
          id="startingPosition"
          value={startingPosition}
          onChange={(e) => setStartingPosition(e.target.value)}
          placeholder="Enter starting position (1-20)"
        />

        <Button type="submit">Predict Position</Button>
      </form>
    </FormContainer>
  );
};

export default PredictForm;