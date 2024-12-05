import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {WeatherCard} from './WeatherCard';
import '@testing-library/jest-dom';

describe("WeatherCard",() => {

    const mockProps = {
        city: 'Lviv',
        temperature: 293.15,
        description: 'Clear sky',
        onRefresh: jest.fn(),
        onViewDetails: jest.fn(),
        onRemove: jest.fn(),
    };
    test("renders city correctly", () => {
        render(<WeatherCard {...mockProps} />);
        
        const cityElement = screen.queryByText(/Lviv/i);
        expect(cityElement).toBeInTheDocument();
    });
    test("renders temperature correctly", () => {
        render(<WeatherCard {...mockProps} />);
      
        const expectedTemperature = `${(mockProps.temperature - 273.15).toFixed(2)}°C`;
        const temperatureElement = screen.queryByText(expectedTemperature);
        expect(temperatureElement).toBeInTheDocument();
    });
    test("renders description correctly", () => {
        render(<WeatherCard {...mockProps} />);
      
        const descriptionElement = screen.queryByText(/Clear sky/i); 
        expect(descriptionElement).toBeInTheDocument();
    });

    test('calls the correct function when refresh button is clicked', () => {
        render(<WeatherCard {...mockProps} />);
        
        const refreshButton = screen.getByRole('button', { name: /refresh/i });
        expect(refreshButton).toBeInTheDocument();
        fireEvent.click(refreshButton);
        expect(mockProps.onRefresh).toHaveBeenCalled();
    });
    test('calls the correct function when view details button is clicked', () => {
        render(<WeatherCard {...mockProps} />);
        
        const detailsButton = screen.getByRole('button', { name: /view details/i });
        expect(detailsButton).toBeInTheDocument();
        fireEvent.click(detailsButton);
        expect(mockProps.onViewDetails).toHaveBeenCalled();
    });
      
    test('calls the correct function when remove city button is clicked', () => {
        render(<WeatherCard {...mockProps} />);
        
        const removeButton = screen.getByRole('button', { name: /remove city/i });
        expect(removeButton).toBeInTheDocument();
        fireEvent.click(removeButton);
        expect(mockProps.onRemove).toHaveBeenCalled();
    });   
})
