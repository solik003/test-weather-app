

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchWeatherData } from '../../redux/weather/weatherSlice';
import { removeCity } from '../../redux/weather/weatherSlice';
import { WeatherCard } from '../../components/WeatherCard/WeatherCard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './HomePage.module.scss';
import { getCitiesFromLocalStorage } from '../../utils/localStorageManager';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cities = useSelector((state: RootState) => state.weather.cities);
  const navigate = useNavigate();

  useEffect(() => {
    getCitiesFromLocalStorage();
  }, []);

  const handleAddCity = () => {
    const city = prompt('Enter city name:');
    if (city) {
      dispatch(fetchWeatherData(city));
    }
  };

  const handleRefreshWeather = (cityName: string) => {
    dispatch(fetchWeatherData(cityName));
  };

  const handleViewDetails = (cityName: string) => {
    navigate(`/details/${cityName}`);
  };

  const handleRemoveCity = (cityName: string) => {
    dispatch(removeCity(cityName));
  };

  return (
    <div>
      <div className={styles['button-container']}>
        <Button
          className={styles['add-city-btn']}
          onClick={handleAddCity}
        >
          Add City
        </Button>
      </div>
      
      <div className={styles['weather-cards-container']}>
        {cities.map((city) => (
          <WeatherCard
            key={city.name}
            city={city.name}
            temperature={city.temperature}
            description={city.description}
            onRefresh={() => handleRefreshWeather(city.name)}
            onViewDetails={() => handleViewDetails(city.name)}
            onRemove={() => handleRemoveCity(city.name)}
          />
        ))}
      </div>
    </div>
  );
};