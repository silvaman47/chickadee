import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx'; // Changed from .js to .jsx

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    expect(screen.getByText(/chicken app/i)).toBeInTheDocument();
  });
});