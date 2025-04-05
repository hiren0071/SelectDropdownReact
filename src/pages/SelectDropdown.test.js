import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SelectDropdown from './SelectDropdown'; 

describe('SelectDropdown', () => {  

  test('renders the dropdown component with label', () => {
    render(<SelectDropdown label="Select a color" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('Select a color');
    expect(input).toBeInTheDocument();
  });

  test('Verify select dropdown exist', () => {
    render(<SelectDropdown onChange={() => {}} />);
   expect(screen.getByTestId('react-select')).toBeInTheDocument();
  });
  
});
