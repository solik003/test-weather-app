
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DetailedPage } from './DetailedPage';
import { fetchWeatherData, fetchForecastData } from '../../redux/weather/weatherSlice';
import { selectCity, selectHourlyForecast} from '../../redux/weather/selectors/weatherSelectors'
import '@testing-library/jest-dom';

jest.mock('../../redux/weather/weatherSlice', () => ({
  fetchWeatherData: jest.fn(),
  fetchForecastData: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({cityName: 'City1'})
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn().mockImplementation((selector) => {
    if(selector === selectCity) {
        return {
            name: 'City1',
            country: 'Country1',
            temperature: 293.15,
            description: 'Clear sky',
            humidity: 50,
            windSpeed: 5,
          };
        }
    

    if(selector === selectHourlyForecast) {
        return [
            { time: '12:00', temperature: 292.15 },
            { time: '13:00', temperature: 293.15 },
          ]
    }
    }),
    useDispatch:  () => mockDispatch,
    })  
);

describe('DetailedPage Component', () => {
  const renderWithState = () => render(<DetailedPage />);

  it('should call fetchWeatherData and fetchForecastData when cityName changes', async () => {
    renderWithState();

    await waitFor(() => {
      expect(fetchWeatherData).toHaveBeenCalledWith('City1');
      expect(fetchForecastData).toHaveBeenCalledWith('City1');
    });
  });

  it('should show loading', () => {
    renderWithState();
    const loadingElement = screen.queryByText('Loading...');

    expect(loadingElement).toBeInTheDocument();
  });

});

