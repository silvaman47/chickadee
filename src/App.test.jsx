import { describe, it, expect } from 'vitest'; // Ensure Vitest import is correct
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For toBeInTheDocument
import App from './App.jsx';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    expect(screen.getByText(/Healthy Chicken Is Waiting For You/i)).toBeInTheDocument(); // Matches "Healthy Chicken Is Waiting For You"
  });
});